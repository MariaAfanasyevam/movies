import React from "react";

const FilterYearGroup = ({ minYear, onYearClick, years }) => {
    return (
        <ul className="align_center movie_filter">
            {years.map((year) => (
                <li
                    className={
                        minYear === year
                            ? "movie_filter_item active"
                            : "movie_filter_item"
                    }
                    key={year}
                    onClick={() => onYearClick(year)}
                >
                    По дате {year} - {year+10}
                </li>
            ))}
        </ul>
    );
};

export default FilterYearGroup;