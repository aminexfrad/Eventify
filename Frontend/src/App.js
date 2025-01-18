import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home'
import Events from './pages/events/Events';

function App() {
  return (
    <BrowserRouter>
    <div>
    <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/events' element={<Events />}/>
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
