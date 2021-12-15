import express from "express";
import { articles } from "../../data/articles.js";
import { Article, User } from "../../db/models/index.js";
import { Op, Sequelize } from "sequelize";
const router = express.Router();