// Styles for this component
import "../../assets/css/components/company/DetailFeature.css";

// Detail Features list
import { DetailsFeatures as detailsFeaturesList } from "../../lib/lists/DetailsFeatures";

const DetailFeature = () => {
    return (
        <>
            {detailsFeaturesList.map((detailFeature) => (
                <div className={`${detailFeature.stylesClass}`} key={detailFeature.id}>
                    <div className="img-detail-feature">
                        <img src={detailFeature.image} alt="" />
                    </div>
                    <div className="info-detail-feature">
                        <h1 className="txt-animated-gradient-blue-green">{detailFeature.title}</h1>
                        <p>{detailFeature.description}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export { DetailFeature }