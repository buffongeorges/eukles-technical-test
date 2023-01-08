import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Photos } from "../../components/Photos";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import axiosMock from "axios";
import { MemoryRouter } from "react-router-dom";

const dummyPhotos = [
  {
    albumId: 7,
    id: 301,
    title: "aspernatur est omnis qui laudantium illo in laborum dolore",
    url: "https://via.placeholder.com/600/92ce9a",
    thumbnailUrl: "https://via.placeholder.com/150/92ce9a",
  },
  {
    albumId: 7,
    id: 302,
    title: "nihil et ducimus in ipsa perspiciatis",
    url: "https://via.placeholder.com/600/4e2b80",
    thumbnailUrl: "https://via.placeholder.com/150/4e2b80",
  },
];

const dummySelectedUser = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

const dummySelectedAlbum = {
  userId: 7,
  id: 61,
  title: "delectus iusto et",
};

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});
describe(Photos, () => {
  let initialState = {
    selectedUser: dummySelectedUser,
    selectedAlbum: dummySelectedAlbum,
  };
  const mockStore = configureStore();
  let store;
  store = mockStore(initialState);

  it("should render component without crashing", () => {
    axiosMock.get.mockResolvedValue({ data: null });
    render(
      <Provider store={store}>
        <Photos />
      </Provider>
    );
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      `Voici les images de l'album ${dummySelectedAlbum.title} de l'utilisateur ${dummySelectedUser.name}`
    );
  });

  it("should match snapshot", () => {
    const albumComponent = (
      <Provider store={store}>
        <Photos />
      </Provider>
    );
    const tree = renderer.create(albumComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should display Photos list on api mock", async () => {
    axiosMock.get.mockResolvedValue({ data: dummyPhotos });
    render(
      <Provider store={store}>
        <Photos />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    const firstPictureInList = await waitFor(() =>
      screen.findByTestId("photo-1")
    );
    expect(firstPictureInList).toBeInTheDocument();
    expect(firstPictureInList).toHaveStyle(`margin-bottom: 1rem;`);
    const secondPictureInList = await waitFor(() =>
      screen.findByTestId("photo-2")
    );
    expect(secondPictureInList).toBeInTheDocument();

    const firstPictureLink = await waitFor(() =>
      screen.findByTestId("photo-content-1")
    );
    expect(firstPictureLink).toBeInTheDocument();
    expect(firstPictureLink).toHaveAttribute('src', "https://via.placeholder.com/600/92ce9a");
  });
});
