const multer = require("multer");

export const uploadFiles = multer({ dest: "uploads/profile" });

// multer 는 멋지기 때문에 파일을 받아서 uploads 폴더에 저장한다음
// 그 파일 정보를 postUpdateProfile 로 넘겨줌.
