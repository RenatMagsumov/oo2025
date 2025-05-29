import React, { useState } from "react";

const UserForm = ({ onUserCreated }: { onUserCreated: () => void }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:5074/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then(() => {
        setName("");
        onUserCreated();
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New User</h3>
      <input
        type="text"
        value={name}
        placeholder="User name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default UserForm;
