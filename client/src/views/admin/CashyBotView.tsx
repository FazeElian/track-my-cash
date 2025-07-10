import { useState } from "react";
import { useForm } from "react-hook-form";
import { SyncLoader } from "react-spinners";

// Formaters
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Styles for math formulas

// Styles
import "../../assets/css/components/admin/CashyBot.css";

// Images & icons
import BotImg  from "../../assets/img/Bot.png";
import { SendIcon } from "../../lib/lists/Icons";

// Mutation
import { useNewMessageMutation } from "../../services/cashybot/mutations";

type CashyBotFormType = {
    prompt: string
}

const CashyBotView = () => {
    // Elements states
    const [welcomeElement, setWelcomeElement] = useState(true)
    const [botResponse, setBotResponse] = useState("")
    const [prompt, setPrompt] = useState("")

    const { register, handleSubmit, reset } = useForm<CashyBotFormType> ({
        defaultValues: {
            prompt: ""
        }
    })

    // Mutation
    const newMessageMutation = useNewMessageMutation()
    const handleNewMessage = (formData: CashyBotFormType) => {
        setPrompt(formData.prompt) // Add prompt sent by the user to view
        setBotResponse("") // Clear response
        setWelcomeElement(false) // Remove welcome element from view
        reset() // Clear input

        newMessageMutation.mutate(formData.prompt, {
            onSuccess: (response) => {
                setBotResponse(response)
            }
        })
    }

    return (
        <main className="content-page--admin content-page--admin-cashybot">
            <section className="cashybot">
                <div className={`cashybot-welcome ${welcomeElement ? "" : "disabled"}`}>
                    <img src={BotImg} alt="Cashy bot" />
                    <h1>Hola! Soy <b>Cashy</b>, tu asistente financiero inteligente</h1>
                    <h2>Resuelve tus dudas y mejora tus decisiones al instante.</h2>
                </div>
                <section className="cashybot-chat">
                    {/* Show user prompt */}
                    {prompt && (
                        <div className="cashybot-prompt">
                            <h2>Tu mensaje: </h2>
                            {prompt}
                        </div>
                    )}
                    {/* Loader */}
                    {newMessageMutation.isPending && (
                        <section
                            className="loading loader-cashybot"
                            style={{
                                display: "flex",
                                width: "100%",
                                height: "auto",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <SyncLoader
                                size={15}
                                color="#24BF67"
                            />
                            Cashy está pensando...
                        </section>
                    )}
                    {/* Response by cashy */}
                    {botResponse &&
                        <div className="cashybot-response">
                            <div className="cashybot-response-top">
                                <img src={BotImg} alt="Cashy bot" />
                                <h2>Cashy dice:</h2>
                            </div>
                            <ReactMarkdown
                                remarkPlugins={[remarkBreaks, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                            >
                                {botResponse ? botResponse : "No hay respuesta de Cashy"}
                            </ReactMarkdown>
                        </div>
                    }
                </section>
                <form method="POST" className="cashybot-input" onSubmit={handleSubmit(handleNewMessage)}>
                    <textarea
                        className="font-lexend"
                        rows={4}
                        placeholder="Pregunta lo que quieras"
                        {...register("prompt")}
                        required
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