import React, { useState,useEffect } from 'react';
import { Trash2, ListFilter } from 'lucide-react';
import './task.css';
import axios from 'axios';

function Task({ projects, setProjects }) {
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterOption, setFilterOption] = useState('');
    const  [tasks, setTasks] = useState([]);
    const [allProjects, setAllProjects] = useState([]);


    // const dummyData = [{
    //     projectName: 'Ecommerce website',
    //     taskName: 'Navbar',
    //     description: 'This is navbar',
    //     dueDate: '18.05.24',
    //     status: 'To-do',
    //     priority: 'High',
    //     assignTo: 'abc'
    // },
    // {
    //     projectName: 'Ecommerce website',
    //     taskName: 'Navbar',
    //     description: 'This is navbar',
    //     dueDate: '18.05.24',
    //     status: 'To-do',
    //     priority: 'High',
    //     assignTo: 'abc'
    // }];

    useEffect(() => {
        var model_json = {
         "collectionName": "tasks"
         }
         axios.post('http://localhost:3001/getAllDocuments',model_json)
             .then((response) => {
                setTasks(response.data);
                
             })
             .catch((error) => {
                 console.error('Error fetching data: ', error);
             });

             var model_json = {
                "collectionName": "projects"
                }
                axios.post('http://localhost:3001/getAllDocuments',model_json)
                    .then((response) => {
                        setAllProjects(response.data);
                       
                    })
                    .catch((error) => {
                        console.error('Error fetching data: ', error);
                    });

             
     }, []);

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    return (
        <>
            <div className="task-filter">
                <ListFilter strokeWidth={2} style={{ paddingRight: '5px', color: '#6b7280' }} />
                <select onChange={handleFilterChange} value={filterOption} className='task-select' >
                    <option value="">Filter by</option>
                    <option value="priority">Priority</option>
                    <option value="dueDate">Due Date</option>
                    <option value="status">Status</option>
                    <option value="taskName">Task Name</option>
                </select>
            </div>
            <div className="div-table-main">
                <table className='main-table' cellSpacing={0}>
                    <thead className='main-head'>
                        <tr>
                            <th scope="col" className='heading'>Project Name</th>
                            <th scope="col" className='heading'>Task Name</th>
                            <th scope="col" className='heading'>Description</th>
                            <th scope="col" className='heading'>Due Date</th>
                            <th scope="col" className='heading'>Status</th>
                            <th scope="col" className='heading'>Priority</th>
                            <th scope="col" className='heading'>Assign to</th>
                            <th scope="col" className='heading'></th>
                        </tr>
                    </thead>
                    <tbody>
  {tasks.map((data, index) => {
    return (
      <tr className='data-row'>                            
        <td className='row-data'>
          {allProjects && data && data.project && Array.isArray(allProjects) 
            ? (allProjects.find(project => project.id == data.project) || {}).name
            : ''}
        </td>
        <td className='row-data' style={{ cursor: 'pointer' }}>{data.name}</td>
        <td className='row-data'>{data.description}</td>
        <td className='row-data'>{data.date}</td>
        <td className='row-data'>{data.status}</td>
        <td className='row-data'>{data.priority}</td>
        <td className='row-data'>{data.assign.join(',')}</td>
        <td className='row-data'>
          <span>
            <Trash2 className='action-icon' strokeWidth={2.5} />
          </span>
        </td>
      </tr>
    );
  })}
</tbody>
                </table>
            </div>
        </>
    );
}

export default Task;