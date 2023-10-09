import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function Chat() {
    const [userMessage, setUserMessage] = useState('');
    const [assistantMessage, setAssistantMessage] = useState('');
    const [chatVisible, setChatVisible] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Hacer scroll al fondo del chat cuando se agregue un nuevo mensaje
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [assistantMessage]);

    const toggleChat = () => {
        setChatVisible(!chatVisible);
    };

    const sendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:4003/api/chat',{ user_message: userMessage });
            setAssistantMessage(response.data.assistant_message);
            setUserMessage('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="chat-container fixed bottom-4 right-4 w-96 border border-color-neutral-400 rounded-md sm:w-80 sm:bottom-2 md:bottom-2 lg:bottom-2 xl:bottom-2 2xl:bottom-2">
            <div className={`chat-box ${chatVisible ? 'expanded' : ''}`} ref={chatContainerRef}>
                <button onClick={toggleChat} className="toggle-button bg-color-secondary w-full text-color-primary font-bold rounded-t-md p-1">
                    {chatVisible ? 'Cerrar Chat' : 'Abrir Chat'}
                </button>
                {chatVisible && (
                    <div className="chat-content " style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {/* Aplicar un máximo de altura y desbordamiento vertical */}
                        <div className="user-message bg-color-primary pl-1">{userMessage}</div>
                        <div className="assistant-message bg-color-primary p-2">{assistantMessage}</div>
                    </div>
                )}
            </div>
            {chatVisible && (
                <div className="flex justify-between  p-2 bg-color-slate-300 rounded-b-md">
                    <input
                        type="text"
                        placeholder="Escribe tu mensaje..."
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        className='w-5/6 bg-color-slate-300'
                    />
                    <button
                        onClick={sendMessage}
                        className='bg-color-third text-color-primary font-bold w-14 p-1 rounded-md'
                    >
                        Enviar
                    </button>
                </div>
            )}
        </div>
    );
}

export default Chat
