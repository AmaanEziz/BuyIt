import {React,useState,useRef} from 'react'
import { useHistory } from "react-router-dom";

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
            else{ setErrorMessage("Please fill in Name and Cost fields")
             console.log("error occured") }
                
            
          }).catch(err=>{
              setErrorMessage("Please fill in Name and Cost fields")
        console.log(err)})
        }
      
    
    return (
        <div>
            <div style={{color:"red"}}>{errorMessage}</div>
            <form>
                <label for="name">Name:</label><br/>
                <input type="text" ref={nameRef}/><br/>
                <label for="cost">Cost:</label><br/>
                <input type="text" ref={costRef}/><br/>
                <label for="photoURL">photoURL</label><br/>
                <input type="text" ref={photoURLRef}/><br/>
                <label for="description">Description</label>
                <textarea onChange={(e)=>{
                    setDescription(e.target.value)
                }}>{Description}</textarea>
                <button onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
    }
    //on homepage request. send the information of the user as well and, if the user's shopping cart includes an item,
//make that item have the button "Added to cart checkmark" instead of "Add to cart"