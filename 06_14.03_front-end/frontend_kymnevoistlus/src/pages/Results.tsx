import { useEffect, useState } from "react";
import { Result } from "../models/Result";

function Results() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    fetch("http://localhost:5074/results")
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setResults(json);
      });
  }, []);

  const sortAZ = () => {
    setResults([...results].sort((a, b) => a.event.localeCompare(b.event)));
  };

  const sortZA = () => {
    setResults([...results].sort((a, b) => b.event.localeCompare(a.event)));
  };

  return (
    <div>
      <button onClick={sortAZ}>Sort by: A-Z</button>
      <button onClick={sortZA}>Sort by: Z-A</button>

      {results.map(result =>
        <div key={result.id}>
          <div>ID: {result.id}</div>
          <div>Event: {result.event}</div>
          <div>Score: {result.score}</div>

          <div>
            <div>{result.athlete?.name}</div>
            <div>{result.athlete?.country}</div>
            <div>{result.athlete?.age} years old</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
