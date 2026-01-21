/**
 * App.jsx - Componente Principal
 * 
 * Configuración de rutas y proveedores.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProveedorAutenticacion } from './presentacion/contextos/ContextoAutenticacion.jsx';
import RutaProtegida from './presentacion/componentes/compartidos/RutaProtegida.jsx';
import PantallaCarga from './presentacion/componentes/ui/PantallaCarga.jsx';

// Páginas
import InicioSesion from './presentacion/paginas/InicioSesion.jsx';
import Registro from './presentacion/paginas/Registro.jsx';
import RecuperarContrasena from './presentacion/paginas/RecuperarContrasena.jsx';
import RestablecerContrasena from './presentacion/paginas/RestablecerContrasena.jsx';
import Feed from './presentacion/paginas/Feed.jsx';
import Perfil from './presentacion/paginas/Perfil.jsx';

function App() {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simular carga de recursos/inicialización
    const timer = setTimeout(() => {
      setCargando(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ProveedorAutenticacion>
      <AnimatePresence>
        {cargando && <PantallaCarga />}
      </AnimatePresence>

      {!cargando && (
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<InicioSesion />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
            <Route path="/restablecer-contrasena" element={<RestablecerContrasena />} />

            {/* Rutas protegidas */}
            <Route
              path="/"
              element={
                <RutaProtegida>
                  <Feed />
                </RutaProtegida>
              }
            />
            <Route
              path="/perfil"
              element={
                <RutaProtegida>
                  <Perfil />
                </RutaProtegida>
              }
            />

            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </ProveedorAutenticacion>
  );
}

export default App;
