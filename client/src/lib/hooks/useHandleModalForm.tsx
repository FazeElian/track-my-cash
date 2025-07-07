import { useEffect } from "react";

type HandleModalFormType = {
    modalForm: "new" | `edit ${number}` | null;
    setModalForm: React.Dispatch<React.SetStateAction<"new" | `edit ${number}` | null>>;
    formRef: React.RefObject<HTMLFormElement>;
}

export const useHandleModalForm = ({ modalForm, setModalForm, formRef } : HandleModalFormType) => {
    useEffect (() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setModalForm(null);
            }
        };

        if (modalForm) {
            document.addEventListener("mousedown", handleClickOutside);

            // Remove scroll on body
            document.body.classList.add("no-scroll");
            return () => document.body.classList.remove("no-scroll");
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalForm, formRef, setModalForm]);
}