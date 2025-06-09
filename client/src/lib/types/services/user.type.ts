export type User = {
    id: number
    userName: string
    email: string
    password: string
    name: string
    code: string
    lastName: string
    profilePhoto: string
}

export type RegisterUser = Pick<User, "userName" | "email" | "password">
export type LoginUser = Pick<User, "email" | "password">
export type ConfirmUserAccount = Pick<User, "code">
export type ForgotPassword = Pick<User, "email">
export type ValidateCode = Pick<User, "code">
export type ResetPassword = Pick<User, "password">
export type UpdatePassword = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}