import React, { useContext, useEffect, useState, useNavigate } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const {getTotalcartAmt,token,food_list,cartItems,url} = useContext(StoreContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })

  const onChangehandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalcartAmt()+10,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url)
    }
    else{
      alert("Error");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/Cart');
    }
    else if(getTotalcartAmt()===0){
      navigate('/Cart');
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" value={data.firstName} onChange={onChangehandler} type="text" placeholder="First name" required />
          <input name="lastName" value={data.lastName} onChange={onChangehandler} type="text" placeholder="Last name" required />
        </div>
        <input name="email" value={data.email} onChange={onChangehandler} type="email" placeholder="Email address" required />
        <input name="street" value={data.street} onChange={onChangehandler} type="text" placeholder="Street" required />
        <div className="multi-fields">
          <input name="city" value={data.city} onChange={onChangehandler} type="text" placeholder="City" required />
          <input name="state" value={data.state} onChange={onChangehandler} type="text" placeholder="State" required />
        </div>
        <div className="multi-fields">
          <input name="zipCode" value={data.zipCode} onChange={onChangehandler} type="text" placeholder="Zip code" required />
          <input name="country" value={data.country} onChange={onChangehandler} type="text" placeholder="Country" required />
        </div>
        <input name="phone" value={data.phone} onChange={onChangehandler} type="text" placeholder="Phone" required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>${getTotalcartAmt()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalcartAmt() === 0 ? 0 : 10}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                $
                {getTotalcartAmt() === 0?getTotalcartAmt():getTotalcartAmt() + 10}
              </p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
