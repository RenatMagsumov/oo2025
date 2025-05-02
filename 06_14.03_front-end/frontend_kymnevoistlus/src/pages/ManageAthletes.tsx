import { useEffect, useRef, useState } from "react";
import { Athlete } from "../models/Athlete";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function ManageAthletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5074/athletes")
      .then(res => res.json())
      .then(json => setAthletes(json));
  }, []);

  const deleteAthlete = (id: number) => {
    fetch(`http://localhost:5074/athletes/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(json => {
        if (json.message === undefined) {
          setAthletes(json);
          toast.success("Athlete kustutatud!");
        } else {
          toast.error(json.message);
        }
      });
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const addAthlete = () => {
    if (!nameRef.current?.value || !countryRef.current?.value || !ageRef.current?.value) {
      toast.error("Kõik väljad peavad olema täidetud!");
      return;
    }

    const newAthlete = {
      name: nameRef.current.value,
      country: countryRef.current.value,
      age: Number(ageRef.current.value)
    };

    fetch("http://localhost:5074/athletes", {
      method: "POST",
      body: JSON.stringify(newAthlete),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => {
        if (json.message === undefined) {
          setAthletes(json);
          toast.success("Uus athlete lisatud!");
          if (nameRef.current) nameRef.current.value = "";
          if (countryRef.current) countryRef.current.value = "";
          if (ageRef.current) ageRef.current.value = "";
        } else {
          toast.error(json.message);
        }
      });
  };

  const sortAZ = () => {
    setAthletes([...athletes].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const sortZA = () => {
    setAthletes([...athletes].sort((a, b) => b.name.localeCompare(a.name)));
  };

  return (
    <div>
      <h2>Manage Athletes</h2>

      <button onClick={sortAZ}>Sort by: A-Z</button>
      <button onClick={sortZA}>Sort by: Z-A</button>

      <label>Name</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Country</label> <br />
      <input ref={countryRef} type="text" /> <br />
      <label>Age</label> <br />
      <input ref={ageRef} type="number" /> <br />
      <button onClick={addAthlete}>Add</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete) => (
            <tr key={athlete.id}>
              <td>{athlete.id}</td>
              <td>{athlete.name}</td>
              <td>{athlete.country}</td>
              <td>{athlete.age}</td>
              <td>
                <button onClick={() => deleteAthlete(athlete.id)}>Delete</button>
                <button onClick={() => navigate(`/admin/athlete/${athlete.id}/edit`)}>Muuda</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default ManageAthletes;
