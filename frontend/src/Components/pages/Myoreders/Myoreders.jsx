import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import { assets } from '../../../assets/assets'
import { StoreContext } from '../../../Context/StoreContext'
import axios from 'axios';

const Myoreders = () => {

    const [data,setData] = useState([]);
    const {url,token} = useContext(StoreContext);

    const fetch_oreders = async(req,res)=>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);      
    }

    useEffect(()=>{
        if (token) {
            fetch_oreders();
        }
    },[token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
            return(
                <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item,index)=>{
                        if (index===order.items.length - 1) {
                            return item.name+" x "+item.quantity;
                        }
                        else{
                             return item.name+" x "+item.quantity+"' ";
                        }
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                    <button onClick={()=>fetch_oreders()}>Track Order</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default Myoreders
