import React, { useReducer, useState} from 'react';
import './App.css';
import './index.css'
import Cart from './Cart';
import Data from '../src/data.json'

const initialState = {cart: [], total: 0}

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            const itemIndex = state.cart.findIndex(cartItem => cartItem.name === action.payload.name);
            let newCart
            if (itemIndex > -1){
                newCart = [...state.cart];
                newCart[itemIndex].quantity += 1;
            } else {
                newCart = [...state.cart, 
                { name: action.payload.name, price: action.payload.price, quantity: 1, image: action.payload.image}];
            }
            return {
                ...state,
                cart: newCart,
                total: state.total + action.payload.price
            };
        case 'INCREMENT':
            return {
                ...state,
                cart: state.cart.map(cartItem => 
                    cartItem.name === action.payload.name ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem),
                    total: state.total + action.payload.price
            };
        case 'DECREMENT':
            return {
                ...state,
                cart: state.cart.map(cartItem => 
                    cartItem.name === action.payload.name && cartItem.quantity > 0  
                        ? { ...cartItem, quantity: cartItem.quantity - 1} : cartItem
                ).filter(cartItem => cartItem.quantity > 0),
                total: state.total - action.payload.price

            };
        case 'RESET':
          return initialState;
        default:
            return state;
        
    }
    
}



const App = () => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [], total: 0})
    const [order, setOrder] = useState(false);

    const handleAdd = (item) => {
        dispatch({ type: 'ADD', payload: item})
    }

    const handleIncrement = (item) => {
        dispatch({ type: 'INCREMENT', payload: item})
    }

    const handleDecrement = (item) => {
        dispatch({ type: 'DECREMENT', payload: item})
    }

    const handleNewOrder = () => {
      dispatch({type: 'RESET'})
      setOrder(false)
      
    }

    const totalQuantity = state.cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);


    
    return (
      <main className={`lg:flex lg:flex-row lg:grow bg-rose-50 h-full font-redHatText p-7 lg:p-16  ${order ? 'overflow-hidden' : ''}`}>

        { order && (
          <>
            <div  className={'fixed inset-0 w-full h-max-full  bg-black opacity-60 mx-auto my-0 z-10'}></div>
            <article id='overlay' className='absolute inset-x-0 top-24 bg-white z-20 h-auto w-full md:w-11/12 md:mx-auto md:p-10 md:mt-96 lg:mt-36 p-4 rounded-t-2xl lg:w-592'>

              <img src='./assets/images/icon-order-confirmed.svg' alt='' className='my-4'/>
              <h1 className='text-40 font-bold text-brown-900'>Order confirmed</h1>
              <p className='mb-8'>We hope you enjoy your food!</p>
              <ul className='bg-red-50'>
                {state.cart.map((item, index) => (
                <li key={index} className="border-b border-brown-100 mb-4 pb-4 px-4">
                  <div className='flex flex-row items-center'>
                    <img src={item.image.thumbnail} alt={`${item.name} thumbnail`} className="w-12 h-12 mr-4"/>

                    <div className='flex-grow'>
                      <span className="block text-brown-900 ">{item.name}</span>
                       <div>
                        <span className="text-red-500">{item.quantity}x</span>
                        <span className="text-brown-500 font-light ml-4"> @ ${item.price}</span>
                      </div>
                    </div>

                    <span className="ml-4 text-lg font-semibold">${(item.quantity * item.price)}</span>
                  </div>
                </li>))}
              </ul>

              <div className=" flex flex-row justify-between items-center">
                <p className="text-sm">Order Total:</p>
                <p className=" text-2xl text-brown-900 font-bold ">${state.total}</p>
              </div>
              <button  className='block bg-red-500 w-80 h-14 rounded-3xl mt-4 mx-auto md:w-full' onClick={() => handleNewOrder()}>Start New Order</button>
            </article>
          </>

        )}
        

        <section className={`${order ? 'max-h-16 overflow-y-auto md:max-h-full md:overflow-y-hidden' : ''}`}>
          <h1 className='text-40 text-brown-900 font-bold mb-4'>Desserts</h1>
          <div className='md:grid md:grid-cols-3 lg:w-800 gap-4'>
            {Data.map((item, index) => {

            const cartItem = state.cart.find(cartItem => cartItem.name === item.name);
            const imageClass = cartItem ? 'border-2 border-red-500' : 'border-2 border-transparent';

            return (
              <div key={index} className="mb-4">
                <img src={item.image.mobile} alt={item.name} className={`rounded-2xl ${imageClass}`}/>
                {!cartItem ? (
                <button className="relative bottom-6 flex flex-row justify-center items-center bg-white border border-brown-400 w-40 h-10 rounded-3xl z-10 mx-auto" onClick={() => handleAdd(item)}> 
                <img src="./assets/images/icon-add-to-cart.svg" alt=""/> 
                Add to Cart
                </button>
                ) : ( 
                <div className="relative bottom-6 flex flex-row justify-around items-center bg-red-700 w-40 h-10 rounded-3xl z-10 mx-auto text-white">
                  <button onClick={() => handleDecrement(item)} className=' flex justify-center items-center border border-white rounded-full w-5 h-5'>
                    <img src="./assets/images/icon-decrement-quantity.svg" alt=""/>
                  </button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => handleIncrement(item)}  className=' flex justify-center items-center border border-white rounded-full w-5 h-5'>
                    <img src="./assets/images/icon-increment-quantity.svg" alt=""/>
                  </button>
    
                </div>

                )}
                <p className='text-brown-500'>{item.category}</p>
                <h2 className='text-brown-900'>{item.name}</h2>
                <p className='text-red-500 font-semibold'>${item.price}</p>

              </div>
            );
            })}

          </div>
         
          
        </section>
        
            
        <Cart cart={state.cart} total={state.total} totalQuantity={totalQuantity} handleDecrement={handleDecrement} order={order} setOrder={setOrder}/>

            
          
            
        </main>
    )

}

export default App;


