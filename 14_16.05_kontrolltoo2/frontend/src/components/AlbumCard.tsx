import { useState } from "react";
import { Album } from "../models/album";
import CommentForm from "./CommentForm";

interface Props {
  album: Album;
}

function AlbumCard({ album }: Props) {
  const [currentAlbum, setCurrentAlbum] = useState<Album>(album);

  const reloadAlbum = async () => {
    const res = await fetch(`http://localhost:5074/albums/${album.id}`);
    const updated = await res.json();
    setCurrentAlbum(updated);
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <h3>{currentAlbum.title}</h3>
      <p><strong>User:</strong> {currentAlbum.userId}</p>

      <h4>Kommentaarid:</h4>
      <ul>
        {currentAlbum.comments?.map((comment) => (
          <li key={comment.id}>
            {comment.content}
            <CommentForm comment={comment} onCommentAdded={reloadAlbum} />
          </li>
        ))}
      </ul>

      <CommentForm albumId={currentAlbum.id} onCommentAdded={reloadAlbum} />
    </div>
  );
}

export default AlbumCard;
