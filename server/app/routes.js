import authRoute from "../auth/auth.router.js";
import categoryRoute from "../category/category.router.js";
import productRoute from "../product/product.router.js";
import billRoute from "../bill/bill.router.js";

const initRoutes = (app) => {
    
    app.use("/auth", authRoute);

    app.use("/category", categoryRoute)

    app.use("/product", productRoute)

    app.use("/bill", billRoute)
}

export default initRoutes;