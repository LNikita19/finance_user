// frontend/src/components/IncomeExpenseChart.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeExpenseChart = () => {
  const { totalIncome, totalExpense, isLoading, error } = useSelector(
    (state) => state.transactions
  );

  // Data for the chart
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#4CAF50', '#F44336'], // Green for Income, Red for Expense
        borderColor: ['#388E3C', '#D32F2F'],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart (optional)
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows you to control size with CSS
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
              }).format(context.parsed); // Format as currency
            }
            return label;
          }
        }
      }
    }
  };

  // if (isLoading) {
  //   return <p>Loading chart data...</p>;
  // }

  if (error) {
    return <p>Error loading chart: {error}</p>;
  }

  if (totalIncome === 0 && totalExpense === 0) {
    return <p>No transaction data to display in the chart.</p>;
  }

  return (
    <div style={{ width: '100%', height: '300px' }}> {/* Adjust height as needed */}
      <h3>Income vs. Expense Distribution</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default IncomeExpenseChart;