import { useState } from "react";

// Styles
import "../../assets/css/components/admin/CashyBot.css";

// Images & icons
import BotImg  from "../../assets/img/Bot.png";
import { SendIcon } from "../../lib/lists/Icons";

const CashyBotView = () => {
    const [welcomeElement, setWelcomeElement] = useState(true)

    const onFormSubmit = () => {
        setWelcomeElement(false)
    }

    return (
        <main className="content-page--admin content-page--admin-cashybot">
            <section className="cashybot">
                <div className={`cashybot-welcome ${welcomeElement ? "" : "disabled"}`}>
                    <img src={BotImg} alt="Cashy bot" />
                    <h1>Hola! Soy <b>Cashy</b>, tu asistente financiero inteligente</h1>
                    <h2>Resuelve tus dudas y mejora tus decisiones al instante.</h2>
                </div>
                <form method="POST" className="cashybot-input" onSubmit={onFormSubmit}>
                    <textarea
                        className="font-lexend"
                        rows={4}
                        placeholder="Pregunta lo que quieras"
                    />
                    <button
                        type="submit" 
                        className="font-lexend"
                    >
                        <SendIcon />
                        Enviar
                    </button>
                </form>
            </section>
        </main>
    )
}

export default CashyBotView