import { Link } from "react-router-dom";

// Styles for this view
import "../../../assets/css/components/admin/Profile.css";
import "../../../assets/css/components/admin/Forms.css";

// Components for this view
import { TopViewModule } from "../../../components/admin/TopTitle"
import { InputField } from "../../../components/admin/atoms/InputField";
import { UpdatePasswordForm } from "../../../components/company/UpdatePasswordForm";

// Lucide react icons
import { EditIcon, UserIcon } from "../../../lib/lists/Icons";

// Get user from auth context
import { useUser } from "../../../services/auth/context";

// Title hook
import { useDocumentTitle } from "../../../lib/hooks/useDocumentTitle";

const AccountView = () => {
    // Title
    useDocumentTitle("Cuenta - Track My Cash")

    // Get user
    const { user } = useUser();

    // If it´s loading
    if (!user) return <p>Cargando...</p>;

    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Mi Cuenta"
                icon={UserIcon}
                txtBtnAdd={""}
                txtBtnAddShort={""}
                btnAddOnClick={() => console.log()}
                quickState1Value={""}
                quickState2Value={""}
                quickState3Value={""}
                onSearchSubmit={() => console.log()}
            />
            
            <section className="profile">
                <div className="item-profile">
                    <h1>Información Personal</h1>
                
                    <div className="form-double-group group-profile">
                        {/* Name */}
                        <InputField
                            label="Nombres"
                            disabled
                            labelFor="name"
                            id="name"
                            type="name"
                            placeholder={user.name ?? "Sin nombres"}
                        />

                        {/* Name */}
                        <InputField
                            label="Apellidos"
                            disabled
                            labelFor="lastName"
                            id="lastName"
                            type="lastName"
                            placeholder={user.lastName ?? "Sin apellidos"}
                        />
                    </div>

                    {/* Email */}
                    <InputField
                        label="Correo Electrónico"
                        disabled
                        labelFor="email"
                        id="email"
                        type="email"
                        placeholder={user.email}
                    />

                    {/* Username */}
                    <InputField
                        label="Nombre de usuario"
                        disabled
                        labelFor="userName"
                        id="userName"
                        type="text"
                        placeholder={user.userName}
                    />

                    {/* Phone number */}
                    <InputField
                        label="Número de teléfono"
                        disabled
                        labelFor="phoneNumber"
                        id="phoneNumber"
                        type="text"
                        placeholder={"+57 345 3453454"}
                    />

                    <div className="btm-item-profile">
                        <Link to="edit" className="btn-edit-profile">
                            <EditIcon />
                            Editar información
                        </Link>
                    </div>
                </div>
                <UpdatePasswordForm />
            </section>
        </main>
    )
}

export default AccountView