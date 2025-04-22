import { act, useEffect, useState } from 'react'
import { Category } from '../models/Category'
import { Product } from '../models/Product'
import { Button } from 'react-bootstrap'

function MainPage() 

{

    const [kategooriad, setKategooriad] = useState<Category[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const productsByPage = 1
    const [totalProducts, setTotalProducts] = useState(0)
    const [page, setPage] = useState(0);
    const [activeCategory, setActiveCategory] = useState(-1)
 //uef => onload
 useEffect(() => {
   fetch("http://localhost:5074/categories")
             .then(res=>res.json())
             .then(json=>setKategooriad(json))
 }, []);
 
 useEffect(() => {
   showByCategory(-1, 0)
 }, []);  

 function showByCategory(categoryId: number, currentPage: number)
 {
    setActiveCategory(categoryId)
    setPage(currentPage)
    fetch("http://localhost:5074/category-products?categoryId=" + categoryId + "&size=" + productsByPage + "&page=" + currentPage)
    .then(res=>res.json())
    .then(json=> 
      {
         setProducts(json.content) 
         setTotalProducts(json.totalElements)
      })
 }

  function updatePage(newPage: number)
  {
    showByCategory( activeCategory, newPage)
  }
  
  return (
    <div>
      <button onClick={() => showByCategory(-1, 0)}>All categories</button>

      {kategooriad.map(kategooria => 
      <button key={kategooria.id} onClick={() => showByCategory(kategooria.id, 0)}>
      {kategooria.name} 
      </button> )}
      <br />
      <br />
      <div>Products total: {totalProducts}</div>
      {products.map(product => 
      <div key={product.id}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.image}</div>
        <div>{product.category?.name}</div>
      </div> )}
      <button disabled = {page === 0} onClick={() => updatePage(page -1)}>Previous</button>
      <span>{page + 1}</span>
      <button disabled = {page === Math.ceil(totalProducts/productsByPage-1)} onClick={() => updatePage(page +1)}>Next</button>

    </div>
    
  )
}

export default MainPage