// Styles for this view
import "../../../assets/css/components/admin/Profile.css";
import "../../../assets/css/components/admin/Forms.css";

// Components for this biew
import { InputField } from "../../../components/admin/atoms/InputField";
import { TopViewModule } from "../../../components/admin/TopTitle";

// User context
import { useUser } from "../../../services/auth/context";

// React icons
import { FaRegUser } from "react-icons/fa6";

const EditAccountInfoView = () => {
    // Get user
    const { user } = useUser();
    
    return (
        <main className="content-page--admin">
            <TopViewModule
                title="Editar Información"
                icon={FaRegUser}
                txtBtnAdd={""}
                txtBtnAddShort={""}
                btnAddOnClick={() => console.log()}
                quickState1Value={""}
                quickState2Value={""}
                quickState3Value={""}
                onSearchSubmit={() => console.log()}
            />
            <section className="profile">
                <form
                    action=""
                    className="item-profile"
                    method="POST"
                >
                    <h1>Información Personal</h1>
                
                    <div className="form-double-group group-profile">
                        {/* Name */}
                        <InputField
                            label="Nombres"
                            labelFor="name"
                            id="name"
                            type="name"
                            value={user?.name ?? ""}
                            placeholder="Ingresa tus nombres"
                        />

                        {/* Name */}
                        <InputField
                            label="Apellidos"
                            labelFor="lastName"
                            id="lastName"
                            type="lastName"
                            value={user?.lastName}
                            placeholder="Ingresa tus apellidos"
                        />
                    </div>

                    {/* Email */}
                    {/* Email */}
                    <InputField
                        label="Correo Electrónico"
                        disabled
                        labelFor="email"
                        id="email"
                        type="email"
                        placeholder={user?.email}
                    />

                    {/* Username */}
                    <InputField
                        label="Nombre de usuario"
                        labelFor="userName"
                        id="userName"
                        type="text"
                        value={user?.userName}
                    />

                    {/* Phone number */}
                    <InputField
                        label="Número de teléfono"
                        labelFor="phoneNumber"
                        id="phoneNumber"
                        type="text"
                        value={""}
                        placeholder="Ej: +1 3333333333"
                    />

                    <div className="btm-item-profile">
                        <button
                            type="submit"
                            className="font-lexend btn-edit-profile"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default EditAccountInfoView;