require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(`Connected to MongoDB ${process.env.MONGO_URL}`))
    .catch((err) => console.log(err))

const authRoutes = require("./routes/auth.route")
const bookRoutes = require("./routes/book.route")
const borrowRoutes = require("./routes/borrow.route")

app.use("/auth", authRoutes)
app.use("/books", bookRoutes)
app.use("/borrow", borrowRoutes)

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Kutubxona API",
            version: "1.0.0",
            description: "Kutubxona boshqaruv tizimi"
        },
        servers: [
            { url: process.env.BASE_URL }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["./routes/*.js"]
};

swaggerDocument = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
    console.log(`Server is running ${process.env.BASE_URL}`)
})