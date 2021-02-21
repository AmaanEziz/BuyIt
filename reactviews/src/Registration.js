import {React,useRef,useState} from 'react'
import 'whatwg-fetch'
import { useHistory , Link} from "react-router-dom";

export default function Registration() {

    const usernameRef=useRef();
    const passwordRef=useRef()
    const [errorMessage,setErrorMessage]=useState("")
    let history = useHistory();
   async function handleSubmit(event){
        event.preventDefault();
        console.log("button hit")
        let data={
            username:usernameRef.current.value,
            password:passwordRef.current.value}
        console.log(data);
       await fetch('http://localhost:3001/registration', {
            method: 'POST', 
            headers: {
                              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(response=>{
            if (response.status==200){
                console.log("success occured")
               history.push('/login')
               
            }
            else {
                console.log("failure occured")
                setErrorMessage("Username already taken")
            }
          })
    }

    return (
        

     <>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <div style={{color:"red"}}>{errorMessage}</div>
            <label htmlFor="newUsername">New Username</label><br/>
            <input type="text" name="username" id="username" ref={usernameRef}/><br/>
            <label htmlFor="newPassword">New Password</label><br/>
                <input type="password" name="password" id="password" ref={passwordRef}/><br/>
               
                <button type="submit">Submit</button>
                <Link to="/login"><button>Login</button></Link>

                
        </form>

     </>
    
    )
}
