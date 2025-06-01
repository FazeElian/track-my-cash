import { Link } from "react-router-dom";

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
                    <div className="actions-top-title-view-module">
                        <Link to="new" className="btn-actions-top-title-view-module font-lexend">
                            <IoMdAdd />
                            <h2>{props.txtBtnAddShort}</h2>
                            {props.txtBtnAdd}
                        </Link>
                    </div>
                </div>
                <div className="quick-stats-top-title-view-module">
                    <div className="item-quick-stats-top-title-view-module item-blue-quick-stats-top-title-view-module">
                        10 categorías creadas
                    </div>
                    <div className="item-quick-stats-top-title-view-module item-green-quick-stats-top-title-view-module">
                        3 de ingresos
                    </div>
                    <div className="item-quick-stats-top-title-view-module item-orange-quick-stats-top-title-view-module">
                        10 de gastos
                    </div>
                </div>
                <Link to="new" className="btn-add-mobile btn-actions-top-title-view-module font-lexend">
                    <IoMdAdd />
                    {props.txtBtnAdd}
                </Link>
            </div>
        </>
    )
}

export { TopViewModule };