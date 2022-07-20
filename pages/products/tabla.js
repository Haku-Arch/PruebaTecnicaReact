import Link from 'next/link'
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Alerta from './alert'
import Container from '@mui/material/Container';
import {Table , TableContainer, TableRow, TableCell, TableHead, TableBody,TableFooter} from '@mui/material';

export default function Tabla({ rows, handleRemove, total }) {
//construimos las filas por cada valor en nuestro arreglo de objetos
  const getRows = () => (
    rows.map((row,index) => (
      <TableRow key={row.id}>
        <TableCell>{index+1}</TableCell>
        <TableCell>{row.products}</TableCell>
        <TableCell>{row.thickness}</TableCell>
        <TableCell>{row.kiCode}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.unit}</TableCell>
        <TableCell>
          <Button>
            <Link href={{
              pathname: "products/[id]",
              query: {
                  id: row.id,
                  products: row.products,
                  thickness: row.thickness,
                  unit: row.unit
              }
            }}
              as={'products/'+row.id}>
              <a>
                <VisibilityIcon />
              </a>
            </Link>
          </Button>
        </TableCell>
        <TableCell>
          <Button>
            <DeleteIcon style={{ color: 'red' }} onClick={() => handleRemove(row.id, row.quantity)} />
          </Button>
        </TableCell>
      </TableRow>
    ))
  )
  
  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nº</TableCell>
              <TableCell>PRODUCT</TableCell>
              <TableCell>THICKNESS</TableCell>
              <TableCell>KI CODE</TableCell>
              <TableCell>QUANTITY</TableCell>
              <TableCell>UNIT</TableCell>
              <TableCell>VIEW</TableCell>
              <TableCell>DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { getRows() }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}><h2>Total</h2></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                <h2>{total}
                  { total > 1 ? " pallets" : " pallet"}
                </h2>
                </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            
          </TableFooter>
        </Table>
      </TableContainer>
      {total > 11 && (
        <Alerta sx={{ padding: 10 }} />
      )}
    </Container>
  );
}