import Post from "../models/Music";
import express from "express";
import {
  registerView,
  view,
  searchTitle,
  viewPost,
  deletePost,
  update,
  join,
  login,
  logOut,
  getUpdateProfile,
  postUpdateProfile,
  postUpdateProfileImage,
} from "../controllers/Controllers";
import { verifyToken } from "../middlewares/authorization";
import User from "../models/User";
import { uploadFiles } from "../middlewares/middlewares";

const apiRouter = express.Router();

apiRouter.post("/:id/update", update);
apiRouter.get("/view/:id", viewPost);
apiRouter.get("/data", registerView);
apiRouter.get("/view", view);
apiRouter.post("/delete/:id", deletePost);

apiRouter.post("/write", async (req, res) => {
  const { title, content } = req.body;
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

//user
apiRouter.post("/user/join", join);
apiRouter.post("/user/login", login);

// apiRouter.get("/user/info", (req: any, res: any, next) => {
//   res.json({ loggedIn: req.session.loggedIn, user: req.session.user });
// });

apiRouter.get("/user/info", verifyToken, async (req, res, next) => {
  const user = res.locals.user;
  const findedUser = await User.findById(user.user_id);
  res.send(findedUser);
});

apiRouter.get("/user/logout", logOut);

apiRouter
  .route("/profile/:id/update")
  .get(getUpdateProfile)
  .post(postUpdateProfile);

apiRouter
  .route("/profile/:id/postUpdateProfileImage")
  .post(
    uploadFiles.single("profileImage"),
    verifyToken,
    postUpdateProfileImage
  );

export default apiRouter;
