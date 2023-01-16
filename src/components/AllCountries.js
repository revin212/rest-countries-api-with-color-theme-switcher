import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


function AllCountries({goHome}) {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const searchBar = useRef();
    const selectBar = useRef();

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
    

    useEffect(() => {
        setIsLoading(true)
        setError('');
        selectBar.current.value = "none";
        getAllCountries();
    }, [goHome]);

    return ( 
        <div className="all-countries mx-auto px-[1rem] py-[5rem] lg:py-[7rem] lg:max-w-[1100px] lg:px-0">
            <div className="search-and-filter my-[2rem] lg:flex lg:justify-between">
                <div className="searchbar mb-6 lg:w-[400px]">
                    <form onSubmit={searchCountries} className="relative ">
                        <i onClick={searchCountries} class="fa-solid fa-magnifying-glass absolute p-1 left-[12px] bottom-[12px] cursor-pointer"></i>
                        <input ref={searchBar} type="text" placeholder="Search for a country..." className="pl-[3rem] py-3 w-full outline-none bg-main-color-input rounded-md" />
                    </form>
                </div>

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
            <div className="country-list grid grid-cols-1 lg:grid-cols-4 gap-[3rem] mx-auto max-w-[375px] md:max-w-[600px] px-[1rem] lg:max-w-[1100px] lg:px-0">
                {isLoading && !error && <h2 className="text-3xl font-bold">Loading...</h2>}
                {!isLoading && error && <h2 className="text-2xl font-bold">{error}</h2>}

                {
                    countries?.map((country) => {
                        return(
                        <div className="country-card bg-main-elements rounded-md overflow-hidden">
                            <div className="flag">
                                <img src={country.flags.png} alt={`${country.name.common}-flag`} className="w-full h-[12rem] md:h-[20rem] lg:h-[9rem]" />
                            </div>
                            <div className="country-desc p-[1.5rem]">
                                <Link to={`/${country.name.common}`}>
                                    <h2 className="mb-[0.8rem] font-bold text-2xl">{country.name.common}</h2>
                                </Link>
                                <div className="desc text-[16px]">
                                    <p><span className=" font-semibold">Population: </span>{new Intl.NumberFormat().format(country.population)}</p>
                                    <p><span className=" font-semibold">Region: </span>{country.region}</p>
                                    <p><span className=" font-semibold">Capital: </span>{country.capital}</p>
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