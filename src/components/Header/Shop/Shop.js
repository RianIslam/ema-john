import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { addToDatabaseCart, getDatabaseCart } from "../../../utilities/databaseManager";
import Cart from "../../Cart/Cart";
import Product from "../../Product/Product";
import "./Shop.css";

const Shop = () => {
  // https://pure-harbor-99045.herokuapp.com/products
  // const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);
  const [cart,setCart]= useState([]);
  const [search,setSearch] = useState('')
  useEffect(() => {
    fetch(' http://localhost:5000/products?search='+search)
    .then(res => res.json())
    .then(data => setProducts(data))
  },[search])

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart)

    fetch('https://pure-harbor-99045.herokuapp.com/productsByKeys',{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(productKeys)
  })
  .then(res => res.json())
  .then(data => setCart(data))

  },[])


    const handelSearch = event =>{
        setSearch(event.target.value)
    }

  
    const handleAddProduct = (product) =>{
      const toBeAddedKey = product.key;
      const sameProduct =cart.find(pd => pd.key === toBeAddedKey);
      let count = 1;
      let newCart;
  if(sameProduct){
    count = sameProduct.quantity + 1;
    sameProduct.quantity = count;
    const others = cart.filter(pd => pd.key !== toBeAddedKey)
    newCart =[...others,sameProduct];
  }
  else{
    product.quantity = 1;
    newCart = [...cart,product]
  }
  setCart(newCart)
  addToDatabaseCart(product.key, count)
        
    }

  return (
    <div className="shop-container">
      <div className="product-container">
        <input placeholder="Search" type="text" onBlur={handelSearch} className="product-search"/>
          {products.map((pd) => (

            <Product 
            key={pd.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={pd}>

            </Product>
          ))}
        
      </div>

      <div className="cart-container">
            <Cart cart={cart}>
            <Link to="/review"><button className="main-btn">Review</button></Link>

            </Cart>
      </div>
    </div>
  );
};

export default Shop;
