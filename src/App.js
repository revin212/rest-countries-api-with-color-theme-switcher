import Header from './components/Header'
import AllCountries from './components/AllCountries';
import CountryDetail from './components/CountryDetail'
import { useRef,useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const appRef = useRef();
  const [goHome, setGoHome] = useState(0);

  return (
    <Router>
      <div ref={appRef} className="App dark-mode font-primary-font min-h-screen w-full bg-main-background text-main-color-text">
        <Header appRef = {appRef} setGoHome = {setGoHome} goHome = {goHome} />

        <div className="content">
          <Routes>
            <Route path="/" element={<AllCountries goHome = {goHome} />} />
            <Route path='/:countryName' element={<CountryDetail/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
