import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Albums } from "../../components/Albums";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import axiosMock from "axios";
import { MemoryRouter } from "react-router-dom";

const dummyAlbums = [
  {
    userId: 7,
    id: 61,
    title: "delectus iusto et",
  },
  {
    userId: 7,
    id: 62,
    title: "eos ea non recusandae iste ut quasi",
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

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});
describe(Albums, () => {
  let initialState = { selectedUser: dummySelectedUser, selectedAlbum: null };
  const mockStore = configureStore();
  let store;
  store = mockStore(initialState);

  it("should render component without crashing", () => {
    axiosMock.get.mockResolvedValue({ data: null });
    render(
      <Provider store={store}>
        <Albums />
      </Provider>
    );
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      `Voici les albums de ${dummySelectedUser.name}`
    );
  });

  it("should match snapshot", () => {
    const albumComponent = (
      <Provider store={store}>
        <Albums />
      </Provider>
    );
    const tree = renderer.create(albumComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should display albums list on api mock", async () => {
    axiosMock.get.mockResolvedValue({ data: dummyAlbums });
    render(
      <Provider store={store}>
        <Albums />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    const firstAlbumInList = await waitFor(() =>
      screen.findByTestId("album-1")
    );
    expect(firstAlbumInList).toBeInTheDocument();
    expect(firstAlbumInList).toHaveTextContent("delectus iusto et");
    const secondAlbumInList = await waitFor(() =>
      screen.findByTestId("album-2")
    );
    expect(secondAlbumInList).toHaveTextContent("eos ea non recusandae iste ut quasi");
  });

  it("should change page on click", async () => {
    axiosMock.get.mockResolvedValue({ data: dummyAlbums });
    render(
      <Provider store={store}>
        <Albums />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    const firstAlbumInList = await waitFor(() => screen.findByTestId("album-1"));
    expect(firstAlbumInList).toBeInTheDocument();
    const firstAlbumLink = await waitFor(() =>
      screen.findByTestId("album-link-1")
    );
    expect(firstAlbumLink).toHaveAttribute("href", "/photos");
  });
});
