import sequelize from "../connectSequelize";
import s from 'sequelize'
import { DataType } from 's'

const ArticleCategory = sequelize.define(
    "articleCategory", {

    }, { timestamp: false }

);

export default ArticleCategory