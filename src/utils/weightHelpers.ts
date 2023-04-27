export const weightDifference = (latestWeight: number, goalWeight: number): number => {
    return latestWeight - goalWeight;
  };
  
  export const percentageDifference = (latestWeight: number, goalWeight: number): number => {
    return ((latestWeight - goalWeight) / goalWeight) * 100;
  };
  