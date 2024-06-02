import React,{useState,useEffect} from 'react'
import { X, Trash2, Camera } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import dp from '../../assets/dummyprofile.png'
import './profileditpage.css'
import axios from 'axios'


function ProfileEditPage() {

    const navigate = useNavigate();

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
    };
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
        axios.post('https://project-management-portal-eosin.vercel.app/findDocuments', model_json)
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

    // handle form submit and edit login

    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        var model_json2 = {
            "collectionName": "Users",
            "query": {
                        "email": localStorage.getItem('email')
                    },
                    "update": {
                                "$set": {
                                    "name": name,
                                    "email": email,
                                    "company": company,
                                    "designation": designation,

                                }
                            }
        }
    
        axios.post('https://project-management-portal-eosin.vercel.app/updateDocument', model_json2)
            .then((response) => {
                console.log(response.data);
                navigate('/dash/profile');
            })
            .catch((error) => {
                console.error('Error updating data: ', error);
            });
    };



    return (
        <>
            {/* <div className="profile-overlay"> */}
                <div className='pedit-modal-wrap'>
                    <div className="profile-modal-div">
                        {/* <div className="pedit-cross">
                            <button className='pedit-close-btn'>
                                <X strokeWidth={2.5} />
                            </button>
                        </div> */}
                        <div className="pedit-modal">
                            <h2>Edit Your Profile</h2>
                        </div>

                        <div className="profile-picture">
                            {/* Show uploaded image or default user icon */}
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
                            {/* Upload and Remove photo buttons */}
                            <div className="photo-buttons">
                                {/* <label htmlFor='p-img'><CloudUpload strokeWidth={2} style={{cursor:'pointer'}} /></label>
                                <input type="file" id='p-img' accept="image/*" onChange={handleImageChange} style={{display:'none',visibility:'none'}} /> */}
                                {image && <Trash2 strokeWidth={2} className="remove-btn" onClick={removeImage} />}
                            </div>
                        </div>

                        <form class="pedit-modal-form" onSubmit={handleFormSubmit}>
                            <div class="pedit-modal-form-content">
                                <div class="pedit-modal-items">
                                    <input type="text"
                                        name="name" class="pedit-name-item" value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name" required />
                                </div>
                                <div class="pedit-modal-items">
                                    <input type="text"
                                        name="email" class="pedit-name-item" value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email" required />
                                </div>
                                <div class="pedit-modal-items" id='model-media'>
                                    <input type="text"
                                        placeholder="Company name" value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        name="company"
                                        class="pedit-name-item2" required />
                                </div>
                                <div class="pedit-modal-items" id='model-media'>
                                    <input type="text"
                                        name="Designation" value={designation}
                                        onChange={(e) => setDesignation(e.target.value)}
                                        class="pedit-name-item2"
                                        placeholder="Designation" required />
                                </div>
                                <div class="pedit-modal-items">
                                    <input type="text"
                                        name="name" class="pedit-name-item"
                                        placeholder="Password" disabled />
                                </div>
                            </div>
                            <div class="pedit-modal-items">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '10px', margin: '2px' }}>
                                    <span style={{ fontSize: 'medium', fontWeight: '500' }}>Do you want to delete your account?</span>
                                    <button className='pdel-btn'>Delete</button>
                                </div>
                            </div>
                            <div className="profile-modal">
                            <button type="submit" class="pedit-btn" >Save</button>
                        </div>
                        </form>
                        
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}

export default ProfileEditPage