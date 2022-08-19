import './App.css';
//import NavBar from './components/NavBar';
import NavBar from './pages/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Events from './pages/Events.js';
import Signup from './pages/SignUp';
import SignIn from './pages/SignIn.js';
import Categories from './pages/Categories.js';
import AdminPage from './pages/AdminPage';
import Results from './pages/Results';


function App() {
  return (
    
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} exact/>
        <Route path='/events' element={<Events/>} exact/>
        <Route path='/categories' element={<Categories/>} exact/>
        <Route path='/sign-in' element={<SignIn/>} exact/>
        <Route path="/sign-up" exact element={<Signup />} />
        <Route path="/admin" exact element={<AdminPage />} />
        <Route path="/results" exact element={<Results />} />
      </Routes>
    </Router>
 
  );
}

export default App;
