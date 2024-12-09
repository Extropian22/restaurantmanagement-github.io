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
  Chip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Edit, Delete, Warning } from '@material-ui/icons';

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
  lowStockChip: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  }
}));

export default function InventoryTracker() {
  const classes = useStyles();
  const [inventory, setInventory] = useState([
    { 
      id: 1, 
      name: 'Beef Patty', 
      unit: 'kg', 
      currentStock: 15, 
      minimumStock: 20,
      unitPrice: 12.50 
    },
    { 
      id: 2, 
      name: 'Lettuce', 
      unit: 'kg', 
      currentStock: 5, 
      minimumStock: 10,
      unitPrice: 3.75 
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    unit: '',
    currentStock: '',
    minimumStock: '',
    unitPrice: ''
  });

  const handleAddItem = () => {
    setCurrentItem({
      name: '',
      unit: '',
      currentStock: '',
      minimumStock: '',
      unitPrice: ''
    });
    setOpenDialog(true);
  };

  const handleEditItem = (item) => {
    setCurrentItem({...item});
    setOpenDialog(true);
  };

  const handleSaveItem = () => {
    const processedItem = {
      ...currentItem,
      id: currentItem.id || Date.now()
    };

    if (currentItem.id) {
      // Edit existing item
      setInventory(inventory.map(item => item.id === currentItem.id ? processedItem : item));
    } else {
      // Add new item
      setInventory([...inventory, processedItem]);
    }
    setOpenDialog(false);
  };

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const isLowStock = (item) => item.currentStock <= item.minimumStock;

  return (
    <Container className={classes.root}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={9}>
          <Typography variant="h4">Inventory Management</Typography>
        </Grid>
        <Grid item xs={3} style={{ textAlign: 'right' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Add />}
            onClick={handleAddItem}
          >
            Add Item
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ingredient</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Minimum Stock</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>{item.minimumStock}</TableCell>
                <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                <TableCell>
                  {isLowStock(item) && (
                    <Chip 
                      icon={<Warning />} 
                      label="Low Stock" 
                      className={classes.lowStockChip} 
                      size="small" 
                    />
                  )}
                </TableCell>
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
          {currentItem.id ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ingredient Name"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Unit (kg, g, etc.)"
                value={currentItem.unit}
                onChange={(e) => setCurrentItem({...currentItem, unit: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Unit Price ($)"
                type="number"
                value={currentItem.unitPrice}
                onChange={(e) => setCurrentItem({...currentItem, unitPrice: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Current Stock"
                type="number"
                value={currentItem.currentStock}
                onChange={(e) => setCurrentItem({...currentItem, currentStock: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Minimum Stock Level"
                type="number"
                value={currentItem.minimumStock}
                onChange={(e) => setCurrentItem({...currentItem, minimumStock: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={handleSaveItem}
              >
                Save Inventory Item
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
