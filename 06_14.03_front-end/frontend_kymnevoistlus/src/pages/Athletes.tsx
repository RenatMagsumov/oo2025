import React, { useEffect, useState } from 'react'
import { Athlete } from '../models/Athlete';


function Athletes() 
{ 
    const[athletes, setAthletes] = useState<Athlete[]>([ ])
    useEffect(() => {
      fetch("http://localhost:5074/athletes")
        .then(res => res.json())
        .then(json => {
          console.log(json);
          setAthletes(json);
        });
    }, []);
  return (
    <div>
      {athletes.map(athlete =>
        <div key={athlete.id}>
            <div>ID: {athlete.id}</div>
          <div>Name: {athlete.name}</div>
          <div>Country: {athlete.country}</div>
          <div>age: {athlete.age}</div>

  
        </div>
      )}
    </div>
  )
}

export default Athletes