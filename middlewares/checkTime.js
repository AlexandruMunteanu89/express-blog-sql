function checkTime(req, res, next) {
    // a questo punto prendiamo la data e l`ora specifica di user
    const currHour = new Date();
    const time = currHour.toLocaleString();

    console.log("Sei passato dal middleware di checkTime a:", time);

    // soluzione della richiesta
    next();
}
module.exports = checkTime;