import {React,useState,useEffect,useRef} from 'react'
import {Card,Button} from 'react-bootstrap'
import { useHistory, Redirect, Link} from "react-router-dom";
import NavBar from './NavBar.js'
import './CSS/homepageCSS.css'
export default function Homepage() {
    const searchRef=useRef()
    const [user,setUser]=useState()
    const [inventory,setInventory]=useState([])
    const [loaded,setLoaded]=useState(false);
    const UNKNOWN_IMAGE="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRy7QL9AkV9RHklQFF3kzv3XabkMNbeamnQ&usqp=CAU"
    const history=useHistory();
    useEffect(async ()=>{
       
        let data={SID:sessionStorage.getItem("SID")}
       await fetch('http://localhost:3001/homepage', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(async (response)=>{
              if(response.status==200){
              let json=await response.json()
              setInventory(json.inventory)
              setUser(json.user)
              }
              else {
                  setInventory([])
                  console.log("request failed")
              }
              setLoaded(true)
          }).catch(err=>{console.log(err)})
          
          
          .catch(err=>{<Redirect to="/login"/>})
        
    },[])
    
  
   async function submitSearch(e){
       e.preventDefault();
        setLoaded(false);
        let response= await fetch(`http://localhost:3001/results/${searchRef.current.value}`).catch(err=>{console.log(err)})
        let newInventory=await response.json()
        setInventory(newInventory)
        setLoaded(true)
    }
   
    async function onAdd(e,item){
        e.preventDefault();
        let data={
            item,
            SID:sessionStorage.getItem("SID")
        }
        let response= await fetch('http://localhost:3001/addToCart', {
            method: 'POST', 
            headers: {
                              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).catch(err=>{console.log("error occured adding to cart")})
        e.target.className="btn btn-success"
        e.target.innerHTML="Added to Cart"
        e.target.disabled=true
        }
    return (
    
        <div>
            <NavBar />
             {sessionStorage.getItem("SID") ? <></> : <Redirect to="login"/>}   
          <h1 className="float-left">BuyIt</h1>
          
            <form>
                <input type="text" placeholder="Search" id="search" name="search" ref={searchRef}></input>
                <button onClick={submitSearch}>Submit</button>
            </form>
            <div>
            {loaded==false ? <div>Loading Inventory...</div> :
            <>
            {inventory.length==0 ? <div>No Results Found</div>: <></>}
            <br></br>
            <br></br>
            {inventory.map(item=>{
            return <>
            <div style={{marginLeft:"5vw", width:"90%",
            border:"solid gray 1px",paddingTop:"1vh",
            paddingBottom:"4vh"}}>
                
                <img width="150" height="100"
                style={{float:"left",paddingLeft:"2vw"}} src={item.photoURL} 
                onError={(e)=>{ e.target.src=UNKNOWN_IMAGE}}>
                </img>
            <div style={{position:"relative",left:"2vw"}}>
                <div>{item.name}</div>
                <div>$ {item.cost}</div>
                
            {!user.shoppingCart.some(e => e._id == item._id) ?  
             <Button variant="primary" onClick={(e)=>{onAdd(e,item)}}>Add to Cart</Button> :
            <Button variant="success" disabled>Added to Cart</Button>

            }
            </div>
            </div>
            
             <br></br>
            </>
            })}
            </>
            }

           </div>
        </div>
    )
}
