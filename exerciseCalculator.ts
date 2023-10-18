interface ExecisesData {
  target: number,
  hours: number[],
}

const parseArguments = (args: string[]): ExecisesData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const checkArgs = args.slice(2).map( a => Number(a))

  if (checkArgs.some(a => isNaN(a))) throw new Error('All arguments must be numbers!!')

  return {
    target: Number(args[2]),
    hours: checkArgs.slice(1),
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
  const { target, hours } = parseArguments(process.argv)

  console.log(calculateExercises(hours, target))
  // console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

} catch( error: unknown ) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) errorMessage += error.message
  console.log(errorMessage)
}

export {}