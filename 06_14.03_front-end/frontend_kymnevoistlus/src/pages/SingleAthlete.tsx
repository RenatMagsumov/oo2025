import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Athlete {
  id: number;
  name: string;
  country: string;
  age: number;
}

function SingleAthlete() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState<Athlete | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5074/athletes/${id}`)
      .then(response => response.json())
      .then(data => setAthlete(data));
  }, [id]);

  if (!athlete) return <div>Loading...</div>;

  return (
    <div>
      <h2>Sportlane detailvaade</h2>
      <div>Nimi: {athlete.name}</div>
      <div>Riik: {athlete.country}</div>
      <div>Vanus: {athlete.age}</div>
      <button onClick={() => navigate(`/admin/athlete/${athlete.id}/edit`)}>Muuda</button>
    </div>
  );
}

export default SingleAthlete;
