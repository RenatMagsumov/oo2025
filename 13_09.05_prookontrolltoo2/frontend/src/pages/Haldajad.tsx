import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Haldaja } from "../models/Haldaja";

function Haldajad() {
  const [haldajad, setHaldajad] = useState<Haldaja[]>([]);

  useEffect(() => {
    fetch("http://localhost:5074/haldajad")
      .then(res => res.json())
      .then(json => setHaldajad(json));
  }, []);

  return (
    <div>
      <h2>Haldajad</h2>
      {haldajad.map(h => (
        <div key={h.id}>
          <Link to={`/haldaja/${h.id}`}>{h.nimi}</Link>
        </div>
      ))}
    </div>
  );
}

export default Haldajad;