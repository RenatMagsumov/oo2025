import { useEffect, useRef, useState } from "react";
import { Result } from "../models/Result";
import { Athlete } from "../models/Athlete";
import { ToastContainer, toast } from 'react-toastify';

function ManageResults() {

  const [results, setResults] = useState<Result[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    fetch("http://localhost:5074/results")
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) {
          setResults(json);
        } else {
          toast.error("Viga: tulemused ei ole massiiv!");
        }
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5074/athletes")
      .then(res => res.json())
      .then(json => setAthletes(json));
  }, []);

  const deleteResult = (id: number) => {
    fetch(`http://localhost:5074/results/${id}`, {
      method: "DELETE",
    }).then(() =>
      setResults(results.filter(result => result.id !== id))
    );
  };

  const eventRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef<HTMLInputElement>(null);
  const athleteRef = useRef<HTMLSelectElement>(null);

  const addResult = () => {
    if (!eventRef.current?.value || !scoreRef.current?.value || !athleteRef.current?.value) {
      toast.error("Kõik väljad peavad olema täidetud!");
      return;
    }

    const newResult = {
      event: eventRef.current.value,
      score: Number(scoreRef.current.value),
      athlete: { id: Number(athleteRef.current.value) }
    };

    fetch("http://localhost:5074/results", {
      method: "POST",
      body: JSON.stringify(newResult),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
          // перезапрашиваем всё заново
          fetch("http://localhost:5074/results")
            .then(res => res.json())
            .then(data => {
              if (Array.isArray(data)) {
                setResults(data);
                toast.success("Uus result lisatud!");
              } else {
                toast.error("Server ei tagastanud tulemuste massiivi.");
              }
            });
        } else {
          toast.error(json.message);
        }
      });
  };

  return (
    <div>
      <h2>Manage Results</h2>

      <label>Event</label> <br />
      <input ref={eventRef} type="text" /> <br />
      <label>Score</label> <br />
      <input ref={scoreRef} type="number" /> <br />
      <label>Athlete</label> <br />
      <select ref={athleteRef}>
        {athletes.map(athlete => (
          <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
        ))}
      </select>
      <br />
      <button onClick={addResult}>Add result</button>

      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Score</th>
            <th>Athlete</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(results) ? results.map((result) => (
            <tr key={result.id}>
              <td>{result.event}</td>
              <td>{result.score}</td>
              <td>{result.athlete?.name}</td>
              <td>
                <button onClick={() => deleteResult(result.id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={4}>Tulemusi ei leitud või andmetüüp on vale.</td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default ManageResults;
