import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios, { setAuthToken } from 'host/axiosConfig';
import { setTasks } from 'host/store/taskReducer'; // Adjust this import according to your file structure
import './TaskComponent.css'; // Import the CSS file for styling

const TaskComponent = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks); // Get tasks from Redux state

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    // If token exists, set it in Axios headers
    if (token) {
      setAuthToken(token);
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://qa-app.mewurk.com/api/v1/taskservice/tasks');
        dispatch(setTasks(response?.data?.data)); // Dispatch action to set tasks in Redux state
        console.log(response, "response");
      } catch (error) {
        console.log('tasks:', error);
      }
    };

    fetchTasks();
  }, [dispatch]); // Ensure dispatch is in the dependency array

  useEffect(() => {
    console.log(tasks, "task");
  }, [tasks]);

  return (
    <div className="task-container">
      <h1 className="task-title">Task List</h1>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Title</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.taskTitle}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.taskCategory}</td>
                <td>{task.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskComponent;
