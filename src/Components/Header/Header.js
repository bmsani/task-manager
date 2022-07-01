import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);
    const handleSignOut = () => {
        signOut(auth);
    }
    return (
        <div class="navbar bg-base-100">
            <div class="navbar-start">
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to='/'> Home</Link></li>
                    <li><Link to='/todo'>To Do</Link></li>
                    <li><Link to='/completed'> Completed</Link></li>
                    <li><Link to='/additem'> Add Task</Link></li>
                    <li><Link to='/calender'> Calender</Link></li>
                    </ul>
                </div>
                <a class="btn btn-ghost normal-case text-xl">MY Todo list</a>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal p-0">
                    <li><Link to='/'> Home</Link></li>
                    <li><Link to='/todo'>To Do</Link></li>
                    <li><Link to='/completed'> Completed</Link></li>
                    <li><Link to='/additem'> Add Task</Link></li>
                    <li><Link to='/calender'> Calender</Link></li>
                </ul>
            </div>
            <div class="navbar-end">
                {user
                    ?
                    <button onClick={handleSignOut} class="btn">Sign Out</button>
                    :
                    <Link to='/login' className='btn'>Login</Link>
                }
            </div>
        </div>
    );
};

export default Header;