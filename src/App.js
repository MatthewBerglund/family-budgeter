import Summary from './views/Summary';
import Expenses from './views/Expenses';

function App() {
  return (
    <main className="container-md">
      <header className="row text-center my-5">
        <h1 className="display-1 text-primary">Mat's Budget</h1>
      </header>
      <Summary />
      <Expenses />
    </main>
  );
}

export default App;
