import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export function Home() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((result) => {
          setUsers(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUsers();
  }, []);

  return (
    <>
      <h1>La liste des utilisateurs :</h1>
      <div style={{display: 'inline-block'}}>
        <ul>
          {users.map((user, index) => (
            <li data-testid={`user-${index+1}`} key={index} style={{marginBottom: '1rem'}}><Link data-testid={`user-link-${index+1}`} to={"albums"} onClick={() => dispatch({type: "EDIT_SELECTED_USER", newValue: user})}>{user.name}</Link></li>
          ))}
        </ul>
      </div>
    </>
  );
}