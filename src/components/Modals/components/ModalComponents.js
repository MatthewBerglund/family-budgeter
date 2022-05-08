export const Modal = ({ children, modalId }) => {
  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}
      id={modalId}
      tabIndex="-1"
      aria-hidden="true"
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
