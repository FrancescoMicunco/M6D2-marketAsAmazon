// import { Router } from "express";
// import pool from "../../utils/db/connect.js";

// const reviewsRouter = Router();

// // ========= GET ==================
// //=================================
// reviewsRouter.get("/", async(req, res, next) => {
//     try {
//         const data = await pool.query("SELECT * FROM reviews");
//         res.send(data.rows);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // ========= POST ==================
// //=================================
// reviewsRouter.post("/", async(req, res, next) => {
//     try {
//         const { comment, rate, product_id } = req.body
//         const result = await pool.query(
//             "INSERT INTO reviews (comment, rate, product_id) VALUES ($1, $2, $3) RETURNING *", [comment, rate, product_id]
//         );

//         res.status(201).send(result.rows[0]);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // ========= GET+ID ==================
// //=================================
// reviewsRouter.get("/:id", async(req, res, next) => {
//     try {
//         const data = await pool.query("SELECT * FROM reviews WHERE reviews_id =$1;", [req.params.id]);
//         if (data.rows[0]) {
//             res.send(data.rows[0]);
//         } else {
//             res.status(400).send(`There is not reviews`)
//         }
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // ========= PUT ==================
// //=================================
// reviewsRouter.put("/:id", async(req, res, next) => {
//     try {
//         const updateReview = Object.entries(req.body)
//             .map(([key, value]) => `${key} = '${value}'`)
//             .join(", ");
//         const updatedAt = new Date()
//         const query = `UPDATE review SET ${updateReview}, updated_at='${updatedAt}' WHERE reviews_id = ${req.params.id}  RETURNING *;`;
//         const data = await pool.query(query);
//         res.send(result.rows[0]);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // ========= DELETE ==================
// //=================================
// reviewsRouter.delete("/:id", async(req, res, next) => {
//     try {
//         const query = `DELETE FROM reviews WHERE reviews_id = ${req.params.id};`;
//         await pool.query(query);
//         res.status(204).send()
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });



// export default reviewsRouter;