// Icons for category
import {
    CarIcon,
    CartIcon,
    FoodIcon,
    HomeIcon,
    EducationIcon,
    HealthIcon,
    JobIcon,
    TravelIcon,
    EntertaimentIcon,
    EventsIcon,
    GiftIcon,
    OtherIcon
} from "./Icons";

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
    Compras: CartIcon,
    Auto: CarIcon,
    Comida: FoodIcon,
    Hogar: HomeIcon,
    Salud: HealthIcon,
    Educacion: EducationIcon,
    Trabajo: JobIcon,
    Viajes: TravelIcon,
    Entretenimiento: EntertaimentIcon,
    Eventos: EventsIcon,
    Regalo: GiftIcon,
    Otro: OtherIcon
};