import express from "express";
//import { Reviews } from "../../utils/db/models/reviews.js";


import Products from "../../utils/db/models/product.js";
import Reviews from "../../utils/db/models/reviews.js";
import { Op, Sequelize } from "sequelize";
const router = express.Router();

router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const reviews = await Reviews.findAll({

                where: {
                    ...(req.query.search && {
                        [Op.or]: [{
                                text: {
                                    [Op.iLike]: `%${req.query.search}%`,
                                },
                            },
                            {
                                username: {
                                    [Op.iLike]: `%${req.query.search}%`,
                                },
                            },
                        ],
                    }),
                },
            });
            res.send(reviews);
        } catch (error) {
            next(error);
        }
    })

.post(async(req, res, next) => {
    try {
        const reviews = await Reviews.create(req.body);
        res.send(reviews);
    } catch (error) {
        next(error);
    }
});

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            const revews = await Reviews.findByPk(req.params.id);
            if (revews) {
                res.send(revews);
            } else {
                res.status(404).send("Not found");
            }
        } catch (error) {
            next(error);
        }
    })

.put(async(req, res, next) => {
        try {
            const updateReviews = await Reviews.update(req.body, {
                where: { id: req.params.id },
                returning: true,
            });
        } catch (error) {
            next(error);
        }
    })
    .delete(async(req, res, next) => {
        try {
            const deleteReview = await Reviews.destroy({
                where: { id: req.params.id },
            });
            if (result > 0) {
                res.send("201. Reviews deleted");
            }
        } catch (error) {
            next(error);
        }
    });

export default router;