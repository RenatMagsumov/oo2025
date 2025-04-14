import { useEffect, useState } from 'react'
import { Category } from '../models/Category'
import { Product } from '../models/Product'

function MainPage() 

{

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
    <div>
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
        <div>{product.category?.name}</div>
      </div> )}
    </div>
    
  )
}

export default MainPage