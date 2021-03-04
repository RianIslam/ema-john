import React from 'react'

const ReviewItem = (props) => {
    const {name} = props.product
    return (
        <div className="review-item">
            <p>{name}</p>
            <br/>
            <button className="main-btn"> Remove Item </button>
        </div>
    )
}

export default ReviewItem
