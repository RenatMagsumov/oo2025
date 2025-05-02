import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResultEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5074/results/${id}`)
      .then(response => response.json())
      .then(data => {
        setEvent(data.event);
        setScore(data.score);
      });
  }, [id]);

  function update() {
    const updatedResult = { event, score };
    fetch(`http://localhost:5074/results/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedResult)
    }).then(() => navigate(`/result/${id}`));
  }

  return (
    <div>
      <h2>Tulemuse muutmine</h2>
      <label>Ala</label>
      <input value={event} onChange={e => setEvent(e.target.value)} /><br />
      <label>Tulemus</label>
      <input type="number" value={score} onChange={e => setScore(Number(e.target.value))} /><br />
      <button onClick={update}>Salvesta</button>
    </div>
  );
}

export default ResultEdit;