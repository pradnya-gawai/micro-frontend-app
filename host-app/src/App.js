import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LoginComponent from './LoginComponent';

// Blank components for now
const TaskComponent = React.lazy(() => import('task/TaskComponent'));
const LeaveComponent = React.lazy(() => import('leave/LeaveComponent'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set the user as logged in
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? ( // Conditional rendering based on login status
          <>
            <nav>
              <button>
                <Link to="/leave">Leave Module</Link>
              </button>
              <button>
                <Link to="/task">Task Module</Link>
              </button>
            </nav>

            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/leave" element={<LeaveComponent />} />
                <Route path="/task" element={<TaskComponent />} />
              </Routes>
            </React.Suspense>
          </>
        ) : (
          // Render LoginComponent if not logged in
          <Routes>
            <Route path="/" element={<LoginComponent onLoginSuccess={handleLoginSuccess} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
