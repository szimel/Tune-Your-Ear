import { dataOverlord } from "./progress";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Graph = () => {
  //graph settings
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'All Notes, All Quizzes',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  
  //graph data
  const labels = Object.keys(dataOverlord.answersBySession)
  const data = {
    labels,
    datasets: [
      {
        label: 'Correct',
        data: labels.map(e => {
          let holder = 0;
          dataOverlord.answersBySession[e].map(p => {
            if (p.correct === 1) {
              return holder += p.correct;
            }
          });
          return holder;
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {label: 'Incorrect',
      data: labels.map(e => {
        let holder = 0;
        dataOverlord.answersBySession[e].map(p => {
          if (p.correct === -1) {
            return holder += p.correct
          }
        });
        return holder;
      }),
      backgroundColor: 'rgba(153, 62, 135, 0.5)',
      }
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Graph;