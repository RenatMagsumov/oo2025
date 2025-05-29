import React, { useState } from "react";
import { User } from "../models/user";

const AlbumForm = ({
  users,
  onAlbumCreated,
}: {
  users: User[];
  onAlbumCreated: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === "" || userId === undefined) return;

    fetch("http://localhost:5074/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        user: { id: userId },
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setTitle("");
        setUserId("");
        onAlbumCreated();
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Album</h3>
      <input
        type="text"
        value={title}
        placeholder="Album title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select
        value={userId}
        onChange={(e) =>
          setUserId(e.target.value === "" ? "" : Number(e.target.value))
        }
        required
      >
        <option value="">Select user</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Album</button>
    </form>
  );
};

export default AlbumForm;
