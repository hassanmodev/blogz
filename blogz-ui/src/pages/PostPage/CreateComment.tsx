import { useState } from "react";
import { useDispatch } from "react-redux";
import { PostApi, useCreateCommentMutation } from "../../features/post/postAPI";
import { toast } from "react-toastify";
import { MyInput } from "../../components/RegisterModal";

const CreateComment: React.FC<{ postId: string }> = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [commenter, setCommenter] = useState('');

  const [createComment] = useCreateCommentMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;
    try {
      await createComment({ postId, content: comment, commenter });
      dispatch(PostApi.util.invalidateTags(['PostSingle']));
      setComment('');
      setCommenter('');
      toast.success('Comment created successfully');
      
    } catch (error) {
      toast.error('An error has occurred.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h4 className="text-lg font-bold my-4">Leave a comment:

      </h4>
      <MyInput
        label="Name"
        value={commenter}
        onChange={(e) => setCommenter(e.target.value)}
        placeholder="Enter your name"
        autoComplete="off"
        className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        id="name"
        required
        type="input"
      />
      <MyInput
        label="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your comment"
        autoComplete="off"
        className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        id="comment"
        required
        type="textarea"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateComment;