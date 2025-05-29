// Styles for this view
import "../../assets/css/components/company/auth/Forms.css";

// Images
import Logo from "../../assets/img/Logo.webp";

const ResetPasswordView = () => {
    return (
        <main className="users-module-view">
            <form className="form-users" method="POST">
                <div className="top-form-users">
                    <img src={Logo} alt="" />
                    <h2>Crea una nueva contraseña</h2>
                </div>

                <div className="form-users-groups">
                    <div className="form-users-group">
                        <label htmlFor="email">Nueva contraseña</label>
                        <input
                            className="font-lexend"
                            name="email"
                            type="email"
                            id="email"
                            placeholder="Crea una nueva contraseña (mínimo 8 caracteres)"
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

export default ResetPasswordView