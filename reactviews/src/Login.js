import {React,useRef,useState} from 'react'
import 'whatwg-fetch'
import { useHistory } from "react-router-dom";

import {Link, BrowserRouter as Router} from 'react-router-dom'
export default function Login() {
    
    const [loading,setLoading]=useState();
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
       <>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <div style={{color:"red"}}>{errorMessage}</div>
            <label htmlFor="username">Username</label><br/>
            <input type="text" name="username" id="username" ref={usernameRef}/><br/>
            <label htmlFor="password">Password</label><br/>
                <input type="password" name="password" id="password" ref={passwordRef}/><br/>
               
                <button type="submit">Submit</button>
                <Link to="/registration"><button>Register</button></Link>
        </form>
        <div>{loading}</div>
        </>
    )
}

