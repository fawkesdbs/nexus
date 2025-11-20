
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/landing';
import Dashboard from './pages/Dashboard/Dashboard';
import SignInPage from './pages/SignIn/Signin';
import Register from './pages/Register/register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />    
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </BrowserRouter>
        
    
    </>
  );
}

export default App;
