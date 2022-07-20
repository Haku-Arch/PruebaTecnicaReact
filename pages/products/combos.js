import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';

export default function Combo({ label, name, items }) {
    //Utilizamos helps por su funcion asociada setValue y modificar el estado global con el valor al cambiar el input y capturarlo
    const [field, meta, helpers] = useField(name);

    return (
        <Grid item xs={2}>
            <Autocomplete 
                sx={{ marginLeft : "16px" }}
                variant="outlined"
                label={label}
                options={items}
                value={field.value}
                helperText={meta.touched && meta.error}
                error={meta.touched && Boolean(meta.error)}
                renderInput={(params) => <TextField name={name} {...params} label={label} />}

                //Captando los valores que se modifican
                onInputChange={(_e, updatedValue) => {
                    helpers.setValue(updatedValue)
                }}
            />
        </Grid>
    );
}