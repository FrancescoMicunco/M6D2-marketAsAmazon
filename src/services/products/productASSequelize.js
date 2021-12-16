import express from "express";
import Products from "../../utils/db/models/product.js"
import Reviews from "../../utils/db/models/reviews.js";
import { Op, Sequelize } from "sequelize";
import Categories from "../../utils/db/models/categories.js";


const router = express.Router();

router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const products = await Products.findAll({
                include: Reviews,
                where: {
                    ...(req.query.search && {
                        [Op.or]: [{
                                name: {
                                    [Op.iLike]: `%${req.query.search}%`,
                                },
                            },
                            {
                                category: {
                                    [Op.iLike]: `%${req.query.search}%`,
                                },
                            },
                            {
                                description: {
                                    [Op.iLike]: `%${req.query.search}%`,
                                },
                            },
                        ],
                    }),
                },
            });
            res.send(products)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })


.post(async(req, res, next) => {
    try {
        const products = await Products.create(req.body);
        res.send(products)
    } catch (error) {
        next(error)
    }
})

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            const product = await Products.findByPk(req.params.id);
            if (product) {
                res.send(product);
            } else {
                res.status(404).send("Not found");

            }
        } catch (error) {
            next(error)

        }
    })

.put(async(req, res, next) => {
        try {
            const updateProduct = await Products.update(req.body, {
                where: { id: req.params.id },
                returning: true,
            });
            res.send(updateProduct)
        } catch (error) {
            next(error)
        }
    })
    .delete(async(req, res, next) => {
        try {
            const deleteProduct = await Products.destroy({
                where: { id: req.params.id },
            });
            if (result > 0) { res.send("201. Product deleted") } else { console.log(error) }

        } catch (error) {
            next(error)
        }
    })

export default router;