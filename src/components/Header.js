import { useRef } from "react";
import { Link } from "react-router-dom";


function Header({appRef, setGoHome, goHome}) {
    const iconMoonFull = useRef();      //ref for full moon icon
    const iconMoonHollow = useRef();    //ref for hollow moon icon
    
    // TOGGLE LIGHT AND DARK THEME
    function changeTheme() {
        iconMoonFull.current.classList.toggle('hidden');
        iconMoonHollow.current.classList.toggle('hidden');
        appRef.current.classList.toggle('dark-mode');
    }

    // update goHome state so that it can trigger useEffect() in AllCountries component
    function getHome() {
        setGoHome(()=>goHome+1)
    }

    return ( 
        <div className="header w-full py-6 bg-main-elements z-20 fixed left-0 top-0 px-3 lg:px-0">
            <nav className="navbar flex justify-between items-center lg:max-w-[1100px] lg:mx-auto">
                {/* HOME BUTTON */}
                <Link to='/'>                    
                    <h1 onClick={getHome} className="text-md md:text-lg lg:text-xl font-bold">Where in the world?</h1>
                </Link>

                {/* TOGGLE THEME BUTTON */}
                <div onClick={changeTheme} className="toggle-mode flex gap-2 items-center justify-center w-[120px] px-2 py-1 rounded-full cursor-pointer">
                    <i ref={iconMoonFull} class="fa-solid fa-moon"></i>
                    <i ref={iconMoonHollow} class="fa-regular fa-moon hidden"></i>
                    <span className=" font-semibold">Dark Mode</span>
                </div>
            </nav>
        </div>
     );
}

export default Header;
