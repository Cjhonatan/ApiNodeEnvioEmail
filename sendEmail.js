const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud como JSON

app.post('/enviar-correo', async (req, res) => {
  try {
    const { subject, text } = req.body; // Obtener el asunto y el texto del cuerpo de la solicitud JSON

    if (!subject || !text) {
      res.status(400).json({ error: 'Faltan parámetros requeridos' });
      return;
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "carfastweb@outlook.com",
        pass: "Luna2006",
      },
    });

    var mailOptions = {
      from: '"Email prueba" <carfastweb@outlook.com>',
      to: "jhonatanc.gomez1996@hotmail.com",
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al enviar el correo' });
      } else {
        console.log("Correo enviado");
        res.json({ message: 'Correo enviado correctamente' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
