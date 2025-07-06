import { Link } from "react-router-dom";

// Styles for this component
import "../../assets/css/components/company/BannerTop.css";

// Lucide react icons
import { ArrowToRightIcon } from "../../lib/lists/Icons";

const BannerTop = () => {
  return (
        <section className="banner-top">
            <h1>Toma el control de tus <b className="txt-animated-gradient-blue-green">Finanzas</b></h1>
            <p>Rastrea gastos, gestiona presupuestos y alcanza tus metas
                financieras con nuestro intuitivo administrador de finanzas personales.
            </p>
            <Link to="/auth/register" className="btn-banner-top">
                Comenzar gratis
                <ArrowToRightIcon />
            </Link>
        </section>
    )
}

export { BannerTop };