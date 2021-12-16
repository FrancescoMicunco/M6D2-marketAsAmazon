// import { Router } from "express";
// import pool from "../../utils/db/connect.js";

// const productRouter = Router();


// // ========= GET ==================
// //=================================
// productRouter.get("/", async(req, res, next) => {
//     try {
//         const data = await pool.query("SELECT * FROM product");
//         res.send(data.rows);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // ========= POST ==================
// //=================================
// productRouter.post("/", async(req, res, next) => {
//     try {
//         const { product_name, product_description, brand, image_url, price, category } = req.body
//         const result = await pool.query(
//             "INSERT INTO product (product_name, product_description, brand, image_url, price, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [product_name, product_description, brand, image_url, price, category]
//         );

//         res.status(201).send(result.rows[0]);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // ========= GET+ID ==================
// //=================================
// productRouter.get("/:id", async(req, res, next) => {
//     try {
//         const data = await pool.query("SELECT * FROM product WHERE product_id =$1;", [req.params.id]);
//         if (data.rows[0]) {
//             res.send(data.rows[0]);
//         } else {
//             res.status(400).send(`Product not found`)
//         }

//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // ========= PUT ==================
// //=================================
// productRouter.put("/:id", async(req, res, next) => {
//     try {
//         const updateProduct = Object.entries(req.body)
//             .map(([key, value]) => `${key} = '${value}'`)
//             .join(", ");
//         const updatedAt = new Date()
//         const query = `UPDATE product SET ${updateProduct}, updated_at='${updatedAt}' WHERE product_id = ${req.params.id}  RETURNING *;`;
//         const data = await pool.query(query);
//         res.send(result.rows[0]);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // ========= DELETE ==================
// //=================================
// productRouter.delete("/:id", async(req, res, next) => {
//     try {
//         const query = `DELETE FROM product WHERE product_id = ${req.params.id};`;
//         await pool.query(query);
//         res.status(204).send()
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });




// export default productRouter;