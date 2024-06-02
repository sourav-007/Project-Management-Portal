import React, { useState, useEffect, useRef } from 'react'
import './projecttask.css'
import { useParams,useNavigate } from 'react-router-dom'
import { FaPlus, FaEdit, FaSave, FaTrashAlt, FaTimes } from 'react-icons/fa'
// import TaskModal from '../task/TaskModal'
import './taskmodal.css'
import { Drawer, Space } from 'antd'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function ProjectTask({ projects, setProjects }) {
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

    const showSuccessToast = () => {
        toast('✅ Successfully Created', { style: { background: '#e5e5e5', color: 'green' } });
    }

    const showErrorToast = () => {
        toast(`❌ Couldn't Save`, { style: { background: '#e5e5e5', color: 'red' } });
    }
    useEffect(() => {
        var model_json = {
         "collectionName": "projects"
         }
         axios.post('https://project-management-portal-eosin.vercel.app/getAllDocuments',model_json)
             .then((response) => {
                 setProjects(response.data);
             })
             .catch((error) => {
                 console.error('Error fetching data: ', error);
             });
     }, []);

     var { projectName, id: projectId } = useParams(); // Extracting both projectName and projectId from URL
     var projectDescription = '';
     const project = projects.find(project => project.id == projectId);
     if(project){
         projectName = project.name;
         var projectDescription = project.description;
     }

    // const [tasks, setTasks] = useState([]);

    const [isShowD, setIsShowD] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const onClose = () => {
        setShowModal(false);
    }
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current == e.target) {
            onClose();
            showErrorToast();
        }
    }

    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [assign, setAssign] = useState('');

    useEffect(() => {
        var model_json = {
            "collectionName": "tasks",
            "attribute": "project",
            "value": projectId
        }
            axios.post('https://project-management-portal-eosin.vercel.app/findDocuments',model_json)
                .then((response) => {
                    setTasks(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data: ', error);
                });
        }, []);

    // const [editingId, setEditingId] = useState(null);

    const handleCreateTask = () => {
        if (taskName.trim() !== '') {
            const newTask = {
                id: Date.now(),
                name: taskName,
                description: description,
                date: dueDate,
                status: status,
                priority: priority,
                project: projectId,
                assign: assign.split(',').map(assign => assign.trim()) // Split contributors by comma and remove leading/trailing spaces
            };

            // setProjects(updatedProjects);
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            setTaskName('');
            setDescription('');
            setDueDate('');
            setStatus('');
            setPriority('');
            setAssign('');
            var Model_json = {
                "collectionName": "tasks",
                "document": newTask
                }

            axios.post('https://project-management-portal-eosin.vercel.app/insertDocument',Model_json)
                .then((response) => {
                    console.log(response);
                }
                )
                .catch((error) => {
                    console.error('Error fetching data: ', error);
                }
                );


            setShowModal(false);

            showSuccessToast();
        }
    };

    const handleDeleteTask = (taskId) => {
        // const updatedTasks = tasks.filter(task => task.id !== taskId);
        // const updatedProjects = projects.map(p => {
        //     if (p.id === projectId) {
        //         return { ...p, tasks: updatedTasks };
        //     }
        //     return p;
        // });

        // setProjects(updatedProjects);
        var model_json = {
            "collectionName": "tasks",
            "query": {
                "id": taskId
            }
        }
        axios.post('https://project-management-portal-eosin.vercel.app/deleteDocument',model_json)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
        setTasks(tasks.filter(task => task.id !== taskId));
    };


    return (
        <>
            <div className='div-table'>
                <div className='p-view0'>
                    <span>Project Details</span>
                    <span>Id : {projectId}</span>
                </div>
                <div className='p-view1'>
                    <span>{projectName}</span>
                </div>
                <div className='p-view2'>
                    {/* <span>Project Description: </span> */}
                    <span>{projectDescription}</span>
                </div>

                <div className='task-add'>
                    <button className='addtask' onClick={() => { setShowModal(true) }}>
                        <FaPlus className='addtask-icon'></FaPlus>
                        <span>Create Task</span>
                    </button>
                </div>

                {showModal &&
                    <div className="task-overlay">
                        <div className='task-modal-wrap' ref={modalRef} onClick={closeModal}>
                            <div className="task-modal-div">
                                <div className="cross">
                                    <button className='close-btn' onClick={onClose}>
                                        <FaTimes className='close-icon'></FaTimes>
                                    </button>
                                </div>
                                <div className="task-modal">
                                    <h2>Create Your Task</h2>
                                </div>

                                <form class="task-modal-form">
                                    <div class="task-modal-form-content">
                                        <div class="task-modal-items">
                                            <input type="text"
                                                name="name" class="name-item"
                                                value={taskName}
                                                onChange={(e) => setTaskName(e.target.value)}
                                                placeholder="Task name..." required />
                                        </div>
                                        <div class="task-modal-items">
                                            <a href='#' style={{ textDecoration: 'none' }}>
                                                <label style={{ fontSize: 'small', display: 'flex', justifyContent: 'end', color: 'green', padding: '1px', cursor: 'pointer' }}>Generate Description</label>
                                            </a>
                                            <textarea id="description"
                                                rows="4"
                                                class="text-item"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Write Task description here..." required></textarea>
                                        </div>
                                        <div class="task-modal-items" id='model-media'>
                                            <input type="date"
                                                placeholder="Due date"
                                                name="date"
                                                value={dueDate}
                                                onChange={(e) => setDueDate(e.target.value)}
                                                class="name-item2" required />
                                        </div>
                                        <div class="task-modal-items" id='model-media'>
                                            <input type="text"
                                                name="assign-to"
                                                class="name-item2"
                                                value={assign}
                                                onChange={(e) => setAssign(e.target.value)}
                                                placeholder="Assign to" required />
                                        </div>

                                        <div class="task-modal-items"
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                            id='model-media' required>
                                            <select class="select-drop">
                                                <option selected="">Select Priority</option>
                                                <option value="High">High</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Low">Low</option>
                                            </select>
                                        </div>

                                        <div class="task-modal-items"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            id='model-media' required>
                                            <select class="select-drop">
                                                <option selected="">Select Status</option>
                                                <option value="To-do">To-do</option>
                                                <option value="In-progress">In-progress</option>
                                                <option value="Done">Done</option>
                                            </select>
                                        </div>

                                    </div>

                                </form>
                                <div className="task-modal">
                                    <button type="submit" class="create-task-btn" onClick={handleCreateTask}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <Toaster position="bottom-center" reverseOrder={false} />

                <div className="div-table-main">
                    <table className='main-table' cellSpacing={0}>
                        <thead className='main-head'>
                            <tr>
                                <th scope="col" className='heading'>Task Id</th>
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
                            {tasks.map(task => (
                                <tr className='data-row'>
                                    <td className='row-data'>{task.id}</td>
                                    <td className='row-data' style={{ cursor: 'pointer' }} onClick={() => { setIsShowD(true) }}>{task.name}</td>
                                    <td className='row-data'>{task.description.slice(0, 30) + '...'}</td>
                                    <td className='row-data'>{task.date}</td>
                                    <td className='row-data'>{task.status}</td>
                                    <td className='row-data'>{task.priority}</td>
                                    <td className='row-data'>{task.assign.join(', ')}</td>
                                    <td className='row-data'>
                                        <span>
                                            {/* <FaEdit className='action-icon'></FaEdit> */}
                                            <FaTrashAlt className='action-icon' onClick={() => { handleDeleteTask(task.id) }}></FaTrashAlt>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {tasks.map((task) => (

                    <Drawer visible={isShowD}
                        title='Task Details'
                        closable={false}
                        onClose={() => { setIsShowD(false) }}
                        width='27rem'
                        className='drawer'
                        extra={
                            <Space>
                                <FaEdit></FaEdit>
                            </Space>
                        }>
                        <div className="drawer-content">
                            <div className="p-view3">
                                <span>Task Name : {task.name}</span>
                                <span>Task Id : {task.id}</span>
                            </div>
                            <div className="desc">
                                <label>Description :</label>
                                <span>{task.description}</span>
                            </div>
                            <div className="p-view3">
                                <span>Due Date : {task.date}</span>
                                <span>Status : {task.status}</span>
                            </div>
                            <div className="p-view3">
                                <span>Priority : {task.priority}</span>
                                <span>Assign to : {task.assign}</span>
                            </div>
                        </div>
                    </Drawer>
                ))}

            </div>
        </>
    )
}

export default ProjectTask