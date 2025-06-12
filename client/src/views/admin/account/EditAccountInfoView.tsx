import { useForm } from "react-hook-form";

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

// Type
import type { UpdateBasicInfo } from "../../../lib/types/services/user.type";

// Mutation
import { useUpdateBasicInfoMutation } from "../../../services/auth/mutations";

const EditAccountInfoView = () => {
    // Get user
    const { user } = useUser();

    // Initalize form
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateBasicInfo> ({
        defaultValues: {
            name: user?.name,
            lastName: user?.lastName,
            userName: user?.userName,
        }
    });

    const updateBasicInfoMutation = useUpdateBasicInfoMutation()
    const handleUpdateBasicInfo = (formData: UpdateBasicInfo) => {
        updateBasicInfoMutation.mutate(formData, {
            onSuccess: () => {
                reset()
            }
        })
    }

    if(!user) return ""

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
                    onSubmit={handleSubmit(handleUpdateBasicInfo)}
                >
                    <h1>Información Personal</h1>
                
                    <div className="form-double-group group-profile">
                        {/* Name */}
                        <InputField
                            label="Nombres"
                            labelFor="name"
                            id="name"
                            type="name"
                            placeholder="Ingresa tus nombres"
                            {...register("name")}
                        />

                        {/* Lastname */}
                        <InputField
                            label="Apellidos"
                            labelFor="lastName"
                            id="lastName"
                            type="lastName"
                            placeholder="Ingresa tus apellidos"
                            {...register("lastName")}
                        />
                    </div>

                    {/* Email */}
                    <InputField
                        label="Correo Electrónico"
                        disabled
                        labelFor="email"
                        id="email"
                        type="email"
                        placeholder={user.email ?? ""}
                        readOnly
                    />

                    {/* Username */}
                    <InputField
                        label="Nombre de usuario"
                        labelFor="userName"
                        id="userName"
                        type="text"
                        error={errors.userName}
                        placeholder="Ingresa un nombre de usuario para tu cuenta"
                        {...register("userName", {
                            required: "Por favor, ingresa un nombre de usuario",
                            minLength: {
                                value: 4,
                                message: "El nombre de usuario debe tener al menos 4 caracteres."
                            }
                        })}
                    />

                    {/* Phone number */}
                    {/* <InputField
                        label="Número de teléfono"
                        labelFor="phoneNumber"
                        id="phoneNumber"
                        type="text"
                        value={"+1 3333333333"}
                        placeholder="Ej: +1 3333333333"
                    /> */}

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