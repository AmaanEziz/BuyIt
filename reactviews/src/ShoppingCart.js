import {React,useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
export default function ShoppingCart() {
    const [cart,setCart]=useState()
    const [loaded,setLoaded]=useState(false)
    const [unavailableList,setUnavailableList]=useState([])
    const [errorMessage,setErrorMessage]=useState("")
    useEffect(async ()=>{
        let data={SID:sessionStorage.getItem("SID")}
        let response= await fetch('http://localhost:3001/shoppingCart', {
            method: 'POST', 
            headers: {
                              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).catch()
    setCart(await response.json())
    setLoaded(true)
        
    },[])

    async function onDelete(e,item){
        e.preventDefault()
        let data={item:item,SID:sessionStorage.getItem("SID")}
        let response= await fetch('http://localhost:3001/deleteFromCart', {
            method: 'POST', 
            headers: {
                              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).catch()

          if (response.status==200){
            console.log("successfullly deleted")
            console.log(cart)
            setCart(cart.filter(cartItem=>{return cartItem!==item}))
        }
        else {
            console.log("not deleted")
        }
    }
    
    async function onBuy(){
        cart.map(async (item)=>{
            let data={item:item,SID:sessionStorage.getItem("SID")}
            let response= await fetch('http://localhost:3001/buyNow', {
            method: 'POST', 
            headers: {
                              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).catch()
          if (response.status==400){
              setUnavailableList(prev=>[...prev,item])
          }
        })
        if (unavailableList.length>0){
            setErrorMessage("The following items can't be purchased because the seller(s) have removed them or because they've already been bought "+unavailableList)
        }
        else {
            setCart([])
            console.log("All items successfull bought")
        }
    }
    return (
        <div>
            {!loaded ? <div>Loading</div> :
            <div>
                {cart.length==0 ?  <div>Cart is Empty</div> :
                <>
                
                {cart.map(item=>{
                     
                   return <>
                    <div style={{display:"inline-block"}}>{item.name}</div>
                    <Button className="btn btn-danger" style={{display:"inline-block"}} onClick={(e)=>{onDelete(e,item)}}>X</Button>
                    <br/>
                    </>
                })}
                <br/>
                <Button onClick={onBuy}>Buy Now</Button>
                <div>{errorMessage}</div>
                </>
            }
            
            </div>
}
        </div>
    )
}
