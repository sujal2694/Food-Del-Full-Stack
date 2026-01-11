import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{

    const [cartItems, setCartItems] = useState({});
    const url = "https://food-del-backend-dy28.onrender.com";
    const [token,setToken] = useState("");
    const [food_list,setFood_list] = useState([])
 
    const addTocart = async (itemid) => {
        if (!cartItems[itemid]) {
            setCartItems(prev=>({...prev,[itemid]:1}))
        }
        else{
            setCartItems(prev=>({...prev,[itemid]:prev[itemid]+1}))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemid},{headers:{token}})
        }
    }

    const removeFromCart = async(itemid) => {
        setCartItems(prev=>({...prev,[itemid]:prev[itemid]-1}))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemid},{headers:{token}})
        }
    }

    const getTotalcartAmt = () => {
        let totalAmt = 0;
        for (const item in cartItems) {
            if (cartItems[item]>0) {
                let itemInfo = food_list.find((product)=>product._id===item);
                totalAmt += itemInfo.price * cartItems[item]
            }
        }
        return totalAmt;
    }

    const fetchFoodlist = async()=>{
        const response = await axios.get(url+"/api/food/list");
        setFood_list(response.data.data);
    }

    const cartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodlist()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await cartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addTocart,
        removeFromCart,
        getTotalcartAmt,
        url,
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider