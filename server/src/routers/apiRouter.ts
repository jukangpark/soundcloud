import Post from "../models/POST";
import express from "express";
import { registerView, view, searchTitle } from "../controllers/Controllers";

const apiRouter = express.Router();

apiRouter.get("/data", registerView);
apiRouter.get("/view", view);

apiRouter.post("/write", async (req, res) => {
  const { title, content } = req.body;
  console.log(title, content);
  try {
    const newPost = await Post.create({
      title,
      content,
    });

    // const _id = req.body._id;
    // const board = await Board.find({writer: _id})
    // res.json({list: board});

    // const board = await Board.find({_id});
    // res.json({board});
    // 뭐 이런식으로 몽구스 조회해서 보내버리네잉.. json 형태로.
  } catch (error) {
    return res.status(400).redirect("/");
  }
  res.redirect("/");
});

apiRouter.get("/search", searchTitle);

export default apiRouter;
