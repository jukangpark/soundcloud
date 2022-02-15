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
  postUpload,
} from "../controllers/Controllers";
import { verifyToken } from "../middlewares/authorization";
import User from "../models/User";
import { uploadFiles, uploadMusic } from "../middlewares/middlewares";

const apiRouter = express.Router();

apiRouter.post("/:id/update", update);
apiRouter.get("/view/:id", viewPost);
apiRouter.get("/data", registerView);
apiRouter.get("/view", view);
apiRouter.post("/delete/:id", deletePost);

apiRouter.post(
  "/write",
  uploadMusic.fields([
    { name: "music", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  postUpload
);

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
