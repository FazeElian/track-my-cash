// Styles for this component
import "../../assets/css/components/admin/TopViewModule.css";

// Type
import type { TopViewModuleType } from "../../lib/types/top-view-module";

// React icons
import { IoMdAdd } from "react-icons/io";

const TopViewModule : React.FC<TopViewModuleType> = (props) => {
    return (
        <>
            <div className="top-view-module">
                <div className="top-title-view-module">
                    <div className="title-top-title-view-module">
                        <div className="icon-title-top-title-view-module">
                            <props.icon />
                        </div>
                        <div className="txt-title-top-title-view-module">
                            <h1>{props.title}</h1>
                        </div>
                    </div>
                    {props.txtBtnAdd === "" ? "" : (
                        <div className="actions-top-title-view-module">
                            <button
                                className="btn-actions-top-title-view-module font-lexend"
                                onClick={props.btnAddOnClick}
                            >
                                <IoMdAdd />
                                <h2>{props.txtBtnAddShort}</h2>
                                {props.txtBtnAdd}
                            </button>
                        </div>
                    )}
                </div>
                {props.quickState1Value === "" ? "" : (
                    <div className="quick-stats-top-title-view-module">
                        <div className="item-quick-stats-top-title-view-module item-blue-quick-stats-top-title-view-module">
                            {props.quickState1Value}
                        </div>
                        <div className="item-quick-stats-top-title-view-module item-green-quick-stats-top-title-view-module">
                            {props.quickState2Value}
                        </div>
                        <div className="item-quick-stats-top-title-view-module item-orange-quick-stats-top-title-view-module">
                            {props.quickState3Value}
                        </div>
                    </div>
                )}
                {props.txtBtnAdd === "" ? "" : (
                    <button
                        className="btn-add-mobile btn-actions-top-title-view-module font-lexend"
                        onClick={props.btnAddOnClick}
                    >
                        <IoMdAdd />
                        {props.txtBtnAdd}
                    </button>
                )}
            </div>
        </>
    )
}

export { TopViewModule };