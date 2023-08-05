import authRoute from "../auth/auth.router.js";
import categoryRoute from "../category/category.router.js";
import productRoute from "../product/product.router.js";

const initRoutes = (app) => {
    
    app.use("/auth", authRoute);

    app.use("/category", categoryRoute)

    app.use("/product", productRoute)
}

export default initRoutes;