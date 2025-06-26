import { motion } from 'framer-motion';

// Styles for this component
import "../../../assets/css/components/admin/Notifications.css";

// React icons
import { GoGoal } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";

const NotificationsTable = () => {
    return (
        <section className="notifications">
            <motion.a
                href="/:id"
                className="item-notifications"
                whileHover={{ scale: 1.025 }}
                transition={{
                    duration: .25,
                }}
            >
                <div className="content-item-notificactions">
                    <div className="icon-item-notifications">
                        <GoGoal />
                    </div>
                    <div className="txt-item-notifications">
                        <h1>¡Meta completada! 🎉</h1>
                        <p>
                            Has alcanzado tu meta: "Comprar mi primera casa en
                            San Francisco". ¡Excelente trabajo!
                        </p>
                    </div>
                </div>
                <div className="options-item-notifications">
                    <button className="btn-item-notifications font-lexend">
                        <FaCheckCircle />
                        Marcar como leído
                    </button>
                </div>
            </motion.a>
            <motion.a
                href="/:id"
                className="item-notifications"
                whileHover={{ scale: 1.025 }}
                transition={{
                    duration: .25,
                }}
            >
                <div className="content-item-notificactions">
                    <div className="icon-item-notifications">
                        <GoGoal />
                    </div>
                    <div className="txt-item-notifications">
                        <h1>¡Meta completada! 🎉</h1>
                        <p>
                            Has alcanzado tu meta: "Comprar mi primera casa en
                            San Francisco". ¡Excelente trabajo!
                        </p>
                    </div>
                </div>
                <div className="options-item-notifications">
                    <button className="btn-item-notifications font-lexend">
                        <FaCheckCircle />
                        Marcar como leído
                    </button>
                </div>
            </motion.a>
            <motion.a
                href="/:id"
                className="item-notifications"
                whileHover={{ scale: 1.025 }}
                transition={{
                    duration: .25,
                }}
            >
                <div className="content-item-notificactions">
                    <div className="icon-item-notifications">
                        <GoGoal />
                    </div>
                    <div className="txt-item-notifications">
                        <h1>¡Meta completada! 🎉</h1>
                        <p>
                            Has alcanzado tu meta: "Comprar mi primera casa en
                            San Francisco". ¡Excelente trabajo!
                        </p>
                    </div>
                </div>
                <div className="options-item-notifications">
                    <button className="btn-item-notifications font-lexend">
                        <FaCheckCircle />
                        Marcar como leído
                    </button>
                </div>
            </motion.a>
            <motion.a
                href="/:id"
                className="item-notifications"
                whileHover={{ scale: 1.025 }}
                transition={{
                    duration: .25,
                }}
            >
                <div className="content-item-notificactions">
                    <div className="icon-item-notifications">
                        <GoGoal />
                    </div>
                    <div className="txt-item-notifications">
                        <h1>¡Meta completada! 🎉</h1>
                        <p>
                            Has alcanzado tu meta: "Comprar mi primera casa en
                            San Francisco". ¡Excelente trabajo!
                        </p>
                    </div>
                </div>
                <div className="options-item-notifications">
                    <button className="btn-item-notifications font-lexend">
                        <FaCheckCircle />
                        Marcar como leído
                    </button>
                </div>
            </motion.a>
            <motion.a
                href="/:id"
                className="item-notifications"
                whileHover={{ scale: 1.025 }}
                transition={{
                    duration: .25,
                }}
            >
                <div className="content-item-notificactions">
                    <div className="icon-item-notifications">
                        <GoGoal />
                    </div>
                    <div className="txt-item-notifications">
                        <h1>¡Meta completada! 🎉</h1>
                        <p>
                            Has alcanzado tu meta: "Comprar mi primera casa en
                            San Francisco". ¡Excelente trabajo!
                        </p>
                    </div>
                </div>
                <div className="options-item-notifications">
                    <button className="btn-item-notifications font-lexend">
                        <FaCheckCircle />
                        Marcar como leído
                    </button>
                </div>
            </motion.a>
        </section>
    )
}

export { NotificationsTable };