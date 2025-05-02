import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Result {
  id: number;
  event: string;
  score: number;
  athlete: {
    id: number;
    name: string;
  };
}

function SingleResult() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5074/results/${id}`)
      .then(response => response.json())
      .then(data => setResult(data));
  }, [id]);

  if (!result) return <div>Loading...</div>;

  return (
    <div>
      <h2>Tulemuse detailvaade</h2>
      <div>Ala: {result.event}</div>
      <div>Tulemus: {result.score}</div>
      <div>Sportlane: {result.athlete.name}</div>
      <button onClick={() => navigate(`/admin/result/${result.id}/edit`)}>Muuda</button>
    </div>
  );
}

export default SingleResult;
