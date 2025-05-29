import { useEffect, useState } from "react";
import { Sona } from "../models/Sona";

function MainPage() {
  const [allWords, setAllWords] = useState<Sona[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("http://localhost:5074/sonad")
      .then(res => res.json())
      .then(json => {
        setAllWords(json);
      });
  }, []);

  const sortedWords = [...allWords].sort((a, b) =>
    sortOrder === "asc"
      ? a.type.localeCompare(b.type)
      : b.type.localeCompare(a.type)
  );

  const totalPages = Math.ceil(sortedWords.length / size);
  const currentWords = sortedWords.slice(page * size, (page + 1) * size);

  const sortAZ = () => setSortOrder("asc");
  const sortZA = () => setSortOrder("desc");

  return (
    <div>
      <h2>Sõnade loend (Front-end pagination)</h2>

      <button onClick={sortAZ}>Sorteeri A-Z</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>

      {currentWords.map(word => (
        <div key={word.typeId}>
          <a href={`/word/${word.typeId}`}>{word.type}</a>
        </div>
      ))}

      <br />
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        Eelmine
      </button>
      <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
        Järgmine
      </button>
    </div>
  );
}

export default MainPage;
