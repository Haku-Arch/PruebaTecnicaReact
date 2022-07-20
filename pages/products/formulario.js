import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Combo from './combos'
import TextBox from './textfields'
import { useState, useEffect } from 'react';
import { Form, useFormikContext } from 'formik';

//Utilizando el conext de formik para obtener los valores globales desde el combobox
export default function Formulario({ products, productsOptions, thickness }) {
    const { values, setFieldValue } = useFormikContext();
    const [unit, setUnit] = useState("");
    const [kiCode, setKicode] = useState("");
    const [thicknessesOptions, setThicknessOptions] = useState([]);
    const [filteredThicknessOptions, setFilteredThicknessOptions] = useState([]);

    //obteniendo el thickness dependiente de productos
    useEffect(() => {
        const selectedProduct = products.find(product => product.name === values.products)
        if(selectedProduct) {
            const thicknessfilters = thickness.filter(elements => elements.productId === selectedProduct.id)
            const thicknessResult = thicknessfilters.map(({ name }) => name)

            setFilteredThicknessOptions(thicknessfilters)
            setThicknessOptions(thicknessResult)
            setFieldValue("thickness", "")
        }
    }, [values.products, thickness]);
    
    useEffect(() => {
        const selectedThickness = filteredThicknessOptions.find((selected) => selected.name === values.thickness)

        if (selectedThickness) {
            setKicode(selectedThickness.kiCode)
            setUnit(selectedThickness.unit)
        }
    }, [filteredThicknessOptions, values.thickness, thickness]);
//enviando los valores a sus respectivos componentes
    return (
        <Form >
            <Container sx={{ padding: 10 }}> 
                <Grid container sx={{ display: "flex" , alignItems: "center" }}>
                    <Combo label="Products" items={productsOptions} name="products" />
                    <Combo label="Thickness" items={thicknessesOptions} name="thickness" />
                    <TextBox name="kiCode" disabled={true} label="Ki Code" value={kiCode} />
                    <TextBox name="quantity" disabled={false} label="Quantity" />
                    <TextBox name="unit" disabled={true} label="Unit" value={unit} />
                    <Grid item xs={2}> 
                        <Button sx={{ marginLeft : "16px" }} variant="outlined" color="primary" type="submit">
                            + Add
                        </Button>
                    </Grid>
                </Grid>                
            </Container>
        </Form>
    )
}