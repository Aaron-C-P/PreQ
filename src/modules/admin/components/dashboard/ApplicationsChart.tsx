import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { applicationService } from '../../../../services/application.service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const ApplicationsChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: ['Pending', 'Under Review', 'Approved', 'Rejected'],
    datasets: [
      {
        label: 'Applications',
        data: [0, 0, 0, 0],
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)', // yellow for pending
          'rgba(54, 162, 235, 0.5)', // blue for under review
          'rgba(75, 192, 192, 0.5)', // green for approved
          'rgba(255, 99, 132, 0.5)', // red for rejected
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchApplicationStats = async () => {
      try {
        const applications = await applicationService.getAllApplications();
        
        const stats = {
          pending: 0,
          under_review: 0,
          approved: 0,
          rejected: 0,
        };

        applications.forEach(app => {
          stats[app.status]++;
        });

        setChartData(prev => ({
          ...prev,
          datasets: [{
            ...prev.datasets[0],
            data: [
              stats.pending,
              stats.under_review,
              stats.approved,
              stats.rejected,
            ],
          }],
        }));
      } catch (error) {
        console.error('Error fetching application stats:', error);
      }
    };

    fetchApplicationStats();
    const interval = setInterval(fetchApplicationStats, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '300px' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default ApplicationsChart;