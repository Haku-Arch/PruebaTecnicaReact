import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link'

import { Button, CardActionArea, CardActions } from '@mui/material';

export async function getServerSideProps (context) {
    return {
        props: { 
           products: context.query.products,
           thickness: context.query.thickness,
           unit: context.query.unit
        }
    }
}

export default function Details(props){
    return(
        <Container> 
            <Grid container sx={{ display: "flex" , alignItems: "center", padding:10 }}>
                <Card sx={{ maxWidth: 445 }}>
                    <CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <h4>Product Name: </h4>{props.products}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <h3>
                                Description:
                            </h3>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 

                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button color="primary">
                            <Link href='/products' >
                                <a>
                                    Back
                                </a>
                            </Link>
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Container>
    )
}