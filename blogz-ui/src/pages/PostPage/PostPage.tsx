import { useNavigate, useParams } from "react-router";
import { useGetPostByIdQuery } from "../../features/post/postAPI";
import { getPostImageUrl } from "../../types/post.types";
import Comments from "./Comments";
import CreateComment from "./CreateComment";

const Pen = ({ onClick, className }: { onClick: () => void, className: string }) => (
  <svg className={className} onClick={onClick} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
);



const PostPage = () => {
  const postId = useParams().id;
  const { data: post, isLoading } = useGetPostByIdQuery(postId as string);
  const image = getPostImageUrl(post);
  const navigate = useNavigate();
  if (isLoading || !post) return <>....</>
  return <div className="my-12 break-words">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">
      {post.title}
      <Pen onClick={() => navigate(`/edit/${post.id}`)} className="ml-4 cursor-pointer inline-block w-6 h-6" />
    </h1>

    {image && <img src={image} alt={post.title} className="mb-12 w-full h-96 object-cover rounded-lg" />}

    <div className="text-gray-600 mb-4">
      {post.content}
    </div>

    <div className="text-gray-600 mb-4">
      <strong>Author:</strong> {post.author.name}
      <br />
      <strong>Posted on:</strong> {new Date(post.createdAt).toLocaleString()}
    </div>

    <CreateComment postId={post.id} />
    <Comments comments={post.Comment} />

  </div>;
}


export default PostPage;