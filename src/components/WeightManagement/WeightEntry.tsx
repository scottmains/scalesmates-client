import React, { useState } from 'react';

interface WeightEntryProps {
  onSubmit: (weight: number, date: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const WeightEntry: React.FC<WeightEntryProps> = ({ onSubmit, isOpen, onClose }) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight) {
      onSubmit(parseFloat(weight), date);
      setWeight('');
    }
  };

  const currentDate = new Date();
  const currentDatetime = new Date(
  currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
).toISOString()
  .slice(0, 16)
  .replace('T', ' ');

    if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Add Weight Entry
          </h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="number"
              step="0.01"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 mt-4 border rounded"
            />
            <input
               type="datetime-local"
               defaultValue={currentDatetime}
               onChange={(e) => setDate(e.target.value)}
               className="w-full p-2 mt-4 border rounded"
            />
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700"
              >
                Add
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WeightEntry;
