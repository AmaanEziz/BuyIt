import {React,useState,useRef} from 'react'
import { useHistory } from "react-router-dom";
import NavBar from './NavBar.js'
import './CSS/registration.css'

export default function NewListing() {
    const [errorMessage,setErrorMessage]=useState("");
    const nameRef=useRef()
    const costRef=useRef()
    const photoURLRef=useRef()
    const history=useHistory()
    const [Description,setDescription]=useState("")


    async function onSubmit(e){
        e.preventDefault();
        let newInventory={
            name: nameRef.current.value,
            cost: costRef.current.value,
            SID:sessionStorage.getItem("SID"),
            photoURL:photoURLRef.current.value,
            summary:Description
            
        }
        console.log(photoURLRef.current.value)



        await fetch('http://localhost:3001/newListing', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newInventory)
          }).then(response=>{
              console.log(response)
            if (response.status==200){
                history.push('/homepage')
            
            }
            else{ setErrorMessage("Please fill in the name and cost fields with valid input.")
             console.log("error occured") }
                
            
          }).catch(err=>{
              setErrorMessage("An unknown error occured. Please try again later.")
        console.log(err)})
        }
      
    
    return (
        <>
            <NavBar/>
            <br/><br/>
            <div>
                <div style={{ color: "red" }}>{errorMessage}</div>
                <div className="container form">
                    <div class="row">
                        <form className="createForm col-11 col-md-6 col-lg-4">

                        <div className="header">
                            <h3>Create New Listing</h3>
                        </div>
                        <div style={{ color: "red" }}>{errorMessage}</div>

                        <div className="inputs">
                            <label htmlFor="name">Name:</label>
                            <input type="text" ref={nameRef} maxLength="17" />
                            <label htmlFor="cost">Cost:</label>
                            <input type="text" ref={costRef} maxLength="10" />
                            <label htmlFor="photoURL">photoURL</label>
                            <input type="text" ref={photoURLRef} />
                            <label htmlFor="description">Description</label>
                            <textarea maxLength="200" onChange={(e) => {
                                setDescription(e.target.value)
                            }} value={Description}></textarea><br />
                            <button id="submit" href="#" onClick={onSubmit}>Submit</button>

                        </div>

                    </form>

                    </div>
                    </div>
            </div>
            </>
    )
    }
    