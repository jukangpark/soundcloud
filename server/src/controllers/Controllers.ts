import Post from "../models/POST";

export const registerView = (req: any, res: any) => {
  console.log("register view에 도착했습니다.");
  res.json({ hello: "hello world" });
};

export const view = (req: any, res: any) => {
  //   console.log("view에 도착했습니다.");
  //   const list = Post.find({}); // 여기서 json 객체가 좀 잘못 오는건가?
  //   console.log(list);
  res.json({ fuck: "fucking view" });

  // res.send 로 보냈을 때
  // You need to enable JavaScript to run this app 이런 response가 나왔기 때문에
  // json 형태가 아니라서 거부가되었음.

  // res.json 으로 배열로 감싸서 보냈더니 [{title: "asdf"}] 똑같은 에러가 나옴.
};

// res.json  과 res.send의 차이 때문에 잘 되지 않는건가?
