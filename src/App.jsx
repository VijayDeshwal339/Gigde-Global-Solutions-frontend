import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Task from './pages/Task';
import Projects from './pages/Projects';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header'
import { Toaster } from 'react-hot-toast';
import ProjectTasks from './pages/ProjectTasks';

function App() {
  return (
    <Router>
      <Toaster />
      <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

     <Route 
        path="/projects/:projectId/tasks"
         element={
            <ProtectedRoute>
              <ProjectTasks />
              </ProtectedRoute>
            } 
            />
      </Routes>
    </Router>
  );
}

export default App;
