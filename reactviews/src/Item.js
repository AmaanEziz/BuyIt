import {React,useState,useEffect} from 'react'

export default function Item(props) {
    const [item,setItem]=useState()
    useEffect(async ()=>{
        let response = await fetch(`http://localhost:3001/item/${props.match.params.id}`).catch(err=>{console.log(err)})
        let item=await response.json()
        setItem(item)
    },[])
    const UNKNOWN_IMAGE="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRy7QL9AkV9RHklQFF3kzv3XabkMNbeamnQ&usqp=CAU"

    return (
        <div>
            { !item ? <div>Loading ...</div> : 
            <>
            <img src={item.photoURL} 
            onError={(e)=>{e.target.src=UNKNOWN_IMAGE}}/>
            <div>{item.name}</div>
            
            <div>$ {item.cost}</div>
            <div>Sellers: {Object.keys(item.sellers)}</div>
            
            
            </>
            }
        </div>
    )
}
