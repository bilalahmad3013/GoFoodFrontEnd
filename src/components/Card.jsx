import React, { useState ,useRef, useEffect} from 'react'
import styled from "styled-components";
import { useDispatchCart,useCart } from './contextReducer';


export default function Card(props) {
    let options=props.options;
    let priceOptions= Object.keys(options);
    let foodItem=props.foodItem;
    let data=useCart();

    let dispatch=useDispatchCart();


    const priceRef=useRef();
    const [qty,setQty]=useState('1');
    const [size,setSize]=useState("");

    const handleAddToCart = async () => {
        console.log(data);
        let food = data.find((item) => item.id === foodItem._id);
    
        if (food) {
          if (food.size === size) {
            await dispatch({ type: "UPDATE", id: foodItem._id, price: FinalPrice, qty: qty });
            return;
          } else if (food.size !== size) {
            await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: FinalPrice, qty: qty, size: size, img: props.ImgSrc });
            console.log("Size different so simply ADD one more to the list");
            return;
          }
        }
    
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: FinalPrice, qty: qty, size: size });
      };
   
     const DIV = styled.div`
       &:hover{
        box-shadow:0px 0px 10px 10px #888888;
       }
       .btn:hover {
       border:none;
       color:white;
       background-color:#35383d;
      }
    `;

    
  


    let FinalPrice=qty*parseInt(options[size]);  
    
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[]);
    

    return (    
       
        <DIV className="card mt-3" style={{ 'width': "18rem", 'maxHeight':"350px" }}>
            <div >
            <img className="card-img-top" src={foodItem.img} alt="Card image cap"  style={{height:"150px", width:"100%"}}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{foodItem.name}</h5>
                 <div className='container w-100'>
                    <select className='m-2 h-100 rounded ' onChange={(e)=>setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>

                    <select className='m-2 h-100   rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                        {priceOptions.map((data)=>{
                            
                            return( <option key={data} value={data}>{data}</option>)
                        })}
                    </select>

                    <div className='d-inline h-100 fs-5' >Rs-{FinalPrice}/-</div>

                    <hr />

                    <div className='btn' style={{ border: "1px solid black", borderRadius: "10px" }} onClick={handleAddToCart}>
                        Add to Cart
                    </div>    

                </div>

            </div>
        </DIV>

    )
}
