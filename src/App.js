import './App.css';
import { Auth } from './components/auth';
import { Login } from './components/login';
import Menu from './components/menu';
import Home from './containers/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Menu/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/registration" element={<Auth/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
