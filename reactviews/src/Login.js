import {React,useRef,useState} from 'react'
import 'whatwg-fetch'
import { useHistory,Link } from "react-router-dom";
import './CSS/registration.css'

export default function Login() {
    const [loading,setLoading]=useState("")
    const usernameRef=useRef();
    const passwordRef=useRef()
    const [errorMessage,setErrorMessage]=useState("")
    let history = useHistory();
   async function handleSubmit(event){
        event.preventDefault();
        let data={username:usernameRef.current.value,password:passwordRef.current.value}
      await fetch('http://localhost:3001/login', {
            method: 'POST', 
            headers: {
                              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(async (response)=>{
            if (response.status==200){
                setLoading("Loading homepage...")
                let responseJSON=await response.json()
                sessionStorage.setItem("SID",responseJSON.SID)
                history.push('/homepage')
                 
                  
            }
            else{
                setErrorMessage("Username and password are incorrect")
            }
          })
          .catch(err=>{setErrorMessage("Username and Password required")
        })
        
   }
    return (
    <body id="body">
        <div>
            <div class="container">

<form id="signup">

    <div class="header">
    
        <h3>Sign In</h3>
        
        
    </div>
    
    <div class="sep"></div>
    <div style={{color:"red"}}>{errorMessage}</div>

    <div class="inputs">
    
        <input ref={usernameRef} type="text" name="username" id="username" placeholder="Username" autofocus />
    
        <input ref={passwordRef} type="password" name="password" id="password" placeholder="Password" />
        
        
        
        <button id="submit" href="#" onClick={(e)=>{handleSubmit(e)}}>SIGN IN</button>
    
    </div>
    <Link to="/registration"><a>Don't have an account? Sign Up</a></Link>

</form>

</div>
​<div>{loading}</div>
        </div>
    </body>
    )
}