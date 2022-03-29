import AddExpensesForm from '../components/AddExpensesForm';

const Summary = () => {
  return (
    <main className="container-md">
      <header className="row text-center my-5">
        <h1 className="display-1 text-primary">Mat's Budget</h1>
      </header>
      <section className="row my-4">
        <div className="text-center">
          <h2 className="display-2">Summary</h2>
        </div>
        <div className="">
          <h3 className="fw-light">
            Your monthly budget is <span className="text-primary">€7777</span>
          </h3>
          <h3 className="fw-light">
            You have spent <span className="text-danger">€3333</span>
          </h3>
          <h3 className="fw-light">
            This leaves you with <span className="text-success">€4444</span>{' '}
            until <span>31.03.22</span>
          </h3>
        </div>
      </section>
      <AddExpensesForm />
    </main>
  );
};

export default Summary;
