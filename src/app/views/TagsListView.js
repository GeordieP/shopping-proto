import React, { useState } from 'react';
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';

const TempContent = ({ onDismiss }) => {
  return (
    <>
      <p>Modal Content</p>
      <button onClick={onDismiss}>x</button>
    </>
  );
}

export default () => {
  const [shouldShowModal, setShowModal] = useState(false);
  const showModal = () => setShowModal(true);
  const hideModal = () => setShowModal(false);

  return (
    <>
      <h1>Main List View</h1>
      <button onClick={showModal}>Show Modal</button>

      { shouldShowModal && (
        <Dialog onDismiss={hideModal}>
          <TempContent onDismiss={hideModal} />
        </Dialog>
      ) }
    </>
  );
};
