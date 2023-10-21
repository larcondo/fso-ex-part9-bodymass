import express from 'express';
// import express = require('express');
const app = express();
import { calculateBmi } from './utils';
const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const paramMissing = !weight || !height;
  const paramNotNumber = isNaN(Number(height)) || isNaN(Number(weight));

  if (paramMissing || paramNotNumber) {
    return res.status(401).json({ error: 'malformatted parameters'});
  }
  
  return res.status(200).json({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight))
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});