import { useState } from "react";

// Styles for component
import "../../../assets/css/components/admin/Forms.css";

// Lists
import { Icons } from "../../../lib/lists/Icons";
import { Colors } from "../../../lib/lists/Colors";

// Type
import type { ModalFormPropsType } from "../../../lib/types/modal-form.type";

const NewCategoryForm : React.FC<ModalFormPropsType> = ({ modalRef }) => {
    const [color, setColor] = useState(Colors[0]);

    return (
        <section className="modal-form-module">
            <form
                className="form-module"
                ref={modalRef}
                action=""
                method="POST"
            >
                <h1>Añadir categoría</h1>
                <div className="form-group">
                    <label htmlFor="name">Nombre de la categoría</label>
                    <input
                        className="font-lexend"
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Ingresa el nombre de la categoría"
                    />
                </div>
                <div className="form-double-group">
                    <div className="item-form-double-group form-group">
                        <label htmlFor="type">Tipo</label>
                        <select
                            className="font-lexend"
                            id="type"
                            name="type"
                            defaultValue="Expense"
                        >
                            <option value="Expense" key="Expense">
                                Gasto
                            </option>
                            <option value="Income" key="Income">
                                Ingreso
                            </option>
                        </select>
                    </div>
                    <div className="item-form-double-group form-group">
                        <label htmlFor="name">Icono</label>
                        <select
                            className="font-lexend"
                            id="icon"
                            name="icon"
                            defaultValue="homeIcon"
                        >
                            {Icons.map((icon) => (
                                <option value={icon.value} key={icon.id}>
                                    {icon.content}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color</label>
                    <div className="form-group-colors">
                        {Colors.map((c) => (
                            <span
                                key={c.id}
                                className={`color-circle ${color.id === c.id ? "selected" : ""}`}
                                style={{ backgroundColor: c.colorCode }}
                                onClick={() => setColor(c)}
                            />
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="monthlyBudget">Presupuesto mensual (opcional)</label>
                    <input
                        className="font-lexend"
                        name="monthlyBudget"
                        id="monthlyBudget"
                        type="number"
                        placeholder="0"
                    />
                </div>
                <button
                    type="submit"
                    className="btn-submit-form-module font-lexend"
                >
                    Añadir Categoría
                </button>
            </form>
        </section>
    )
}

export default NewCategoryForm