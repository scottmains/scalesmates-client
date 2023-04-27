import React from 'react';
import { motion } from 'framer-motion';

interface WeightRecordProps {
  weight: number;
  date: string;
  onDelete: () => void;
}

const WeightRecordCard: React.FC<WeightRecordProps> = ({ weight, date, onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-white rounded-lg shadow-md p-4 mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-lg">{weight} kg</div>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          &#10060;
        </button>
      </div>
      <div className="text-gray-500">{new Date(date).toLocaleString()}</div>
    </motion.div>
  );
};

export default WeightRecordCard;
