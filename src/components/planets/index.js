import React, { useEffect, useState } from "react";
import '../characters/index.css';
import photoOfPlanets from '../../assets/planets.jpg';
// import CharacterCards from '../characterCards'
import {Link} from "react-router-dom";
import Buttons from "../buttons";

const Planets = ({match}) => {
    const [planets, setPlanets] = useState([])
    const [urlId, setUrlId] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchOutput, setSearchOutput] = useState([]);

    const getPlanets = async(url) => {
        const response = await fetch(url).then((data)=>data.json()).catch((e) => console.error(e));
        setPlanets(response); 
        localStorage.setItem('urlId', urlId);
    }

    useEffect(()=>{         
        getPlanets(`https://swapi.dev/api/planets/?page=${urlId}&format=json`);
    },[urlId])

    useEffect(()=>{
        setSearchOutput([]);
        console.log('output',searchOutput)
        planets.results?.filter(val=>{
            if(val.name.toLowerCase().includes(searchInput.toLowerCase()))
            setSearchOutput(searchOutput=>[...searchOutput, val])
        })
    }, [searchInput])

        return (
            <main>
                <img className='poster' src={photoOfPlanets} alt="Logo"/>;
                <div className='characters'>            
                <div className='search-bar'>
                    <input onChange={e=>setSearchInput(e.target.value)} type='text' placeholder='Search'/>
                </div>
                {searchInput=='' ?                      
                (planets.results?.map((item, index) => {
                    let myLink = item.url;
                    let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
                    let myNum = myLink.slice(myIndex);
                    let count = myNum.slice(1, myNum.length-1);
                    return <div key={index} className='character'>
                        <Link className='characterName' to={`/planets/`+`${count}`}>{item?.name}</Link>
                    </div>
                })) :
                (searchOutput.map((item, index) => {
                    let count = 0;
                    let myLink = item.url;
                    let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
                    let myNum = myLink.slice(myIndex);
                    count = myNum.slice(1, myNum.length-1);             
                    return <div key={index} className='character'>
                        <Link className='characterName' to={`/planets/`+`${count}`}>{item?.name}</Link>
                    </div>
                }))
                }
                {/* {(searchInput=='' ?                      
                (planets.results?.map((item, index) => {
                    let increase = 0;
                    let count = 0;
                    (urlId !== 1) ? increase = (urlId - 1) * 10 : increase = 0;
                    count = parseInt(index + 1) + increase;
                    return <div key={index} className='character'>
                        <Link className='characterName' to={`/planets/`+`${count}`}>{item?.name}</Link>
                    </div>
                })) :
                (searchOutput.map((item) => {
                    let increase = 0;
                    let count = 0;
                    (urlId !== 1) ? increase = (urlId - 1) * 10 : increase = 0;
                    let i = planets.results.indexOf(item);
                    count = parseInt(i + 1) + increase;
                    return <div key={i} className='character'>
                        <Link className='characterName' to={`/planets/`+`${count}`}>{item?.name}</Link>
                    </div>
                }))
                )} */}
                </div>
                <Buttons myArray = {planets} urlId = {urlId} setUrlId = {setUrlId}/>
            </main>
        )
}

export default Planets