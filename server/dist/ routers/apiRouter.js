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
const POST_1 = __importDefault(require("../models/POST"));
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("../controllers/Controllers");
const apiRouter = express_1.default.Router();
apiRouter.get("/data", Controllers_1.registerView);
apiRouter.get("/view", Controllers_1.view);
apiRouter.post("/api/write", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    console.log(title, content);
    try {
        const newPost = yield POST_1.default.create({
            title,
            content,
        });
        // const _id = req.body._id;
        // const board = await Board.find({writer: _id})
        // res.json({list: board});
        // const board = await Board.find({_id});
        // res.json({board});
        // 뭐 이런식으로 몽구스 조회해서 보내버리네잉.. json 형태로.
    }
    catch (error) {
        return res.status(400).redirect("/");
    }
    res.redirect("/");
}));
exports.default = apiRouter;
