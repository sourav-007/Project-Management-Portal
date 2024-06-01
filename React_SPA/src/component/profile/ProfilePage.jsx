import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './profilepage.css'
import { Pencil, LogOut } from 'lucide-react'
import pic from '../../assets/dummyprofile.png'
import axios from 'axios'



function ProfilePage() {

    const navigate = useNavigate();

    // const [image, setImage] = useState(null);

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         setImage(reader.result);
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

    // const removeImage = () => {
    //     setImage(null);
    // };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [designation, setDesignation] = useState('');
    const [username, setUsername] = useState('');
    //call axios to get user details with useEffect
     

    useEffect(() => {
          var model_json = {
                "collectionName": "Users",
                "attribute": "email",
                "value": localStorage.getItem('email')
            }
        axios.post('http://localhost:3001/findDocuments', model_json)
            .then((response) => {
                setName(response.data[0].name);
                setEmail(response.data[0].email);
                setCompany(response.data[0].company);
                setDesignation(response.data[0].designation);
                setUsername(response.data[0].username);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <>
            {/* <div className="task-overlay"> */}
            <div className='profile-modal-wrap'>
                <div className="profile-modal-div">
                    <div className="profile-cross">
                        <button className='profile-close-btn' onClick={()=>{navigate('edit-profile')}} >
                            <Pencil strokeWidth={2.5} />
                        </button>
                    </div>
                    <div className="profile-pic">                       
                        <img src={pic} alt="profilepic" className='profile-picbox' />
                        <span>{username}</span>
                    </div>

                    <div className="profile-modal">
                        <div className="profile-contents">
                            {/* <div className="profile-details"> */}
                            <div className="detail">
                                <label>Name:</label>
                                <span>{name}</span>
                            </div>
                            <div className="detail">
                                <label>Email:</label>
                                <span>{email}</span>
                            </div>
                            <div className="detail">
                                <label>Company name:</label>
                                <span>{company}</span>
                            </div>
                            <div className="detail">
                                <label>Designation:</label>
                                <span>{designation}</span>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>


                    <div className="profile-modal">
                        <button type="submit" class="pedit-btn" onClick={() => { navigate('/') }}>
                            <LogOut strokeWidth={2.5} />Logout
                        </button>
                    </div>
                </div>
            </div>
            {/* </div> */}


            {/* <div className="profile-overlay">
                <div className='pedit-modal-wrap'>
                    <div className="profile-modal-div">
                        <div className="pedit-cross">
                            <button className='pedit-close-btn'>
                                <X strokeWidth={2.5} />
                            </button>
                        </div>
                        <div className="pedit-modal">
                            <h2>Edit Your Profile</h2>
                        </div>

                        <div className="profile-picture">
                            
                            {image ? (
                                <img src={image} alt="Profile" className="uploaded-image" />
                            ) : (
                                <div className='alt-upload'>
                                    <div className='alt-pic'>
                                        <img src={dp} />
                                    </div>
                                    <label htmlFor='p-img'><Camera strokeWidth={2} style={{ cursor: 'pointer' }} className='alt-pic-btn' /></label>
                                    <input type="file" id='p-img' accept="image/png, image/jpeg" onChange={handleImageChange} style={{ display: 'none', visibility: 'none' }} />
                                </div>
                            )}
                            
                            <div className="photo-buttons">
                                {image && <Trash2 strokeWidth={2} className="remove-btn" onClick={removeImage} />}
                            </div>
                        </div>

                        <form class="pedit-modal-form">
                            <div class="pedit-modal-form-content">
                                <div class="pedit-modal-items">
                                    <input type="text"
                                        name="name" class="pedit-name-item"
                                        placeholder="Name" required />
                                </div>
                                <div class="pedit-modal-items">
                                    <input type="text"
                                        name="name" class="pedit-name-item"
                                        placeholder="Email" required />
                                </div>
                                <div class="pedit-modal-items" id='model-media'>
                                    <input type="text"
                                        placeholder="Company name"
                                        name="date"
                                        class="pedit-name-item2" required />
                                </div>
                                <div class="pedit-modal-items" id='model-media'>
                                    <input type="text"
                                        name="assign-to"
                                        class="pedit-name-item2"
                                        placeholder="Designation" required />
                                </div>
                                <div class="pedit-modal-items">
                                    <input type="text"
                                        name="name" class="pedit-name-item"
                                        placeholder="Password" required />
                                </div>
                            </div>
                            <div class="pedit-modal-items">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '10px', margin: '2px' }}>
                                    <span style={{fontSize:'medium', fontWeight:'500'}}>Do you want to delete your account?</span>
                                    <button className='pdel-btn'>Delete</button>
                                </div>
                            </div>

                        </form>
                        <div className="profile-modal">
                            <button type="submit" class="pedit-btn">Save</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default ProfilePage