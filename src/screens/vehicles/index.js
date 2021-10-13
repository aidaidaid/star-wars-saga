import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectList } from "../../redux/selectors";
import { setVehicles } from "../../saga/vehicles/actions";
import Buttons from "../../components/buttons";

const Vehicles = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectList);

  const [urlId, setUrlId] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchOutput, setSearchOutput] = useState([]);

  useEffect(() => {
    dispatch(setVehicles(urlId));
  }, [urlId]);

    useEffect(()=>{
        setSearchOutput([]);
        vehicles.results?.filter(val=>{
            if(searchInput && val.name.toLowerCase().includes(searchInput.toLowerCase()))
            setSearchOutput(searchOutput=>[...searchOutput, val])
        })
    }, [searchInput])

  return (
    <section>
            <div className='poster vehiclesImg'/>
            <div className='transparentBlock'>
                <div className='search-bar'>
                    <input onChange={e=>setSearchInput(e.target.value)} type='text' placeholder='Search'/>
                </div>
                <div className='characters'>              
                    {searchInput=='' ?                                  
                    (vehicles?.results?.map((item, index) => {
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
            </div>
        </section>
  );
};

export default Vehicles;
