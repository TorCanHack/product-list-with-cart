import React, { useState} from "react";


const Cart = ({cart, total, totalQuantity, handleDecrement, setOrder}) => {
    

    const handleOrder = () => {

        setOrder(true)

        

    }

    return (
        <>
        { totalQuantity === 0 ?  <article className="bg-white p-4 rounded-md">
            <h3 className="text-red-500 text-2xl font-bold mb-4">Your Cart <span>({totalQuantity})</span></h3>
            <img className="w-72 h-48" src="./assets/images/illustration-empty-cart.svg" alt="empty cart"/>
            <p className="text-center text-brown-500">Your added items will appear here</p>

        </article> : <article className="bg-white p-8 rounded-md">
            <h3 className="text-red-500 text-2xl font-bold mb-4">Your Cart <span>({totalQuantity})</span></h3>
            <ul>
                {cart.map((item, index) => (
                    <li key={index} className="border-b border-brown-100 mb-4 pb-4 ">
                        <span className=" block text-brown-900 -mb-3">{item.name} </span>
                        <br/>
                        <span className="text-red-500" >{item.quantity}x</span>
                        <span className="text-brown-500 font-light ml-4"> @ ${item.price} <b className="ml-1">${(item.quantity * item.price)}</b></span> 
                        <button className=" relative left-28 inline-flex justify-center items-center text-brown-500 border border-brown-500 rounded-full w-5 h-5 " onClick={() => handleDecrement(item)}>X</button>
                    </li>
                ))}
            </ul>
            <div className=" flex flex-row justify-between items-center">
            <p className="text-sm">Order Total:</p>
            <p className=" text-2xl text-brown-900 font-bold ">${total}</p>

            </div>
             

            <div className="flex flex-row items-center justify-center bg-red-50 h-12 rounded mt-6">
                <img className="w-5 h-5" src="./assets/images/icon-carbon-neutral.svg" alt="carbon logo"/>
                <p className="text-sm">This is a <span>carbon-neutral</span> delivery</p>
            </div>

            <button onClick={() => handleOrder()}  className=" block w-64 h-14 bg-red-500 mx-auto my-4 rounded-3xl text-white">Confirm Order</button>
        </article>}
       
         
        </>
       
    )

}

export default Cart;