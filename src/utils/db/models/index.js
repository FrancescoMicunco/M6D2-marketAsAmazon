import Products from "./product";
import Reviews from "./reviews";

Products.hasMany(Reviews, { onDelete: "CASCADE" });
Reviews.belongsTo(Products, { onDelete: "CASCADE" });

export { Products, Reviews };