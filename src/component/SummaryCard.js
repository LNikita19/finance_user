import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSummary } from '../features/transactions/transactionSlice';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryCard = () => {
  const dispatch = useDispatch();
  const { summary, filters } = useSelector((state) => state.transactions);
  
  useEffect(() => {
    dispatch(fetchSummary({
      startDate: filters.startDate,
      endDate: filters.endDate
    }));
  }, [dispatch, filters.startDate, filters.endDate]);

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [summary.income, summary.expense],
        backgroundColor: ['#10B981', '#EF4444'],
        hoverBackgroundColor: ['#059669', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Financial Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Income</h3>
          <p className="text-2xl font-semibold text-green-600">${summary.income.toFixed(2)}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">Expense</h3>
          <p className="text-2xl font-semibold text-red-600">${summary.expense.toFixed(2)}</p>
        </div>
        
        <div className={`p-4 rounded-lg ${
          summary.balance >= 0 ? 'bg-blue-50' : 'bg-yellow-50'
        }`}>
          <h3 className={`text-sm font-medium ${
            summary.balance >= 0 ? 'text-blue-800' : 'text-yellow-800'
          }`}>
            Balance
          </h3>
          <p className={`text-2xl font-semibold ${
            summary.balance >= 0 ? 'text-blue-600' : 'text-yellow-600'
          }`}>
            ${summary.balance.toFixed(2)}
          </p>
        </div>
      </div>
      
      {(summary.income > 0 || summary.expense > 0) && (
        <div className="mt-6 h-64">
          <Doughnut data={data} options={{ maintainAspectRatio: false }} />
        </div>
      )}
    </div>
  );
};

export default SummaryCard;