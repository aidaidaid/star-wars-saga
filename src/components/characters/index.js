import React, { useEffect, useState } from "react";
import '../characters/index.css';
import photoOfCharacters from '../../assets/characters.jpg';
import {Link} from "react-router-dom";
import Buttons from "../buttons";

const Characters = ({match}) => {
    const [characters, setCharacters] = useState([])
    const [urlId, setUrlId] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchOutput, setSearchOutput] = useState([]);

    const getCharacters = async(url) => {
        // let peopleData = await fetch('https://swapi.dev/api/people/?format=json').json();
        const response = await fetch(url).then((data)=>data.json()).catch((e) => console.error(e));
        setCharacters(response); 
        localStorage.setItem('urlId', urlId);
    }

    useEffect(()=>{         
        getCharacters(`https://swapi.dev/api/people/?page=${urlId}&format=json`);
    },[urlId])

    // const previousPage = () => {
    //     if (characters.previous !== null) {
    //         setUrlId(urlId-1);
    //     }
    // }

    // const nextPage = () => {
    //     if (characters.next !== null) {
    //         setUrlId(urlId+1);
    //     }
    // }

    useEffect(()=>{
        setSearchOutput([]);
        console.log('output',searchOutput)
        characters.results?.filter(val=>{
            if(val.name.toLowerCase().includes(searchInput.toLowerCase()))
            setSearchOutput(searchOutput=>[...searchOutput, val])
        })
    }, [searchInput])
// src={photoOfCharacters} alt="Logo"
        return (
            <section>
                <div className='poster' />;
                <div className='transparentBlock'>
                     <div className='search-bar'>
                            <input onChange={e=>setSearchInput(e.target.value)} type='text' placeholder='Search'/>
                        </div>
                    <div className='characters'>            
                       
                        {(searchInput=='' ?                      
                        (characters.results?.map((item, index) => {
                            let increase = 0;
                            let count = 0;
                            (urlId !== 1) ? increase = (urlId - 1) * 10 : increase = 0;
                            (parseInt(index + 1) + increase > 16) ? count = parseInt(index + 1) + increase + 1 : count = parseInt(index + 1) + increase;
                            // count = parseInt(index + 1) + increase;
                            return <div key={index} className='character'>
                                <Link className='characterName' to={`/characters/`+`${count}`}>{item?.name}</Link>
                            </div>
                        })) :
                        (searchOutput.map((item) => {
                            let increase = 0;
                            let count = 0;
                            (urlId !== 1) ? increase = (urlId - 1) * 10 : increase = 0;
                            let i = characters.results.indexOf(item);
                            count = parseInt(i + 1) + increase;
                            return <div key={i} className='character'>
                                <Link className='characterName' to={`/characters/`+`${count}`}>{item?.name}</Link>
                            </div>
                        }))
                        )}
                     </div>
                    <Buttons myArray = {characters} urlId = {urlId} setUrlId = {setUrlId}/>
                </div>
            </section>
        )
}

export default Characters