import React, { useRef, useState, useEffect } from 'react';
import './navside.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Search, Sun, Moon, Bell, Home, ClipboardList, User, Settings, LogOut, CircleHelp, FilePenLine } from 'lucide-react';
import { FaLaptopCode } from 'react-icons/fa';
import p from '../../assets/dummyprofile.png'
import b from '../../assets/brand.png'


function Navside({ theme, setTheme }) {


    const [openProfile, setOpenProfile] = useState(false);

    const pflRef1 = useRef();
    const pflRef2 = useRef();
    const pflRef3 = useRef();
    const closePflDrop = (e) => {
        if (pflRef1.current === e.target) {
            setOpenProfile(false);
        }
        else if (pflRef2.current === e.target) {
            setOpenProfile(false);
        }
        else if (pflRef3.current === e.target) {
            setOpenProfile(false);
        }
    }

    //get username and email from local storage useing useEffect and useState
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    //get username and email from local storage
    useEffect(() => {
        setUsername(localStorage.getItem('username'));
        setEmail(localStorage.getItem('email'));
    }, []);


    const mode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    const navigate = useNavigate();


    return (
        <>
            <div>
                {/* <nav className="main-nav"> */}
                <nav className="nav">
                    <div className="left-nav"></div>
                    <div className="middle-nav">
                        <div className="searchbar">
                            <input type="search" className="search-input" placeholder="Search..." required />
                            <button type="submit" className="search-btn">
                                <Search style={{ width: '1.5rem', height: '1.5rem' }} strokeWidth={3} />                            
                            </button>
                        </div>
                    </div>
                    <div className="right-nav">
                        <div className="right-inside">
                            <button aria-hidden="true" type="button" className="noti" onClick={() => { mode() }}>
                                {theme === 'light' ? <Moon className='theme-icon' strokeWidth={2.75} /> : <Sun className='theme-icon' strokeWidth={2.75} />}
                            </button>
                            <button type="button" className="noti">
                                <Bell className='nav-icon' strokeWidth={2.75} />
                            </button>
                            <button type="button" className="noti" onClick={() => { setOpenProfile((prev) => !prev) }}>
                                <div className="pfl">
                                    <span>{username}</span>
                                    <span>{email}</span>
                                </div>
                                
                                <div>
                                    <img src={p} alt="" className='p-pic' />
                                </div>
                            </button>

                            {openProfile &&
                                <div className="pfl-dropdown">
                                    <ul className="pfl-list" role="none">
                                        <li>
                                            <User strokeWidth={2.5} className="pfl-list-icon" />
                                            <Link to="/dash/profile" className="pfl-list-item" ref={pflRef1} onClick={closePflDrop}>Profile</Link>
                                        </li>
                                        <li>
                                            <FilePenLine strokeWidth={2.5} className="pfl-list-icon" />
                                            <Link to="/dash/profile/edit-profile" className="pfl-list-item" ref={pflRef2} onClick={closePflDrop}>Edit Profile</Link>
                                        </li>
                                        <li>
                                            <Settings strokeWidth={2.5} className="pfl-list-icon" />
                                            <Link to="#" className="pfl-list-item">Settings</Link>
                                        </li>
                                        <li>
                                            <CircleHelp strokeWidth={2.5} className="pfl-list-icon" />
                                            <Link to="#" className="pfl-list-item">Help</Link>
                                        </li>
                                        <li>
                                            <LogOut strokeWidth={2.5} className="pfl-list-icon" />
                                            <Link to="/" className="pfl-list-item" ref={pflRef3} onClick={closePflDrop}>Logout</Link>
                                        </li>
                                    </ul>
                                </div>
                            }

                        </div>
                    </div>
                </nav>
                {/* </nav> */}

                <aside className="sidebar">
                    <div className="brand-name">
                        <span onClick={() => { navigate('/dash') }} style={{ cursor: 'pointer' }}><img src={b} style={{ width: '35px', height: '35px' }}></img>Planpro</span>
                    </div>
                    <ul className="side-inside">

                        <li className="dash-head">
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '2rem' }}>
                                <div style={{ fontSize: '0.875rem', lineHeight: '1.25rem', letterSpacing: '0.025em', textTransform: 'uppercase', color: '#9CA3AF', fontWeight: '400' }}>Dashboard</div>
                            </div>
                        </li>

                        <li>
                            <Link to="/dash/home" className="dash-items">
                                <Home className='dash-icon' strokeWidth={3} />
                                <span className="dash-items-name">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dash/projects" className="dash-items">
                                <FaLaptopCode className='dash-icon'></FaLaptopCode>
                                <span className="dash-items-name">Projects</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dash/tasks" className="dash-items">
                                <ClipboardList className='dash-icon' strokeWidth={2.75} />                                
                                <span className="dash-items-name">My Tasks</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="side-inside">
                        <li className="dash-head">
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '2rem' }}>
                                <div style={{
                                    fontSize: '0.875rem', lineHeight: '1.25rem',
                                    letterSpacing: '0.025em',
                                    textTransform: 'uppercase', color: '#9CA3AF', fontWeight: '500'
                                }}>User Settings</div>
                            </div>
                        </li>
                        <li>
                            <Link to="/dash/profile" className="dash-items">
                                <User className='dash-icon' strokeWidth={2.75} />
                                <span className="dash-items-name">Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="dash-items">
                                <Settings className='dash-icon' strokeWidth={2.75} />
                                <span className="dash-items-name">Settings</span>
                            </Link>
                        </li>
                    </ul>
                </aside>

                <div className="main-body">
                    <div className="inside-main-body" >
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navside