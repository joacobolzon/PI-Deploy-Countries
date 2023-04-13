import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { LandingPage } from './pages/LandingPage/LandingPage'
import { Home } from './pages/Home/Home';
import Activities from './pages/ActivityPage/ActivityPage';
import Detail from './pages/Detail/Detail';
import Error from './pages/Error/Error'

//PARA REALIZAR EL DEPLOY
import axios from 'axios'
axios.defaults.baseURL = 'https://pi-deploy-countries-production.up.railway.app';


function App() {

  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/activities' element={<Activities/>}/>
        <Route path='/detail/:detailId' element={<Detail/>} />
        <Route path="/*" element={<Error/>} /> 
      </Routes>
    </div>
  );
}

export default App;
