import express from "express";
import Products from "../../utils/db/models/product.js"
import Reviews from "../../utils/db/models/reviews.js";
import { Op } from "sequelize";
import Categories from "../../utils/db/models/categories.js";
import User from "../../utils/db/models/users.js";
import ProductCategory from "../../utils/db/models/productCategory.js";


const router = express.Router();

router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const products = await Products.findAll({
                include: [{
                        model: Categories,
                        through: { attributes: [] },
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        where: {
                            ...(req.query.category && {
                                name: {
                                    [Op.in]: req.category.name.split(","),
                                },
                            }),
                        },
                    },
                    { model: Reviews, include: Users },
                    User,
                ],
                where: {
                    ...(req.query.search && {
                        [Op.or]: [{
                                username: {
                                    [Op.iLike]: `%${req.query.search}%`,
                                },
                            },
                            {
                                text: {
                                    [Op.iLike]: `%${req.query.search}%`,
                                },
                            },
                            {
                                "$user.name$": {
                                    [Op.iLike]: "%" + req.query.search + "%",
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
        const { categoryId, ...rest } = req.body;
        const product = await Products.create(rest)
        if (product) {
            const productToInsert = categoryId.map((id) => ({
                categoryId: id,
                productId: product.id,
            }));
        }


        const products = await ProductCategory.bulkCreate(productToInsert);
        res.send({ productCategory: products })
    } catch (error) {
        next(error)
    }
})

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            //const product = await Products.findByPk(req.params.id);
            const product = await Products.findOne({
                where: {
                    id: req.params.id,
                },
                include: [User, Reviews]
            });

            res.send(product);

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