import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../actions";
import Header from "./headers/header-reg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

//store all data in correct formats
var dataOverlord = {
  session: null,
  answers: null,
  answersByNote: {A: [], 'A#': [], B: [], C: [], 'C#': [], D: [], 'D#': [], E: [], F: [], 'F#': [], G: [], 'G#': []}
};


const Progress = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(currentUser());
  }, []);

  let Progress = useSelector(state => state.user);
  while(Progress.perfectPitch === undefined) {//so whole thing doesn't freak out
    return null;
  };

  let progress = Progress.perfectPitch; 

  //formats dataOverlord 
  const dataFormat = () => {
    let answerHolder = [];
    let sessionHolder = 0;
    progress.map(e => {
      sessionHolder = sessionHolder + e.session;//adds all sessions together
      e.answers.map(p => {
        //turns 0's into 1's for graphing part
        if(p.correct === 0) {
          p.correct = -1
        };
        answerHolder.push(p);
        dataOverlord.answersByNote[p.note].push(p);
      })
    });
    dataOverlord.answers = answerHolder;
    dataOverlord.session = sessionHolder;
  }
  dataFormat();
  console.log(dataOverlord);

  // const data = [
  //   { year: 2010, count: 10 },
  //   { year: 2011, count: 20 },
  //   { year: 2012, count: 15 },
  //   { year: 2013, count: 25 },
  //   { year: 2014, count: 22 },
  //   { year: 2015, count: 30 },
  //   { year: 2016, count: 28 },
  // ];

  // //chart info
  // new Chart(
  //   document.getElementById('chart'),
  //   {
  //     type: 'bar',
  //     data: {
  //       labels: data.map(row => row.year),
  //       datasets: [
  //         {
  //           label: 'Acquisitions by year',
  //           data: data.map(row => row.count)
  //         }
  //       ]
  //     }
  //   }
  // );




  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Data',
      },
    },
  };
  
  const labels = dataOverlord.answers.map(e => e.note)
  let baseline = 100;
  const data = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: dataOverlord.answers.map(e => {
          // debugger
          baseline = baseline + e.correct
          return baseline;
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };





  return (
    <div>
      <Header />
      <div className="mx-auto" style={{width: '1000px'}}>
        advertising doesn't work? JUST DID LMAO fat fat fat fat fat fat fat fat fat fat fat 
      </div>
      <div className="mx-auto" style={{width: '1000px'}}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default Progress;