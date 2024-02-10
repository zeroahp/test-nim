const homeRoutes = require("./home.route");
const boardRoutes = require("./board.route");
// const playerRoutes = require("./player.route");

module.exports = (app) => {  
    app.use("/api", homeRoutes);
    app.use("/api/board", boardRoutes);
    // app.use("/api/player", playerRoutes);
}