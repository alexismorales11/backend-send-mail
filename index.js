//Carga de variables de entorno desde .env
require("dotenv").config();

//Instancia de express para acceder a sus funciones
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;

const nodemailer = require("nodemailer");
//consfig cors

app.use(cors(() => {}));

// Configuración del transportador SMTP
const transporterGmail = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "selvinmoralesoficial@gmail.com",
    pass: `${process.env.PASS_APP_MAIL}`,
  },
});

const transporterOutlook = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    type: "login",
    user: "itservices@paloblanco.com",
    pass: `${process.env.PASS_OUTLOOK_IT_S}`,
  },
});

// Opciones del correo electrónico
const mailOptions = {
  from: "itservices@paloblanco.com",
  to: "smorales@paloblanco.com, selvinmoralesoficial@gmail.com",
  subject: "Asunto del correo",
  html: `<h1>Holaaa</h1>`,
};

// Envío del correo electrónico
transporterOutlook.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Error al enviar el correo:", error);
  } else {
    console.log("Correo electrónico enviado:", info.response);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
