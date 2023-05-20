import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUser } from "../../features/Get/Get";
import "./Table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { user } from "../../Interface/Interface";

function Table() {
  const user = useAppSelector((state) => state.getSlice);
  const userData =  user.users;

  const [userDeleted, setuserDeleted] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [userDeleted]);

  const deleteUser = async (id: string) => {
    await axios
      .delete(`http://localhost:8001/users/${id}`)
      .then((response) => toast.success(response.data.message))
      .catch((error) => toast.warning(error.message));
    setuserDeleted(true);
  };

  return (
    <div>
      <h1 className="text-center">List of users</h1>
      <table data-testid="tablesas" className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Middle Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        
          {userData && userData.map((element: user) => {
            return <tbody> <tr>
                <td>{element.firstname}</td>
                <td>{element.middlename}</td>
                <td>{element.lastname}</td>
                <td>{element.email}</td>
                <td>{element.phone}</td>
                <td>{element.role}</td>
                <td>{element.address}</td>
              </tr>
        </tbody>
            
          })}
      </table>
    </div>
  );
}

export default Table;
