import React from "react";
import MovieList from "./MovieList.jsx";

import Fire from "../../assets/fire.png";
import Star from "../../assets/glowing-star.png";


const Home = () => {
    return(
<main>
    <MovieList type='popular' title='Popular' emoji={Fire}/>
    <MovieList type='top_rated' title='Top Rated' emoji={Star}/>
</main>
)

}
export default Home;