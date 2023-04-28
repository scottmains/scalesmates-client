import React, { useState } from 'react';
import { setCalorieTarget } from "../../services/profileService";
import { getToken } from '../../services/authService';

interface CalorieTargetModalProps {
  onClose: () => void;
}

const CalorieTargetModal: React.FC<CalorieTargetModalProps> = ({ onClose }) => {
  const token = getToken();
  const [target, setTarget] = useState<number>();


  const handleSetCalorieTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token) return;
      if (token && target !== undefined) {
        await setCalorieTarget(token, target);
      }
      onClose();
    } catch (error) {
      console.error('Error adding weight:', error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Set Goal Weight</h1>
          <form onSubmit={handleSetCalorieTarget}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
               Target Calories per day:
              </label>
              <input
                type="number"
                step="0.01"
                onChange={(e) => setTarget(parseInt(e.target.value))}
                className="w-full p-2 mt-4 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CalorieTargetModal;
