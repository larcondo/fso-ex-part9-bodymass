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

const calculateExercises = ( dailyHours: number[], target: number): Result => {
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

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
  // console.log(calculateExercises([], 2))
  // console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 0))
} catch( error: unknown ) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) errorMessage += error.message
  console.log(errorMessage)
}