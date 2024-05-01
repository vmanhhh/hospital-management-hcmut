import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { SERVER_URI } from '../../config';
import { useFormikContext } from 'formik';

export default function ComboBox() {
  const [doctors, setDoctors] = React.useState([]);
  const { setFieldValue } = useFormikContext();

  React.useEffect(() => {
    axios.get(`${SERVER_URI}/doctors`) // replace with your API endpoint
      .then(response => {
        setDoctors(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <Autocomplete
      disablePortal
      options={doctors}
      getOptionLabel={(option) => `Bác sĩ ${option.lastName} ${option.firstName} - ${option.department}`} // 'name' is the property you want to display
      onChange={(_, value) => setFieldValue('doctorId', value ? value._id : '')} // 'value' is the selected option
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="Doctor" />}
    />
  );
}