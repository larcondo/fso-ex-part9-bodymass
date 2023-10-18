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

const calculateBmi = (h: number, w: number): string => {
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