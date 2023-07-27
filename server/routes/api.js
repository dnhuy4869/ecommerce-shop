import authRoute from "./auth.js";

const initRoutes = (app) => {
    app.use("/auth", authRoute);
}

export default initRoutes;