import { useParams } from "react-router";
import { useGetPostByIdQuery } from "../features/post/postAPI";
import { Comment } from "../types/post.types";

const Comments = ({ comments }: { comments?: Comment[] }) => {
  if (!comments) comments = [];
  return <div className="mt-12">
    <h2 className="text-xl font-bold mb-4">Comments</h2>
    {!comments.length && <div>No comments yet.</div>}
    {comments.map((comment) => (
      <div key={comment.id} className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-gray-600">{comment.content}</div>
      </div>
    ))}
  </div>
}

const PostPage = () => {
  const postId = useParams().id;
  const { data: post, isLoading } = useGetPostByIdQuery(postId as string);

  if (isLoading || !post) return <>....</>
  return <div className="my-12">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">
      {post.title}
    </h1>

    <div className="text-gray-600 mb-4">
      {post.content}
    </div>

    <Comments comments={post.comments} />

  </div>;
}


export default PostPage;