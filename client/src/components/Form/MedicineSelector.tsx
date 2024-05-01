import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { SERVER_URI } from '../../config';
import { useFormikContext } from 'formik';

export default function ComboBoxMed({index}) {
  const [medicines, setMedicines] = React.useState([]);
  const { setFieldValue } = useFormikContext();
  React.useEffect(() => {
    axios.get(`${SERVER_URI}/medicines`) // replace with your API endpoint
      .then(response => {
        setMedicines(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <Autocomplete
      disablePortal
      options={medicines}
      getOptionLabel={(option) => `${option.name} - ${option.brandName} - ${option.dosage}${option.unit}`} // 'name' is the property you want to display
      onChange={(_, value) => setFieldValue(`medicine.${index}.medicineId`, value ? value._id : '')} // 'value' is the selected option
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="Medicine" />}
    />
  );
}