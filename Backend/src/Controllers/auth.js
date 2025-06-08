import { connectDB } from "../Models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, findUserByUsername, comparePassword, createUser } from "../Models/users.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const registerUser = async (req, res) => {
  const { username, email, password, role = "user" } = req.body; // Asignar "user" como valor predeterminado para el rol

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Validar el rol proporcionado
    const validRoles = ["user", "systemAdmin", "productAdmin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    // Crear el usuario con el rol especificado
    const newUser = {
      username,
      email,
      password: hashedPassword,
      role, // Asignar el rol
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { dbInstanceUsers } = await connectDB();
    await dbInstanceUsers.collection("users").insertOne(newUser);

    res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Mejora el email de recuperación con CSS:
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { dbInstanceUsers } = await connectDB();
  const user = await dbInstanceUsers.collection("users").findOne({ email });
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 1000 * 60 * 60; // 1 hora

  await dbInstanceUsers.collection("users").updateOne(
    { email },
    { $set: { resetPasswordToken: token, resetPasswordExpires: expires } }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const emailCss = `
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; background: #f7f6f2; color: #333; margin: 0; padding: 0; }
      .email-container { background: #fff; border-radius: 8px; max-width: 400px; margin: 24px auto; padding: 24px 32px; box-shadow: 0 2px 16px rgba(0,0,0,0.08); border: 1px solid #eee; }
      h2 { color: #8D7B31; margin-top: 0; text-align: center; }
      .reset-link { display: inline-block; background: #8D7B31; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin: 20px 0; font-weight: bold; }
      .footer { margin-top: 24px; text-align: center; color: #888; font-size: 0.95em; }
    </style>
  `;

  await transporter.sendMail({
    from: `"Tu Tienda" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Recuperación de contraseña",
    html: `
      <html>
        <head>${emailCss}</head>
        <body>
          <div class="email-container">
            <h2>Recuperación de contraseña</h2>
            <p>Has solicitado restablecer tu contraseña.</p>
            <p>Haz clic en el siguiente enlace para cambiarla:</p>
            <a href="${resetUrl}" class="reset-link">Cambiar contraseña</a>
            <p>Si no solicitaste este cambio, ignora este correo.</p>
            <div class="footer">
              <p>Gracias por confiar en nuestra tienda.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });

  res.json({ message: "Correo de recuperación enviado" });
};
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    console.log("Buscando usuario:", username);
    const user = await findUserByUsername(username);

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    console.log("Usuario encontrado:", user);

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      console.log("Contraseña inválida");
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    console.log("Contraseña válida, generando token...");

const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
);
    console.log("Token generado:", token);

res.status(200).json({
  token,
  user: {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  }
});  } catch (error) {
    console.error("Error en loginUser:", error.message);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ error: "Token y nueva contraseña son obligatorios" });
  }

  try {
    const { dbInstanceUsers } = await connectDB();
    // Quita la comprobación de expiración
    const user = await dbInstanceUsers.collection("users").findOne({
      resetPasswordToken: token
    });

    if (!user) {
      return res.status(400).json({ error: "Token inválido" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await dbInstanceUsers.collection("users").updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" }
      }
    );

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error en resetPassword:", error.message);
    res.status(500).json({ error: "Error al restablecer la contraseña" });
  }
};