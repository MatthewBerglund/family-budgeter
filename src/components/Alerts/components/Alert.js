import { useEffect } from 'react';

const Alert = ({ color, heading, closeCallback, children }) => {
  useEffect(() => {
    setTimeout(closeCallback, 5000);
  }, [closeCallback]);

  return (
    <div
      role="alert"
      className={`alert alert-${color} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x`}
    >
      <h5 className="alert-heading">{heading}</h5>
      <p>{children}</p>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={closeCallback}
      />
    </div>
  );
};

export default Alert;
