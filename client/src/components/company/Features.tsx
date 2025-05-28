// Styles for this component
import "../../assets/css/components/company/Features.css";

// Features list
import { Features as featuresList } from "../../lib/lists/Features";

// Feature item type
import type { FeatureType } from "../../lib/types/feature.type.ts";

// Framer Motion
import { motion } from 'framer-motion';

const Features = () => {
    return (
        <section className="features">
            <div className="top-features">
                <h1 className="txt-animated-gradient-blue-green">Todo lo que necesitas para gestionar tu dinero</h1>
                <p>
                    Funciones diseñadas para simplificar y potenciar tu gestión financiera personal.
                </p>
            </div>
            <ul className="list-features">
                {featuresList.map((feature: FeatureType) => (
                    <motion.li
                        className={`item-features ${feature.itemColorClass}`}
                        key={feature.id}
                        whileHover={{ scale: 1.1 }}
                        transition={{
                            duration: .3,
                        }}
                    >
                        <div className={`icon-item-features ${feature.colorClass}`}>
                            <feature.icon />
                        </div>
                        <h2 className="">{feature.name}</h2>
                        <p>{feature.description}</p>
                    </motion.li>
                ))}
            </ul>
        </section>
    )
}

export { Features };