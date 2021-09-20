import React from "react";
import '../home/index.css';

const Home = () => {

    return (
        // <div className='container'>
        //     {/* <iframe src='https://www.youtube.com/watch?v=8Qn_spdM5Zg'
        //         frameBorder='0'
        //         allow='autoplay; encrypted-media'
        //         allowFullScreen
        //         title='video'
        //     /> */}
        // </div>
        <iframe width="100%" height="600px" src="https://www.youtube.com/embed/8Qn_spdM5Zg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       
    )
}

export default Home