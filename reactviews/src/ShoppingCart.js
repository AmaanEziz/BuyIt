import {React,useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import NavBar from './NavBar.js'
import { PayPalButton } from "react-paypal-button-v2";
export default function ShoppingCart() {
    let total=0
   
    const [cart,setCart]=useState([])
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
       
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);

        }}
        options={{
          clientId:"AUWkQ3gF_r-URa5uAG0N-rMPyQuwvjXGP0X-F4V4k-C8IVy9BekhVs8gYRsKkpkJ3GRfNyfakA9KnSTs"
        }}
      />
                
                </>
            }
            
            </div>
}
        </div>
    )
}
