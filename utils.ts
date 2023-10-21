export const calculateBmi = (h: number, w: number): string => {
  if (h === 0) throw new Error('Height can not be 0!!');
  if (h < 0) throw new Error('Height must be grater than 0!!');

  const bmi = w / ( h * h * 0.0001)

  switch (true) {
    case (bmi < 16.0):
      return 'Underweight (Severe thinness)';
    case (bmi >= 16.0 && bmi < 17.0):
      return 'Underweight (Moderate thinness)';  
    case (bmi >= 17.0 && bmi < 18.5):
      return 'Underweight (Mild thinness)';  
    case (bmi >= 18.5 && bmi < 25.0):
      return 'Normal (healthy weight)';
    case (bmi >= 25.0 && bmi < 30.0):
      return 'Overweight (Pre-obese)';
    case (bmi >= 30.0 && bmi < 35.0):
      return 'Obese (Class I)';
    case (bmi >= 35.0 && bmi < 40.0):
      return 'Obese (Class II)';
    case (bmi >= 40.0):
      return 'Obese (Class III)';
    default:
      return 'Not calculated';
  }
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Rating {
  desc: string,
  code: number
}

const getRating = (average: number, target: number): Rating => {
  switch (true) {
    case (average >= target):
      return { desc: 'great!', code: 3 };
    case (average >= 0.85 * target && average < target):
      return { desc: 'not too bad but could be better', code: 2 };
    default:
      return { desc: 'really bad', code: 1 };  
  }
}

export const calculateExercises = ( dailyHours: number[], target: number): Result => {
  if (dailyHours.length === 0) throw new Error('Empty Array');
  if (target === 0 || target < 0) throw new Error('Target must be Greater than 0!!');

  const sum = dailyHours.reduce((acc, current) => acc + current, 0)
  const av = sum / dailyHours.length
  const ratingObj = getRating(av, target);

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(h => h > 0).length,
    success: av > target,
    rating: ratingObj.code,
    ratingDescription: ratingObj.desc,
    target: target,
    average: av
  }
}