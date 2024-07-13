import React,{useState,useEffect} from 'react'
import { ClipboardList, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { FaLaptopCode } from 'react-icons/fa'
import './home.css'
import Bar from './Bar'
import Pie from './Pie'
import axios from 'axios'

function Home() {
    const navigate = useNavigate();
    const validateToken = () => {
        const token = localStorage.getItem('token');
        return token !== null;
      };
    
      useEffect(() => {
        if (!validateToken()) {
          navigate('/');
        }
      }, []);

      //usestate for total projects
        const [totalProjects, setTotalProjects] = useState(0);
        const [totalTasks, setTotalTasks] = useState(0);
        const [totalMembers, setTotalMembers] = useState(0);
      //use  axios to get total projects using useefect
    useEffect(() => {
        var model_json = {
         "collectionName": "projects"
         }
         axios.post('http://localhost:3001/getAllDocuments',model_json)
             .then((response) => {
                setTotalProjects(response.data.length);
             })
             .catch((error) => {
                 console.error('Error fetching data: ', error);
             });
     }, []);

        //use  axios to get total tasks using useefect

        useEffect(() => {
            var model_json = {
             "collectionName": "tasks"
             }
             axios.post('http://localhost:3001/getAllDocuments',model_json)
                 .then((response) => {
                    setTotalTasks(response.data.length);
                 })
                 .catch((error) => {
                     console.error('Error fetching data: ', error);
                 });
         }
            , []);

            //use  axios to get total members using useefect

            useEffect(() => {
                var model_json = {
                 "collectionName": "Users"
                 }
                 axios.post('http://localhost:3001/getAllDocuments',model_json)
                     .then((response) => {
                        setTotalMembers(response.data.length);
                     })
                     .catch((error) => {
                         console.error('Error fetching data: ', error);
                     });
             }
                , []);



    return (
        <>
            <div className="home-top-container">
                <div class="home-main">
                    <div className="l">
                        <div class="l-head">Total Projects</div>
                        <div class="l-body">{totalProjects}</div>
                    </div>
                    <div className="r">
                        <div class="hg">
                            <FaLaptopCode className='hg-icon'></FaLaptopCode>
                        </div>
                    </div>
                </div>
                <div class="home-main">
                    <div className="l">
                        <div class="l-head">Total Tasks</div>
                        <div class="l-body">{totalTasks}</div>
                    </div>
                    <div className="r">
                        <div class="hg">
                            <ClipboardList strokeWidth={2.25} class="hg-icon" />
                        </div>
                    </div>
                </div>
                <div class="home-main">
                    <div className="l">
                        <div class="l-head">Total Members</div>
                        <div class="l-body">{totalMembers}</div>
                    </div>
                    <div className="r">
                        <div class="hg">
                            <Users strokeWidth={2.25} class="hg-icon" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="home-btm-container">
                <div className="lc">
                    <Bar />
                </div>
                <div className="rc">
                    <Pie/>
                </div>
            </div>
        </>
    )
}

export default Home