interface ErrorMessageValidationProps {
    children: React.ReactNode
}

const ErrorMessageValidation = ({ children } : ErrorMessageValidationProps) => {
    return (
        <p className="message-error-validation">{children}</p>
    )
}

export { ErrorMessageValidation };