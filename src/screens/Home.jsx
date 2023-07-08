import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import {useNavigate } from 'react-router-dom'


export default function Home() {

    const [search, setsearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const navigate=useNavigate();

  



    const loadData = async () => {
        let response = await fetch("https://gofoodbackend121.onrender.com/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);


    }

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
          navigate('/login');
        } else {
          loadData();
        }
      }, [navigate]);
    
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner">
                        <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control w-50 bg-light " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setsearch(e.target.value)} />
                                {/* <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×700/?cake" className="d-block w-100" alt="..." style={{ filter: "brightness(60%)", height: "700px", width: "100%" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(60%)", height: "700px", width: "100%" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(60%", height: "700px", width: "100%" }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container'>
                {
                    foodCat !== [] ? foodCat.map((data) => {
                        return (
                            <div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>

                                <hr />
                                {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map(filterItems => {

                                    return (
                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 ms-5'>
                                            <Card foodItem={filterItems} options={filterItems.options[0]}
                                            />
                                        </div>
                                    )
                                })

                                    : <div>No such data found</div>}

                            </div>
                        )
                    }) : <div></div>
                }

            </div>
            <Footer />
        </div>
    )
}
