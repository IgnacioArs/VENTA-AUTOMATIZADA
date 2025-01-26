import { Routes, Route, useNavigate, Outlet, Navigate } from 'react-router-dom';
import Inicio from './Inicio';
import Login from './Login';
import Registro from './Registro';
import Dashboard from '../menu/dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setAuthPayload, setStatus } from '../../store/auth/authSlice';
import Navbar from '../components/Navbar';
import Chatbot from '../menu/chat/Chatbot';
import sessionLogOutMethod from '../../utils/sessionLogOut';
import logAuthMethod from '../../utils/logAuth';
import verifySession from '../../utils/verifySession';
import { verifySessionStatus } from '../../hooks/verifySessionStatus';




function App() {

  const {verifySessionMethod} = verifySessionStatus();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authPayload, status } = useSelector(state => state.auth);
  const [tokenState, setTokenState] = useState(null);


  useEffect(() => {
    const local = localStorage.getItem("token");
    if (local != null) {
      /* console.log("PRUEBA 1"); */
      dispatch(setAuthPayload(local));
      dispatch(setStatus("authenticated"));
      setTokenState(true);
    } else {
      /*  console.log("PRUEBA 2"); */
      dispatch(setAuthPayload({}));
      dispatch(setStatus("no-authenticated"));
      setTokenState(null);
    }
  }, [])

  useEffect(() => {
    if (status === "authenticated" && Object.keys(authPayload).length > 0) {
      /*  console.log("PRUEBA 3"); */
      setTokenState(true)
      return navigate("/dashboard");
    } else {
      /*   console.log("PRUEBA 4"); */
      setTokenState(null)
    }
  }, [status])


    useEffect(() => {
    let lastActivityTime = Date.now(); // Marca el tiempo de la última actividad
  
    // Función para cerrar sesión
    const handleInactivity = () => {
      const currentTime = Date.now();
      const inactivityTime = currentTime - lastActivityTime;
  
      if (inactivityTime >= 60000) { // 1 minuto de inactividad
   /*      console.log("Inactividad detectada. Cerrando sesión..."); */
        sessionLogOutMethod(dispatch); // Cierra la sesión
        logAuthMethod(dispatch, navigate); // Redirige al login
      }
    };
  
    // Función para actualizar la última actividad
    const resetActivityTimer = () => {
      lastActivityTime = Date.now();
     /*  console.log("Actividad detectada, reiniciando temporizador..."); */
    };
  
    // Configura el intervalo para verificar la inactividad
    const intervalId = setInterval(handleInactivity, 1000); // Verifica cada segundo
  
    // Registra eventos de actividad del usuario
    window.addEventListener("click", resetActivityTimer);
    window.addEventListener("keypress", resetActivityTimer);
  
    return () => {
      clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
      window.removeEventListener("click", resetActivityTimer);
      window.removeEventListener("keypress", resetActivityTimer);
    };
  }, [dispatch, navigate]);  

  const verifiTokenSesseion = async() => {
    const res = await  verifySessionMethod(authPayload?.user?.id,authPayload?.token);
    return res?.status;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
   /*    console.log("Ejecutando acción cada minuto..."); */
      const stateSession =  verifySession(authPayload, status);
      if(stateSession === true){
        const resSessionStatus = verifiTokenSesseion();
        if(resSessionStatus != 200){
          sessionLogOutMethod(dispatch); // Cierra la sesión
          logAuthMethod(dispatch, navigate); // Redirige al login
        }
      }
    }, 60000); 
  
    return () => {
      clearInterval(intervalId);
    };
  }, [authPayload, status]);
  


  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        

        {/* Rutas protegidas */}
        {tokenState && (
          <Route path='/' element={<Outlet />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/chatbot' element={<Chatbot />} />
            <Route index element={<Dashboard />} />
          </Route>
        )}

        {/* Ruta para manejo de páginas no encontradas */}
        <Route path='*' element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;

