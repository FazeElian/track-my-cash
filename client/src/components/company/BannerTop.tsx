import { Link } from "react-router-dom";

// Styles for this component
import "../../assets/css/components/company/BannerTop.css";

// React icons
import { FaArrowRight } from "react-icons/fa6";

const BannerTop = () => {
  return (
        <section className="banner-top">
            <h1>Toma el control de tus <b className="txt-animated-gradient-blue-green">Finanzas</b></h1>
            <p>Rastrea gastos, gestiona presupuestos y alcanza tus metas
                financieras con nuestro intuitivo administrador de finanzas personales.
            </p>
            <Link to="/auth/register" className="btn-banner-top">
                Comenzar gratis
                <FaArrowRight />
            </Link>
        </section>
    )
}

export { BannerTop };