import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Albums() {
  const user = useSelector((state) => state.selectedUser);
  console.log(user);
  const [albums, setAlbums] = useState([]);
  const dispatch = useDispatch();
  const URL = `https://jsonplaceholder.typicode.com/users/${user.id}/albums`;

  useEffect(() => {
    const getUserAlbums = () => {
      axios
        .get(URL)
        .then((result) => {
          console.log("result");
          console.log(result);
          setAlbums(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUserAlbums();
  }, []);
  return (
    <>
      <h1>Voici les albums de {user.name}</h1>
      <div style={{ display: "inline-block" }}>
        <ul>
          {albums.map((album, index) => (
            <li key={index} style={{marginBottom: '1rem'}}>
              <Link
                to={"photos"}
                onClick={() =>
                  dispatch({ type: "EDIT_SELECTED_ALBUM", newValue: album })
                }
              >
                {album.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
