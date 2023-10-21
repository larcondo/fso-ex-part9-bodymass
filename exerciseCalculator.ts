import { calculateExercises } from './utils';

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