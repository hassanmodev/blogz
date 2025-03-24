import { Comment } from "../../types/post.types";

const Comments = ({ comments }: { comments?: Comment[] }) => {
  if (!comments) comments = [];
  return <div className="mt-12">
    <h2 className="text-xl font-bold mb-4">Comments</h2>
    {!comments.length && <div>No comments yet.</div>}
    {comments.map((comment) => (
      <div key={comment.id} className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-gray-600">{comment.content}</div>
        <div className="text-gray-500 text-sm mt-2">By {comment.commenter}</div>
      </div>
    ))}
  </div>
}

export default Comments;