import {React,useState,useEffect} from 'react'
import {Card,Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
export default function Homepage() {
    const [inventory,setInventory]=useState([])
    const [search,setSearch]=useState("");
    const [loaded,setLoaded]=useState(false);
    const [SID,setSID]=useState();
    const history=useHistory();
    useEffect(async ()=>{
        if (sessionStorage.getItem("SID")){
        setSID(sessionStorage.getItem("SID"))
        let response=await fetch('http://localhost:3001/homepage')
        setInventory(await response.json())
        setLoaded(true)}
        else {
            history.push('/login')
        }
    },[])
    
    function onChange(e){
        setSearch(e.target.value);
        console.log(search);
    }
    function logOutClick(){
        sessionStorage.removeItem("SID")
        setSID(null)
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
        <button onClick={logOutClick} className="btn btn-danger">LogOut</button>
          <h1 className="float-left">BuyIt</h1>
          <a href="/listSelling" className="btn btn-info float-right">List Selling</a>
            <form>
                <input type="text" placeholder="Search" id="search" name="search" value={search} onChange={onChange}></input>
                <button onClick={submitSearch}>Submit</button>
            </form>
            <div>
            {loaded==true ? <></> : <div>Loading ... </div>}
            {inventory.map(item=>{
               return <Card style={{ width: '18rem', display:"inline-block"}} className="m-2">
               <Card.Img variant="top" src={item.photoURL}  />
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
