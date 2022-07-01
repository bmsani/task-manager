import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Home = () => {
    const [user] = useAuthState(auth);
    const email = user.email
    const [tasks, setTasks] = useState([]);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        fetch(`https://boiling-taiga-34343.herokuapp.com/task?email=${email}`)
            .then(res => res.json())
            .then(data => setTasks(data));

    }, [complete])

    const handleTaskDone = id => {
        const taskDone = { done: true };
        const url = `https://boiling-taiga-34343.herokuapp.com/task/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(taskDone)
        })
            .then(res => res.json())
            .then(data => {
                setComplete(!complete)
                console.log(data);
            })

    }

    const handleDeleteTask = id => {
        const proceed = window.confirm("Are you sure you want to delete this item?")

        if (proceed) {
            const url = `https://boiling-taiga-34343.herokuapp.com/task/${id}`
            fetch(url, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainingTask = tasks.filter(product => product._id !== id)
                        setTasks(remainingTask);
                    }
                })
        }

    }
    return (
        <div>
            <h1 className='text-4xl text-center font-bold text-info my-10'>All Tasks</h1>
            {
                tasks.length < 1 && <h1 className='text-2xl text-error text-center font-bold text-info my-10'>No task available please add task from "Add task" page</h1>
            }
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>Task NO</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Action</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, index) => <tr key={task._id}>
                                <th>{index + 1}</th>
                                <td className={task.done ? 'line-through' : ''}>{task.name}</td>
                                <td className={task.done ? 'line-through' : ''}>{task.description}</td>
                                <td> <button onClick={() => handleTaskDone(task._id)} class="btn btn-xs btn-info text-white">Complete</button> </td>
                                <td> <button onClick={() => handleDeleteTask(task._id)} class="btn btn-xs btn-error">Delete</button> </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;