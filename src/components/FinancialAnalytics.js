import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Tabs, 
  Tab, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { 
  AttachMoney, 
  TrendingUp, 
  TrendingDown 
} from '@material-ui/icons';
import { Bar, Line } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tabPanel: {
    marginTop: theme.spacing(2),
  },
}));

export default function FinancialAnalytics() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const monthlyRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [12000, 19000, 15000, 22000, 18000, 25000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  const expenseBreakdownData = {
    labels: ['Ingredients', 'Labor', 'Rent', 'Utilities', 'Marketing'],
    datasets: [
      {
        data: [35, 25, 15, 10, 15],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ]
      }
    ]
  };

  const transactions = [
    { 
      id: 1, 
      date: '2023-06-15', 
      description: 'Ingredient Purchase', 
      type: 'Expense', 
      amount: -1500 
    },
    { 
      id: 2, 
      date: '2023-06-16', 
      description: 'Daily Sales', 
      type: 'Revenue', 
      amount: 5000 
    },
    { 
      id: 3, 
      date: '2023-06-17', 
      description: 'Utility Bill', 
      type: 'Expense', 
      amount: -800 
    }
  ];

  const financialSummary = {
    totalRevenue: 45000,
    totalExpenses: 25000,
    netProfit: 20000,
    profitMargin: 44.44
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Financial Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4" color="primary">
              <AttachMoney /> ${financialSummary.totalRevenue.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Total Expenses</Typography>
            <Typography variant="h4" color="secondary">
              <AttachMoney /> ${financialSummary.totalExpenses.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Net Profit</Typography>
            <Typography 
              variant="h4" 
              style={{ 
                color: financialSummary.netProfit > 0 ? 'green' : 'red' 
              }}
            >
              {financialSummary.netProfit > 0 ? <TrendingUp /> : <TrendingDown />}
              ${financialSummary.netProfit.toLocaleString()} 
              ({financialSummary.profitMargin.toFixed(2)}%)
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Tabs 
        value={activeTab} 
        onChange={(e, newValue) => setActiveTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
        className={classes.tabPanel}
      >
        <Tab label="Monthly Revenue" />
        <Tab label="Expense Breakdown" />
        <Tab label="Transactions" />
      </Tabs>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Monthly Revenue Trend</Typography>
              <Line data={monthlyRevenueData} />
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Expense Breakdown</Typography>
              <Bar data={expenseBreakdownData} />
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Typography 
                          color={transaction.type === 'Revenue' ? 'primary' : 'secondary'}
                        >
                          {transaction.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          style={{ 
                            color: transaction.amount > 0 ? 'green' : 'red' 
                          }}
                        >
                          ${Math.abs(transaction.amount).toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
