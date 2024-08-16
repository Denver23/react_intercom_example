import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Intercom from "@intercom/messenger-js-sdk";
import { shutdown, boot } from "@intercom/messenger-js-sdk";
const intercomAppId = process.env.REACT_APP_INTERCOM_APP_ID as string;

function App() {
  const user1IntercomData = {
    user_id: "15",
    name: "Admin Entech",
    email: "admin@entechsolutions.com",
    user_hash: process.env.REACT_APP_INTERCOM_FIRST_USER_HASH,
  };

  const user2IntercomData = {
    user_id: "16",
    name: "John Entech",
    email: "member1@entechsolutions.com",
    created_at: "2024-06-19T12:02:02.589Z",
    user_hash: process.env.REACT_APP_INTERCOM_SECOND_USER_HASH,
  };

  const logoutIntercomData = {};

  const [activeUser, setActiveUser] = React.useState<any>(user1IntercomData);

  useEffect(() => {
    if (!intercomAppId) {
      return;
    }
    console.log(`Change user to: ${activeUser.name}`);

    Intercom({
      app_id: intercomAppId,
      ...activeUser,
    });
    boot({ app_id: intercomAppId, ...activeUser });
  }, [activeUser]);

  const logoutHandler = () => {
    shutdown();
    setActiveUser(logoutIntercomData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => setActiveUser(user1IntercomData)}>
          Set User 1
        </button>
        <button onClick={() => setActiveUser(user2IntercomData)}>
          Set User 2
        </button>
        <button onClick={logoutHandler}>Logout</button>
      </header>
    </div>
  );
}

export default App;
