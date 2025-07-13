import { transport } from './../config/nodemailer';
// import fs from "fs";
// import path from 'path';

type EmailType = {
    userName: string,
    email: string,
    code: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        // const templatePath = path.join(__dirname, "templates", "confirm-account.html");
        // let htmlTemplate = fs.readFileSync(templatePath, "utf8");
        const url = `${process.env.VITE_CUSTOM_URL}auth/confirm-account`
        const domain = process.env.EMAIL_DOMAIN;

        // htmlTemplate = htmlTemplate
        //     .replace("{{ userName }}", user.userName)
        //     .replace("{{ code }}", user.code)
        //     .replace("{{ ConfirmAccountURL }}", url);

        const email = await transport.sendMail({
            from: `"Track My Cash" <noreply@${domain}>`,
            to: user.email,
            subject: "Track My Cash - Confirma tu cuenta",
            html: `
                <!DOCTYPE html>
                <html lang="es">
                    <head>
                        <style>
                            @font-face {
                                font-family: 'Lexend';
                                font-style: normal;
                                font-weight: 400;
                                src: url('https://fonts.gstatic.com/s/lexend/v17/wlphgxjLBV1hqnzfr-F8wbZy.woff2') format('woff2');
                            }
                        </style>
                    </head>
                    <body style="margin:0; padding:0; font-family: 'Lexend', Arial, sans-serif; background-color:#ffffff; color:#333;">
                        <table role="presentation" width="100%" style="border-collapse:collapse; sans-serif;">
                            <tr>
                                <td align="center" style="padding: 40px 20px;">
                                    <img src="https://track-my-cash.netlify.app/assets/Logo_Opt-XtX21Eq5.jpg" alt="Logo Track My Cash" width="300" style="display:block; border-bottom:2px solid #24BF67; padding-bottom:20px; background: #fff">
                                    <h1 style="font-size:22px; font-weight:normal; margin:30px 0 10px; color: #000; font-family: 'Lexend', Arial, sans-serif;">Hola ${user.userName},</h1>
                                    <p style="font-size:16px; line-height:1.5; max-width:600px; margin:0 auto 0; color: #000; font-family: 'Lexend', Arial, sans-serif;">
                                        ¡Bienvenido a <strong>Track My Cash! </strong>Confirma tu correo electrónico para activar tu cuenta.
                                        <br>Haz clic en el enlace de abajo e introduce el código para completar tu registro:
                                    </p>

                                    <div style="display:inline-block; margin:0; padding:12px 20px; background-color: #24BF67; color:#fff; font-size:28px; font-weight:bold; border-radius:10px font-family: 'Lexend', Arial, sans-serif;">
                                        <h2 style="display: inline-block; color: white; background-color: #24BF67; padding: 1rem 2rem 1rem; font-size:24px; font-weight:bold; border-radius:10px;">
                                            CÓDIGO: ${user.code}
                                        <h2>
                                    </div>

                                    <a href="${url}" style="display:inline-block; padding:12px 24px; background-color:#3D90D9; color:white; text-decoration:none; font-size:16px; border-radius:8px; font-family: 'Lexend', Arial, sans-serif;">
                                        Confirmar mi cuenta
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </body>
                </html>
            `
            // html: htmlTemplate
        })
        console.log(email)
    }

    static sendForgotPasswordEmail = async (user: EmailType) => {
        // const templatePath = path.join(__dirname, "templates", "forgot-password.html");
        // let htmlTemplate = fs.readFileSync(templatePath, "utf8");
        const url = `${process.env.VITE_CUSTOM_URL}auth/validate-code`
        const domain = process.env.EMAIL_DOMAIN;

        // htmlTemplate = htmlTemplate
        //     .replace("{{ userName }}", user.userName)
        //     .replace("{{ code }}", user.code)
        //     .replace("{{ ValidateCodeURL }}", url);

        const email = await transport.sendMail({
            from: `"Track My Cash" <noreply@${domain}>`,
            to: user.email,
            subject: "Track My Cash - Reestablece tu contraseña",
            html: `
                <!DOCTYPE html>
                <html lang="es">
                    <head>
                        <style>
                            @font-face {
                                font-family: 'Lexend';
                                font-style: normal;
                                font-weight: 400;
                                src: url('https://fonts.gstatic.com/s/lexend/v17/wlphgxjLBV1hqnzfr-F8wbZy.woff2') format('woff2');
                            }
                        </style>
                    </head>
                    <body style="margin:0; padding:0; font-family: 'Lexend', Arial, sans-serif; background-color:#ffffff; color:#333;">
                        <table role="presentation" width="100%" style="border-collapse:collapse; sans-serif;">
                            <tr>
                                <td align="center" style="padding: 40px 20px;">
                                    <img src="https://track-my-cash.netlify.app/assets/Logo_Opt-XtX21Eq5.jpg" alt="Logo Track My Cash" width="300" style="display:block; border-bottom:2px solid #24BF67; padding-bottom:20px; background: #fff">
                                    <h1 style="font-size:22px; font-weight:normal; margin:30px 0 10px; color: #000; font-family: 'Lexend', Arial, sans-serif;">Hola ${user.userName},</h1>
                                    <p style="font-size:16px; line-height:1.5; max-width:600px; margin:0 auto 0; color: #000; font-family: 'Lexend', Arial, sans-serif;">
                                        Recientemente solicitaste restablecer tu contraseña para tu cuenta de <strong>Track My Cash</strong>.
                                        <br>Usa el siguiente código para restablecerla:
                                    </p>

                                    <div style="display:inline-block; margin:0; padding:12px 20px; background-color: #24BF67; color:#fff; font-size:28px; font-weight:bold; border-radius:10px font-family: 'Lexend', Arial, sans-serif;">
                                        <h2 style="display: inline-block; color: white; background-color: #24BF67; padding: 1rem 2rem 1rem; font-size:24px; font-weight:bold; border-radius:10px;">
                                            CÓDIGO: ${user.code}
                                        <h2>
                                    </div>

                                    <a href="${url}" style="display:inline-block; padding:12px 24px; background-color:#3D90D9; color:white; text-decoration:none; font-size:18px; border-radius:12px; font-weight: 500; font-family: 'Lexend', Arial, sans-serif;">
                                        Reestablecer mi contraseña
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </body>
                </html>
            `
            // html: htmlTemplate
        })
        console.log(email)
    }
}