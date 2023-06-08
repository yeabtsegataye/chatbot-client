import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
// import ProfileModel from "./ProfileModel";
import { useState } from "react";
import UserListItem from "../userAvatar/UserListItem";
import axios from "axios";
import ProfileModal from "./ProfileModel";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { getSender } from "../../config/Chatlogc";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

const SlideDrawer = () => {
  const history = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const handle_logout = () => {
    localStorage.removeItem("userInfo");
    history("/");
  };

  const handle_search = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!search) {
      alert("No search");
      setLoading(false);
      return;
    }
    try {
      const api = `http://localhost:8000/api/user?search=${search}`;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(api, config);
      const tati = data.users;
      setLoading(false);
      setSearchResult(tati);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:8000/api/chat`,
        { userId },
        config
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      // onClose();
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <div className="container-fluid bg-body-tertiary d-flex justify-content-between p-2">
      <div className="searchButten">
        <button
          className="btn btn-secondary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <i className="bi bi-search"></i> search
        </button>

        <div
          className="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">
              search users
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <nav className="navbar bg-body-tertiary">
              <div className="container-fluid">
                <form className="d-flex" role="search" onSubmit={handle_search}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </nav>
            <div>
              {loading ? (
                <p>loading...</p>
              ) : (
                searchResult.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {loadingChat}
      <div>
        <h2>Chat-app</h2>
      </div>

      <div className="d-flex">
        <div className="theBell">
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
        <div className="d-flex ">
          <img src={user.pic} alt="user" id="userimg" />
          <button
            className="btn  dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>

          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                href="/"
                onClick={handle_logout}
              >
                Log out
              </button>
            </li>
            <li>
              <button className="dropdown-item">
                <ProfileModal user={user}>
                  <p>Profile</p>{" "}
                </ProfileModal>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SlideDrawer;
