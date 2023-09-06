import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../";
import { getUser, getUserList } from "../apiCalls";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [userList, setUserList] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getUserList()
      .then((users) => {
        return users.filter((userX) => userX.username !== user.username);
      })
      .then((filteredUsers) => {
        setUserList(filteredUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const logIn = (username) => {
    getUser(username).then((newUser) => {
      setUser(newUser);
    });
  };

  return (
    <section className="all-users container">
      <h2>Please click one of the users below to login</h2>
      <ol className="users-flex-container">
        {userList.map((user) => {
          return (
            <li key={user.username} className="user-card">
              <div className="user-login-img-container">
                <img
                  src={user.avatar_url}
                  alt={`${user.username} avatar image`}
                  className="user-login-image"
                />
              </div>
              <p className="users-username">{user.username}</p>
              <button
                className="user-login button"
                onClick={(e) => {
                  logIn(user.username);
                }}
              >
                Log in as {user.username}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default AllUsers;
