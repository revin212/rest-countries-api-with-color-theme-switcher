import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


function CountryDetail() {
    const [countries, setCountries] = useState([]);     //state for storing data from API
    const [isLoading, setIsLoading] = useState(true);   //loading state
    const [error, setError] = useState('');             //error message state
    const {countryName} = useParams();                  //get countryName value from the link parameter


    // -------------------------FETCH COUNTRY DATA BY FULL NAME (1 RESULT)------------------------------
    const getCountryByName= async () => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
            if(!res.ok) throw new Error('Something went wrong');
            
            const data = await res.json();

            setCountries(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    }

    // ---------------GET A COUNTRY DATA EVERYTIME THE LINK PARAMETER (COUNTRY NAME) CHANGE--------------
    useEffect(() => {
        getCountryByName();
    }, [countryName])

    return ( 
        <div className="country-detail pt-[7rem] mx-auto px-[1.5rem] lg:py-[7rem] max-w-[375px] md:max-w-[600px] lg:max-w-[1100px] lg:px-0 ">
            {/* BACK BUTTON TO GO HOME */}
            <Link to='/'>
                <button className=" bg-main-elements px-7 py-2 shadow-main-color-shadow shadow-sm">
                    <i class="far fa-arrow-left font-bold mr-3"></i>
                    <span>Back</span>
                </button>
            </Link>

            {/* COUNTRY DETAILS */}
            <div className="details mt-[4rem]">
                {isLoading && !error && <h2 className="text-3xl font-bold">Loading...</h2>}
                {!isLoading && error && <h2 className="text-2xl font-bold">{error}</h2>}

                {
                    countries?.map((country) => {
                        return (
                        <div className="detai-wrappe lg:flex lg:gap-[6rem] ">
                            {/* COUNTRY FLAG */}
                            <div className="country-flag mb-[3rem] lg:w-[40%]">
                                <img className="w-full" src={country.flags.png} alt="" />
                            </div>
                            
                            {/* COUNTRY DESCRIPTION */}
                            <div className="country-desc">
                                <h1 className="mb-[1.5rem] font-bold text-2xl lg:text-3xl">
                                    {country.name.common}
                                </h1>
                                <div className="desc text-md pb-[3rem] lg:pb-0 lg:flex lg:gap-[6rem]">
                                    {/* MAIN DESCRIPTION */}
                                    <div className="main-desc flex flex-col gap-3 mb-[2rem] lg:mb-0">
                                        <p><span className=" font-semibold">
                                            Native Name: </span>{country.name.common}
                                        </p>
                                        <p><span className=" font-semibold">
                                            {/* DISPLAY POPULATION WITH A NUMBER FORMAT, EX: 1,000,000 */}
                                            Population: </span>{new Intl.NumberFormat().format(country.population)}
                                        </p>
                                        <p><span className=" font-semibold">
                                            Region: </span>{country.region}
                                        </p>
                                        <p><span className=" font-semibold">
                                            {/* IF NO DATA, DISPLAY NOTHING. EX: ANTARCTICA DOESNT HAVE THIS DATA*/}
                                            Sub Region: </span>{Boolean(country.subregion) && country.subregion}
                                        </p>
                                        <p><span className=" font-semibold">
                                            {/* IF NO DATA, DISPLAY NOTHING. EX: ANTARCTICA DOESNT HAVE THIS DATA*/}
                                            Capital: </span>{Boolean(country.capital) && country.capital}
                                        </p>
                                    </div>
                                    {/* EXTRA DESCTIPTION */}
                                    <div className="extra-desc flex flex-col gap-3">
                                        <p><span className=" font-semibold">
                                            Top Level Domain: </span>{country.tld[0]}
                                        </p>
                                        <p><span className=" font-semibold">
                                            Currencies: </span>{country.currencies && Object.keys(country.currencies)}
                                        </p>
                                        <p><span className=" font-semibold">
                                            {/* THE COUNTRY LANGUAGES FETCHED DATA IS A NESTED OBJECT
                                            SO WE NEED TO ACCESS THE PROPERTY BY CHANGING IT INTO AN ARRAY*/}
                                            Languages: </span>{country.languages &&
                                            Object.keys(country.languages)
                                            .map((val, index, arr) =>{
                                                if(index === arr.length-1)
                                                { return val}
                                                else 
                                                {return val + ', '}    
                                            })
                                        }</p>
                                    </div>
                                </div>
                            </div>

                            {/* THE BORDER COUNTRIES DATA CANNOT BE FOUND ON THE FETCHED DATA*/}
                            {/* <div className="border-countries">
                                <p>Border Countries</p>
                                <div></div>
                            </div> */}
                        </div>
                            
                        )
                    })
                }
            </div>
        </div>
     );
}

export default CountryDetail;