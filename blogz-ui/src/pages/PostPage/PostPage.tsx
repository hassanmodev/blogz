import { useParams } from "react-router";
import { useGetPostByIdQuery } from "../../features/post/postAPI";
import { getPostImageUrl } from "../../types/post.types";
import Comments from "./Comments";
import CreateComment from "./CreateComment";



const PostPage = () => {
  const postId = useParams().id;
  const { data: post, isLoading } = useGetPostByIdQuery(postId as string);
  const image = getPostImageUrl(post);

  if (isLoading || !post) return <>....</>
  return <div className="my-12 break-words">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">
      {post.title}
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