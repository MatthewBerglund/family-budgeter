const Alert = ({ color, heading, closeCallback, children }) => {
  return (
    <div
      role="alert"
      className={`alert alert-${color} alert-dismissible fade show position-fixed top-0 end-0`}
    >
      <h4 className="alert-heading">{heading}</h4>
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
