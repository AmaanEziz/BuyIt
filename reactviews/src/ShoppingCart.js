import {React,useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import NavBar from './NavBar.js'
import { PayPalButton } from "react-paypal-button-v2";
export default function ShoppingCart() {
    const [total,setTotal]
    const [cart,setCart]=useState()
    const [username,setUsername]=useState()
    const [loaded,setLoaded]=useState(false)
    const [errorMessage,setErrorMessage]=useState("")
    const [successMessage,setSuccessMessage]=useState("")
    useEffect(async ()=>{
        let data={SID:sessionStorage.getItem("SID")}
        let response= await fetch('http://localhost:3001/shoppingCart', {
            method: 'POST', 
            headers: {
                              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).catch()
          let json=await response.json()
    setUsername(json.username)
    setCart(json.shoppingCart)
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
    
    async function onPaypalClick(){
        let data={shoppingCart:cart,SID:sessionStorage.getItem("SID")}
        let response= await fetch('http://localhost:3001/buyNow', {
        method: 'POST', 
        headers: {
                          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).catch(err=>{
    
        console.log("the error was"+err)
      })
    let unavailableObjects=await response.json()
    let unavailableNames=[]
    unavailableObjects.map(item=>{
      unavailableNames.push(item.name)
      total-=item.cost
    })
    if (unavailableNames.length>0){
        setErrorMessage("The following items were out of stock and have been removed from your shopping Cart.=> "+unavailableNames+"Please try to buy again now.")
       
    }
    else{
        setSuccessMessage("Items all successfully purchased")
    }
    setCart([])
    }
    return (
        <div>
            <NavBar/>
            <div style={{color:"red"}}>{errorMessage}</div>
            <div>{successMessage}</div>
            {!loaded ? <div>Loading</div> :
            <div>
                {cart.length==0 ?  
                <>
                <div>Cart is Empty</div> 
                </>:
                <>
                
                {cart.map(item=>{
                     total+=item.cost
                   return <>
                    <div style={{display:"inline-block"}}>{item.name}</div>
                    <Button className="btn btn-danger" style={{display:"inline-block"}} onClick={(e)=>{onDelete(e,item)}}>X</Button>
                    <br/>
                    </>
                })}
                <br/>
                <div>Total: {total}</div>
                <PayPalButton
        amount={total}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        createOrder={onPaypalClick}
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);

        }}
        options={{
          clientId:"AUWkQ3gF_r-URa5uAG0N-rMPyQuwvjXGP0X-F4V4k-C8IVy9BekhVs8gYRsKkpkJ3GRfNyfakA9KnSTs"
        }}
      />
                <Button onClick={onBuy}>Buy Now</Button>
                
                </>
            }
            
            </div>
}
        </div>
    )
}
