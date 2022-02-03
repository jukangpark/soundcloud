import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import { IPost } from "./Home";

export interface IParams {
  id: string;
}

const Post = () => {
  const { id } = useParams<IParams>();
  const [post, setPost] = useState<IPost>();

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
    </div>
  );
};

export default Post;

// redirect 되게 하는 법.
