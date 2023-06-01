const express = require("express");
const { AllRoutes } = require("./Router/router");
const createError = require("http-errors");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const path = require("path");

module.exports = class Application {

    #app = express();
    #PROT;
    #DB_URL;
    constructor(PORT, DB_URL){
        this.#DB_URL = DB_URL;
        this.#PROT = PORT;
        this.configApplication();
        this.initRedis();
        this.connecteToMongoDB();
        this.createServer();
        this.createRouter();
        this.errorHandler();
    }

    configApplication(){

        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended : true}))
        this.#app.use(express.static(path.join(__dirname, "..", "Public")))
        this.#app.use(cors())
        this.#app.use(morgan("dev"))
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(
            swaggerJsDoc({
            swaggerDefinition: {
                openapi: "3.0.0",
                info : {
                    title: "Project Store",
                    version: "2.0.0",
                    description: "بزرگترین مرجع فروش"
                },
                servers : [{
                    url : `http://localhost:${this.#PROT}`
                }],
                components:{
                    securitySchemes:{
                        BearerAuth:{
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT" 
                        }
                    }
                },
                security: [{BearerAuth: []}]
            },
            apis: ["./App/Router/**/*.js"]
        }), 
        {explorer: true}
        )
        )
    }

    initRedis(){
        require("./Utils/init-redis")
    }

    createServer(){
        const http = require("http");
        http.createServer(this.#app).listen(this.#PROT, () =>{
            console.log("Run >< http://localhost:" + this.#PROT);
        })
    }

    connecteToMongoDB(){
        const mongoose = require("mongoose");
        const db = mongoose.connection;
        
        mongoose.set('strictQuery', false);
        mongoose.connect(this.#DB_URL, (error) => {
            if(!error) return console.log("App Is Connected To MongoDB...")
            return console.log("App Is Not Connected To MongoDB...");
        })

        db.on("connected", () => {
        console.log("Mongoose Connected to DB...");
        })
        db.on("disconnected", () =>{
            console.log("Mongoose Connection Is Disconnected...");
        })
        process.on("SIGINT", async () =>{
            await db.close();
            console.log("disconnected...");
            process.exit(0)
        })
    }

    createRouter(){
        this.#app.use(AllRoutes);
    }

    errorHandler(){
        this.#app.use((req, res, next) =>{
            next(createError.NotFound("آدرس صفحه مورد نظر یافت نشد"))
        })
        
        this.#app.use((error, req, res, next) => {
            const servererror = createError.InternalServerError();
            const statusCode = error?.status || servererror.status ;
            const message = error?.message || servererror.message
            return res.status(statusCode).send({
                errors : {
                    statusCode,
                    message
                }
            })
        })
    }

}

