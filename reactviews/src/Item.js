import {React,useState,useEffect} from 'react'

import {useHistory} from 'react-router-dom'
import NavBar from './NavBar.js'
export default function Item(props) {
    const SID=sessionStorage.getItem("SID")
    const [item,setItem]=useState()
    const [user,setUser]=useState()
    const [idList,setIdList]=useState([])
    const history=useHistory()
    const [loaded,setLoaded]=useState(false)
    useEffect(async ()=>{
        let data={SID:SID}
        let response =await fetch(`http://localhost:3001/item/${props.match.params.id}`, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        let json=await response.json()
        await setUser(json.user)
        json.user.selling.forEach(item=>{
            setIdList(prev=>[...prev,item._id])
        })
        await setItem(json.item)
        setLoaded(true)
    },[])
    const UNKNOWN_IMAGE="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRy7QL9AkV9RHklQFF3kzv3XabkMNbeamnQ&usqp=CAU"

    async function onDelete(){
    let data={SID:SID}
     let response =await fetch(`http://localhost:3001/deleteItem/${props.match.params.id}`, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
    console.log(response.status)
    }
    return (
        <div>
            <NavBar/>
            <button onClick={()=>{history.goBack()}}> Back to homepage</button><br/>
            { !loaded ? <div>Loading ...</div> : 
            <>
            {!item ? <div>Item no longer exists</div> :
            <>
        
                <img src={item.photoURL} style={{maxHeight:"60vh"}}
              onError={(e)=>{e.target.src=UNKNOWN_IMAGE}}/>
           
            <div>{item.name}</div>
            
            <div>$ {item.cost}</div>
            <div>Seller: {item.seller}</div>
            <div>Description: {item.description}</div>
            {idList.includes(item._id) ? <button onClick={onDelete}>Remove Listing</button>: <></>}
           
            </>
            }
            </>
            
        }
        
        </div>
    )
}
