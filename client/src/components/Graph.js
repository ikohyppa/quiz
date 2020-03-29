// ./Components/Graph.js

import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Chart from 'react-google-charts';
import '../css/app.css';

export default function Graph(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // topics are mapped from quiz.questions and dublicated are removed with Set
    let topics = props.quiz.questions.map(question => question.topic);
    topics = [...new Set(topics)];

    let data = [];
    // every unique topic is pushed into data array
    topics.forEach(topic => data.push([topic]));
    // number 0 is puhsed into indexes 1 and 2 in every topic array inside data array
    data.forEach(topic => {
      topic.push(0);
      topic.push(0);
    });

    // data array is operated for every question in the quiz
    // if the topic in data array's topic array equals topic of the question
    // 1) the value of topic array index 2 is incremented
    // 2) if the values of every selected and correct properties of the question options are equal
    // 2) the value of topic array index 1 is incremented
    props.quiz.questions.forEach(question => {
      data.forEach(topic => {
        if (question.topic === topic[0]) {
          topic[2]++;
          if (
            question.options.every(option => option.selected === option.correct)
          )
            topic[1]++;
        }
      });
    });

    // data array is operated by forEach to calculate correctAnswers%
    // the value of the index 1 in topic arrays is replaced with calculated correctAnswers%
    // the value of the index 2 in topic arrays is replaced with string  "correctAnswers%  %"
    data.forEach(topic => {
      let pros = parseInt(((topic[1] / topic[2]) * 100).toFixed(0));
      let anno = pros + '%';
      topic[1] = pros;
      topic[2] = anno;
    });

    // column hedings array is added in to the begin of the data array
    data.unshift(['Aihealue', 'Oikein-%', { role: 'annotation' }]);
    // data array is set as chartData
    setChartData(data);
  }, []);

  return (
    <Box className='chart'>
      <Chart
        width={500}
        height={300}
        chartType='BarChart'
        loader={<Box>Loading Chart</Box>}
        data={chartData}
        options={{
          animation: {
            duration: 5000,
            easing: 'linear',
            startup: true
          },
          annotations: {
            textStyle: {
              /* fontName: 'Times-Roman', */
              fontSize: 28,
              bold: true,
              italic: true,
              // The color of the text.
              color: '#b9d6eb',
              // The color of the text outline.
              auraColor: '#b9d6eb',
              // The transparency of the text.
              opacity: 0.8
            }
          },
          /* backgroundColor: '#b9d6eb', */
          backgroundColor: {
            fill: '#b9d6eb',
            stroke: '#305b7a',
            strokeWidth: '5'
          },
          chartArea: {
            left: '30%',
            width: '60%',
            backgroundColor: {
              stroke: '#333'
            }
          },
          fontSize: 22,
          fontName: 'Arial',
          hAxis: {
            title: 'Oikein meni [%]',
            minValue: 0,
            ticks: [0, 20, 40, 60, 80, 100],
            titleTextStyle: {
              bold: true,
              italic: false
            },
            gridlines: {
              color: '#333'
            }
          },
          legend: {
            position: 'none'
          },
          title: 'Tenttimenestys aihepiireittäin',
          titleTextStyle: {
            color: '#0e28ed',
            fontSize: 24,
            bold: true,
            italic: false
          },
          vAxis: {
            title: 'Aihepiiri',
            titleTextStyle: {
              bold: true,
              italic: false
            },
            gridlines: {
              color: '#333',
              count: 4
            }
          }
        }}
      />
    </Box>
  );
}
