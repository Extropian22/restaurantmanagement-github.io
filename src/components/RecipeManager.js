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
  Paper 
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

export default function RecipeManager() {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([
    { 
      id: 1, 
      name: 'Classic Burger', 
      ingredients: ['Beef Patty', 'Bun', 'Lettuce', 'Tomato'], 
      preparationTime: 15,
      costPerServing: 4.50 
    },
    { 
      id: 2, 
      name: 'Caesar Salad', 
      ingredients: ['Romaine Lettuce', 'Croutons', 'Parmesan', 'Caesar Dressing'], 
      preparationTime: 10,
      costPerServing: 3.75 
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({
    name: '',
    ingredients: '',
    preparationTime: '',
    costPerServing: ''
  });

  const handleAddRecipe = () => {
    setCurrentRecipe({
      name: '',
      ingredients: '',
      preparationTime: '',
      costPerServing: ''
    });
    setOpenDialog(true);
  };

  const handleEditRecipe = (recipe) => {
    setCurrentRecipe({
      ...recipe,
      ingredients: recipe.ingredients.join(', ')
    });
    setOpenDialog(true);
  };

  const handleSaveRecipe = () => {
    const processedRecipe = {
      ...currentRecipe,
      ingredients: currentRecipe.ingredients.split(',').map(i => i.trim()),
      id: currentRecipe.id || Date.now()
    };

    if (currentRecipe.id) {
      // Edit existing recipe
      setRecipes(recipes.map(r => r.id === currentRecipe.id ? processedRecipe : r));
    } else {
      // Add new recipe
      setRecipes([...recipes, processedRecipe]);
    }
    setOpenDialog(false);
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={9}>
          <Typography variant="h4">Recipe Management</Typography>
        </Grid>
        <Grid item xs={3} style={{ textAlign: 'right' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Add />}
            onClick={handleAddRecipe}
          >
            Add Recipe
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Recipe Name</TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell>Prep Time (min)</TableCell>
              <TableCell>Cost per Serving</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell>{recipe.name}</TableCell>
                <TableCell>{recipe.ingredients.join(', ')}</TableCell>
                <TableCell>{recipe.preparationTime}</TableCell>
                <TableCell>${recipe.costPerServing.toFixed(2)}</TableCell>
                <TableCell>
                  <Button 
                    color="primary" 
                    startIcon={<Edit />}
                    onClick={() => handleEditRecipe(recipe)}
                    className={classes.actionButton}
                  >
                    Edit
                  </Button>
                  <Button 
                    color="secondary" 
                    startIcon={<Delete />}
                    onClick={() => handleDeleteRecipe(recipe.id)}
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
          {currentRecipe.id ? 'Edit Recipe' : 'Add New Recipe'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Recipe Name"
                value={currentRecipe.name}
                onChange={(e) => setCurrentRecipe({...currentRecipe, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ingredients (comma-separated)"
                value={currentRecipe.ingredients}
                onChange={(e) => setCurrentRecipe({...currentRecipe, ingredients: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Preparation Time (minutes)"
                type="number"
                value={currentRecipe.preparationTime}
                onChange={(e) => setCurrentRecipe({...currentRecipe, preparationTime: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Cost per Serving ($)"
                type="number"
                value={currentRecipe.costPerServing}
                onChange={(e) => setCurrentRecipe({...currentRecipe, costPerServing: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={handleSaveRecipe}
              >
                Save Recipe
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
