import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((result) => {
          console.log("result");
          console.log(result.data);
          setUsers(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUsers();
  }, []);

  const counter = useSelector(state => state); 
  // allows us to extract data from the redux store. 
  // Here I will access the state of the current store
  // Will subscribe to the redux store 

  const dispatch = useDispatch();
  // to dispatch an action
  // syntax -> dispatch(action)

  console.log(counter);


  return (
    <>
      {/* <button onClick={() => dispatch({type: "CAR"})}>Car</button>
      <h1>{counter.selectedUser}</h1>
      <button onClick={() => dispatch({type: "BIKE"})}>Bike</button> */}
      <h1>La liste des utilisateurs :</h1>
      <div style={{display: 'inline-block'}}>
        <ul>
          {users.map((user, index) => (
            <li key={index} style={{marginBottom: '1rem'}}><Link to={"albums"} onClick={() => dispatch({type: "EDIT_SELECTED_USER", newValue: user})}>{user.name}</Link></li>
          ))}
        </ul>
      </div>
    </>
  );
}