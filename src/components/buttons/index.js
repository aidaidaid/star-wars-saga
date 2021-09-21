import React from "react";
import '../../index.css';


const Buttons = ({myArray, urlId, setUrlId}) => {

    const previousPage = () => {
        if (myArray.previous !== null) {
            setUrlId(urlId-1);
        }
    }

    const nextPage = () => {
        if (myArray.next !== null) {
            setUrlId(urlId+1);
        }
    }

    return (
        <div className='listBtns'>
            <button className='previous listBtn' onClick={previousPage}>&#8678;</button> 
            <button className='next listBtn' onClick={nextPage}>&#8680;</button> 
        </div>
    )
}
export default Buttons