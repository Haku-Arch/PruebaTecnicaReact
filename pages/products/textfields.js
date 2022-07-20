import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useField } from 'formik';
import { useEffect } from 'react';

export default function TextBox({ name, disabled, label, value }) {
    const [field, meta, helpers] = useField(name);

    useEffect(() => {
        if (value) {
            helpers.setValue(value)
        }
    }, [value]);

    return (
        <Grid item xs={2}> 
            <TextField sx={{ marginLeft : "16px" }}
                id="outlined"
                name={name}
                label={label}
                value={field.value}
                disabled={disabled}
                //Captando los errores de Yup
                helperText={meta.touched && meta.error}
                error={meta.touched && Boolean(meta.error)}
                //Captando los valores que se modifican
                onChange={(e) => {
                    helpers.setValue(e.target.value)
                }}
            /> 
        </Grid>
      );
  }