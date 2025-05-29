// Styles for this view
import "../../assets/css/components/company/auth/Forms.css";

// Images
import Logo from "../../assets/img/Logo.webp";

const LoginView = () => {
    return (
        <main className="users-module-view">
            <form className="form-users" method="POST">
                <div className="top-form-users">
                    <img src={Logo} alt="" />
                    <h2>Solicita un código a tu correo electrónico para restablecer tu contraseña.</h2>
                </div>

                <div className="form-users-groups">
                    <div className="form-users-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            className="font-lexend"
                            name="email"
                            type="email"
                            id="email"
                            placeholder="Ingresa el correo electrónico asociado a tu cuenta"
                        />
                    </div>
                </div>

                <button className="btn-submit-form-users font-lexend" type="submit">
                    Enviar código de recuperación
                </button>
            </form>
        </main>
    )
}

export default LoginView