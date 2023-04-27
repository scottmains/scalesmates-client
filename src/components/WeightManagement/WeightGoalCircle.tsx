import { WeightCircleProps } from "../../interfaces/WeightInterfaces";


 export const WeightCircle: React.FC<WeightCircleProps> = ({ difference, percentage, goalWeight }) => {
    return (
      <div className="w-32 h-32 rounded-full border-4 bg-white border-blue-500 flex items-center justify-center mx-auto">
        <div className="text-center">
        <p className="text-2xl font-bold mb-1">GOAL</p>
        <p className="text-xl font-bold mb-1">{goalWeight} kg</p>
          <p className="text-md  mb-1"></p>
          <p className="text-sm"> {difference.toFixed(1)} kg left</p>
        </div>
      </div>
    );
  };
  