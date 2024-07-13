import React, { useState,useEffect } from 'react';
import './projectlist.css';
import { useNavigate } from 'react-router-dom';
import { Plus, Save, FilePenLine, Eye, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function ProjectList({ projects, setProjects }) {

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

    const showDeleteToast = () => {
        toast('🗑️ Successfully Deleted', { style: { background: '#e5e5e5', color: 'green' } });
    }

    const showUpdateToast = () => {
        toast('✅ Successfully Updated', { style: { background: '#e5e5e5', color: 'green' } });
    }

    useEffect(() => {
        var model_json = {
         "collectionName": "projects"
         }
         axios.post('http://localhost:3001/getAllDocuments',model_json)
             .then((response) => {
                 setProjects(response.data);
             })
             .catch((error) => {
                 console.error('Error fetching data: ', error);
             });
     }, []);

    

    const [colorChange, setColorchange] = useState(false);
    const changeNColor = () => {
        if (window.scrollY >= 80) {
            setColorchange(true);
        } else {
            setColorchange(false);
        }
    };
    window.addEventListener("scroll", changeNColor);

    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [showInputs, setShowInputs] = useState(false); // Track whether to show input fields

    const handleCreateProject = () => {
        if (projectName.trim() !== '') {
            const newProject = {
                id: Date.now(),
                name: projectName,
                description: description,
                tasks: []
            };
            var Model_json = {
                "collectionName": "projects",
                "document": newProject
              }
            setProjects([...projects, newProject]);
            setProjectName(''); // Clear project name input
            setDescription(''); // Clear description input
            setShowInputs(false); // Hide the input fields after creating the project
            axios.post('http://localhost:3001/insertDocument',Model_json)
            .then((response) => {
                console.log(response);
            }
            )
            .catch((error) => {
                console.error('Error fetching data: ', error);
            }
            );

            showSuccessToast();
        }
    };

    const handleDeleteProject = (projectId) => {
        setProjects(projects.filter(project => project.id !== projectId));
        var model_json = {
            "collectionName": "projects",
            "query": {
                "id": projectId
            }
        }
        axios.post('http://localhost:3001/deleteDocument',model_json)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
        

        showDeleteToast();
    };

    const handleEditProject = (projectId) => {
        const updatedProjects = projects.map(project => {
            if (project.id === projectId) {
                var model_json = {
                    "collectionName": "projects",
                    "query": {
                        "id": projectId
                    },
                    "update": {
                        "$set": {
                            "name": projectName,
                            "description": description
                        }
                    }
                }
                axios.post('http://localhost:3001/updateDocument',model_json)

                .then((response) => {
                    console.log(response);
                }
                )
                .catch((error) => {
                    console.error('Error fetching data: ', error);
                }
                );
                return {
                    ...project,
                    name: project.id === editingId ? projectName : project.name,
                    description: project.id === editingId ? description : project.description
                };
            }
            return project;
        });
        setProjects(updatedProjects);
        setEditingId(null); // Reset the editing state after saving
        setProjectName(''); // Clear project name input
        setDescription(''); // Clear description input

        showUpdateToast();
    };


    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>

            <div className="top-container">
                <div className={colorChange ? 'item colorChange' : 'item'}>
                    <div className='gridflex'>
                        <label>
                            <input required="true"
                                placeholder="" type="text"
                                className="grid-input"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)} />
                            <span>Project name</span>
                        </label>


                        <label>
                            <input required="true"
                                placeholder="" type="text"
                                className="grid-input"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                            <span>Description</span>
                        </label>


                        <button className='plus-btn' onClick={handleCreateProject}>
                            <Plus className='in-icon' strokeWidth={2.75} />
                            <span>Create Project</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid-container">
                {filteredProjects.map(project => (
                    <div className="grid-item" key={project.id}>
                        <div className='v-items'>
                            <h2>{project.name}</h2>
                            <p>{project.description}</p>
                        </div>
                        <div className='v-btn'>
                            {editingId === project.id ? (
                                <Save className='edit-icon' onClick={() => handleEditProject(project.id)} strokeWidth={2.75} />
                            ) : (
                                <FilePenLine className='edit-icon' onClick={() => {
                                    setProjectName(project.name);
                                    setDescription(project.description);
                                    setEditingId(project.id);
                                }} strokeWidth={2.75} />
                            )}
                            <Eye className='edit-icon' onClick={() => { navigate(`/dash/projects/${project.id}`) }} strokeWidth={2.75} />
                            <Trash2 className='edit-icon' onClick={() => { handleDeleteProject(project.id) }} strokeWidth={2.75} />
                        </div>

                        {/* {editingId === project.id ? (
                            <>
                                <input
                                    type="text"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    autoFocus
                                />
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </>
                        ) : (
                            <>
                                <h2>{project.name}</h2>
                                <p>{project.description}</p>
                            </>
                        )} */}

                        {/* <div className="inside">
                            <button className='in-btn' onClick={() => { navigate(`/dash/projects/${project.id}`) }}>
                                <FaEye className='in-icon'></FaEye>
                                <span>View</span>
                            </button>
                            <button className='in-btn2' onClick={() => { handleDeleteProject(project.id) }}>
                                <FaTrashAlt className='in-icon'></FaTrashAlt>
                                <span>Delete</span>
                            </button>
                        </div> */}
                    </div>
                ))}

                <Toaster position="bottom-center" reverseOrder={false} />
            </div>

        </>
    );
}

export default ProjectList;