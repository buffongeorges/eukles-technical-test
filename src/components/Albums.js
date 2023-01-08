import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Albums() {
  const user = useSelector((state) => state.selectedUser);
  const [albums, setAlbums] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserAlbums = () => {
      if (user) {
        axios
          .get(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
          .then((result) => {
            setAlbums(result.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getUserAlbums();
  }, []);

  if (user) {
    return (
      <>
        <h1>Voici les albums de {user.name}</h1>
        <div style={{ display: "inline-block" }}>
          <ul>
            {albums.map((album, index) => (
              <li
                data-testid={`album-${index + 1}`}
                key={index}
                style={{ marginBottom: "1rem" }}
              >
                <Link
                  data-testid={`album-link-${index + 1}`}
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
  } else {
    return null;
  }
}
