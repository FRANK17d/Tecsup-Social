/**
 * Hook useGoogleAuth
 * 
 * Maneja la autenticación con Google usando popup clásico.
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteApi from '../../infraestructura/api/clienteApi.js';
import { useAutenticacion } from '../contextos/ContextoAutenticacion.jsx';

// ID del cliente de Google
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export function useGoogleAuth() {
    const navigate = useNavigate();
    const { verificarAutenticacion } = useAutenticacion();

    const manejarCredencial = useCallback(async (response) => {
        try {
            const resultado = await clienteApi.loginConGoogle(response.credential);

            if (resultado.exito) {
                await verificarAutenticacion();
                navigate('/');
            }
        } catch (error) {
            console.error('Error en autenticación con Google:', error);
            alert(error.mensaje || 'Error al iniciar sesión con Google');
        }
    }, [navigate, verificarAutenticacion]);

    const iniciarGoogleSignIn = useCallback(() => {
        if (!window.google || !GOOGLE_CLIENT_ID) {
            console.warn('Google Sign-In no está configurado');
            alert('Google Sign-In no está disponible. Configura VITE_GOOGLE_CLIENT_ID.');
            return;
        }

        // Usar popup clásico (ventana pequeña) en lugar de FedCM
        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: manejarCredencial,
            ux_mode: 'popup', // Forzar modo popup
            use_fedcm_for_prompt: false, // Desactivar FedCM
        });

        // Renderizar botón invisible y hacer clic automático
        const buttonDiv = document.createElement('div');
        buttonDiv.id = 'g_id_signin_temp';
        buttonDiv.style.display = 'none';
        document.body.appendChild(buttonDiv);

        window.google.accounts.id.renderButton(buttonDiv, {
            type: 'icon',
            size: 'large',
        });

        // Simular clic en el botón de Google
        const googleButton = buttonDiv.querySelector('div[role="button"]');
        if (googleButton) {
            googleButton.click();
        } else {
            // Fallback: usar prompt normal
            window.google.accounts.id.prompt();
        }

        // Limpiar después de un momento
        setTimeout(() => {
            buttonDiv.remove();
        }, 100);
    }, [manejarCredencial]);

    return { iniciarGoogleSignIn };
}

export default useGoogleAuth;
