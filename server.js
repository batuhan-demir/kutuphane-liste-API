const express = require('express');
require("dotenv").config();

const app = express();

const { getList } = require("./index");

const PORT = process.env.PORT || 80;

app.get("/", async (req, res) => {
    const { il, ilce } = req.query;

    if (!il)
        return res.send("Bir il query'si girin.");

    const sonuc = await getList({ il, ilce });

    res.json(sonuc);
})


app.listen(PORT, () => console.log(`${PORT} portu üzerinde dinlemeye başladım.`));