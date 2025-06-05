export type ModalFormPropsType = {
    modalRef: React.RefObject<HTMLFormElement | null>;
    onClose: () => void;
}

export type ModalEditFormPropsType = {
    modalRef: React.RefObject<HTMLFormElement | null>;
    onClose: () => void;
    id: number;
}