/**
 * Servicio Google OAuth - Capa de Infraestructura
 * 
 * Maneja la verificación de tokens de Google.
 */

import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const servicioGoogle = {
    /**
     * Verifica un token de Google y retorna la información del usuario
     */
    async verificarToken(tokenGoogle) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: tokenGoogle,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            return {
                googleId: payload.sub,
                email: payload.email,
                emailVerificado: payload.email_verified,
                nombre: payload.name,
                foto: payload.picture,
                dominio: payload.hd, // Dominio del email (ej: tecsup.edu.pe)
            };
        } catch (error) {
            console.error('❌ Error verificando token de Google:', error.message);
            throw new Error('Token de Google inválido o expirado');
        }
    },

    /**
     * Valida que el email pertenezca al dominio institucional
     */
    validarDominioInstitucional(email, dominioPermitido = 'tecsup.edu.pe') {
        if (!email) return false;
        const dominio = email.split('@')[1];
        return dominio === dominioPermitido;
    },
};

export default servicioGoogle;
