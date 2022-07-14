/**
 *
 * Dynamic custom Modal
 * Note: This custom modal does NOT support the data-bs-dismiss bootstrap methods
 *
 * This custom modal is based on the vertically centered bootstrap modal
 * Docs: https://getbootstrap.com/docs/5.1/components/modal/#vertically-centered
 *
 *
 * Modal
 * @param children any HTML with necessary data
 * @param cancelCallback callback function to close the modal on click
 * @param okCallback callback function used for the main action
 * @param modalTitle string passed as modal title and required ids, should be unique
 * @param cancelButtonLabel string passed as label to the cancel button
 * @param okButtonLabel string passed as label to the action button
 * @param okButtonColor string passed to the action button className, should be a Bottstrap class (e.g. 'btn-primary')
 * @param form optional string representing the id of the form to associate `okButton` with
 */

const Modal = ({
  children,
  cancelCallback,
  okCallback,
  modalTitle,
  cancelButtonLabel,
  okButtonLabel,
  okButtonColor,
  form,
}) => {
  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}
      id={modalTitle}
      aria-labelledby={modalTitle}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={modalTitle}>
              {modalTitle}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={cancelCallback}
            ></button>
          </div>
          <div className="modal-body">
            {children}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelCallback}
              >
                {cancelButtonLabel}
              </button>
              <button
                form={form}
                data-cy="okButton"
                autoFocus
                className={`btn ${okButtonColor}`}
                onClick={okCallback}
              >
                {okButtonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
