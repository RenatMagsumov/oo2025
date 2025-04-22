import { useEffect, useState } from 'react';
import { Athlete } from '../models/Athlete';

function MainPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [totalAthletes, setTotalAthletes] = useState(0);
  const [page, setPage] = useState(0);
  const [activeCountry, setActiveCountry] = useState('');
  const athletesByPage = 3;

  useEffect(() => {
    fetch("http://localhost:5074/athletes/countries")
      .then(res => res.json())
      .then(json => setCountries(json));
  }, []);

  useEffect(() => {
    showByCountry('', 0);
  }, []);

  function showByCountry(country: string, currentPage: number) {
    setActiveCountry(country);
    setPage(currentPage);
    fetch("http://localhost:5074/athletes/athlete-country?country=" + country + "&size=" + athletesByPage + "&page=" + currentPage)
      .then(res => res.json())
      .then(json => {
        setAthletes(json.content);
        setTotalAthletes(json.totalElements);
      });
  }

  function updatePage(newPage: number) {
    showByCountry(activeCountry, newPage);
  }

  return (
    <div>
      <button onClick={() => showByCountry('', 0)}>
        All countries
      </button>

      {countries.map(country =>
        <button key={country} onClick={() => showByCountry(country, 0)}>
          {country}
        </button>
      )}

      <br /><br />

      {athletes.map(athlete =>
        <div key={athlete.id}>
          <div>{athlete.name}</div>
          <div>{athlete.country}</div>
          <div>{athlete.age}</div>
          <br />
        </div>
      )}

      <button disabled={page === 0} onClick={() => updatePage(page - 1)}>Previous</button>
      <button disabled={page === Math.ceil(totalAthletes / athletesByPage - 1)} onClick={() => updatePage(page + 1)}>Next</button>
    </div>
  );
}

export default MainPage;
