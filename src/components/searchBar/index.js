import React, { useEffect, useState } from "react";

const Search = ({match}) => {

    const [input, setInput] = useState('');
    const [output, setOutput] = useState(1);

    return(
        <div className='search-bar'>
            <input onChange={e=>setInput(e.target.value)} type='text' placeholder='Search'/>
        </div>
    )
}

export default Search