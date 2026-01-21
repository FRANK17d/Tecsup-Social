/**
 * Servicio Email - Capa de Infraestructura
 * 
 * Maneja el envío de correos electrónicos usando nodemailer.
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configurar transporter según el entorno
const crearTransporter = () => {
    const config = {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    };

    return nodemailer.createTransport(config);
};

export const servicioEmail = {
    /**
     * Envía un correo de recuperación de contraseña
     */
    async enviarRecuperacionContrasena(email, token, nombreUsuario) {
        const transporter = crearTransporter();
        const urlRecuperacion = `${process.env.FRONTEND_URL}/restablecer-contrasena?token=${token}`;

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Recuperar Contraseña</title>
                <!-- Importar fuente Inter -->
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
                <style>
                    /* Reset */
                    body, p, h1, h2, h3 { margin: 0; padding: 0; }
                    body { 
                        font-family: 'Inter', sans-serif; 
                        background-color: #0f172a; /* Slate 900 */
                        color: #e2e8f0; /* Slate 200 */
                        line-height: 1.6;
                        -webkit-font-smoothing: antialiased;
                    }
                    /* Container */
                    .wrapper {
                        width: 100%;
                        background-color: #0f172a;
                        padding: 40px 0;
                    }
                    .container { 
                        max-width: 480px; 
                        margin: 0 auto; 
                        background-color: #1e293b; /* Slate 800 */
                        border-radius: 16px; 
                        overflow: hidden;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                        border: 1px solid #334155; /* Slate 700 */
                    }
                    /* Header */
                    .header {
                        background-color: #1e293b;
                        padding: 32px 40px 0 40px;
                        text-align: center;
                    }
                    .brand {
                        color: #38bdf8; /* Sky 400 - Similar a Tecsup Primary */
                        font-size: 24px;
                        font-weight: 700;
                        letter-spacing: -0.5px;
                        text-decoration: none;
                    }
                    /* Icono animado (GIF o PNG static) */
                    .icon-container {
                        margin: 24px 0 16px 0;
                        text-align: center;
                    }
                    .lock-icon {
                        width: 80px;
                        height: 80px;
                        background-color: rgba(56, 189, 248, 0.1);
                        border-radius: 50%;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 40px;
                    }
                    /* Content */
                    .content {
                        padding: 0 40px 40px 40px;
                        text-align: center;
                    }
                    h1 { 
                        color: #f8fafc; /* Slate 50 */
                        font-size: 20px; 
                        font-weight: 600;
                        margin-bottom: 16px; 
                    }
                    p { 
                        color: #94a3b8; /* Slate 400 */
                        font-size: 15px;
                        margin-bottom: 24px;
                    }
                    /* Button */
                    .button-container {
                        margin: 32px 0;
                    }
                    .button { 
                        display: inline-block; 
                        background-color: #0284c7; /* Sky 600 */
                        color: #ffffff !important; 
                        padding: 14px 32px; 
                        text-decoration: none; 
                        border-radius: 12px; 
                        font-weight: 600;
                        font-size: 15px;
                        transition: background-color 0.2s;
                        box-shadow: 0 4px 6px -1px rgba(2, 132, 199, 0.3);
                    }
                    .button:hover { 
                        background-color: #0369a1; /* Sky 700 */
                    }
                    /* Footer */
                    .footer { 
                        background-color: #0f172a;
                        padding: 24px;
                        text-align: center;
                    }
                    .footer p { 
                        color: #64748b; /* Slate 500 */
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
                            <div class="icon-container">
                                <img src="https://png.pngtree.com/png-clipart/20220924/ourmid/pngtree-3d-lock-yellow-png-image_6215174.png" alt="Candado" width="100" style="display: block; margin: 0 auto;">
                            </div>
                            
                            <h1>Recuperación de Contraseña</h1>
                            
                            <p>Hola <strong>${nombreUsuario || 'Usuario'}</strong>,<br>
                            Recibimos una solicitud para restablecer tu contraseña. Si fuiste tú, haz clic en el botón de abajo.</p>
                            
                            <div class="button-container">
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

        const mailOptions = {
            from: `"Tecsup Social" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🔐 Recupera tu contraseña - Tecsup Social',
            html: htmlContent,
        };

        try {
            // Verificar configuración antes de enviar
            console.log('📧 Intentando enviar email a:', email);
            console.log('📧 Config:', {
                host: process.env.EMAIL_HOST,
                user: process.env.EMAIL_USER ? 'configurado' : 'NO CONFIGURADO',
                pass: process.env.EMAIL_PASS ? 'configurado' : 'NO CONFIGURADO',
            });

            const info = await transporter.sendMail(mailOptions);
            console.log('📧 Email de recuperación enviado:', info.messageId);
            return { exito: true, messageId: info.messageId };
        } catch (error) {
            console.error('❌ Error enviando email:', {
                message: error.message,
                code: error.code,
                command: error.command,
                responseCode: error.responseCode,
            });
            throw new Error(`Error al enviar correo: ${error.message}`);
        }
    },

    /**
     * Verifica la configuración de email
     */
    async verificarConfiguracion() {
        try {
            const transporter = crearTransporter();
            await transporter.verify();
            console.log('✅ Configuración de email verificada');
            return true;
        } catch (error) {
            console.error('❌ Error en configuración de email:', error.message);
            return false;
        }
    },
};

export default servicioEmail;
