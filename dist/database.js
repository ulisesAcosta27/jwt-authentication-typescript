"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://restapi_ts:restapi_ts@cluster0.r7jyr.mongodb.net/restapi_ts");
const connection = mongoose_1.default.connection;
connection.once("open", () => {
    console.log("Mongodb connection stablished");
});
connection.on("error", (err) => {
    console.log(err);
    process.exit(0);
});
