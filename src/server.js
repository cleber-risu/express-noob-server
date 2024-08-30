require("express-async-errors");
const migrationRun = require("./database/sqlite/migrations");
// importar o express
const express = require("express");

// inicializar o express
const app = express();

const AppError = require("./utils/AppError");

// importar rotas
const routes = require("./routes");

// dizemos ao node qual tipo de formato ele vai trabalhar
// para receber no corpo da requisição
app.use(express.json());

migrationRun();

// dizemos que vamos usar as rotas importadas
app.use(routes);

app.use((error, _, response, _2) => {
  // erro gerado pelo cliente
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  // não sendo erro do cliente, emitimos um padrão
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// dizer qual porta o express vai observar
const PORT = 3333;
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
