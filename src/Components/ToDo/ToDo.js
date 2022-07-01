import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const ToDo = () => {
    const [user] = useAuthState(auth)
    const [toDoList, setToDoList] = useState([]);
    const userTask = toDoList.filter(element => element.email == user.email)

    useEffect(() => {
        fetch(`https://boiling-taiga-34343.herokuapp.com/todo`)
            .then(res => res.json())
            .then(data => setToDoList(data));
    }, [])
    return (
        <div>
            <h1 className='text-4xl text-center font-bold text-info my-10'>Pending Tasks</h1>
            <div class="overflow-x-auto">
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
                                <td> <button className="btn btn-xs btn-info text-white">Pending</button> </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ToDo;