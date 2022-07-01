import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Completed = () => {
    const [user] = useAuthState(auth)
    const [taskCompleted, setTaskCompleted] = useState([]);
    const userTask = taskCompleted.filter(element => element.email == user.email)

    useEffect(() => {
        fetch(`https://boiling-taiga-34343.herokuapp.com/completedTask`)
            .then(res => res.json())
            .then(data => setTaskCompleted(data));
    }, [])
    return (
        <div>
            <div class="overflow-x-auto">
                <h1 className='text-4xl text-center font-bold text-info my-10'>Completed Tasks</h1>
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>Task NO</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userTask.map((task, index) => <tr key={task._id}>
                                <th>{index + 1}</th>
                                <td>{task.name}</td>
                                <td>{task.description}</td>
                                <td> <button className="btn btn-xs btn-info text-white">Completed</button> </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Completed;