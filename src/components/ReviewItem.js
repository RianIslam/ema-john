import React from 'react'

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product
    return (
        <div className="review-item">
            <h3 className="product-name"> {name}</h3>
            <p>Quantity: {quantity}</p>
            <p><small>Price: ${price}</small></p>
            <br/>
            <button 
            onClick={() => props.removeProduct(key)}
            className="main-btn"> Remove Item </button>
        </div>
    )
}

export default ReviewItem
