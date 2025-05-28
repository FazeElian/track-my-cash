import { Link } from "react-router-dom"

// Styles for this component
import "../../assets/css/components/company/CallToAction.css";

const CallToAction = () => {
    return (
        <div className="call-to-action">
            <h2>¿Listo para tomar control de tus finanzas?</h2>
            <p>Más que una app: tu aliado para llevar un control claro y privado de tus finanzas personales.</p>
            <Link to="/auth/register" className="btn-call-to-action">
                Empezar Ahora
            </Link>
        </div>
    )
}

export { CallToAction };