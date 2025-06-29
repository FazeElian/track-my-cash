// Components for this view
import { BannerTop } from "../components/company/BannerTop"
import { Features } from "../components/company/Features"
import { DetailFeature } from "../components/company/DetailFeature"
import { CallToAction } from "../components/company/CallToAction"
import { Footer } from "../components/company/Footer"

// Title hook
import { useDocumentTitle } from "../lib/hooks/useDocumentTitle"

const HomeView = () => {
    // Title
    useDocumentTitle("Track My Cash | Gestión fácil y segura de tus finanzas personales")

    return (
        <main className="">
            <BannerTop />
            <Features />
            <DetailFeature />
            <CallToAction />
            <Footer />
        </main>
    )
}

export default HomeView