import { Link } from "react-router-dom";

// Styles for this view
import "../../assets/css/components/company/auth/Forms.css";

// Images
import Logo from "../../assets/img/Logo.webp";

const RegisterView = () => {
    return (
        <main className="users-module-view">
            <form className="form-users" method="POST">
                <div className="top-form-users">
                    <img src={Logo} alt="" />
                    <h2>Únete y gestiona tus finanzas de manera más inteligente</h2>
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
                        <label htmlFor="userName">Nombre de Usuario</label>
                        <input
                            className="font-lexend"
                            name="userName"
                            type="text"
                            id="userName"
                            placeholder="Crea un nombre de usuario para tu cuenta"
                        />
                    </div>
                    <div className="form-users-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            className="font-lexend"
                            name="password"
                            type="password"
                            id="password"
                            placeholder="Crea una contraseña segura"
                        />
                    </div>
                </div>

                <button className="btn-submit-form-users font-lexend" type="submit">
                    Crear mi cuenta
                </button>

                <Link to="/auth/login" className="link-users-form-btm">
                    Ya tienes una cuenta? Iniciar sesión
                </Link>
            </form>
        </main>
    )
}

export default RegisterView