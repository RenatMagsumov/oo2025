import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AthleteEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5074/athletes/${id}`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setCountry(data.country);
        setAge(data.age);
      });
  }, [id]);

  function update() {
    const updatedAthlete = { name, country, age };
    fetch(`http://localhost:5074/athletes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAthlete)
    }).then(() => navigate(`/athlete/${id}`));
  }

  return (
    <div>
      <h2>Sportlase muutmine</h2>
      <label>Nimi</label>
      <input value={name} onChange={e => setName(e.target.value)} /><br />
      <label>Riik</label>
      <input value={country} onChange={e => setCountry(e.target.value)} /><br />
      <label>Vanus</label>
      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} /><br />
      <button onClick={update}>Salvesta</button>
    </div>
  );
}

export default AthleteEdit;