import {React,useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

export default function Item(props) {
    const [item,setItem]=useState()
    const history=useHistory()
    useEffect(async ()=>{
        let response = await fetch(`http://localhost:3001/item/${props.match.params.id}`).catch(err=>{console.log(err)})
        let item=await response.json()
        setItem(item)
    },[])
    const UNKNOWN_IMAGE="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRy7QL9AkV9RHklQFF3kzv3XabkMNbeamnQ&usqp=CAU"

    return (
        <div>
            <button onClick={()=>{history.goBack()}}> Back to homepage</button><br/>
            { !item ? <div>Loading ...</div> : 
            <>
        
                <img src={item.photoURL} style={{maxHeight:"60vh"}}
              onError={(e)=>{e.target.src=UNKNOWN_IMAGE}}/>
           
            <div>{item.name}</div>
            
            <div>$ {item.cost}</div>
            <div>Seller: {item.seller}</div>
            <div>Description: {item.description}</div>
            
            </>
            }
        </div>
    )
}
