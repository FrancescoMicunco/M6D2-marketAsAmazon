import sequelize from "../connectSequelize";
import s from 'sequelize'
import { DataType } from 's'

const ProductCategory = sequelize.define(
    "productCategory", {

    }, { timestamp: false }

);

export default ProductCategory