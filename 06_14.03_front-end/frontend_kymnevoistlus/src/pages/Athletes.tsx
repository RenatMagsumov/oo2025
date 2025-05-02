import React, { useEffect, useState } from 'react'
import { Athlete } from '../models/Athlete';

function Athletes() { 
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    fetch("http://localhost:5074/athletes")
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setAthletes(json);
      });
  }, []);

  const sortAZ = () => {
    setAthletes([...athletes].sort((a, b) => a.name.localeCompare(b.name)));
  };
/// "...athletes" - ... = kooperitakse koike "athletes" massivi andmeid uue massivi, kus me neid juba hiljem vordleme
/// teeme dublikaati
/// localeCompare vastutab aabitsa jargi vordlemise eest
  const sortZA = () => {
    setAthletes([...athletes].sort((a, b) => b.name.localeCompare(a.name)));
  };

  return (
    <div>
      <button onClick={sortAZ}>Sort by: A-Z</button>
      <button onClick={sortZA}>Sort by: Z-A</button>

      {athletes.map(athlete =>
        <div key={athlete.id}>
          <div>ID: {athlete.id}</div>
          <div>Name: {athlete.name}</div>
          <div>Country: {athlete.country}</div>
          <div>Age: {athlete.age}</div>
        </div>
      )}
    </div>
  );
}

export default Athletes;
