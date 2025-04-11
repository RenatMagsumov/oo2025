import { useEffect, useState } from 'react'
import './App.css'
import { Category } from './models/Category'
import { Product } from './models/Product'

function App() {
  const sonad = ["Elas", "metsas", "karu"]
  const autod = 
  [
    {"mark": "BMW", "mudel": "i5", "year": 2015},
    {"mark": "Mercedes", "mudel": "S", "year": 2014},
    {"mark": "Audi", "mudel": "TT", "year": 2016},
    {"mark": "Volkswagen", "mudel": "Golf", "year": 2012}
  ]

   const [kategooriad, setKategooriad] = useState<Category[]>([])
   const [products, setProducts] = useState<Product[]>([])
//uef => onload
useEffect(() => {
  fetch("http://localhost:5074/categories")
            .then(res=>res.json())
            .then(json=>setKategooriad(json))
}, []);

useEffect(() => {
  fetch("http://localhost:5074/products")
            .then(res=>res.json())
            .then(json=>setProducts(json))
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
      {kategooriad.map(kategooria => 
      <div key={kategooria.id}>
        {kategooria.name} {kategooria.active}
      </div> )}
      <br />
      <br />
      {products.map(product => 
      <div key={product.id}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.image}</div>
        <div>{product.category.name}</div>
      </div> )}
    </>
  )
}

export default App
