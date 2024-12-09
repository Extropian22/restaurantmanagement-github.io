import React from 'react';
import { 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Container 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { 
  RestaurantMenu, 
  AttachMoney, 
  Storage, 
  Assessment 
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexGrow: 1,
    textAlign: 'center',
  },
  icon: {
    fontSize: 60,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

const DashboardCard = ({ title, value, icon }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} elevation={3}>
      <CardContent className={classes.cardContent}>
        {icon}
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="h4" color="primary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Restaurant Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Menu Items" 
            value="42" 
            icon={<RestaurantMenu className={classes.icon} />} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Total Revenue" 
            value="$12,345" 
            icon={<AttachMoney className={classes.icon} />} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Inventory" 
            value="89%" 
            icon={<Storage className={classes.icon} />} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard 
            title="Performance" 
            value="A+" 
            icon={<Assessment className={classes.icon} />} 
          />
        </Grid>
      </Grid>
    </Container>
  );
}
