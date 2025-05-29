import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sona } from "../models/Sona";

function WordsByHaldaja() {
  const { id } = useParams();
  const [words, setWords] = useState<Sona[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5074/haldajad/${id}/sonad`)
      .then(res => res.json())
      .then(json => setWords(json));
  }, [id]);

  return (
    <div>
      <h2>Haldaja sõnad</h2>
      {words.map(w => (
        <div key={w.typeId}>
          <div><b>{w.type}</b></div>
          <div>{w.description}</div>
        </div>
      ))}
    </div>
  );
}

export default WordsByHaldaja;