import React, { useState } from "react";
import { useEffect } from "react";
import authService from "../../services/auth/authService";

const UserProfile = ({ user }) => {
  const [userProfile, setUserProfile] = useState({});
  const getUserProfile = () => {
    console.log("ID");
    authService
      .getByUsername(user.username)
      .then((response) => {
        setUserProfile(response.data);
        console.log("roles", response.data.roles);

        // Object.keys(initialUserState).forEach((field) => {
        //   setValue(field, response.data[field]);
        // });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getUserProfile();
  }, [user]);

  return (
    // <div className="d-flex justify-content-between items-align-center">
    <div>
      <div className="card">
        <h5 className="card-header text-primary">Profile</h5>
        <div className="card-body">
          <p>Prénom: {userProfile.firstname}</p>
          <p>Nom : {userProfile.lastname}</p>
          <p>Email: {userProfile.username}</p>
          <p>Mot de Passe: **********</p>

          <div className="mt-3">
            <button className="btn btn-warning">Editer Votre Profile</button>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <h5 className="card-header text-primary">Roles</h5>
        <div className="card-body">
          <div className="col-sm-6">
            <table className="table  table-striped table-sm m">
              <thead>
                <tr>
                  <th scope="col">Libelle</th>
                  <th scope="col">Description</th>
                  {/* <th scope="col">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {userProfile.roles?.map((role) => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>{role.description}</td>
                    <td>
                      {/* <button
                    // onClick={() => unassignRole(role.id)}
                    className="btn btn-danger"
                  >
                    retirer
                  </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
