import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectList } from "../../redux/selectors";
import { setFilms } from "../../saga/films/actions";

const Films = () => {
  const dispatch = useDispatch();
  const films = useSelector(selectList);

  const [urlId, setUrlId] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchOutput, setSearchOutput] = useState([]);

  useEffect(() => {
    dispatch(setFilms(urlId));
  }, [urlId]);

    useEffect(()=>{
        setSearchOutput([]);
        films.results?.filter(val=>{
            if(searchInput && val.name.toLowerCase().includes(searchInput.toLowerCase()))
            setSearchOutput(searchOutput=>[...searchOutput, val])
        })
    }, [searchInput])

  return (
    <section>
            <div className='poster filmsImg'/>
            <div className='transparentBlock'>
                <div className='search-bar'>
                    <input onChange={e=>setSearchInput(e.target.value)} type='text' placeholder='Search'/>
                </div>
                <div className='characters'>              
                    {searchInput=='' ?                                  
                    (films?.results?.map((item, index) => {
                        let myLink = item.url;
                        let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
                        let myNum = myLink.slice(myIndex);
                        let count = myNum.slice(1, myNum.length-1);
                        return <div key={index} className='character'>
                            <Link className='characterName' to={`/films/`+`${count}`}>{item?.title}</Link>
                        </div>
                    })) :
                    (searchOutput.map((item, index) => {
                        let count = 0;
                        let myLink = item.url;
                        let myIndex = myLink.lastIndexOf('/', myLink.lastIndexOf('/')-1);
                        let myNum = myLink.slice(myIndex);
                        count = myNum.slice(1, myNum.length-1);             
                        return <div key={index} className='character'>
                            <Link className='characterName' to={`/films/`+`${count}`}>{item?.title}</Link>
                        </div>
                    }))
                    }
                </div>
            </div>
        </section>
  );
};

export default Films;