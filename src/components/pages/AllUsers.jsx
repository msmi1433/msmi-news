import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../";
import { getUser, getUserList } from "../apiCalls";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [userList, setUserList] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserList()
      .then((users) => {
        return users.filter((userX) => userX.username !== user.username);
      })
      .then((filteredUsers) => {
        setUserList(filteredUsers);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [user]);

  const logIn = (username) => {
    getUser(username).then((newUser) => {
      setUser(newUser);
    });
  };

  if (isLoading) return <h3 className="loading-message">Loading...</h3>;
  if (isError) {
    return (
      <section className="article error">
        <h3 className="error-message">
          404 - Users could not be loaded; please refresh the page
        </h3>
      </section>
    );
  }

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
