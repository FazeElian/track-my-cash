// Icons for category
import { FaCarSide, FaPlaneDeparture } from "react-icons/fa";
import { FaBurger, FaGift } from "react-icons/fa6";
import { IoHome, IoGameController } from "react-icons/io5";
import { IoIosPricetag } from "react-icons/io";
import { BsCapsule } from "react-icons/bs";
import { RiBookShelfFill } from "react-icons/ri";

export const Icons = [
    {
        id: 1,
        value: "cartIcon",
        content: "🛒 Compras"
    },
    {
        id: 2,
        value: "carIcon",
        content: "🚗 Auto"
    },
    {
        id: 3,
        value: "foodIcon",
        content: "🍔 Comida"
    },
    {
        id: 4,
        value: "homeIcon",
        content: "🏠 Hogar"
    },
    {
        id: 5,
        value: "healthIcon",
        content: "💊 Salud"
    },
    {
        id: 6,
        value: "educationIcon",
        content: "📚 Educación"
    },
    {
        id: 7,
        value: "travelIcon",
        content: "✈️ Viajes"
    },
    {
        id: 8,
        value: "entertaimentIcon",
        content: "🎮 Entretenimiento"
    },
    {
        id: 9,
        value: "giftIcon",
        content: "🎁 Regalo"
    },
    {
        id: 10,
        value: "otherIcon",
        content: "🔖 Otro"
    },
];

export const iconsMap: Record<string, React.ComponentType> = {
    carIcon: FaCarSide,
    foodIcon: FaBurger,
    homeIcon: IoHome,
    healthIcon: BsCapsule,
    educationIcon: RiBookShelfFill,
    travelIcon: FaPlaneDeparture,
    entertaimentIcon: IoGameController,
    giftIcon: FaGift,
    otherIcon: IoIosPricetag
};