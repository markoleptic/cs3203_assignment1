import Button from "react-bootstrap/Button";
import React, { useState } from "react";

export default function App() {
  // state variable for tweet objects
  const [items, setItems] = useState([]);
  // state variable for users
  const [users, setUsers] = useState([]);
  // state variable new tweets
  const [inputTweet, setInputTweet] = useState("");
  // state variable input user ID
  const [inputID, setInputID] = useState(0);
  // state variable for searching ID
  const [searchID, setSearchID] = useState(0);
  // state variable for searching tweets
  const [foundTweets, setFoundTweets] = useState([]);
  // state variable for new screen name
  const [newScreenName, setNewScreenName] = useState("");

  /* async function using get request to get all tweets,
  and update tweet state variable 
  */
  let fetchTweets = async () => {
    const response = await fetch("/tweetinfo");
    const data = await response.json();
    setItems(data);
  };

  /* async function using get request to get all users,
  and update user state variable 
  */
  let fetchUsers = async () => {
    const response = await fetch("/tweets");
    const data = await response.json();
    setUsers(data);
  };

  /* function using post request to send new tweet to backend
   */
  let postTweet = (e) => {
    e.preventDefault();
    const response = fetch("/tweetinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputTweet }),
    }).then(setInputTweet(""));
    if (response) {
      console.log("Successful post");
    }
  };

  /* function using delete request to send tweet to be deleted to backend
   */
  let deleteTweet = () => {
    const response = fetch(`/tweetinfo/${inputID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputID }),
    }).then(setInputID(-1));
    if (response) {
      console.log("Successful delete");
    }
  };

  /* async function using post request to send tweetID
  to be searched for to backend, called on Search button clicked
  */
  let postSearch = async (e) => {
    e.preventDefault();
    const response = await fetch("/searchinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchID }),
    });
    const data = await response.json();
    setFoundTweets(data);
  };

  /* async function using get request to retrieve a list of
  recently searched tweets from the backend, called on
  recently searched button click
  */
  let searchTweet = async () => {
    const response = await fetch("/searchinfo");
    const data = await response.json();
    setFoundTweets(data);
    setSearchID();
  };

  /* async function using put request to update a user name by
  sending the new screen name. Also calls fetchUsers to update the user list.
  Called when Update user button is clicked
  */
  let updateScreenName = async (e) => {
    e.preventDefault();
    const response = await fetch(`/tweets/${newScreenName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newScreenName }),
    });
    if (response) {
      console.log("Successful put");
    }
    fetchUsers();
  };

  /* Since I'm using React, I decided to move basically everything from
  index.html into here since it was easier to use state variables here 
  being my first time using React.
  */
  return (
    <div>
      <h1>Assignment 1</h1>
      <hr></hr>
      <h5>To Create a Tweet, Enter "ID;Text" In That Exact Format</h5>

      {/*call postTweet on Create Tweet button click, update inputTweet
      on value changed*/}
      <form onSubmit={postTweet}>
        <input
          type="text"
          value={inputTweet}
          placeholder="Enter Tweet Here"
          onChange={(e) => setInputTweet(e.target.value)}
        ></input>
        <button type="submit">Create Tweet</button>
      </form>

      {/*call deleteTweet on DeleteTweet button click, update inputID
      on value changed*/}
      <form onSubmit={deleteTweet}>
        <input
          type="number"
          value={inputID}
          onChange={(e) => setInputID(e.target.value)}
        ></input>
        <Button type="submit">Delete Tweet</Button>
      </form>

      {/*call fetchTweets on GetTweets button click, automatically
      updates the list of tweets by iterating through tweet array
      using .map*/}
      <Button onClick={fetchTweets}>Get Tweets</Button>

      {/*table to display tweets, automatically updated 
      any time items state is updated*/}
      <table className="table">
        <thead>
          <tr height="px 50%">
            <th scope="col">ID</th>
            <th scope="col">Created At</th>
            <th scope="col">Text</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <td>{parseInt(item.id)}</td>
              <td>{JSON.stringify(item.created_at)}</td>
              <td>{JSON.stringify(item.text)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Users</h2>
      <h5>
        To Change Screen Name, Enter "Name;NewScreenName" In That Exact Format
      </h5>

      {/*call fetchUsers on GetUsers button click, automatically
      updates the list of users by iterating through user array
      using .map*/}
      <Button onClick={fetchUsers}>Get Users</Button>

      {/*call updateScreenName on UpdateUser button click, automatically
      updates the list of tweets by iterating through tweet array
      using .map*/}
      <form onSubmit={updateScreenName}>
        <input
          type="text"
          value={newScreenName}
          onChange={(e) => setNewScreenName(e.target.value)}
        ></input>
        <Button type="submit">Update User</Button>
      </form>

      {/*table to display users, automatically updated 
      any time users state is updated*/}
      <table className="table">
        <thead>
          <tr height="px 50%">
            <th scope="col">ID</th>
            <th scope="col">Screen Name</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{JSON.stringify(user.id)}</td>
              <td>{JSON.stringify(user.screen_name)}</td>
              <td>{JSON.stringify(user.name)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Search for a Tweet</h2>
      {/*calls searchTweet on RecentlySearched button click*/}
      <button onClick={searchTweet}>Recently Searched</button>

      {/*calls postSearch on Search button click,
      update searchID on value changed*/}
      <form onSubmit={postSearch}>
        <input
          type="number"
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
        ></input>
        <Button type="submit">Search</Button>
      </form>

      {/*table to display searched tweets, automatically updated 
      any time foundTweets state is updated*/}
      <table className="table">
        <thead>
          <tr height="px 50%">
            <th scope="col">ID</th>
            <th scope="col">Created At</th>
            <th scope="col">Text</th>
          </tr>
        </thead>
        <tbody>
          {foundTweets.map((tweet) => (
            <tr>
              <td>{parseInt(tweet.id)}</td>
              <td>{JSON.stringify(tweet.created_at)}</td>
              <td>{JSON.stringify(tweet.text)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr></hr>
    </div>
  );
}
