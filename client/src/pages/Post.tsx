import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import { IPost } from "./Home";

interface IParams {
  id: string;
}

const Post = () => {
  const { id } = useParams<IParams>();
  const [post, setPost] = useState<IPost>();

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
      <Link to={`/api/delete/${id}`}>delete</Link>
    </div>
  );
};

export default Post;
