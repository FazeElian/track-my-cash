// Styles for this view
import "../../assets/css/components/company/auth/Forms.css";

// Images
import Logo from "../../assets/img/Logo.webp";

const ValidateCodeView = () => {
    return (
        <main className="users-module-view">
            <form className="form-users" method="POST">
                <div className="top-form-users">
                    <img src={Logo} alt="" />
                    <h2>Introduce el código enviado a tu correo electrónico para restablecer tu contraseña</h2>
                </div>

                <div className="form-users-groups">
                    <div className="form-users-group">
                        <label htmlFor="code">Código</label>
                        <input
                            className="font-lexend"
                            name="code"
                            type="text"
                            id="code"
                            placeholder="Introduce el código enviado a tu correo electrónico"
                        />
                    </div>
                </div>

                <button className="btn-submit-form-users font-lexend" type="submit">
                    Reestablecer contraseña
                </button>
            </form>
        </main>
    )
}

export default ValidateCodeView