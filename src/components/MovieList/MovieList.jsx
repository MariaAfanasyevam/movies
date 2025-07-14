import React, { useEffect, useState } from "react";
import _ from "lodash";

import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";
import FilterYearGroup from "./FilterYearGroup.jsx";

const MovieList = ({ type, title, emoji }) => {
    const [movies, setMovies] = useState([]);
    const [filterMovies, setFilterMovies] = useState([]);
    const [filterYearMovies, setFilterYearMovies] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [minYear, setMinYear] = useState(0);
    const [sort, setSort] = useState({
        by: "default",
        order: "asc",
    });

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        let result = movies;

        // 🔹 Фильтр по рейтингу
        if (minRating > 0) {
            result = result.filter(
                (movie) =>
                    movie.vote_average >= minRating &&
                    movie.vote_average <= minRating + 1
            );
        }

        // 🔹 Фильтр по году
        if (minYear > 0) {
            result = result.filter((movie) => {
                if (!movie.release_date) return false;
                const year = parseInt(movie.release_date.slice(0, 4), 10);
                return year >= minYear && year <= minYear + 5;
            });
        }

        // 🔹 Сортировка
        if (sort.by !== "default") {
            result = _.orderBy(result, [sort.by], [sort.order]);
        }

        setFilterMovies(result);
    }, [movies, minRating, minYear, sort]);

    const fetchMovies = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${type}?api_key=bf3e2d6eb103a39d7cbf6a4b4e2edab1&language=ru`
        );
        const data = await response.json();
        console.log(data);
        setMovies(data.results);
        setFilterMovies(data.results);
        setFilterYearMovies(data.results);
    };

    const handleFilter = (rate) => {
        setMinRating((prev) => (prev === rate ? 0 : rate));
    };

    const handleYearFilter = (year) => {
        setMinYear((prev) => (prev === year ? 0 : year));
    };

    const handleSort = (e) => {
        const { name, value } = e.target;
        setSort((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className="movie_list" id={type}>
            <header className="align_center movie_list_header">
                <h2 className="align_center movie_list_heading">
                    {title}{" "}
                    <img src={emoji} alt={`${emoji} icon`} className="navbar_emoji" />
                </h2>
<div className="filter_blick">
                <div className="align_center movie_list_fs">
                    <FilterGroup
                        minRating={minRating}
                        onRatingClick={handleFilter}
                        ratings={[8, 7, 6]}
                    />
                    <FilterYearGroup
                        minYear={minYear}
                        onYearClick={handleYearFilter}
                        years={[2010, 2005, 2000, 1995, 1990]}
                    />
                </div>
                <div className="align_center movie_list_fs">
                    <select
                        name="by"
                        id=""
                        onChange={handleSort}
                        value={sort.by}
                        className="movie_sorting"
                    >
                        <option value="default">Сортировка:</option>
                        <option value="release_date">По дате</option>
                        <option value="vote_average">По рейтингу</option>
                    </select>
                    <select
                        name="order"
                        id=""
                        onChange={handleSort}
                        value={sort.order}
                        className="movie_sorting"
                    >
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                    </select>
                </div>
</div>

            </header>

            <div className="movie_cards">
                {filterMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
};

export default MovieList;