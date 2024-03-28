import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SpecificationDropdown from './SpecificationDropdown';
import Logo  from '../assets/images/AELogo.png'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function OptionModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}><img className="object-fit h-10" src={Logo} alt="Adorkable Emporium" /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className='flex items-center'>
        <Box sx={{ ...style, width: 800, height: 400 }}>
          <h2 id="child-modal-title">Option Title</h2>
          <p id="child-modal-description">
            Choose from the options available:
          </p>
          <div >
            Dropdown menu will show all the different options and specifcations available for the product.
          <SpecificationDropdown />

          </div>
          <Button onClick={handleClose}><i className="fa-solid fa-bag-shopping"></i> Add to Cart</Button>
        </Box>
        </div>
      </Modal>
    </React.Fragment>
  );
}

function VariationModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className='w-20 h-20 object-contain rounded-md cursor-pointer bg-white text-primary-purple p-1' onClick={handleOpen}><i className="fa-solid fa-palette"></i>Variation Name</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div>
        <Box sx={{ ...style, width: 1000, height: 500, }}>
          <h2 id="parent-modal-title">Options</h2>
          <p id="parent-modal-description">
            Choose from the options available:
          </p>
          <OptionModal />
        </Box>
        </div>
      </Modal>
    </div>
  );
}

export default VariationModal;