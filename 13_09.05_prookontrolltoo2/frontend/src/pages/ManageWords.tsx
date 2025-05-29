import { useEffect, useState } from "react";
import { Sona } from "../models/Sona";
import { toast } from "react-toastify";

function ManageWords() {
  const [words, setWords] = useState<Sona[]>([]);

  useEffect(() => {
    fetch("http://localhost:5074/sonad")
      .then((res) => res.json())
      .then((json) => setWords(json.content ?? json));
  }, []);

  const deleteWord = (id: number) => {
    fetch(`http://localhost:5074/sonad/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setWords(words.filter((w) => w.typeId !== id));
          toast.success("Kustutatud!");
        } else {
          toast.error("Kustutamine ebaõnnestus");
        }
      });
  };

  return (
    <div>
      <h2>Halda sõnu</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sõna</th>
            <th>Tegevus</th>
          </tr>
        </thead>
        <tbody>
          {words.map((w) => (
            <tr key={w.typeId}>
              <td>{w.typeId}</td>
              <td>{w.type}</td>
              <td>
                <button onClick={() => deleteWord(w.typeId)}>Kustuta</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageWords;