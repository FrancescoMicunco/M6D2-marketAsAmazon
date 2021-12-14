import express from 'express'
import cors from 'cors'
import { testConnection } from './utils/db/connect.js'
import productRouter from './services/products/indexProd.js'
import reviewsRouter from "./services/reviews/indexRev.js";

const server = express();

server.use(express.json());
server.use(cors());


server.use("/product", productRouter);
server.use("/reviews", reviewsRouter);


console.table(server)
server.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${PORT}`);
    testConnection()

});

server.on("error", (error) => console.log("Server is not running", error));