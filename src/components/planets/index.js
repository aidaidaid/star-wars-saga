// import React, { useEffect, useState } from "react";
// import '../../index.css';
// import {Link} from "react-router-dom";
// import Buttons from "../buttons";

// const Planets = ({match}) => {
//     const [planets, setPlanets] = useState([])
//     const [urlId, setUrlId] = useState(1);
//     const [searchInput, setSearchInput] = useState('');
//     const [searchOutput, setSearchOutput] = useState([]);

//     const getPlanets = async(url) => {
//         const response = await fetch(url).then((data)=>data.json()).catch((e) => console.error(e));
//         setPlanets(response); 
//         localStorage.setItem('urlId', urlId);
//     }

//     useEffect(()=>{         
//         getPlanets(`https://swapi.dev/api/planets/?page=${urlId}&format=json`);
//     },[urlId])

//     useEffect(()=>{
//         setSearchOutput([]);
//         planets.results?.filter(val=>{
//             if(val.name.toLowerCase().includes(searchInput.toLowerCase()))
//             setSearchOutput(searchOutput=>[...searchOutput, val])
//         })
//     }, [searchInput])

//     return (
//         <section>
//             <div className='poster planetsImg'/>  
//             <div className='transparentBlock'>
//                 <div className='search-bar'>
//                     <input onChange={e=>setSearchInput(e.target.value)} type='text' placeholder='Search'/>
//                 </div>
//                 <div className='characters'> 
//                     {searchInput=='' ?                      
//                     (planets.results?.map((item, index) => {
//                         let myLink = item.url;
//                         let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
//                         let myNum = myLink.slice(myIndex);
//                         let count = myNum.slice(1, myNum.length-1);
//                         return <div key={index} className='character'>
//                             <Link className='characterName' to={`/planets/`+`${count}`}>{item?.name}</Link>
//                         </div>
//                     })) :
//                     (searchOutput.map((item, index) => {
//                         let count = 0;
//                         let myLink = item.url;
//                         let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
//                         let myNum = myLink.slice(myIndex);
//                         count = myNum.slice(1, myNum.length-1);             
//                         return <div key={index} className='character'>
//                             <Link className='characterName' to={`/planets/`+`${count}`}>{item?.name}</Link>
//                         </div>
//                     }))
//                     }
//                 </div>
//                 <Buttons myArray = {planets} urlId = {urlId} setUrlId = {setUrlId}/>
//             </div>
//         </section>
//     )
// }

// export default Planets