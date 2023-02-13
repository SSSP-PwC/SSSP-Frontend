import './App.css';
import LoginForm from "./Components/Auth/LoginForm"
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage"
import GlobalStyle from './globalStyles';
import Footer from './Components/Footer/Footer';
import { SignUpForm } from './Components/Auth/SignUpForm';

export default function App() {
  return (
    <div className=''>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes> 
        <Footer />
      </Router>       


    </div>




  );
}

