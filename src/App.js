import UserDashboard from "./views/UserDashboard";

import { GlobalProvider } from "./store/GlobalState";

const App = () => (
  <GlobalProvider>
    <UserDashboard />
  </GlobalProvider>
);

export default App;
