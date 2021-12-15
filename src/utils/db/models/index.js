import Products from "./product.js";
import Reviews from "./reviews.js";

Products.hasMany(Reviews, { onDelete: "CASCADE" });
Reviews.belongsTo(Products, { onDelete: "CASCADE" });

export { Products, Reviews };