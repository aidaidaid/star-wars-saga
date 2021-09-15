import React, { useEffect, useState } from "react";
import '../characters/index.css';
import photoOfCharacters from '../../assets/characters.jpg';
import CharacterCards from '../characterCards'
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

const Characters = () => {
    let [characters, setCharacters] = useState([])
    let [isNext, setIsNext] = useState(false)
    console.log(characters)

    const getCharacters = async(url) => {
        // let peopleData = await fetch('https://swapi.dev/api/people/?format=json').json();
            const response = await fetch(url)
            .then((data)=>data.json()).catch((e) => console.log(e))
            // setCharacters(...characters, response.results);
            // setCharacters(characters.concat(response.results));
            // !(response.next===null)? getCharacters(response.next):console.log(characters)
            const temp = [...characters, ...response.results];
            setCharacters(temp);
            setIsNext(response.next)
        }

    useEffect(()=>{
        if(isNext){
            getCharacters(isNext)
        }  
    }, [isNext])

    useEffect(()=>{  
        getCharacters('https://swapi.dev/api/people/?format=json');
        
        console.log(characters);
    }, [])

    return (
        <main>
        {/* <div className='poster'></div> */}
        <img className='poster' src={photoOfCharacters} alt="Logo" />;
            {/* <div onClick={getCharacterInfo}>
                <label>{characters[0].name}</label>
            </div> */}
        <div className='characters'>
            {characters?.map((item, index) => (

                <div key={index} className='character' onClick={item.name}>
                    {/* <div>{item?.name}</div> */}
                    <Link className='characterName' to={`/characters/`+`${index}`}>{item?.name}</Link>
                    {/* <Switch>
                        <Route path={`/characters/`+`${index}`}>
                            <CharacterCards charactersInfo={item}/>
                        </Route>
                    </Switch> */}
                </div>
            ))}
            
        </div>
        </main>
    )
}

export default Characters