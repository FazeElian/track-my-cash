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
        const url = `${process.env.VITE_URL_PROD}/auth/confirm-account`
        const domain = process.env.EMAIL_DOMAIN;

        // htmlTemplate = htmlTemplate
        //     .replace("{{ userName }}", user.userName)
        //     .replace("{{ code }}", user.code)
        //     .replace("{{ ConfirmAccountURL }}", url);

        const email = await transport.sendMail({
            from: `"Track My Cash" <noreply@${domain}>`,
            to: user.email,
            subject: "Track My Cash - Confirma tu cuenta",
            // html: `
            //     <!DOCTYPE html>
            //     <html>
            //         <head>
            //             <!-- Styles -->
            //             <style>
            //                 /* Lexend font */
            //                 @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');

            //                 * {
            //                     box-sizing: border-box;
            //                     margin: 0;
            //                 }

            //                 body {
            //                     padding: 0;
            //                     margin: 0;
            //                     font-family: "Lexend", sans-serif;
            //                 }

            //                 section {
            //                     display: flex;
            //                     width: 100%;
            //                     height: auto;
            //                     flex-direction: column;
            //                     text-align: center;
            //                     padding: 3rem 2rem 3rem;
            //                     align-items: center;
            //                 }

            //                 img {
            //                     width: 30%;
            //                     min-width: 300px;
            //                     max-width: 600px;
            //                     border-bottom: 2px solid #24BF67;
            //                     padding: 0 2rem 0;
            //                 }

            //                 h1 {
            //                     font-size: 24px;
            //                     font-weight: 450;
            //                     margin: 2rem 0 22px;
            //                 }

            //                 p {
            //                     font-size: 15px;
            //                     font-weight: 400;
            //                     line-height: 22px;
            //                 }

            //                 .code {
            //                     display: flex;
            //                     width: auto;
            //                     height: auto;
            //                     margin: 22px 0 2rem;
            //                     gap: 7px;
            //                     padding: 1rem 1.5rem 1rem;
            //                     border-radius: 6px;
            //                     background-color: #2EA662;
            //                     color: white;
            //                     font-size: 24px;
            //                     font-weight: 400;
            //                     align-items: center;
            //                     justify-content: center;
            //                     flex-wrap: wrap;
            //                 }

            //                     .code b {
            //                         font-weight: 550;
            //                     }

            //                 .btn {
            //                     display: flex;
            //                     width: auto;
            //                     height: auto;
            //                     text-align: center;
            //                     padding: 14px 2rem 14px;
            //                     text-decoration: none;
            //                     color: #213440;
            //                     font-weight: 450;
            //                     border-radius: 12px;
            //                     color: transparent;
            //                     background: linear-gradient(
            //                         90deg, #3D90D9, 
            //                         #2EA662, #3D90D9
            //                     );
            //                     background-size: 200% 100%;
            //                     background-position: 100% 50%;
            //                     -webkit-background-clip: text;
            //                     animation: gradientMovement 10s ease infinite;
            //                     border: 2px solid #19937B;
            //                     font-size: 16px;
            //                 }


            //                 @keyframes gradientMovement {
            //                     0% {
            //                         background-position: 200% 0%;
            //                     }
            //                     50% {
            //                         background-position: -200% 0%;
            //                     }
            //                     100% {
            //                         background-position: 200% 0%;
            //                     }
            //                 }
            //             </style>
            //         </head>
            //         <body>
            //             <section>
            //                 <img src="https://track-my-cash.netlify.app/assets/Logo_Opt-XtX21Eq5.jpg" alt="Logo">
            //                 <h1> Hola ${user.userName}! </h1>
            //                 <p>
            //                     ¡Bienvenido a Track My Cash! Confirma tu correo electrónico para activar tu cuenta. <br />
            //                     Haz clic en el enlace de abajo e introduce el código para completar tu registro:
            //                 </p>
            //                 <div class="code">
            //                     <b>CÓDIGO: </b>
            //                     ${user.code}
            //                 </div>
            //                 <a href="${url}" class="btn">Confirmar mi cuenta</a>
            //             </section>
            //         </body>
            //     </html>
            // `,
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
                                    <p style="font-size:16px; line-height:1.5; max-width:600px; margin:0 auto 20px; color: #000; font-family: 'Lexend', Arial, sans-serif;">
                                        ¡Bienvenido a <strong>Track My Cash! </strong>Confirma tu correo electrónico para activar tu cuenta.
                                        <br>Haz clic en el enlace de abajo e introduce el código para completar tu registro:
                                    </p>

                                    <div style="display:inline-block; margin:20px 0; padding:12px 20px; background-color:#2EA662; color:#fff; font-size:22px; font-weight:bold; border-radius:5px font-family: 'Lexend', Arial, sans-serif;;">
                                        CÓDIGO: ${user.code}
                                    </div>

                                    <p style="margin:20px 0;">
                                    <a href="${url}" style="display:inline-block; padding:12px 24px; background-color:#3D90D9; color:white; text-decoration:none; font-size:16px; border-radius:8px; font-family: 'Lexend', Arial, sans-serif;">
                                        Confirmar mi cuenta
                                    </a>
                                    </p>
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
        const url = `${process.env.VITE_URL_PROD}/auth/validate-code`
        const domain = process.env.EMAIL_DOMAIN;

        // htmlTemplate = htmlTemplate
        //     .replace("{{ userName }}", user.userName)
        //     .replace("{{ code }}", user.code)
        //     .replace("{{ ValidateCodeURL }}", url);

        const email = await transport.sendMail({
            from: `"Track My Cash" <noreply@${domain}>`,
            to: user.email,
            subject: "Track My Cash - Reestablece tu contraseña",
            // html: `
            //     <!DOCTYPE html>
            //     <html>
            //         <head>
            //             <!-- Styles -->
            //             <style>
            //                 * {
            //                     box-sizing: border-box;
            //                     margin: 0;
            //                 }

            //                 body {
            //                     padding: 0;
            //                     margin: 0;
            //                     font-family: "Arial", sans-serif;
            //                 }

            //                 section {
            //                     display: flex;
            //                     width: 100%;
            //                     height: auto;
            //                     flex-direction: column;
            //                     text-align: center;
            //                     padding: 3rem 2rem 3rem;
            //                     align-items: center;
            //                 }

            //                 img {
            //                     width: 30%;
            //                     min-width: 300px;
            //                     max-width: 600px;
            //                     border-bottom: 2px solid #24BF67;
            //                     padding: 0 2rem 0;
            //                 }

            //                 h1 {
            //                     font-size: 24px;
            //                     font-weight: 450;
            //                     margin: 2rem 0 22px;
            //                 }

            //                 p {
            //                     font-size: 15px;
            //                     font-weight: 400;
            //                     line-height: 22px;
            //                 }

            //                 .code {
            //                     display: flex;
            //                     width: auto;
            //                     height: auto;
            //                     margin: 22px 0 2rem;
            //                     gap: 7px;
            //                     padding: 1rem 1.5rem 1rem;
            //                     border-radius: 6px;
            //                     background-color: #2EA662;
            //                     color: white;
            //                     font-size: 24px;
            //                     font-weight: 400;
            //                     align-items: center;
            //                     justify-content: center;
            //                     flex-wrap: wrap;
            //                 }

            //                     .code b {
            //                         font-weight: 550;
            //                     }

            //                 .btn {
            //                     display: flex;
            //                     width: auto;
            //                     height: auto;
            //                     text-align: center;
            //                     padding: 14px 2rem 14px;
            //                     text-decoration: none;
            //                     color: #213440;
            //                     font-weight: 450;
            //                     border-radius: 12px;
            //                     color: transparent;
            //                     background: linear-gradient(
            //                         90deg, #3D90D9, 
            //                         #2EA662, #3D90D9
            //                     );
            //                     background-size: 200% 100%;
            //                     background-position: 100% 50%;
            //                     -webkit-background-clip: text;
            //                     animation: gradientMovement 10s ease infinite;
            //                     border: 2px solid #19937B;
            //                     font-size: 16px;
            //                 }


            //                 @keyframes gradientMovement {
            //                     0% {
            //                         background-position: 200% 0%;
            //                     }
            //                     50% {
            //                         background-position: -200% 0%;
            //                     }
            //                     100% {
            //                         background-position: 200% 0%;
            //                     }
            //                 }
            //             </style>
            //         </head>
            //         <body>
            //             <section>
            //                 <img src="https://track-my-cash.netlify.app/assets/Logo-BeyKgpRd.webp" alt="Logo">
            //                 <h1> Hola ${user.userName}, </h1>
            //                 <p>
            //                     Recientemente solicitaste restablecer tu contraseña para tu cuenta de Track My Cash. <br />
            //                     Usa el código a continuación para restablecerla:
            //                 </p>
            //                 <div class="code">
            //                     <b>CÓDIGO: </b>
            //                     ${user.code}
            //                 </div>
            //                 <a href="${url}" class="btn">Reestablecer mi contraseña</a>
            //             </section>
            //         </body>
            //     </html>
            // `
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
                                    <p style="font-size:16px; line-height:1.5; max-width:600px; margin:0 auto 20px; color: #000; font-family: 'Lexend', Arial, sans-serif;">
                                        Recientemente solicitaste restablecer tu contraseña para tu cuenta de <strong>Track My Cash</strong>.
                                    <br>Usa el siguiente código para restablecerla:
                                    </p>

                                    <div style="display:inline-block; margin:20px 0; padding:12px 20px; background-color:#2EA662; color:#fff; font-size:22px; font-weight:bold; border-radius:5px font-family: 'Lexend', Arial, sans-serif;;">
                                        CÓDIGO: ${user.code}
                                    </div>

                                    <p style="margin:20px 0;">
                                    <a href="${url}" style="display:inline-block; padding:12px 24px; background-color:#3D90D9; color:white; text-decoration:none; font-size:16px; border-radius:8px; font-family: 'Lexend', Arial, sans-serif;">
                                        Reestablecer mi contraseña
                                    </a>
                                    </p>
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