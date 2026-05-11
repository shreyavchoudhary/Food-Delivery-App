import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify"

const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      

      
      if (response.data.success || response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }

    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  }

  const removeFood = async(foodId) =>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error");
    }
  }


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>

      <div className="list-table">

        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => {

          console.log(item.image);
          return (
            <div key={index} className='list-table-format'>

              {/* ✅ FIX: image safe rendering */}
              {console.log(item)}
              {/* <img
                // src={`${url}/images/${item.image}`}
                // alt="food"
                // onError={(e) => {
                //   e.target.src = "https://placehold.co/80x80"; // fallback image
                // }}
                
              />
               */}
               <img
  src={`${url}/images/${item.image}`}
  alt="food"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/80x80";
  }}
/>

              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>

            </div>
          )
        })}

      </div>
    </div>
  )
}

export default List;