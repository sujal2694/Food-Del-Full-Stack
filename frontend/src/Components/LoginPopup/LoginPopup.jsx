import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

  const {url, token,setToken} = useContext(StoreContext)
  const [currState, setCurrState] = useState("Sign Up");

  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler =(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async(event)=>{
    event.preventDefault();
    let newUrl = url;
    if (currState==="Login") {
      newUrl += "/api/user/login"
    }else{
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl,data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);
    }
    else{
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt="" srcSet=''/>
          </div>
          <div className="login-popup-input">
            {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' id="" required/>}
            <input type="email" name="email" value={data.email} onChange={onChangeHandler} placeholder='email' id="" required/>
            <input type="password" name="password" value={data.password} onChange={onChangeHandler} placeholder='Password' id="" required/>
          </div>
          <button type='submit'>{currState==="Sign Up"?"create an account":"Login"}</button>
          <div className="login-popup-condition">
            <input type="checkbox" name="" id="" required/>
            <p>BY continuing, i agree to the terms of use & privacy policy.</p>
          </div>
          {currState==="Sign Up"
            ?<p className='switch'>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here!</span></p>
            :<p className='switch'>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here!</span></p>
          }
      </form>
    </div>
  )
}

export default LoginPopup
