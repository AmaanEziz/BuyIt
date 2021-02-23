import {React,useState,useEffect} from 'react'

export default function ShoppingCart() {
    const [cart,setCart]=useState()
    const [loaded,setLoaded]=useState(false)
    useEffect(async ()=>{
        let data={SID:sessionStorage.getItem("SID")}
        let response= await fetch('http://localhost:3001/shoppingCart', {
            method: 'POST', 
            headers: {
                              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).catch()
    setLoaded(true)
        
    },[])
    return (
        <div>
            {!loaded ? <div>Loading</div> :
            <div>
                {cart.length==0 ?  <div>Cart is Empty</div> :
                <>
                {console.log("cart ws mapped")}
                {cart.map(item=>{
                    return <div>{item.name}
                    {loaded && cart==undefined ? <div>Cart is Empty</div> : <></>}
                    
                    </div>
                })}
                </>
            }

            </div>
}
        </div>
    )
}
