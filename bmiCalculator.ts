import { calculateBmi } from './utils';

interface BodyData {
  hValue: number;
  wValue: number;
}

const parseArguments = (args: string[]): BodyData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      hValue: Number(args[2]),
      wValue: Number(args[3]),
    }
  } else {
    throw new Error('Height and Weight were not numbers!')
  }
}

try {
  const { hValue, wValue } = parseArguments(process.argv)

  console.log(`Your height: ${hValue} cm`)
  console.log(`Your weight: ${wValue} kg`)
  console.log(`BMI category: ${calculateBmi(hValue, wValue)}`)

} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}