import jwt from "jsonwebtoken";

export const verifyToken = (req: any, res: any, next: any) => {
  interface IDecodedUser {
    user_id: string;
    iat: number;
    exp: number;
  }
  console.log(req.cookies.user);
  try {
    const clientToken = req.cookies.user;
    const decoded = jwt.verify(
      clientToken,
      process.env.SECRET_KEY || "secret key"
    );
    if (decoded) {
      res.locals.user = decoded;
      next();
    } else {
      res.status(401).json({ error: "unauthorized" });
    }
  } catch (err) {
    res.status(401).json({ error: "token expired" });
  }
};
