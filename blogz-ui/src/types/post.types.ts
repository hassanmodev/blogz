export interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
  }
  authorId: string;
  createdAt: string;
  imageUrl?: string;
  content: string;
  comments?: Comment[];
}
export interface Comment {
  id: string;
  content: string;
  author: string;
}
export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

export const getPostImageUrl = (post?: Post) => post?.imageUrl || `https://picsum.photos/seed/${post?.id ?? '0'}/1200/900`;
