import { Link } from "react-router-dom";

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
                    <h2>Ingresa tus credenciales para acceder a tu panel</h2>
                </div>

                <div className="form-users-groups">
                    <div className="form-users-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            className="font-lexend"
                            name="email"
                            type="email"
                            id="email"
                            placeholder="Ingresa tu correo electrónico"
                        />
                    </div>
                    <div className="form-users-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            className="font-lexend"
                            name="password"
                            type="password"
                            id="password"
                            placeholder="Ingresa tu contraseña"
                        />
                        <Link to="/auth/forgot-password" className="link-password-users-form">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                </div>

                <button className="btn-submit-form-users font-lexend" type="submit">
                    Iniciar Sesión
                </button>

                <Link to="/auth/register" className="link-users-form-btm">
                    ¿No tienes una cuenta? Crear mi cuenta
                </Link>
            </form>
        </main>
    )
}

export default LoginView