import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, MenuItem, AppBar, Toolbar, Typography, Link
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { getLeads, createLead, updateLead, deleteLead } from '../../actions/leadActions';
import 'react-toastify/dist/ReactToastify.css';

const LeadsTable = () => {
  const dispatch = useDispatch();
  const { leads, error } = useSelector((state) => state.leads);
  const [open, setOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getLeads());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leads:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleOpen = (lead = null) => {
    setCurrentLead(
      lead || {
        leadName: '',
        contactNumber: '',
        email: '',
        address: '',
        status: 'new',
        assignedTo: '',
        nextFollowUpDate: '',
        nextFollowUpTime: '',
        leadSource: '',
        conversionDate: '',
        leadNotes: '',
        customerType: '',
        purchaseHistory: '',
        medicalNeeds: '',
      }
    );
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentLead(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentLead?.leadName) newErrors.leadName = 'Lead name is required.';
    if (!currentLead?.email) newErrors.email = 'Email is required.';
    if (!currentLead?.address) newErrors.address = 'Address is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        if (currentLead._id) {
          await dispatch(updateLead(currentLead));
          toast.success('Lead updated successfully!');
          await dispatch(getLeads());
        } else {
          await dispatch(createLead(currentLead));
          toast.success('Lead added successfully!');
          await dispatch(getLeads());
        }
        handleClose();
      } catch (err) {
        console.error('Error saving lead:', err);
        toast.error('Failed to save lead.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteLead(id));
      toast.success('Lead deleted successfully!');
      await dispatch(getLeads());
    } catch (err) {
      console.error('Error deleting lead:', err);
      toast.error('Failed to delete lead.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentLead({ ...currentLead, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Leads Management
          </Typography>
          <Link href="/dashboard" color="inherit" underline="none" variant="button">
            Dashboard
          </Link>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{ m: 2 }}
        >
          Add Lead
        </Button>
        <ToastContainer />
        <Table aria-label="Leads Table">
          <TableHead>
            <TableRow>
              <TableCell>Lead Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Next Follow-Up Date</TableCell>
              <TableCell>Next Follow-Up Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads && leads?.leadFetch?.map((lead) => (
              <TableRow key={lead._id}>
                <TableCell>{lead.leadName}</TableCell>
                <TableCell>{lead.contactNumber}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.status}</TableCell>
                <TableCell>{lead.assignedTo}</TableCell>
                <TableCell>{lead.nextFollowUpDate}</TableCell>
                <TableCell>{lead.nextFollowUpTime}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(lead)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(lead._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Add/Edit Lead Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{currentLead?._id ? 'Edit Lead' : 'Add Lead'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Lead Name"
              name="leadName"
              value={currentLead?.leadName || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.leadName}
              helperText={errors.leadName}
            />
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={currentLead?.contactNumber || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={currentLead?.email || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Address"
              name="address"
              value={currentLead?.address || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              label="Status"
              name="status"
              select
              value={currentLead?.status || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              {['New', 'In Progress', 'Converted'].map((status) => (
                <MenuItem key={status.toLowerCase()} value={status.toLowerCase()}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Assigned To"
              name="assignedTo"
              value={currentLead?.assignedTo || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Next Follow-Up Date"
              type="date"
              name="nextFollowUpDate"
              value={currentLead?.nextFollowUpDate || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Next Follow-Up Time"
              type="time"
              name="nextFollowUpTime"
              value={currentLead?.nextFollowUpTime || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Lead Source"
              name="leadSource"
              value={currentLead?.leadSource || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Conversion Date"
              type="date"
              name="conversionDate"
              value={currentLead?.conversionDate || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Lead Notes"
              name="leadNotes"
              value={currentLead?.leadNotes || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Customer Type"
              name="customerType"
              value={currentLead?.customerType || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Purchase History"
              name="purchaseHistory"
              value={currentLead?.purchaseHistory || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Medical Needs"
              name="medicalNeeds"
              value={currentLead?.medicalNeeds || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </>
  );
};

export default LeadsTable;
