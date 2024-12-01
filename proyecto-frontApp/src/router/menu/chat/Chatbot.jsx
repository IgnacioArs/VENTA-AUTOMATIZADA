import React, { useEffect, useState } from 'react';
import '../../../css/chatbot.css'; // Asegúrate de crear y vincular este archivo CSS
import { useSelector } from 'react-redux';
import { pythonApiMs } from '../../../hooks/usechatBotStore';

const Chatbot = () => {

  //realizamos uso del hooks para que nuestro chat se pueda comunicar con el chat
  const { chatBotEnpoint } = pythonApiMs();

  //utilizamos las credenciales cargada por el payload por redux
  const { authPayload, status } = useSelector(state => state.auth);

  //estados para cargar el logeo del usuario
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  //estado para cargar los mensajes entre la ia y el usuario
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');


  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user', name: `${user ? user?.name : ""}` }]);
      setInputValue('');
      const resChatBot = await chatBotEnpoint(inputValue);


      // Simulación de respuesta del bot
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: resChatBot?.data?.response, sender: 'bot', name: 'IA' }
        ]);
      }, 1000);


    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };


  useEffect(() => {
    const tokenString = localStorage.getItem("token");

    if (tokenString) {
      try {
        const parsedData = JSON.parse(tokenString);

        if (parsedData && parsedData.usuario) {
          const { usuario, token } = parsedData;
          const { id, name, email, password } = usuario;
          setUser({ id, name, email, password });
          setUserToken(token);
        } else {
          console.warn("El formato de `parsedData` no es el esperado.");
        }
      } catch (error) {
        console.error("Error al analizar el JSON del token", error);
      }
    } else {
      console.warn("out session");
    }
  }, [authPayload, status]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.name}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;

