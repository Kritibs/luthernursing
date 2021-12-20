import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductCard({product_image, product_name, product_price, pub_date, product_author}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={"http://127.0.0.1:8000"+product_image}
        alt={product_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
	  {product_name}
        </Typography>
        <Typography variant="h6" color="text.primary">
	  ${product_price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
	  published_date: {pub_date}<br/>
	  published_by: {product_author}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

