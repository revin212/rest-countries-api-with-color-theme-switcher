import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


function AllCountries({goHome}) {
    const [countries, setCountries] = useState([]);     //state for storing data from API
    const [isLoading, setIsLoading] = useState(true);   //loading state
    const [error, setError] = useState('');             //error message state
    const searchBar = useRef();     //ref for search bar
    const selectBar = useRef();     //ref for select bar(dropdown) 

    // -------------------------FETCH DATA ALL COUNTRIES FROM THE API-------------------------------
    const getAllCountries = async () => {
        try {
            const res = await fetch('https://restcountries.com/v3.1/all');
            if(!res.ok) throw new Error('Something went wrong');
            
            const data = await res.json();

            setCountries(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    }

    // ---------------------------------SEARCH COUNTRY BY NAME--------------------------------
    const searchCountries = async (e) => {
        e.preventDefault();
        const countryName = searchBar.current.value;
        searchBar.current.value = '';
        setCountries([]);
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            if(!res.ok) throw new Error('Country not found');
            
            const data = await res.json();

            setCountries(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    }

    // -------------------------------FILTER COUNTRIES BY REGION--------------------------------
    const filterCountries = async () => {
        const regionName = selectBar.current.value;
        setCountries([]);
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch(`https://restcountries.com/v3.1/region/${regionName}`);
            
            if(!res.ok) throw new Error('Something went wrong');
            
            const data = await res.json();

            setCountries(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    }
    
    // ----------------------------GET ALL COUNTRIES IF HOME BUTTON CLICKED--------------------------
    useEffect(() => {
        setIsLoading(true)
        setError('');                       //clear error message
        selectBar.current.value = "none";   //clear region filter selectbar
        getAllCountries();
    }, [goHome]);

    return ( 
        <div className="all-countries mx-auto px-[1rem] py-[5rem] lg:py-[7rem] lg:max-w-[1100px] lg:px-0">
            <div className="search-and-filter my-[2rem] lg:flex lg:justify-between">
                {/* SEARCHBAR */}
                <div className="searchbar mb-6 lg:w-[400px]">
                    <form onSubmit={searchCountries} className="relative ">
                        <i onClick={searchCountries} class="fa-solid fa-magnifying-glass absolute p-1 left-[12px] bottom-[12px] cursor-pointer"></i>
                        <input ref={searchBar} type="text" placeholder="Search for a country..." className="pl-[3rem] py-3 w-full outline-none bg-main-color-input rounded-md" />
                    </form>
                </div>

                {/* SELECTBAR (DROPDOWN) TO FILTER COUNTRIES BY REGION */}
                <div className="filter-region">
                    <select ref={selectBar} name="region" onChange={filterCountries} className="w-[170px] py-3 px-4 bg-main-color-input rounded-md outline-none">
                        <option value="none" selected disabled hidden>Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="America">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>

            {/* DISPLAY COUNTRIES */}
            <div className="country-list grid grid-cols-1 lg:grid-cols-4 gap-[3rem] mx-auto max-w-[375px] md:max-w-[600px] px-[1rem] lg:max-w-[1100px] lg:px-0">
                {isLoading && !error && <h2 className="text-3xl font-bold">Loading...</h2>}
                {!isLoading && error && <h2 className="text-2xl font-bold">{error}</h2>}

                {
                    countries?.map((country) => {
                        return(
                        <div className="country-card bg-main-elements rounded-md overflow-hidden">
                            {/* COUNTRY FLAG */}
                            <div className="flag">
                                <img src={country.flags.png} alt={`${country.name.common}-flag`} className="w-full h-[12rem] md:h-[20rem] lg:h-[9rem]" />
                            </div>

                            {/* COUNTRY DESCRIPTION */}
                            <div className="country-desc p-[1.5rem]">
                                {/* GO TO COUNTRY DETAILS LINK IF COUNTRY NAME CLICKED*/}
                                <Link to={`/${country.name.common}`}>
                                    <h2 className="mb-[0.8rem] font-bold text-2xl">{country.name.common}</h2>
                                </Link>
                                <div className="desc text-[16px]">
                                    {/* DISPLAY POPULATION WITH A NUMBER FORMAT, EX: 1,000,000 */}
                                    <p><span className=" font-semibold">
                                        Population: </span>{new Intl.NumberFormat().format(country.population)}
                                    </p>
                                    <p><span className=" font-semibold">
                                        Region: </span>{country.region}
                                    </p>
                                    <p><span className=" font-semibold">
                                        Capital: </span>{country.capital}
                                    </p>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
     );
}

export default AllCountries;