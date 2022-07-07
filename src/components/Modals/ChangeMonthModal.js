import { forwardRef, useState, useImperativeHandle } from 'react';

import Modal from './components/Modal';

const ChangeMonthModal = forwardRef((props, ref) => {
  const [month, setMonth] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { changeMonthView } = props;

  useImperativeHandle(ref, () => ({
    show: month => {
      setMonth(month);
      setShowModal(true);
    },
  }));

  const modalProps = {
    cancelCallback: () => setShowModal(false),
    okCallback: () => {
      setShowModal(false);
      changeMonthView(month);
    },
    modalTitle: `New expense added to ${month}`,
    cancelButtonLabel: 'Stay here',
    okButtonLabel: `Open ${month}`,
    okButtonColor: 'btn-primary',
  };

  return (
    showModal && <Modal {...modalProps}>
      <h6 className="mb-3">
        Your expense has been added. Would you like to switch to the month for
        this expense?
      </h6>
    </Modal>
  );
});

export default ChangeMonthModal;
