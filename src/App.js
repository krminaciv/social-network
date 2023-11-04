import './App.css';
import { Auth } from './components/auth';
import { Login } from './components/login';
import Menu from './components/menu';
import Home from './containers/home/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './containers/profile/profile';
import { Footer } from './components/footer'

function App() {
  return (
    <div className="App">
      <Router>
        <Menu/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/registration" element={<Auth/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/:username" element={<Profile/>} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
