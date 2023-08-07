const CracoAlias = require("craco-alias");

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "options",
                baseUrl: "src",
                aliases: {
                    "@": "./",
                    "@assets": "./assets",
                    "@components": "./components",
                    "@features": "./features",
                    "@pages": "./pages",
                    "@layouts": "./layouts",
                    "@lib": "./lib",
                    "@hooks": "./hooks",
                    "@app": "./app",
                    "@utils": "./utils",
                }
            }
        }
    ]
};