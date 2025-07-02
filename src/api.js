const express = require("express");


const app = express();

app.use(express.json());

const imovelRoute = require("./routes/imovelRoutes.js");
app.use(imovelRoute);

const corretorRoute = require("./routes/corretorRoutes.js");
app.use(corretorRoute);

app.listen(80);

