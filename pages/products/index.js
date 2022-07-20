import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import Formulario from './formulario'
import Table from './tabla'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { productJson } from '../../public/json/products_json'
import { thicknessJson } from '../../public/json/thickness_json'

//Valores iniciales de formik
export default function Index() {
    const initialValues = {
        products: "",
        thickness: "",
        kiCode: "",
        quantity: 0,
        unit: "",
    }
// esquema de validación de yup
    const validationSchema = Yup.object().shape({
        quantity: Yup.number()
          .required('Quantity is required')
          .min(0,"Quantity must be a positive number"),
        thickness: Yup.string()
          .required('Thickness is required')
    });

    const [products, setProducts] = useState([]);  // lista de nombres de productos para el combo box
    const [productsOptions, setProductsOptions] = useState([]);
    const [thickness, setThickness] = useState([]); //Lista de thickness asociados para el combo box
    const [rows, setRows] = useState([]); // obteniendo los campos para agregar en la tabla
    const [total,setTotal] = useState(0) // calculando el total de productos

// Agregando los valores nuevos para la tabla de productos y sumando el total
    const handleSubmit = (values) => {
        setTotal(Number(values.quantity)+total)
        setRows([...rows,{...values, id:Math.random()}])
    }

//eliminando los valores de la tabla y restando
    const handleRemove = (id,quantity) => {
        setTotal(total - Number(quantity))
        const updatedRows = rows.filter((element) => ( element.id !== (id)))
        setRows(updatedRows)
    }

    //Obteniendo la lista de productos
    async function GetProductData(){
        const data = await productJson.getProducts()
        const result = data.map(elements => elements.name)

        setProducts(data)
        setProductsOptions(result)
    }
//obteniendo la lista de thickness
    async function GetDetails(){
        const thicknessData = await thicknessJson.getThickness()
        setThickness(thicknessData)
    }

    useEffect(() => {
        GetProductData()
        GetDetails()
    }, []);

    if (!products || !thickness || !productsOptions) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            //enviando como props los valores a añadir al componente hijo formulario
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <>
                <Container > 
                    <Grid container sx={{ display: "flex" , alignItems: "center" }}>
                        <Formulario
                            products={products}
                            thickness={thickness}
                            productsOptions={productsOptions}
                        />
                        <Table rows={rows} handleRemove={handleRemove} total={total} />
                        
                    </Grid>
                </Container>
                </>
            </Formik>
        )
    }
}