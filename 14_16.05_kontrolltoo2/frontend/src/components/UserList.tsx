import React, { useEffect, useState } from "react";
import { User } from "../models/user";

interface Props {
  onUserSelect: (userId: number) => void;
}

const UserList: React.FC<Props> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:5074/users")
      .then(res => res.json())
      .then(setUsers)
      .catch(err => console.error("Failed to fetch users", err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map(user => (
          <li key={user.id}>
            <button onClick={() => onUserSelect(user.id)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
