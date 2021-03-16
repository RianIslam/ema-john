import React from 'react'
import { useForm } from 'react-hook-form';
import './ShipMent.css';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data =>{
       console.log(data);
    }

  console.log(watch("example")); 

  return (
   
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
    <input name="name" ref={register({ required: true })} placeholder="Enter Your Enformation"/>
    {errors.name && <span className="error">Name is required</span>}
    <input name="email" ref={register({ required: true })} placeholder="Enter Your Enformation"/>
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
