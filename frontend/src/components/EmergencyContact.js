import React from 'react';
import { makeStyles } from '@mui/material';
import { Typography, Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
}));

const EmergencyContact = ({ number }) => {
  const classes = useStyles();

  const handleCall = () => {
    window.open(`tel:${number}`);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Emergency Contact
      </Typography>
      <Typography variant="body1" gutterBottom>
        In case of emergency, please call:
      </Typography>
      <Typography variant="h4" gutterBottom>
        {number}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCall}>
        Call Now
      </Button>
    </div>
  );
};

export default EmergencyContact;
