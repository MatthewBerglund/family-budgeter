/**
 *
 * Dynamic custom Modal
 * Note: This custom modal does NOT support the data-bs-dismiss bootstrap methods
 *
 * This custom modal is based on the vertically centered bootstrap modal
 * Docs: https://getbootstrap.com/docs/5.1/components/modal/#vertically-centered
 *
 * Base components:
 *
 * Modal
 * This is the modal outer container
 * @param modalId required to apply any custom JS logic. Must be unique to identify the modal especially if return of iteration (e.g. map)
 * @param children requires at least ModalBody to render the modal itself
 *
 * ModalHeader
 * This is the header within the Modal outer container
 * @param children suggested <h5> tag with the title of the modal
 * @param setIsOpen setter required to close the modal
 *
 * ModalBoday
 * This is the body of the Modal required to correctly render the modal itself
 * Note: The ModalFooter should be passed as children too
 * @param children any HTML tags with necessary data
 *
 * ModalFooter
 * Note: Bootstrap does not support auto focus thus it is strongly suggested to utilise useRef to focus on the Call-For-Action button
 * @param children usually the buttons with Cancel and Call-For-Action actions
 *
 */

export const Modal = ({ modalId, children }) => {
  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}
      id={modalId}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export const ModalHeader = ({ children, setIsOpen }) => {
  return (
    <div className="modal-header">
      {children}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => setIsOpen(false)}
      ></button>
    </div>
  );
};

export const ModalBody = ({ children }) => {
  return <div className="modal-body">{children}</div>;
};

export const ModalFooter = ({ children }) => {
  return <div className="modal-footer">{children}</div>;
};
