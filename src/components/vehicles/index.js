import React, { useEffect, useState } from "react";
import '../characters/index.css';
import photoOfVehicles from '../../assets/vehicles.jpg';
import {Link} from "react-router-dom";
import Buttons from "../buttons";

const Vehicles = ({match}) => {
    const [vehicles, setVehicles] = useState([])
    const [urlId, setUrlId] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchOutput, setSearchOutput] = useState([]);

    const getVehicles = async(url) => {
        const response = await fetch(url).then((data)=>data.json()).catch((e) => console.error(e));
        setVehicles(response); 
        localStorage.setItem('urlId', urlId);
    }

    useEffect(()=>{         
        getVehicles(`https://swapi.dev/api/vehicles/?page=${urlId}&format=json`);
    },[urlId])

    useEffect(()=>{
        setSearchOutput([]);
        console.log('output',searchOutput)
        vehicles.results?.filter(val=>{
            if(val.name.toLowerCase().includes(searchInput.toLowerCase()))
            setSearchOutput(searchOutput=>[...searchOutput, val])
        })
    }, [searchInput])

        return (
            <main>
                <img className='poster' src={photoOfVehicles} alt="Logo"/>;
                <div className='characters'>
                
                <div className='search-bar'>
                    <input onChange={e=>setSearchInput(e.target.value)} type='text' placeholder='Search'/>
                </div>
            {searchInput=='' ?                      
            (vehicles.results?.map((item, index) => {
                let myLink = item.url;
                let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
                let myNum = myLink.slice(myIndex);
                let count = myNum.slice(1, myNum.length-1);
                return <div key={index} className='character'>
                    <Link className='characterName' to={`/vehicles/`+`${count}`}>{item?.name}</Link>
                </div>
            })) :
            (searchOutput.map((item, index) => {
                let count = 0;
                let myLink = item.url;
                let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
                let myNum = myLink.slice(myIndex);
                count = myNum.slice(1, myNum.length-1);             
                return <div key={index} className='character'>
                    <Link className='characterName' to={`/vehicles/`+`${count}`}>{item?.name}</Link>
                </div>
            }))
            }
        </div>
        <Buttons myArray = {vehicles} urlId = {urlId} setUrlId = {setUrlId}/>
        </main>
    )
}

export default Vehicles