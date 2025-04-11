import { useEffect, useState } from 'react'
import './App.css'

import { Athlete } from './models/Athlete'
import { Result } from './models/Result'

function App() {
  const sonad = ["See", "on", "kodutoo"]
  const autod = 
  [
    {"mark": "BMW", "mudel": "i5", "year": 2015},
    {"mark": "Mercedes", "mudel": "S", "year": 2014},
    {"mark": "Audi", "mudel": "TT", "year": 2016},
    {"mark": "Volkswagen", "mudel": "Golf", "year": 2012}
  ]
  const [athletes, setAthletes] = useState<Athlete[]>([])
   const [results, setResults] = useState<Result[]>([])
//uef => onload
useEffect(() => {
  fetch("http://localhost:5074/athletes")
            .then(res=>res.json())
            .then(json=>setAthletes(json))
}, []);
useEffect(() => {
  fetch("http://localhost:5074/results")
            .then(res=>res.json())
            .then(json=>setResults(json))
}, []);


  
  return (
    <>
      
      {sonad.map(sona => 
      <div key={sona}>
        {sona}
      </div> )}
      <br />
      <br />
      {autod.map(auto => 
      <div key={auto.mark+auto.mudel}>
        {auto.mark} - {auto.mudel} ({auto.year})
      </div> )}
      <br />
      <br />
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
        <div>{result.athlete? result.athlete.name: "NAME_IS_NULL"}</div>
      </div> )}
    </>
  )
}

export default App
