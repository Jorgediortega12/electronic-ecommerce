import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Tu Tienda" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verifica tu cuenta",
    html: `
      <h1>¡Bienvenido!</h1>
      <p>Haz clic en el siguiente enlace para verificar tu correo:</p>
      <a href="${verificationUrl}">Verificar correo</a>
    `
  });
};

export const sendOrderConfirmationEmail = async (
  to: string,
  orderId: number,
  total: number
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Tu Tienda" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Confirmación de pedido #${orderId}`,
    html: `
      <h2>Gracias por tu compra</h2>
      <p>Tu pedido con ID <strong>${orderId}</strong> ha sido confirmado.</p>
      <p>Total: <strong>$${total}</strong></p>
      <p>Pronto recibirás actualizaciones sobre el envío.</p>
    `
  });
};
