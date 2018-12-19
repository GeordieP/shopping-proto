import React from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';

const dialogContentStyles = {
  width: '95%',
  borderRadius: '5px',
};

export default ({ children, ...props }) => {
  return (
    <DialogOverlay {...props}>
      <DialogContent style={dialogContentStyles}>
        { children }
      </DialogContent>
    </DialogOverlay>
  );
}
