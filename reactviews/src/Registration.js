import {React,useRef,useState} from 'react'
import 'whatwg-fetch'
import './CSS/registration.css'
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
<body id="body">
        <div>
            <div class="container" id="registration">

<form id="signup">

    <div class="header">
    
        <h3>Sign Up</h3>
        
        <p>Please fill out this form</p>
        
    </div>
    
    <div class="sep"></div>
    <div style={{color:"red"}}>{errorMessage}</div>

    <div class="inputs">
    
        <input ref={usernameRef} type="text" name="username" id="username" placeholder="Username" autofocus />
    
        <input ref={passwordRef} type="password" name="password" id="password" placeholder="Password" />
        
        
        <button id="submit" href="#" onClick={(e)=>{handleSubmit(e)}}>SIGN UP</button>
    
    </div>
    <Link to="/login"><a>Already have an account? Sign in</a></Link>

</form>

</div>
​
        </div>
        </body>
    )
}
