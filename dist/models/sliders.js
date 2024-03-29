"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const sequelize = new sequelize_1.Sequelize(...config_1.env.database);
const tbl_sliders = sequelize.define("tbl_sliders", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    position: { type: sequelize_1.DataTypes.STRING },
    header_ar: { type: sequelize_1.DataTypes.STRING },
    header_en: { type: sequelize_1.DataTypes.STRING },
    description_ar: { type: sequelize_1.DataTypes.STRING },
    description_en: { type: sequelize_1.DataTypes.STRING },
    link: { type: sequelize_1.DataTypes.STRING },
    image: { type: sequelize_1.DataTypes.STRING },
    active: { type: sequelize_1.DataTypes.BOOLEAN },
}, {
    charset: "utf8",
    collate: "utf8_general_ci",
    scopes: {
        active: {
            where: {
                active: true,
            },
        },
        notActive: {
            where: {
                active: false,
            },
        },
    },
});
tbl_sliders.sync();
exports.default = tbl_sliders;
