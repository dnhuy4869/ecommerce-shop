const authRoute = require("../routes/auth");

const initRoutes = (app) => {
    app.use("/auth", authRoute);
}

module.exports = initRoutes;