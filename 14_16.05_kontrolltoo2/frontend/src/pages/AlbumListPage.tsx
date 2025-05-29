import React, { useEffect, useState } from "react";
import { Album } from "../models/album";
import { User } from "../models/user";
import AlbumCard from "../components/AlbumCard";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import AlbumForm from "../components/AlbumForm";

const PAGE_SIZE = 5; // размер страницы

const AlbumListPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Добавляем пагинацию:
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchAlbums = (userId?: number, pageNumber: number = 0) => {
    // Формируем URL с пагинацией
    let url = "";
    if (userId !== undefined && userId !== null) {
      url = `http://localhost:5074/users/${userId}/albums?page=${pageNumber}&size=${PAGE_SIZE}`;
    } else {
      url = `http://localhost:5074/albums?page=${pageNumber}&size=${PAGE_SIZE}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        // Ожидаем, что data имеет структуру с полями content, totalPages и number
        setAlbums(data.content || []);
        setTotalPages(data.totalPages || 0);
        setPage(data.number || 0);
      })
      .catch(err => console.error("Failed to fetch albums", err));
  };

  const fetchUsers = () => {
    fetch("http://localhost:5074/users")
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  };

  useEffect(() => {
    fetchAlbums(undefined, 0);
    fetchUsers();
  }, []);

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    fetchAlbums(userId, 0);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      fetchAlbums(selectedUserId || undefined, page - 1);
    }
  };

  const handleNextPage = () => {
    if (page + 1 < totalPages) {
      fetchAlbums(selectedUserId || undefined, page + 1);
    }
  };

  return (
    <div>
      <h1>Albums</h1>

      <UserForm onUserCreated={fetchUsers} />
      <AlbumForm users={users} onAlbumCreated={() => fetchAlbums(selectedUserId || undefined, page)} />

      <UserList onUserSelect={handleUserSelect} />

      {albums.length === 0 && <p>No albums found.</p>}
      {albums.map(album => (
        <AlbumCard key={album.id} album={album} />
      ))}

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevPage} disabled={page === 0}>
        previous
        </button>
        <span style={{ margin: "0 10px" }}>
          page {page + 1} / {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page + 1 >= totalPages}>
          next
        </button>
      </div>
    </div>
  );
};

export default AlbumListPage;
