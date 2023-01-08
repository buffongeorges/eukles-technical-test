import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function Photos() {
  const user = useSelector((state) => state.selectedUser);
  const album = useSelector((state) => state.selectedAlbum);
  const [photos, setPhotos] = useState([]);
  const URL = `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`;

  useEffect(() => {
    const getPhotos = () => {
      axios
        .get(URL)
        .then((result) => {
          setPhotos(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPhotos();
  }, []);

  return (
    <>
      <h1>
        Voici les images de l'album {album.title} de l'utilisateur {user.name}:
      </h1>
      <div style={{ display: "inline-block" }}>
        <ul>
          {photos.map((album, index) => (
            <li
              data-testid={`photo-${index + 1}`}
              key={index}
              style={{ marginBottom: "1rem" }}
            >
              <img data-testid={`photo-content-${index + 1}`} src={album.url} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
