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
exports.view = exports.registerView = void 0;
const POST_1 = __importDefault(require("../models/POST"));
const registerView = (req, res) => {
    console.log("register view에 도착했습니다.");
    res.json({ hello: "hello world" });
};
exports.registerView = registerView;
const view = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield POST_1.default.find();
    // 배열을 리턴해준다.
    // 선회하는 구조를 JSON으로 바꾸려고 해서 나는 에러이다. 배열을 json 형태로 바꿔줬기 때문에 그런듯..
    // JSON 객체의 직렬화에 대상은 ownProperty 이면서, enumerable 한것만 직렬화 대상이된다.
    // 배열이 리턴되었음. 그리고 그 배열안에는 객체가 있다.
    res.json({ list });
    // list 를 키 값으로 하는 객체를 json 형태로 stringify 해서 보내주는 거였음....
    // 왜 이런식으로 json 으로 넘겨줬는데 map 함수로 돌릴 수 없다고 하지?
    // data 타입이 객체여서 그런건가? oo
    // data 타입이 객체이고 그 객체안에 배열이 있기 때문에
    // 그 배열을 map 함수로 돌려줘야함...
});
exports.view = view;
// res.json  과 res.send의 차이 때문에 잘 되지 않는건가?
// 아님 둘다 거의 같은 거임.
