import React from 'react'

const ReviewItem = (props) => {
    const {name,quantity,key} = props.product
    return (
        <div className="review-item">
            <p>{name}</p>
            <p>{quantity}</p>
            <br/>
            <button 
            onClick={() => props.removeProduct(key)}
            className="main-btn"> Remove Item </button>
        </div>
    )
}

export default ReviewItem
