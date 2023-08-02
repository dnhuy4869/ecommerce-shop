import authRoute from "../auth/auth.router.js";
import categoryRoute from "../category/category.router.js";

const initRoutes = (app) => {
    
    app.use("/auth", authRoute);

    app.use("/category", categoryRoute)
}

export default initRoutes;