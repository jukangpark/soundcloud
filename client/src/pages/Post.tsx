import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import { IPost } from "./Home";

export interface IParams {
  id: string;
}

const Post = () => {
  const { id } = useParams<IParams>();
  const [post, setPost] = useState<IPost>();
  const user = useRecoilValue(userState);

  function DeleteButton() {
    let history = useHistory();

    const handleClick = () => {
      fetch(`/api/delete/${id}`, {
        method: "POST",
      });
      history.push("/");
    };

    return <button onClick={handleClick}>delete</button>;
  }

  console.log(id);
  useEffect(() => {
    fetch(`/api/view/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data.post));
  }, []);
  console.log(post);
  return (
    <div>
      <Header />
      <MainTitle>Post</MainTitle>
      <div>
        <p>{post?.title}</p>
        <p>{post?.content}</p>
        <p>{post?.createdAt}</p>
      </div>
      <button>
        <Link to={`/${id}/update`}>update</Link>
      </button>

      <DeleteButton />
      <div>
        <h1>댓글</h1>
        <p>댓글1</p>
        <p>댓글2</p>
        <p>댓글3</p>
      </div>
    </div>
  );
};

export default Post;

// redirect 되게 하는 법.
