import cogoToast from 'cogo-toast';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const AddItem = () => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth);
    const handleSubmit = event => {
        event.preventDefault();
        const task = {
            email: user.email,
            name: event.target.name.value,
            description: event.target.description.value,
            done: false
        };

        fetch('https://boiling-taiga-34343.herokuapp.com/task', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                cogoToast.success('Successful', { heading: 'Task added' })
                navigate('/')
            })
    }
    return (
        <div>
            <div class="card w-96 mx-auto bg-slate-400 shadow-xl">
                <div class="card-body">

                    <form onSubmit={handleSubmit} className='grid grid-cols-1 items-center justify-items-center gap-5'>
                        <input type="text" name='name' placeholder="Task Name" class="input input-bordered w-full max-w-xs" required />
                        <input name='description' class="input input-bordered h-24 w-full max-w-xs" placeholder="task description" required></input>
                        <button type="submit" className='btn btn-primary'> submit </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItem;