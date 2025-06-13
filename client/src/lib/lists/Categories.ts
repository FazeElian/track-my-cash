// Icons for category
import { FaCarSide, FaPlaneDeparture } from "react-icons/fa";
import { FaBurger, FaGift } from "react-icons/fa6";
import { IoHome, IoGameController, IoBriefcaseOutline } from "react-icons/io5";
import { IoIosPricetag } from "react-icons/io";
import { BsCapsule } from "react-icons/bs";
import { RiBookShelfFill } from "react-icons/ri";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

export const Categories = [
    {
        id: 1,
        icon: "cartIcon",
        content: "🛒 Compras",
        value: "Compras"
    },
    {
        id: 2,
        icon: "carIcon",
        content: "🚗 Auto",
        value: "Auto"
    },
    {
        id: 3,
        icon: "foodIcon",
        content: "🍔 Comida",
        value: "Comida"
    },
    {
        id: 4,
        icon: "homeIcon",
        content: "🏠 Hogar",
        value: "Hogar"
    },
    {
        id: 5,
        icon: "healthIcon",
        content: "💊 Salud",
        value: "Salud"
    },
    {
        id: 6,
        icon: "educationIcon",
        content: "📚 Educación",
        value: "Educacion"
    },
    {
        id: 7,
        icon: "jobIcon",
        content: "💼 Trabajo / Negocios",
        value: "Trabajo"
    },
    {
        id: 8,
        icon: "travelIcon",
        content: "✈️ Viajes",
        value: "Viajes"
    },
    {
        id: 9,
        icon: "entertaimentIcon",
        content: "🎮 Entretenimiento",
        value: "Entretenimiento"
    },
    {
        id: 10,
        icon: "eventsIcon",
        content: "🎉 Eventos",
        value: "Eventos"
    },
    {
        id: 11,
        icon: "giftIcon",
        content: "🎁 Regalo",
        value: "Regalo"
    },
    {
        id: 12,
        icon: "otherIcon",
        content: "🔖 Otro",
        value: "Otro"
    },
];

export const categoriesMap: Record<string, React.ComponentType> = {
    Compras: FaCarSide,
    Comida: FaBurger,
    Hogar: IoHome,
    Salud: BsCapsule,
    Educacion: RiBookShelfFill,
    Trabajo: IoBriefcaseOutline,
    Viajes: FaPlaneDeparture,
    Entretenimiento: IoGameController,
    Eventos: LiaBirthdayCakeSolid,
    Regalo: FaGift,
    Otro: IoIosPricetag
};