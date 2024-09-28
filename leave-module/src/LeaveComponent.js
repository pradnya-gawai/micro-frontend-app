import React, { useEffect } from 'react';
import axios, { setAuthToken } from 'host/axiosConfig';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for Redux
import { setLeaves } from 'host/store/leaveReducer'; // Adjust this import according to your file structure
import './LeaveComponent.css'; // Import the CSS file for styling

const LeaveComponent = () => {
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leave.leaves); // Access the leaves from global state

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    // If token exists, set it in Axios headers
    if (token) {
      setAuthToken(token);
    }

    const fetchLeaves = async () => {
      try {
        // Define the payload
        const payload = {
          pagination: {
            currentPage: 1,
            pageSize: 50,
          },
          sortColumn: 'Date',
          sortDir: 'DSC',
        };

        // Make the POST request
        const response = await axios.post(
          'https://qa-app.mewurk.com/api/v1/leaveservice/leaveapplication/leavedetails',
          payload
        );

        // Dispatch action to set leave data in Redux store
        dispatch(setLeaves(response?.data?.data)); // Dispatch action
        console.log(response, "response");
      } catch (error) {
        console.log('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, [dispatch]);

  return (
    <div className="leave-container">
      <h1 className="leave-title">Leave Module</h1>
      <p>This is the Leave module listing page.</p>
      <table className="leave-table">
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Leave Type</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Leave Period</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {leaves && leaves.length > 0 ? (
            leaves.map((leave) => (
              <tr key={leave.leaveId}>
                <td>{leave.leaveId}</td>
                <td>{leave.leaveTypeName}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                <td>{leave.leavePeriod}</td>
                <td>{leave.duration}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No leaves found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveComponent;
