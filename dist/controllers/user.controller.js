"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, "secreto", {
        expiresIn: 86400,
    });
}
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "Please send your email and password" });
    }
    const user = yield user_1.default.findOne({ email: email });
    console.log(user);
    if (user) {
        return res.status(400).json({ msg: "The user already exist" });
    }
    const newUser = new user_1.default({ email, password });
    yield newUser.save();
    res.status(201).send(newUser);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "Please send your email and password" });
    }
    const user = yield user_1.default.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ msg: "The user does not exist" });
    }
    const isMatch = yield user.comparePassword(password);
    if (isMatch) {
        return res.status(200).json({ token: createToken(user) });
    }
    res.status(200).json({
        msg: "The email oe password are incorrect",
    });
});
exports.signIn = signIn;
