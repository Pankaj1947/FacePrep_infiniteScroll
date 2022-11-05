import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./styles.css";

export const Home = () => {
  const [users, setUsers] = React.useState([]); //users state
  const [isAuth, toggleAuth] = React.useContext(AuthContext); //Auth state
  const navigate=useNavigate(); //navigate state

    //API: https://randomuser.me/api/?page=1&results=10
  useEffect(() => { 
    getUserList();
  }, []);

  const pageNo = Math.ceil(users.length / 10) + 1;  
  //changing page number according to previous users data
  
  const url = `https://randomuser.me/api/?page=${pageNo}&results=10`;

  //fetching user list from api
  const getUserList = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUsers([...users, ...data.results]);
      })
      .catch((err) => console.log(err));
  };
  //fetching more data for infinite scroll
  const fetchMoreData = () => {
    setTimeout(() => {
      getUserList();
    }, 1000);
  };

  //logout function
  const logOut = () => {
    toggleAuth();
    alert("Logged Out");
    navigate("/");
  };

  return (
    <div>
      <div className="heading">
        <h1>Infinite Scroll</h1>
      </div>
      <div className="logout">
        <button onClick={logOut}>Logout</button>
      </div>
      <div className="mainContainer">
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          className="container"
        >
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <div key={user.login.uuid} className="boxes">
                <div>
                  <img src={user.picture.large} alt="user" />
                </div>
                <div>
                  <h3 className="text">
                    <span>Name:</span> {`${user.name.first} ${user.name.last}`}
                  </h3>
                </div>
                <div>
                  <h4 className="text">
                    <span>Email:</span> {user.email}
                  </h4>
                </div>
                <div>
                  <h4 className="text">
                    <span>Contact:</span> {user.phone}
                  </h4>
                </div>
              </div>
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};
