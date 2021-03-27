import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    // const product = fakeData.find(pd =>pd.key === productKey)
  
    const [product,setProduct] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/products/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])
    return (
        <div>
            <h1>{productKey}coming soon!</h1>
            <Product showAddToCart={false} product={product}/>
        </div>
    )
}

export default ProductDetails
