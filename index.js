const fs = require('fs');

const getList = async ({ il, ilce }) => {

    const file = await fs.readFileSync(__dirname + "/list.json", "utf-8");
    const json = JSON.parse(file);
    const body = json.find(el => el.il?.toLowerCase() == il.toLowerCase())?.body;

    const req = await fetch("https://earsiv.gov.tr/kutuphane-listesi.aspx", {
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
        },
        body,
        "method": "POST"
    });
    const res = await req.text();

    let sonuc = res.split("<tbody>")[1].split("</tbody>")[0];

    sonuc = sonuc.split("'>")

    sonuc = sonuc.map(el => el.split("</td>").map(a => a.trim().substring(4, a.length)));

    sonuc.shift();

    sonuc = sonuc.map(el => el = {
        il: el[0],
        ilce: el[1],
        isim: el[2],
        acik: el[3]?.split("</i> ")[1],
        adres: el[4],
        tel: el[5],
        email: el[7],
    })

    if (ilce)
        sonuc = sonuc.filter(el => el.ilce?.toLowerCase() == ilce.toLowerCase());

    return sonuc;
}
module.exports = {
    getList
}