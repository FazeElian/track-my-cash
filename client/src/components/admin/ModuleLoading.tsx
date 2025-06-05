// Styles for this component
import { BeatLoader } from "react-spinners";
import "../../assets/css/components/admin/ModuleLoading.css";

const ModuleLoading = () => {
    return (
        <div className="module-loading">
            <BeatLoader
                size={20}
                color="#2EA662"
            />
        </div>
    )
}

export { ModuleLoading };