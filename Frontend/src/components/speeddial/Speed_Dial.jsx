import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import WorkIcon from '@mui/icons-material/Work';
import axios from 'axios';
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%',
    sm: 500,
    md: 500
  },
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 3,
  p: 3,
  outline: 'none'
};

// Form Modal Content Component
const FormModalContent = ({ onClose, onSubmit }) => {
  const [formdata,setFormdata]=React.useState({
    "name": "",
    "phone": "",
    "event":"",
    "role": "",
  })
  const handlechange=(e)=>{
    const { name, value } = e.target;
    setFormdata(prev => ({
      ...prev,
      [name]: value
    }));
  }
  return (
     <Box sx={modalStyle}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography  variant="h5" component="h2">
          Add New Contact
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Name */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            name="name"
            label="Full Name"
            variant="standard"
            required
            fullWidth
            value={formdata.name}
            onChange={handlechange}
          />
        </Box>

        {/* Phone */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            name="phone"
            label="Phone Number"
            variant="standard"
            required
            fullWidth
            value={formdata.phone}
            onChange={handlechange}
            inputProps={{ inputMode: 'numeric', maxLength: 10 }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }}
          />
        </Box>

        {/* Event */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            name="event"
            label="Purpose of Visit"
            variant="standard"
            required
            fullWidth
            value={formdata.event}
            onChange={handlechange}
          />
        </Box>

        {/* Role */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <WorkIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            name="role"
            label="Role"
            variant="standard"
            required
            fullWidth
            value={formdata.role}
            onChange={handlechange}
          />
        </Box>
      </Box>

      {/* Submit Button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<DoneAllIcon />}
          onClick={() => onSubmit(formdata)}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

// Photo Modal Content Component
const PhotoModalContent = ({ onClose, onSubmit }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" component="h2">
          Upload Photo
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography sx={{ mt: 2 }}>
        Here you can upload and manage your photos.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Select Files
        </Button>
        <Button variant="contained" color="primary" onClick={()=>onSubmit(formdata)}>
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default function FixedSpeedDialWithModals() {
  // Control states for SpeedDial and Modals
  const [dialOpen, setDialOpen] = React.useState(false);
  const [formModalOpen, setFormModalOpen] = React.useState(false);
  const [photoModalOpen, setPhotoModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Reference to the SpeedDial component to prevent outside clicks from closing it
  const speedDialRef = React.useRef(null);

  const handleDialToggle = (e) => {
    // Stop propagation to prevent immediate closing
    if (e) e.stopPropagation();
    
    // Only toggle if not in submission state
    if (!isSubmitting) {
      setDialOpen(prev => !prev);
    }
  };
  
  const handleFormModalOpen = (e) => {
    // Stop propagation to prevent the document click handler from firing
    if (e) e.stopPropagation();
    setDialOpen(false);
    setFormModalOpen(true);
  };
  
  const handlePhotoModalOpen = (e) => {
    // Stop propagation to prevent the document click handler from firing
    if (e) e.stopPropagation();
    setDialOpen(false);
    setPhotoModalOpen(true);
  };

  const handleFormModalClose = () => {
    setFormModalOpen(false);
  };

  const handlePhotoModalClose = () => {
    setPhotoModalOpen(false);
  };
  const upload=async(form_data)=>{
    try{
     await axios.post("http://localhost:8000/user/upload",form_data,);
    }
    catch{
      console.log("error");
    }
  }
  // Handle form submission
  const handleFormSubmit = (data) => {
    setIsSubmitting(true);
    setFormModalOpen(false);
    const contact_data=new FormData();
    contact_data.append("name",data.name);
    contact_data.append("role",data.role);
    contact_data.append("event",data.event)
    contact_data.append("phone",data.phone);
    upload(contact_data);
    console.log('Form submitted',data);
    
    // Reset submission state after delay
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };
  
  // Handle photo submission
  const handlePhotoSubmit = () => {
    setIsSubmitting(true);
    setPhotoModalOpen(false);
    console.log('Photo uploaded');
    
    // Reset submission state after delay
    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };
  
  // Effect to close SpeedDial when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if the dial is open AND we're not clicking on the dial itself
      if (dialOpen && speedDialRef.current && !speedDialRef.current.contains(event.target)) {
        setDialOpen(false);
      }
    };

    // Add global click listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dialOpen]);

  // Define actions
  const actions = [
    { 
      icon: <PostAddSharpIcon />, 
      name: 'Form', 
      onClick: handleFormModalOpen
    },
    { 
      icon: <AddAPhotoIcon />, 
      name: 'Photo', 
      onClick: handlePhotoModalOpen
    }
  ];
  
  return (
    <Box sx={{ height: '100vh', position: 'relative' }}>
      {/* SpeedDial Backdrop */}
      <Backdrop 
        open={dialOpen}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: '#fff',
        }}
      />
      
      {/* SpeedDial */}
      <SpeedDial
        ref={speedDialRef}
        ariaLabel="Action Menu"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
        icon={<SpeedDialIcon />}
        onClose={(e) => e.stopPropagation()}
        open={dialOpen}
        direction="up"
        FabProps={{
          onClick: handleDialToggle,
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      
      {/* Form Modal */}
      <Modal
        open={formModalOpen}
        onClose={handleFormModalClose}
        aria-labelledby="form-modal-title"
        aria-describedby="form-modal-description"
      >
        <Paper sx={modalStyle} elevation={24}>
          <FormModalContent 
            onClose={handleFormModalClose} 
            onSubmit={handleFormSubmit}
          />
        </Paper>
      </Modal>
      
      {/* Photo Modal */}
      <Modal
        open={photoModalOpen}
        onClose={handlePhotoModalClose}
        aria-labelledby="photo-modal-title"
      >
        <Paper sx={modalStyle} elevation={24}>
          <PhotoModalContent 
            onClose={handlePhotoModalClose} 
            onSubmit={handlePhotoSubmit}
          />
        </Paper>
      </Modal>
    </Box>
  );
}