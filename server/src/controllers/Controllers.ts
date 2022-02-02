import Post from "../models/POST";

export const registerView = (req: any, res: any) => {
  console.log("register view에 도착했습니다.");
  res.json({ hello: "노디몬은 잘 작동할것인가요?" });
};

export const view = async (req: any, res: any) => {
  const list = await Post.find();
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
};

// res.json  과 res.send의 차이 때문에 잘 되지 않는건가?
// 아님 둘다 거의 같은 거임.
