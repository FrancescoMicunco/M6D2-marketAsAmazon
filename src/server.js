import express from "express";
import cors from 'cors';
//import { testConnection } from './utils/db/connect.js';
import productRouter from './services/products/indexProd.js';
import reviewsRouter from "./services/reviews/indexRev.js";
import sequelize, { testDB } from "./utils/db/connectSequelize.js";



const server = express();

server.use(express.json());
server.use(cors());


server.use("/product", productRouter);
server.use("/reviews", reviewsRouter);


console.table(server)
server.listen(process.env.PORT || 3001, async() => {
    console.log(`Server is running`);
    await testDB()
    await sequelize.sync()
});

server.on("error", (error) => console.log("Server is not running", error));