import Header from './components/Header'
import AllCountries from './components/AllCountries';
import CountryDetail from './components/CountryDetail'
import { useRef,useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const appRef = useRef(); //ref for header component to access adding dark theme class
  
  //state for home button (the left side of header), so that AllCountries component can track the state
  //for useEffect dependancy
  const [goHome, setGoHome] = useState(0); 

  return (
    <Router>
      <div ref={appRef} className="App dark-mode font-primary-font min-h-screen w-full bg-main-background text-main-color-text">
        {/* HEADER COMPONENT */}
        <Header appRef = {appRef} setGoHome = {setGoHome} goHome = {goHome} />

        <div className="content">
          <Routes>
            {/* ALL COUNTRIES PAGE */}
            <Route path="/" element={<AllCountries goHome = {goHome} />} />

            {/* COUNTRY DETAIL PAGE */}
            <Route path='/:countryName' element={<CountryDetail/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
