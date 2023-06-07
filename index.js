const express = require("express");
const app = express();
const port = 5000;
const unidecode = require("unidecode");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/palindromo", (req, res) => {
  const { palabra } = req.body;

  if (typeof palabra !== "string") {
    return res.status(404).json({ 
      message: "No se pudo comprobar la palabra" 
    });
  }

  console.log("Palabra recibida:", palabra);

  if (esPalindromo(palabra)) {
    console.log("La palabra es un palíndromo");
    return res.status(200).json({ message: `${palabra} es un palíndromo` });
  } else {
    console.log("La palabra NO es un palíndromo");
    return res.status(302).json({ message: `${palabra} no es un palíndromo` });
  }
});

const esPalindromo = (cadena) => {
  const normalized = unidecode(cadena.toLowerCase()).replace(/[^a-z]/g, "");
  const reversed = normalized.split("").reverse().join("");
  console.log("Palabra normalizada:", normalized);
  console.log("Palabra invertida:", reversed);
  return normalized === reversed;
}

app.listen(port, () => {
  console.log("El servidor está corriendo en el puerto 5000");
});
