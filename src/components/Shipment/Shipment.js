import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './ShipMent.css';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
   
    const onSubmit = data =>{
       console.log(data);
       const savedCart = getDatabaseCart();
       const orderDetails = {...loggedInUser,products: savedCart,shipment: data,orderTime: new Date()}

       fetch('http://localhost:5000/addOrder',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data =>{
      if(data){
        processOrder()
        alert('your order placed successfully')
      }
    })

    }

  console.log(watch("example")); 

  return (
   
    <form  className="ship-form" onSubmit={handleSubmit(onSubmit)}>
    <input name="name" ref={register({ required: true })} defaultValue={loggedInUser.name} placeholder="Enter Your Enformation"/>
    {errors.name && <span className="error">Name is required</span>}
    <input name="email" ref={register({ required: true })} defaultValue={loggedInUser.email} placeholder="Enter Your Enformation"/>
    {errors.email && <span className="error">Email is required</span>}
    <input name="address" ref={register({ required: true })} placeholder="Enter Your Enformation"/>
    {errors.address && <span className="error">Address is required</span>}
    <input name="phone" ref={register({ required: true })} placeholder="Enter Your Enformation"/>
    {errors.phone && <span className="error">Phone is required</span>}
      
      <input type="submit" />
    </form>
  );
}

export default Shipment
