"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtSecret: process.env.JWT_SECRET,
    DB: {
        URI: process.env.MONGO_CONECT,
    },
};
