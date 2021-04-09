import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './ShipMent.css';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
   
    const onSubmit = data =>{
      
    }


    


  console.log(watch("example")); 

  return (
   <div className="container">
    <div className="row">
      <div className="col-md-6">
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
      </div>
      <div className="col-md-6">
      <h1>Process Payment</h1>
        <ProcessPayment/>
      </div>
    </div>
    </div>
  );
}

export default Shipment
