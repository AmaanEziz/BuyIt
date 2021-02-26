import {React,useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import NavBar from './NavBar.js'

export default function ShoppingCart() {
    
    const [cart,setCart]=useState()
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
    unavailableObjects.map(object=>{
        unavailableNames.push(object.name)
    })
    if (unavailableNames.length>0){
        setErrorMessage("The following items were out of stock and couldn't be purchased.=> "+unavailableNames)
       
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
                     
                   return <>
                    <div style={{display:"inline-block"}}>{item.name}</div>
                    <Button className="btn btn-danger" style={{display:"inline-block"}} onClick={(e)=>{onDelete(e,item)}}>X</Button>
                    <br/>
                    </>
                })}
                <br/>
                <Button onClick={onBuy}>Buy Now</Button>
                
                </>
            }
            
            </div>
}
        </div>
    )
}
