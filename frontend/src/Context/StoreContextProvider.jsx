import axios from "axios";
import { useEffect, useState } from "react";
import { StoreContext } from "./StoreContext.js";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://tomato-server-p5p0.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  const addTocart = async (itemid) => {
    if (!cartItems[itemid]) {
      setCartItems((prev) => ({ ...prev, [itemid]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemid }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemid) => {
    setCartItems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemid }, { headers: { token } });
    }
  };

  const getTotalcartAmt = () => {
    let totalAmt = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmt += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmt;
  };

  const fetchFoodlist = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFood_list(response.data.data);
  };

  const cartData = async (tokenValue) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token: tokenValue } });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodlist();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await cartData(savedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addTocart,
    removeFromCart,
    getTotalcartAmt,
    url,
    token,
    setToken,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
