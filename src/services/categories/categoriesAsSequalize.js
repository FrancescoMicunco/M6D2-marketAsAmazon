import express from "express";
import Products from "../../utils/db/models/product.js";
import Reviews from "../../utils/db/models/reviews.js";
import User from "../../utils/db/models/users";
import { Op, Sequelize } from "sequelize";
import Categories from "../../utils/db/models/categories";
import router from "../products/productASSequelize";

router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const data = Categories.findAll();
            res.send(data);
        } catch (error) {
            next(error)
        }
    });
router.route("/bulk").post(async(req, res, next) => {
    try {
        const data = await Categories.bulkCreate([
            { name: "categ 1" },
            { name: "categ 2" },
            { name: "categ 3" },
            { name: "categ 4" },
            { name: "categ 5" }
        ]);
        res.send(data)
    } catch (error) {
        next(error)
    }
});

export default router