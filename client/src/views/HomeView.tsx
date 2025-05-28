// Components for this view
import { BannerTop } from "../components/company/BannerTop"
import { Features } from "../components/company/Features"
import { DetailFeature } from "../components/company/DetailFeature"
import { CallToAction } from "../components/company/CallToAction"
import { Footer } from "../components/company/Footer"

const HomeView = () => {
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