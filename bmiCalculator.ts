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
  // console.log(calculateBmi(0, 74))
  // console.log(calculateBmi(-10, 74))
  console.log(calculateBmi(180, 74))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
