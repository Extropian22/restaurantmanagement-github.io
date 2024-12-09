import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Edit, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  actionButton: {
    margin: theme.spacing(1),
  },
  dialogPaper: {
    minWidth: '500px',
  },
}));

export default function MenuBuilder() {
  const classes = useStyles();
  const [menuItems, setMenuItems] = useState([
    { 
      id: 1, 
      name: 'Classic Burger', 
      category: 'main_course', 
      price: 12.99,
      description: 'Juicy beef patty with fresh lettuce and tomato',
      ingredients: ['Beef Patty', 'Bun', 'Lettuce', 'Tomato']
    },
    { 
      id: 2, 
      name: 'Caesar Salad', 
      category: 'appetizer', 
      price: 7.50,
      description: 'Fresh romaine lettuce with parmesan and croutons',
      ingredients: ['Romaine Lettuce', 'Croutons', 'Parmesan', 'Caesar Dressing']
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    ingredients: ''
  });

  const categories = [
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'main_course', label: 'Main Course' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'beverage', label: 'Beverage' }
  ];

  const handleAddItem = () => {
    setCurrentItem({
      name: '',
      category: '',
      price: '',
      description: '',
      ingredients: ''
    });
    setOpenDialog(true);
  };

  const handleEditItem = (item) => {
    setCurrentItem({
      ...item,
      ingredients: item.ingredients.join(', ')
    });
    setOpenDialog(true);
  };

  const handleSaveItem = () => {
    const processedItem = {
      ...currentItem,
      id: currentItem.id || Date.now(),
      ingredients: currentItem.ingredients.split(',').map(i => i.trim()),
      price: parseFloat(currentItem.price)
    };

    if (currentItem.id) {
      // Edit existing item
      setMenuItems(menuItems.map(item => item.id === currentItem.id ? processedItem : item));
    } else {
      // Add new item
      setMenuItems([...menuItems, processedItem]);
    }
    setOpenDialog(false);
  };

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={9}>
          <Typography variant="h4">Menu Builder</Typography>
        </Grid>
        <Grid item xs={3} style={{ textAlign: 'right' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Add />}
            onClick={handleAddItem}
          >
            Add Menu Item
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {categories.find(cat => cat.value === item.category)?.label}
                </TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.ingredients.join(', ')}</TableCell>
                <TableCell>
                  <Button 
                    color="primary" 
                    startIcon={<Edit />}
                    onClick={() => handleEditItem(item)}
                    className={classes.actionButton}
                  >
                    Edit
                  </Button>
                  <Button 
                    color="secondary" 
                    startIcon={<Delete />}
                    onClick={() => handleDeleteItem(item.id)}
                    className={classes.actionButton}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle>
          {currentItem.id ? 'Edit Menu Item' : 'Add New Menu Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Item Name"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={currentItem.category}
                  onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price ($)"
                type="number"
                value={currentItem.price}
                onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={currentItem.description}
                onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ingredients (comma-separated)"
                value={currentItem.ingredients}
                onChange={(e) => setCurrentItem({...currentItem, ingredients: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={handleSaveItem}
              >
                Save Menu Item
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
