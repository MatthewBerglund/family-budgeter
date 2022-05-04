import { useEffect } from 'react';
import { getUKFormattedDate, getUKFormattedEuros } from '../utils/helpers';
import { Tooltip } from 'bootstrap';

const ConfirmDeleteModal = ({ expense, removeExpense }) => {
  const { title, amount, date, id } = expense;

  // init bootstrap tooltips
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <div
      className="modal fade"
      id={`modal${id}`}
      tabIndex="-1"
      aria-labelledby="Expense deletion confirmation modal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Confirm expense deletion
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h6 className="mb-3">
              Please confirm you want to delete this expense:
            </h6>
            <dl className="row">
              <dt className="col-3">date:</dt>
              <dd className="col-9">{getUKFormattedDate(date)}</dd>
              <dt className="col-3">title:</dt>
              <dd className="col-9">{title}</dd>
              <dt className="col-3">amount:</dt>
              <dd className="col-9">{getUKFormattedEuros(amount)}</dd>
            </dl>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              I'm not sure
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="This will permanetly delete the expense"
              onClick={() => removeExpense(expense)}
              data-bs-dismiss="modal"
            >
              Yes delete!!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
