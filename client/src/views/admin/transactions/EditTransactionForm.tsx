import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

// Styles for component
import "../../../assets/css/components/admin/Forms.css";

// Types
import type { ModalEditFormPropsType } from '../../../lib/types/modal-form.type'
import type { TransactionForm } from '../../../lib/types/services/transaction.type';

// Components for this form
import { InputField } from '../../../components/admin/atoms/InputField'
import { TransactionTypeField } from '../../../components/admin/atoms/TransactionTypeField';
import { CategoriesSelectField } from '../../../components/admin/atoms/CategoriesSelectField';

// Mutation
import { useUpdateTransactionMutation } from "../../../services/transactions/mutations";
import { TransactionStateSelectField } from '../../../components/admin/atoms/TransactionStateSelectField';
import { TransactionNotesField } from '../../../components/admin/atoms/TransactionNotesField';

// Queries
import { useFetchAllCategories } from '../../../services/categories/queries';
import { useGetTransactionById } from '../../../services/transactions/queries';

const EditTransactionForm : React.FC<ModalEditFormPropsType> = ({ id, modalRef, onClose }) => {
    // Get all categories
    const { data: categories } = useFetchAllCategories()
    
    // Get transaction
    const { data: transaction, isLoading } = useGetTransactionById(id)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TransactionForm> ({
        defaultValues: {}
    });

    // Update the fields when the transaction is obtained
    useEffect(() => {
        if (transaction && !(transaction instanceof Error)) {
            const formattedTransaction = {
                ...transaction,
                date: transaction.date?.split("T")[0],
            };
            reset(formattedTransaction);
        }
    }, [transaction, reset]);

    // Mutation
    const updateTransactionMutation = useUpdateTransactionMutation(id)
    const handleUpdateTransaction = (formData: TransactionForm) => {
        updateTransactionMutation.mutate(formData, {
            onSuccess: () => {
                onClose()
            }
        });
    }

    if (isLoading) {
        return <section className="modal-form-module"><div style={{ color: "white" }}>Cargando detalles del movimiento...</div></section>;
    }

    return (
        <section className="modal-form-module">
            <form
                className="form-module form-transactions"
                ref={modalRef}
                action=""
                method="POST"
                onSubmit={handleSubmit(handleUpdateTransaction)}
            >
                <h1>Editar movimiento</h1>

                {/* Name */}
                <InputField
                    label="Título"
                    labelFor="name"
                    id="name"
                    type="text"
                    placeholder="Ingresa el título del movimiento"
                    error={errors.title}
                    {...register("title", {
                        required: "El título del movimiento es un dato obligatorio.",
                        pattern: {
                            value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s-]+$/,
                            message: "Solo se permiten letras, números y guiones."
                        },
                        maxLength: {
                            value: 50,
                            message: "El nombre no puede superar los 50 caracteres"
                        }
                    })}
                />
                
                {/* Divided group */}
                <div className="form-double-group">
                    {/* Amount */}
                    <InputField
                        label="Cantidad"
                        labelFor="amount"
                        id="amount"
                        type="number"
                        placeholder="Ingresa el título del movimiento"
                        error={errors.amount}
                        {...register("amount", {
                            required: "El título del movimiento es un dato obligatorio.",
                            min: {
                                value: 0.01,
                                message: "La cantidad debe ser mayor a cero."
                            },
                            max: {
                                value: 999999999999,
                                message: "La cantidad no puede superar las 12 cifras."
                            }
                        })}
                    />

                    {/* Type */}
                    <TransactionTypeField
                        label="Tipo"
                        labelFor="type"
                        defaultValue=""
                        error={errors.type}
                        {...register("type", {
                            required: "El tipo de movimiento es obligatorio.",
                            validate: value => value !== "" || "El tipo de movimiento es obligatorio",
                        })}
                    />
                </div>

                {/* Divided group */}
                <div className="form-double-group">
                    {/* Category */}
                    <CategoriesSelectField
                        label="Categoría"
                        labelFor="categoryId"
                        defaultValue={0}
                        error={errors.categoryId}
                        categoriesList={Array.isArray(categories) ? categories : []}
                        {...register("categoryId", {
                            required: "La categoría es obligatoria.",
                            validate: value => value !== 0 || "La categoría es obligatoria",
                        })}
                    />

                    {/* Date */}
                    <InputField
                        label="Fecha"
                        labelFor="date"
                        id="date"
                        type="date"
                        placeholder="Ingresa el título del movimiento"
                        error={errors.date}
                        {...register("date", {
                            required: "La fecha del movimiento es un dato obligatorio.",
                        })}
                    />
                </div>

                {/* State */}
                <TransactionStateSelectField
                    label="Estado"
                    labelFor="state"
                    defaultValue=""
                    error={errors.state}
                    {...register("state", {
                        required: "El estado es un dato obligatorio.",
                        validate: value => value !== "" || "El estado es un dato obligatorio.",
                    })}
                />

                {/* Name */}
                <TransactionNotesField
                    label="Notas (opcional)"
                    labelFor="notes"
                    id="notes"
                    placeholder="Añade notas adicionales"
                    {...register("notes")}
                />

                <button
                    type="submit"
                    className="btn-submit-form-module font-lexend"
                >
                    Guardar cambios
                </button>
            </form>
        </section>
    )
}

export default EditTransactionForm