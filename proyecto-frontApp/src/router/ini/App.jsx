import { Routes, Route, useNavigate, Outlet, Navigate, json } from 'react-router-dom';
import Inicio from './Inicio';
import Login from './Login';
import Registro from './Registro';
import Dashboard from '../menu/dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setAuthPayload, setStatus } from '../../store/auth/authSlice';
import Navbar from '../components/Navbar';
import Chatbot from '../menu/chat/Chatbot';



function App() {

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

