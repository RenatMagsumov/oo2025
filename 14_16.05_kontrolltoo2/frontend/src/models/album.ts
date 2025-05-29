import { Comment } from "./comment";

export interface Album {
  id: number;
  userId: number;
  title: string;
  comments: Comment[];
}
