import express from "express";
import cors from 'cors';
//import { testConnection } from './utils/db/connect.js';
//import productRouter from './services/products/indexProd.js';
//import reviewsRouter from "./services/reviews/indexRev.js";
import sequelize, { testDB } from "./utils/db/connectSequelize.js";
import productsRouter from '../src/services/products/productASSequelize.js'
import reviewsRouter from "../src/services/reviews/reviewsAsSequelize.js";
import categoriesRouter from "../src/services/categories/categoriesAsSequelize.js";
import usersRouter from "../src/services/users/usersAsSequelize.js";
import Products from "./utils/db/models/product.js";
import Reviews from "./utils/db/models/reviews.js";
import Categories from "./utils/db/models/categories.js";
import User from "./utils/db/models/users.js";
import ProductCategory from "./utils/db/models/productCategory.js";

const server = express();

server.use(express.json());
server.use(cors());


//server.use("/product", productRouter);
//server.use("/reviews", reviewsRouter);

server.use("/product", productsRouter);
server.use("/reviews", reviewsRouter);
server.use("/users", reviewsRouter);
server.use("/categories", reviewsRouter);


//========= connection area =====================
//===============================================

Products.hasMany(Reviews, { onDelete: "CASCADE" });
Reviews.belongsTo(Products, { onDelete: "CASCADE" });

User.hasMany(Products, { onDelete: "CASCADE" });
Products.belongsTo(User, { onDelete: "CASCADE" });

User.hasMany(Reviews, { onDelete: "CASCADE" });
Reviews.belongsTo(User, { onDelete: "CASCADE" });

Products.belongsToMany(Categories, { through: ProductCategory, onDelete: "CASCADE" });

Categories.belongsToMany(Products, { through: ProductCategory, onDelete: "CASCADE" });

//========== END SECTION ===================
//=========================================

console.table(server)
server.listen(process.env.PORT || 3002, async() => {
    console.log(`Server is running`);
    await testDB()
    await sequelize.sync({ force: true })
});

server.on("error", (error) => console.log("Server is not running", error));