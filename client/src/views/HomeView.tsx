// Components for this view
import { BannerTop } from "../components/company/BannerTop"
import { Features } from "../components/company/Features"
import { DetailFeature } from "../components/company/DetailFeature"

const HomeView = () => {
    return (
        <main className="">
            <BannerTop />
            <Features />
            <DetailFeature />
        </main>
    )
}

export default HomeView