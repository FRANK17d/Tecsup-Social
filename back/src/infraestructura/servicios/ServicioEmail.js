/**
 * Servicio Email - Capa de Infraestructura
 * 
 * Maneja el envío de correos electrónicos.
 * - Desarrollo: Gmail SMTP (nodemailer)
 * - Producción: Postmark API
 */

import nodemailer from 'nodemailer';
import postmark from 'postmark';
import dotenv from 'dotenv';

dotenv.config();

// Detectar si estamos en producción
const esProduccion = process.env.NODE_ENV === 'production';

// Cliente de Postmark (solo se usa en producción)
let clientePostmark = null;
if (esProduccion && process.env.POSTMARK_API_KEY) {
    clientePostmark = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
}

// Configurar transporter de nodemailer (solo se usa en desarrollo)
const crearTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Generar el HTML del correo de recuperación
const generarHtmlRecuperacion = (nombreUsuario, urlRecuperacion) => {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recuperar Contraseña</title>
            <style>
                body, p, h1, h2, h3 { margin: 0; padding: 0; }
                body { 
                    font-family: 'Arial', sans-serif; 
                    background-color: #0f172a;
                    color: #e2e8f0;
                    line-height: 1.6;
                }
                .wrapper {
                    width: 100%;
                    background-color: #0f172a;
                    padding: 40px 0;
                }
                .container { 
                    max-width: 480px; 
                    margin: 0 auto; 
                    background-color: #1e293b;
                    border-radius: 16px; 
                    overflow: hidden;
                    border: 1px solid #334155;
                }
                .header {
                    background-color: #1e293b;
                    padding: 32px 40px 0 40px;
                    text-align: center;
                }
                .content {
                    padding: 0 40px 40px 40px;
                    text-align: center;
                }
                h1 { 
                    color: #f8fafc;
                    font-size: 20px; 
                    font-weight: 600;
                    margin-bottom: 16px; 
                }
                p { 
                    color: #94a3b8;
                    font-size: 15px;
                    margin-bottom: 24px;
                }
                .button { 
                    display: inline-block; 
                    background-color: #0284c7;
                    color: #ffffff !important; 
                    padding: 14px 32px; 
                    text-decoration: none; 
                    border-radius: 12px; 
                    font-weight: 600;
                    font-size: 15px;
                }
                .footer { 
                    background-color: #0f172a;
                    padding: 24px;
                    text-align: center;
                }
                .footer p { 
                    color: #64748b;
                    font-size: 12px; 
                    margin-bottom: 8px;
                }
                .expiration {
                    background-color: rgba(244, 63, 94, 0.1);
                    color: #f43f5e;
                    font-size: 12px;
                    padding: 8px 12px;
                    border-radius: 9999px;
                    display: inline-block;
                    margin-bottom: 24px;
                    font-weight: 500;
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="container">
                    <div class="header">
                        <img src="https://www.tecsup.edu.pe/wp-content/uploads/2024/07/Group-680.png" alt="Tecsup" style="height: 50px; width: auto; display: block; margin: 0 auto;">
                    </div>
                    
                    <div class="content">
                        <div style="margin: 24px 0 16px 0; text-align: center;">
                            <img src="https://png.pngtree.com/png-clipart/20220924/ourmid/pngtree-3d-lock-yellow-png-image_6215174.png" alt="Candado" width="100" style="display: block; margin: 0 auto;">
                        </div>
                        
                        <h1>Recuperación de Contraseña</h1>
                        
                        <p>Hola <strong>${nombreUsuario || 'Usuario'}</strong>,<br>
                        Recibimos una solicitud para restablecer tu contraseña. Si fuiste tú, haz clic en el botón de abajo.</p>
                        
                        <div style="margin: 32px 0;">
                            <a href="${urlRecuperacion}" class="button">Restablecer mi contraseña</a>
                        </div>
                        
                        <div class="expiration">
                            ⏰ Este enlace expira en 1 hora
                        </div>
                        
                        <p style="font-size: 13px; margin-bottom: 0;">
                            Si no solicitaste este cambio, puedes ignorar este correo de forma segura.
                        </p>
                    </div>
                </div>
                
                <div class="footer">
                    <p>© ${new Date().getFullYear()} Tecsup Social. Todos los derechos reservados.</p>
                    <p>Este es un mensaje automático, por favor no respondas.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export const servicioEmail = {
    /**
     * Envía un correo de recuperación de contraseña
     */
    async enviarRecuperacionContrasena(email, token, nombreUsuario) {
        const urlRecuperacion = `${process.env.FRONTEND_URL}/restablecer-contrasena?token=${token}`;
        const htmlContent = generarHtmlRecuperacion(nombreUsuario, urlRecuperacion);

        console.log(`📧 Enviando email a: ${email} (Modo: ${esProduccion ? 'Postmark' : 'Gmail SMTP'})`);

        try {
            if (esProduccion && clientePostmark) {
                // === PRODUCCIÓN: Usar Postmark ===
                const resultado = await clientePostmark.sendEmail({
                    From: process.env.POSTMARK_FROM_EMAIL || 'noreply@tecsup.edu.pe',
                    To: email,
                    Subject: '🔐 Recupera tu contraseña - Tecsup Social',
                    HtmlBody: htmlContent,
                    MessageStream: 'outbound',
                });
                console.log('📧 Email enviado con Postmark:', resultado.MessageID);
                return { exito: true, messageId: resultado.MessageID };
            } else {
                // === DESARROLLO: Usar Gmail SMTP ===
                const transporter = crearTransporter();
                const info = await transporter.sendMail({
                    from: `"Tecsup Social" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: '🔐 Recupera tu contraseña - Tecsup Social',
                    html: htmlContent,
                });
                console.log('📧 Email enviado con Gmail:', info.messageId);
                return { exito: true, messageId: info.messageId };
            }
        } catch (error) {
            console.error('❌ Error enviando email:', {
                message: error.message,
                code: error.code,
            });
            throw new Error(`Error al enviar correo: ${error.message}`);
        }
    },

    /**
     * Verifica la configuración de email
     */
    async verificarConfiguracion() {
        if (esProduccion) {
            return !!clientePostmark;
        }
        try {
            const transporter = crearTransporter();
            await transporter.verify();
            console.log('✅ Configuración de email (Gmail) verificada');
            return true;
        } catch (error) {
            console.error('❌ Error en configuración de email:', error.message);
            return false;
        }
    },
};

export default servicioEmail;
