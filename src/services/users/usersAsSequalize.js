import express from "express";
import Products from "../../utils/db/models/product.js";
import Reviews from "../../utils/db/models/reviews.js";
import User from "../../utils/db/models/users.js";
import { Op, Sequelize } from "sequelize";
import { Literal } from "sequelize/dist/lib/utils";

const router = express.Router();


router.route("/").get(async(req, res, next) => {
    try {
        const user = User.findAll({
            where: {
                ...(req.query.search && {
                    [Op.or]: [{
                            name: {
                                [Op.iLike]: `%${req.query.search}%`
                            },
                        },
                        {
                            lastname: {
                                [Op.iLike]: `%${req.query.search}%`
                            },
                        },
                        {
                            email: {
                                [Op.iLike]: `%${req.query.search}%`
                            },
                        },
                    ],
                }),
            },
            include: [{
                model: Products,
                attributes: { exclude: ["readTimeValue"] }
            }],
            limit: req.query.limit,
            offset: parseInt(req.query.limit * req.query.page),
        });
        res.send(user);
    } catch (error) {
        next(error);
    }
})

.post(async(req, res, next) => {
    try {
        const data = await User.create(req.body);
        res.send(data)
    } catch (error) {
        next(error)
    }
})

router.route("/bulk").post(async(req, res, next) => {
        try {
            const data = await User.bulkCreate(req.body);
            res.send(data);
        } catch (error) {
            next(error)
        }
    })
    .put(async(req, res, next) => {
        try {
            const updateUser = await User.update(req.body, {
                where: { id: req.params.id },
                returning: true,
            });
            res.send(updateUser)
        } catch (error) {
            next(error)
        }
    })
    .delete(async(req, res, next) => {
        try {
            const toDelete = await User.destroy({
                where: { id: req.params.id },
            });
            if (result > 0) {
                res.send("user deleted")
            } else {
                res.status(400).send("user not found")
            }
        } catch (error) {
            next(error)
        }
    })


export default router