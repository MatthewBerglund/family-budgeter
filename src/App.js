import { GlobalProvider } from "./GlobalState";
import UserDashboard from "./views/UserDashboard";

const App = () => (
  <GlobalProvider>
    <UserDashboard />
  </GlobalProvider>
);

export default App;
