import { chordDataOverlord } from "./chord-progress";
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

const ChartByNoteGraph = () => {
  //graph settings
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Correct vs incorrect, by chord',
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
  const labels = Object.keys(chordDataOverlord.answersByNote)
  const data = {
    labels,
    datasets: [
      {
        label: 'Correct',
        data: labels.map(e => {
          let holder = 0;
          chordDataOverlord.answersByNote[e].map(p => {
            if(p.correct === 1) {
              return holder += p.correct;
            };
          });
          return holder;
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        label: 'Incorrect',
        data: labels.map(e => {
          let holder = 0;
          chordDataOverlord.answersByNote[e].map(p => {
            if(p.correct === -1) {
              return holder += p.correct;
            };
          });
          return holder;
        }),
        backgroundColor: 'rgba(153, 62, 135, 0.5)'
      }
    ]
  };
  return (
    <div className="Graph">
      <Bar options={options} data={data}/>
    </div>
  )
};


export default ChartByNoteGraph