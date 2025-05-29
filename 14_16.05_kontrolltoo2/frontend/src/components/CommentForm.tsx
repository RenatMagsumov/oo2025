import { useState } from "react";
import { Comment } from "../models/comment";

interface Props {
  albumId?: number;
  comment?: Comment;
  onCommentAdded?: () => void;
}

function CommentForm({ albumId, comment, onCommentAdded }: Props) {
  const [content, setContent] = useState(comment?.content || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = comment
      ? `http://localhost:5074/comments/${comment.id}`
      : `http://localhost:5074/comments/${albumId}`;
    const method = comment ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    alert(comment ? "Kommentaar muudetud!" : "Kommentaar lisatud!");

    if (!comment) setContent("");
    if (onCommentAdded) onCommentAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Kommentaar..."
      />
      <button type="submit">{comment ? "Muuda" : "Lisa"}</button>
    </form>
  );
}

export default CommentForm;
