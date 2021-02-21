import {React,useState,useEffect} from 'react'
import {Card,Button} from 'react-bootstrap'
import { useHistory, Redirect} from "react-router-dom";

import './CSS/homepageCSS.css'
export default function Homepage() {
    const [inventory,setInventory]=useState([])
    const [search,setSearch]=useState("");
    const [loaded,setLoaded]=useState(false);
    const UNKNOWN_IMAGE="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRy7QL9AkV9RHklQFF3kzv3XabkMNbeamnQ&usqp=CAU"
    const history=useHistory();
    useEffect(async ()=>{
        
        let response=await fetch('http://localhost:3001/homepage')
        setInventory(await response.json())
        setLoaded(true)
        
    },[])
    
    function onChange(e){
        setSearch(e.target.value);
        console.log(search);
    }
    function logOutClick(){
        sessionStorage.removeItem("SID")
        history.push('/login')
    }
   async function submitSearch(e){
       e.preventDefault();
        setLoaded(false);
        let response= await fetch(`http://localhost:3001/results/${search}`).catch(err=>{console.log(err)})
        let newInventory=await response.json()
        setInventory(newInventory)
        setLoaded(true)
    }
   
    return (
       
        <div>
             {sessionStorage.getItem("SID") ? <></> : <Redirect to="login"/>}   
        <button onClick={logOutClick} className="btn btn-danger">LogOut</button>
          <h1 className="float-left">BuyIt</h1>
          <a href="/newListing" className="btn btn-primary float-right">New Listing</a>

            <form>
                <input type="text" placeholder="Search" id="search" name="search" value={search} onChange={onChange}></input>
                <button onClick={submitSearch}>Submit</button>
            </form>
            <div>
            {loaded==true ? <></> : <div>Loading ... </div>}
            {inventory.map(item=>{
               return <Card style={{ width: '18rem', display:"inline-block"}} className="m-2">
                <a href={"/item/"+item._id}      >
               <Card.Img variant="top" className="img" 
               src={item.photoURL} 
               onError={(e)=>{e.target.src=UNKNOWN_IMAGE}} />
               </a>
               <Card.Body>
                 <Card.Title>{item.name}</Card.Title>
                 <Card.Text>
                  Cost: ${item.cost}
                 </Card.Text>
                 <Button variant="primary">Add to cart</Button>
               </Card.Body>
             </Card>
               
            })}
            </div>
        </div>
    )
}
