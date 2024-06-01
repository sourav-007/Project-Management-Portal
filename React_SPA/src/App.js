import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginSignup from './component/login-signup/LoginSignup';
import Navside from './component/dashboard/Navside';
import ProjectList from './component/allprojects/ProjectList';
import ProjectTask from './component/allprojects/ProjectTask';
import ProfilePage from './component/profile/ProfilePage';
import ProfileEditPage from './component/profile/ProfileEditPage';
import Home from './component/dashhome/Home';
import Task from './component/taskpage/Task';



function App() {

  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  useEffect(() => {
    localStorage.setItem('current_theme', theme)
  }, [theme])

  const [projects, setProjects] = useState([]);



  return (
    <>
      {/* <div className={`wrap ${theme}`}>
        <Navside theme={theme} setTheme={setTheme} />
      </div> */}

      {/* <ProjectTask projects={projects} setProjects={setProjects}/> */}

      <Router>
        <Routes>
          <Route path='/' element={<LoginSignup />}></Route>
          <Route path='/dash' element={<> <div className={`wrap ${theme}`}>
            <Navside theme={theme} setTheme={setTheme}></Navside></div></>}>
            
            <Route path='' element={<Home />}></Route>
            <Route path='home' element={<Home />}></Route>
            <Route path='projects' element={<ProjectList projects={projects}
              setProjects={setProjects} />}>
            </Route>
            <Route path='projects/:id' element={<ProjectTask projects={projects}
              setProjects={setProjects} />}></Route>
            {/* <Route path='profile' element={<ProfileModal/>}></Route> */}
            <Route path='profile' element={<ProfilePage />}></Route>
            <Route path='profile/edit-profile' element={<ProfileEditPage />}></Route>
            <Route path='tasks' element={<Task />}></Route>

          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
