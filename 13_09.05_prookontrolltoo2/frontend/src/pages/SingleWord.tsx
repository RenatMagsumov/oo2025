import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sona } from "../models/Sona";
import { toast } from "react-toastify";

function SingleWord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState<Sona | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5074/sonad/${id}`)
      .then((res) => res.json())
      .then((json) => setWord(json));
  }, [id]);

  const updateWord = () => {
    fetch(`http://localhost:5074/sonad/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(word),
    }).then((res) => {
      if (res.ok) {
        toast.success("Muudetud!", { autoClose: 1500 });// 1.5 sek => navigate to "/"
        setTimeout(() => {
          navigate("/");
        }, 1600);
      } else {
        toast.error("Muutmine ebaõnnestus", { autoClose: 2000 });
      }
    });
  };

  if (!word) return <div>Loading...</div>;

  return (
    <div>
      <label>Sõna</label>
      <div>{word.type}</div>
      <label>Tähendus</label> <br />
      <textarea
        value={word.description}
        onChange={(e) => setWord({ ...word, description: e.target.value })}
      />
      <br />
      <button onClick={updateWord}>Muuda</button>
    </div>
  );
}

export default SingleWord;
