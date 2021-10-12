import React, { useEffect, useState } from "react";
import '../../index.css';
import {Link} from "react-router-dom";
import Buttons from "../buttons";

const Species = ({match}) => {
    const [species, setSpecies] = useState([])
    const [urlId, setUrlId] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchOutput, setSearchOutput] = useState([]);

    const getSpecies = async(url) => {
        const response = await fetch(url).then((data)=>data.json()).catch((e) => console.error(e));
        setSpecies(response); 
        localStorage.setItem('urlId', urlId);
    }

    useEffect(()=>{         
        getSpecies(`https://swapi.dev/api/species/?page=${urlId}&format=json`);
    },[urlId])

    useEffect(()=>{
        setSearchOutput([]);
        species.results?.filter(val=>{
            if(val.name.toLowerCase().includes(searchInput.toLowerCase()))
            setSearchOutput(searchOutput=>[...searchOutput, val])
        })
    }, [searchInput])

    return (
        <section>
            <div className='poster speciesImg'/>
            <div className='transparentBlock'>
                <div className='search-bar'>
                    <input onChange={e=>setSearchInput(e.target.value)} type='text' placeholder='Search'/>
                </div>
                <div className='characters'>
                    {searchInput=='' ?                      
                    (species.results?.map((item, index) => {
                        let myLink = item.url;
                        let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
                        let myNum = myLink.slice(myIndex);
                        let count = myNum.slice(1, myNum.length-1);
                        return <div key={index} className='character'>
                            <Link className='characterName' to={`/species/`+`${count}`}>{item?.name}</Link>
                        </div>
                    })) :
                    (searchOutput.map((item, index) => {
                        let count = 0;
                        let myLink = item.url;
                        let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
                        let myNum = myLink.slice(myIndex);
                        count = myNum.slice(1, myNum.length-1);             
                        return <div key={index} className='character'>
                            <Link className='characterName' to={`/species/`+`${count}`}>{item?.name}</Link>
                        </div>
                    }))
                    }
                </div>
                <Buttons myArray = {species} urlId = {urlId} setUrlId = {setUrlId}/>
            </div>
        </section>
    )
}

export default Species