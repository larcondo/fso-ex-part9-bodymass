import express from 'express';
// import express = require('express');
const app = express();
import { calculateBmi, calculateExercises } from './utils';
const PORT = 3003;

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises || daily_exercises.length === 0) return res.status(400).json({ error: 'parameter missing' });

  if (isNaN(Number(target))) return res.status(400).json({ error: 'malformatted parameters' });

  const hours: number[] = daily_exercises.map((h:number) => Number(h)); 

  if (hours.some( h => isNaN(h))) return res.status(400).json({ error: 'malformatted parameters' });

  try {
    const result = calculateExercises(hours, Number(target));
    return res.status(200).send(result);

  } catch(error: unknown) {
    return res.status(500).json({ error: 'Server Error /exercises'});
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});