import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart,addTocart, food_list, getTotalcartAmt, url } = useContext(StoreContext);
  const navigate = useNavigate()
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Add</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div key={index} className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className="add-item" onClick={()=>addTocart(item._id)}>+</p>
                  <p className="cross" onClick={()=>removeFromCart(item._id)}>X</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                  <p>Sub Total</p>
                  <p>${getTotalcartAmt()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalcartAmt()===0?0:10}</p>
              </div>
              <div className="cart-total-details">
                <p>Total</p>
                <p>${getTotalcartAmt()===0?getTotalcartAmt():getTotalcartAmt()+10}</p>
              </div>
            </div>
            <button onClick={()=>navigate("/Placeorder")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>if you have promo code, Enter here</p>
            <div className="cart-promo-code-input">
              <input type="text" placeholder="promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
