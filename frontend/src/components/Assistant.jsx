import React, { useState } from 'react'
import '../css/components-css/Assistant.css'

export const Assistant = ({ name }) => {
    const [messages, setMessages] = useState([{ text: "Hola! soy el asistente a tu servicio, hazme una pregunta sobre el plato!", sender: "gpt" }])
    const [inputMessage, setInputMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const sendMessage = async () => {
        if (!inputMessage.trim()) return

        const newMessage = { sender: "user", text: inputMessage }

        setMessages((prev) => [...prev, newMessage])
        setInputMessage("")
        setLoading(true)

        try {
            const response = await fetch("http://localhost:4000/api/assistant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: inputMessage, name: name }),
            })

            if (!response.ok) {
                throw new Error("There was an error requesting with the backend")
            }

            const data = await response.json();
            const botResponse = { sender: "gpt", text: data.response }
            console.log(data)
            setMessages((prev) => [...prev, botResponse])

        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: "gpt", text: "Hey, we couldn't process your request, please try again " },
            ])

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="chat-container">
            <h2 className='title-chat'>Personal Assistant <img src="https://img.icons8.com/?size=100&id=ka3InxFU3QZa&format=png&color=000000" /></h2>
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender}`}
                    >
                        {msg.text}
                    </div>
                ))}
                {loading && (
                    <div className="message bot">
                        Escribiendo...
                    </div>
                )}
            </div>
            <div className="input-chat-container">
                <input
                    className="input-chat"
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Escribe tu mensaje..."
                />
                <button className="button-chat" onClick={sendMessage}>
                    Enviar
                </button>
            </div>
        </div>
    )
}