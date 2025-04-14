

function Arrayd() 
{
    const sonad = ["Elas", "metsas", "karu"]
    const autod = 
    [
        {"mark": "BMW", "mudel": "i5", "year": 2015},
        {"mark": "Mercedes", "mudel": "S", "year": 2014},
        {"mark": "Audi", "mudel": "TT", "year": 2016},
        {"mark": "Volkswagen", "mudel": "Golf", "year": 2012}
    ]
  
  
    return (
    <div>
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
    </div>
  )
}

export default Arrayd