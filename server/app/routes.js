import authRoute from "../auth/auth.router.js";

const initRoutes = (app) => {
    app.use("/auth", authRoute);
}

export default initRoutes;