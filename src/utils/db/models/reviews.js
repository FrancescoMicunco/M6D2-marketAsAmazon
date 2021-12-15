import sequelize from "../connectSequelize.js";
import s from 'sequelize';
const { DataTypes } = s;

const Reviews = sequelize.define(
    "reviews", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }
);

export default Reviews