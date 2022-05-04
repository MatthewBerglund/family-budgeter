const ConfirmMonthModal = ({
  setIsModalOpen,
  setSelectedMonth,
  monthToShow,
}) => {
  const handleMonthChange = () => {
    setSelectedMonth(monthToShow);
    setIsModalOpen(false);
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.6)',
      }}
      id="confirmationHistoryView"
      tabIndex="-1"
      aria-labelledby="Expense deletion confirmation modal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Select month view
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setIsModalOpen(false)}
            ></button>
          </div>
          <div className="modal-body">
            <h6 className="mb-3">
              Would you like to open the new expense month's history?
            </h6>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Stay here
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleMonthChange}
            >
              Open {monthToShow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmMonthModal;
