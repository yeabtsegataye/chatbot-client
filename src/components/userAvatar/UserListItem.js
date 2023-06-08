import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div onClick={handleFunction} key={user.id} id="userChat">
      <div className="card">
        <div className="img">
          <img id="userimg" src={user.pic} alt="" />
        </div>
        <div className="textBox">
          <div className="textContent">
            <p className="h1">{user.name}</p>
          </div>
          <p className="p">
            <span className="h1">email : </span> {user.email}
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
