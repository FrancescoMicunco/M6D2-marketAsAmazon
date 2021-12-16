import sequelize from "../connectSequelize";
import s from 'sequelize';
const { DataTypes } = s;

const Category = sequelize.define("category", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Category