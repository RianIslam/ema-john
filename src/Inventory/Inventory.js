import React from 'react'
import fakeData from '../fakeData'

const Inventory = () => {
    const handleAddProduct=() =>{
        const product ={}
        fetch('https://pure-harbor-99045.herokuapp.com/addProduct',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
    }
    return (
        <form >
        <p><span>Name:</span> <input type="text"/></p>
        <p><span>Quantity:</span> <input type="text"/></p>
        <p><span>Price:</span> <input type="text"/></p>
        <p><span>Product Image:</span> <input type="file"/></p>
            <button onClick={handleAddProduct}>Add Product</button>
        </form>
    )
}

export default Inventory
