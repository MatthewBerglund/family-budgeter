import { useState, forwardRef, useImperativeHandle } from "react";

const Alert = forwardRef((_props, ref) => {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useImperativeHandle(ref, () => ({
    show: (type, title, message) => {
      setType(type);
      setTitle(title);
      setMessage(message);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    },
  }));

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div
      role="alert"
      className={`alert alert-${type} alert-dismissible fade ${showAlert ? 'show' : ''} position-fixed top-0 start-50 translate-middle-x`}
    >
      <h5 className="alert-heading">{title}</h5>
      <p>{message}</p>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={closeAlert}
      />
    </div>
  );
});

export default Alert;
