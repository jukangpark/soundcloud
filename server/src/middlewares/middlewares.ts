const multer = require("multer");
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: `${process.env.AWS_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET}`,
  },
});

const isHeroku = process.env.NODE_ENV === "production";

const s3ProfileImageUploader = multerS3({
  s3: s3,
  bucket: "soundcloudclonee/profile",
  acl: "public-read",
});

const s3MusicUploader = multerS3({
  s3: s3,
  bucket: "soundcloudclonee/music",
  acl: "public-read",
});

export const uploadFiles = multer({
  dest: "uploads/profile",
  storage: isHeroku ? s3ProfileImageUploader : undefined,
});

export const uploadMusic = multer({
  dest: "uploads/music",
  storage: isHeroku ? s3MusicUploader : undefined,
});
// multer 는 멋지기 때문에 파일을 받아서 uploads 폴더에 저장한다음
// 그 파일 정보를 postUpdateProfile 로 넘겨줌.
