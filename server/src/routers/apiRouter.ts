import Post from "../models/Music";
import express from "express";
import {
  registerView,
  searchTitle,
  viewMusic,
  deletePost,
  postUpdateMusic,
  join,
  login,
  logOut,
  getUpdateProfile,
  postUpdateProfile,
  postUpdateProfileImage,
  postUpload,
  getUserInfo,
  getMusicList,
  postComment,
  deleteComment,
  getUserProfile,
  getComment,
} from "../controllers/Controllers";
import { verifyToken } from "../middlewares/authorization";
import User from "../models/User";
import { uploadFiles, uploadMusic } from "../middlewares/middlewares";

const apiRouter = express.Router();

apiRouter.post("/:id/update", postUpdateMusic);
apiRouter.get("/musics/:id", viewMusic);
apiRouter.get("/data", registerView);
apiRouter.get("/musics", getMusicList);
apiRouter.post("/delete/:id", deletePost);

apiRouter.post(
  "/upload",
  uploadMusic.fields([
    { name: "music", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  verifyToken,
  postUpload
);

apiRouter.get("/search", searchTitle);

//user
apiRouter.post("/user/join", join);
apiRouter.post("/user/login", login);

// apiRouter.get("/user/info", (req: any, res: any, next) => {
//   res.json({ loggedIn: req.session.loggedIn, user: req.session.user });
// });

apiRouter.get("/user/info", verifyToken, getUserInfo);

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

apiRouter
  .route("/musics/:id/comment")
  .get(getComment)
  .post(verifyToken, postComment);
apiRouter.post("/:id/comment/delete", verifyToken, deleteComment);
apiRouter.route("/profile/:id").get(getUserProfile);

export default apiRouter;
