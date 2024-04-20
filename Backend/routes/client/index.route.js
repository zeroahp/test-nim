const homeRoutes = require("./home.route");
const boardRoutes = require("./board.route");
// const playerRoutes = require("./player.route");

module.exports = (app) => {  
    app.use("/", homeRoutes);
    app.use("/board", boardRoutes);
}