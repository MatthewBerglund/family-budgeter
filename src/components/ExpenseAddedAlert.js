const ExpenseAddedAlert = ({ addedSuccessfully, setAddedSuccessfully }) => {
  return (
    <div
      role="alert"
      style={{ zIndex: 1 }}
      className={`alert ${
        addedSuccessfully ? 'alert-success' : 'alert-danger'
      } alert-dismissible position-fixed bottom-0 end-0`}
    >
      {addedSuccessfully ? (
        <>
          <h4 className="alert-heading">Expenses added</h4>
          <p>Your expense has been successfully added.</p>
        </>
      ) : (
        <>
          <h4 className="alert-heading">Expense not added</h4>
          <p>Your expense could not be added. Please try again.</p>
        </>
      )}
      <button
        type="button"
        className="btn-close"
        onClick={() => setAddedSuccessfully(undefined)}
      />
    </div>
  );
};

export default ExpenseAddedAlert;
