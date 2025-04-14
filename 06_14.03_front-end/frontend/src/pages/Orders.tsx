import { useEffect, useState } from "react";
import { Order } from "../models/Order"

function Orders() 
{
    const[orders, setOrders] = useState<Order[]>([ ])
    useEffect(() => 
    {
        fetch("http://localhost:5074/orders")
        .then(res => res.json())
        .then(json => console.log(json))
    }, []);

  return (
    <div>
      {orders.map(order =>
        <div key={order.id}>
          <div>ID: {order.id}</div>
          <div>Created: {order.created.toString()}</div>
          <div>Email: {order.person?.email}</div>
          <div>TotalSum: {order.totalSum} euro</div>
          
          <div>{order.products.map(product => 
            <div key = {product.id}> 
              <div>{product.name}</div>
              <div>{product.price} euro</div>
            </div>)}
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders