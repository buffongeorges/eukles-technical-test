import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Home } from "../../components/Home";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import axiosMock from "axios";
import { MemoryRouter } from "react-router-dom";

const dummyUsers = [
  {
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
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
];

afterEach(() => {
  cleanup();
});
describe(Home, () => {
  let initialState = { selectedUser: null, selectedAlbum: null };
  const mockStore = configureStore();
  let store;
  store = mockStore(initialState);

  it("should render component without crashing", () => {
    axiosMock.get.mockResolvedValue({ data: null });
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("La liste des utilisateurs :");
  });

  it("should match snapshot", () => {
    const homeComponent = (
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const tree = renderer.create(homeComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should display users list on api mock", async () => {
    axiosMock.get.mockResolvedValue({ data: dummyUsers });
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    const firstUserInList = await waitFor(() => screen.findByTestId("user-1"));
    expect(firstUserInList).toBeInTheDocument();
    expect(firstUserInList).toHaveTextContent("Leanne Graham");
    const secondUserInList = await waitFor(() => screen.findByTestId("user-2"));
    expect(secondUserInList).toHaveTextContent("Ervin Howell");
  });

  it("should change page on click", async () => {
    axiosMock.get.mockResolvedValue({ data: dummyUsers });
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    const firstUserInList = await waitFor(() => screen.findByTestId("user-1"));
    expect(firstUserInList).toBeInTheDocument();
    const firstUserLink = await waitFor(() =>
      screen.findByTestId("user-link-1")
    );
    expect(firstUserLink).toHaveAttribute("href", "/albums");
  });
});
