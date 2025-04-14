import { useEffect, useState } from 'react'
import { Result } from '../models/Result'
import { Athlete } from '../models/Athlete'

function MainPage() 

{

    const [results, setResults] = useState<Result[]>([])
    const [athletes, setAthletes] = useState<Athlete[]>([])
 //uef => onload
 useEffect(() => {
   fetch("http://localhost:5074/results")
             .then(res=>res.json())
             .then(json=>setResults(json))
 }, []);
 
 useEffect(() => {
   fetch("http://localhost:5074/athletes")
             .then(res=>res.json())
             .then(json=>setAthletes(json))
 }, []);  
  return (
    <div>
        {athletes.map(athlete => 
      <div key={athlete.name}>
        {athlete.country} {athlete.age}
      </div> )}
      <br />
      <br />
      {results.map(result => 
      <div key={result.id}>
        <div>{result.id}</div>
        <div>{result.event}</div>
        <div>{result.score}</div>
        <div>{result.athlete?.id}</div>
      </div> )}
    </div>
    
  )
}

export default MainPage