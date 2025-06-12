import { motion } from 'framer-motion';

// Styles for this component
import "../../../assets/css/components/admin/GoalsGallery.css";

// React icons
import { BiEdit } from 'react-icons/bi';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { TbPointFilled } from "react-icons/tb";
import { GoGoal } from "react-icons/go";
import { truncateText } from '../../../lib/utils/truncateText';
import { WiTime4 } from "react-icons/wi";

const GoalsGallery = () => {
    return (
        <section className="goals-gallery">
            <motion.div
                className="item-goals-gallery"
                whileHover={{ scale: 1.05 }}
                transition={{
                    duration: .25,
                }}
            >
                <div className="top-item-goals-gallery">
                    <div
                        className={`icon-top-item-goals-gallery`}
                    >
                       <GoGoal />
                    </div>
                    <div className="info-top-item-goals-gallery">
                        <h1>Vacaciones Europa</h1>
                        {/* <div className="priority-top-item-goals-gallery high-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Alta
                        </div> */}
                        {/* <div className="priority-top-item-goals-gallery mid-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Media
                        </div> */}
                        <div className="priority-top-item-goals-gallery low-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Baja
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn-options-top-item-goals-gallery btn-edit-top-item-goals-gallery"
                    >
                        <BiEdit />
                    </button>
                    <button
                        type="button"
                        className="btn-options-top-item-goals-gallery btn-delete-top-item-goals-gallery"
                    >
                        <MdOutlineDeleteOutline />
                    </button>
                </div>
                <ul className="center-item-goals-gallery">
                    <p className="goal-description">
                        {truncateText("Ahorro para un viaje de 2 semanas por Europa en verano, visitando ciudades como París, Roma y Ámsterdam. Incluye vuelos, hospedaje, transporte, alimentación y actividades turísticas.", 90)}
                    </p>
                    <li className="item-center-item-goals-gallery">
                        <h2>Progreso</h2>
                        <h3>50%</h3>
                    </li>
                    <div className="goal-progress-bar">
                        <div className="goal-progress" style={{ width: "50%" }} />
                    </div>
                    <li className="item-center-item-goals-gallery">
                        <h2>$2100</h2>
                        <h3>$4200</h3>
                    </li>
                </ul>
                <div className="btm-item-goals-gallery">
                    <div className="item-btm-item-goals-gallery">
                        <h2>
                            <b>Categoría:</b>
                            {truncateText("Universidad", 15)}
                        </h2>
                    </div>
                    <div className="item-btm-item-goals-gallery item-time-btm-item-goals-gallery">
                        <WiTime4 />
                        <h2>
                            3 meses
                        </h2>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="item-goals-gallery"
                whileHover={{ scale: 1.05 }}
                transition={{
                    duration: .25,
                }}
            >
                <div className="top-item-goals-gallery">
                    <div
                        className={`icon-top-item-goals-gallery`}
                    >
                       <GoGoal />
                    </div>
                    <div className="info-top-item-goals-gallery">
                        <h1>Vacaciones Europa</h1>
                        {/* <div className="priority-top-item-goals-gallery high-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Alta
                        </div> */}
                        {/* <div className="priority-top-item-goals-gallery mid-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Media
                        </div> */}
                        <div className="priority-top-item-goals-gallery low-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Baja
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn-options-top-item-goals-gallery btn-edit-top-item-goals-gallery"
                    >
                        <BiEdit />
                    </button>
                    <button
                        type="button"
                        className="btn-options-top-item-goals-gallery btn-delete-top-item-goals-gallery"
                    >
                        <MdOutlineDeleteOutline />
                    </button>
                </div>
                <ul className="center-item-goals-gallery">
                    <p className="goal-description">
                        {truncateText("Ahorro para un viaje de 2 semanas por Europa en verano, visitando ciudades como París, Roma y Ámsterdam. Incluye vuelos, hospedaje, transporte, alimentación y actividades turísticas.", 90)}
                    </p>
                    <li className="item-center-item-goals-gallery">
                        <h2>Progreso</h2>
                        <h3>50%</h3>
                    </li>
                    <div className="goal-progress-bar">
                        <div className="goal-progress" style={{ width: "50%" }} />
                    </div>
                    <li className="item-center-item-goals-gallery">
                        <h2>$2100</h2>
                        <h3>$4200</h3>
                    </li>
                </ul>
                <div className="btm-item-goals-gallery">
                    <div className="item-btm-item-goals-gallery">
                        <h2>
                            <b>Categoría:</b>
                            {truncateText("Universidad", 15)}
                        </h2>
                    </div>
                    <div className="item-btm-item-goals-gallery item-time-btm-item-goals-gallery">
                        <WiTime4 />
                        <h2>
                            3 meses
                        </h2>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="item-goals-gallery"
                whileHover={{ scale: 1.05 }}
                transition={{
                    duration: .25,
                }}
            >
                <div className="top-item-goals-gallery">
                    <div
                        className={`icon-top-item-goals-gallery`}
                    >
                       <GoGoal />
                    </div>
                    <div className="info-top-item-goals-gallery">
                        <h1>Vacaciones Europa</h1>
                        {/* <div className="priority-top-item-goals-gallery high-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Alta
                        </div> */}
                        {/* <div className="priority-top-item-goals-gallery mid-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Media
                        </div> */}
                        <div className="priority-top-item-goals-gallery low-priority-top-item-goals-gallery">
                            <TbPointFilled />
                            Baja
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn-options-top-item-goals-gallery btn-edit-top-item-goals-gallery"
                    >
                        <BiEdit />
                    </button>
                    <button
                        type="button"
                        className="btn-options-top-item-goals-gallery btn-delete-top-item-goals-gallery"
                    >
                        <MdOutlineDeleteOutline />
                    </button>
                </div>
                <ul className="center-item-goals-gallery">
                    <p className="goal-description">
                        {truncateText("Ahorro para un viaje de 2 semanas por Europa en verano, visitando ciudades como París, Roma y Ámsterdam. Incluye vuelos, hospedaje, transporte, alimentación y actividades turísticas.", 90)}
                    </p>
                    <li className="item-center-item-goals-gallery">
                        <h2>Progreso</h2>
                        <h3>50%</h3>
                    </li>
                    <div className="goal-progress-bar">
                        <div className="goal-progress" style={{ width: "50%" }} />
                    </div>
                    <li className="item-center-item-goals-gallery">
                        <h2>$2100</h2>
                        <h3>$4200</h3>
                    </li>
                </ul>
                <div className="btm-item-goals-gallery">
                    <div className="item-btm-item-goals-gallery">
                        <h2>
                            <b>Categoría:</b>
                            {truncateText("Universidad", 15)}
                        </h2>
                    </div>
                    <div className="item-btm-item-goals-gallery item-time-btm-item-goals-gallery">
                        <WiTime4 />
                        <h2>
                            3 meses
                        </h2>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export { GoalsGallery };