// import React from 'react'
// import './MyOrders.css'
// import { useContext } from 'react'
// import { StoreContext } from '../../context/StoreContext'
// import { useEffect,useState } from 'react'
// import { axios } from 'axios'

// const MyOrders = () => {

//     const {url,token} = useContext(StoreContext);
//     const [data,setData] = useState([]);

//     const fetchOrders = async () => {
//         const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
//         setData(response.data.data);
//         console.log(response.data.data);
//     }

//     useEffect(()=>{
//         if (token) {
//             fetchOrders();
//         }
//     },[token])

//   return (
//     <div>
      
//     </div>
//   )
// }

// export default MyOrders

import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const { url, token } = useContext(StoreContext)

    const [data, setData] = useState([])

    const fetchOrders = async () => {

        try {

            const response = await axios.post(
                url + "/api/order/userorders",
                {},
                {
                    headers: { token }
                }
            )

            if (response.data.success) {

                setData(response.data.data)

                console.log(response.data.data)
            }

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {

        if (token) {

            fetchOrders()
        }

    }, [token])

    return (

        <div className='my-orders'>

            <h2>My Orders</h2>

            <div className="container">

                {data.map((order, index) => {

                    return (

                        <div key={index} className='my-orders-order'>

                           <img src={assets.parcel_icon} alt=" " />

                            <div className='order-items'>

                                {order.items.map((item, index) => (

                                    <p key={index}>
                                        {item.name} x {item.quantity}
                                    </p>

                                ))}

                            </div>

                            <p className='amount'>Amount: ₹{order.amount}</p>
                            <p className='items-count'>
                            Items: {order.items.length}
                            </p>

                            <p className='order-status'>
                                Status: {order.status}
                            </p>

                            <button className='track-btn' onClick={() => fetchOrders()}>
                                Track Order
                            </button>

                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default MyOrders