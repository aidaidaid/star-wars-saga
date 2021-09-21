import React, { useEffect, useState } from "react";
import '../../index.css';
import {Link} from "react-router-dom";
import Buttons from "../buttons";

const Starships = ({match}) => {
    const [starships, setStarships] = useState([])
    const [urlId, setUrlId] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchOutput, setSearchOutput] = useState([]);

    const getStarships = async(url) => {
        const response = await fetch(url).then((data)=>data.json()).catch((e) => console.error(e));
        setStarships(response);
        console.log('ua',response) 
        localStorage.setItem('urlId', urlId);
    }

    useEffect(()=>{         
        getStarships(`https://swapi.dev/api/starships/?page=${urlId}&format=json`);
    },[urlId])

    useEffect(()=>{
        setSearchOutput([]);
        console.log('output',searchOutput)
        starships.results?.filter(val=>{
            if(val.name.toLowerCase().includes(searchInput.toLowerCase()))
            setSearchOutput(searchOutput=>[...searchOutput, val])
        })
    }, [searchInput])

    return (
        <section>
            <div className='poster starshipsImg'/>
            <div className='transparentBlock'>       
                <div className='search-bar'>
                    <input onChange={e=>setSearchInput(e.target.value)} type='text' placeholder='Search'/>
                </div>
                <div className='characters'> 
                    {searchInput=='' ?                      
                    (starships.results?.map((item, index) => {
                        let myLink = item.url;
                        let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
                        let myNum = myLink.slice(myIndex);
                        let count = myNum.slice(1, myNum.length-1);
                        return <div key={index} className='character'>
                            <Link className='characterName' to={`/starships/`+`${count}`}>{item?.name}</Link>
                        </div>
                    })) :
                    (searchOutput.map((item, index) => {
                        let count = 0;
                        let myLink = item.url;
                        let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
                        let myNum = myLink.slice(myIndex);
                        count = myNum.slice(1, myNum.length-1);             
                        return <div key={index} className='character'>
                            <Link className='characterName' to={`/starships/`+`${count}`}>{item?.name}</Link>
                        </div>
                    }))
                    }
                </div>
                <Buttons myArray = {starships} urlId = {urlId} setUrlId = {setUrlId}/>
            </div>
        </section>
    )
}

export default Starships