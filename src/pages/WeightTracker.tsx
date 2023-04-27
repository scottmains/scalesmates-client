import React, { useEffect, useState } from 'react';
import { fetchWeights, deleteWeight, addWeight } from '../services/weightService';
import { useUserContext } from "../context/UserContext";
import WeightList from '../components/WeightManagement/WeightList';
import WeightEntry from '../components/WeightManagement/WeightEntry';
import { WeightRecord } from '../interfaces/WeightInterfaces';
import { FaWeight } from "react-icons/fa";
import { useActiveGoals } from '../hooks/useActiveGoals';
import { weightDifference, percentageDifference } from '../utils/weightHelpers';
import { WeightCircle } from '../components/WeightManagement/WeightGoalCircle';


const WeightTracker: React.FC = () => {
  const { token } = useUserContext();
  const [weights, setWeights] = useState<WeightRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [latestWeightDate, setLatestWeightDate] = useState<Date | null>(null);
  const activeGoals = useActiveGoals(token);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
  };

  const latestWeight = weights.length > 0 ? weights[0].weight : 0;
  const goalWeight = activeGoals.length > 0 ? activeGoals[0].goalWeight : 0;

  const weightDiff = weightDifference(latestWeight, goalWeight);
  const percentDiff = percentageDifference(latestWeight, goalWeight);


useEffect(() => {
  if (!token) return;

  (async () => {
    try {
      const fetchedWeights = await fetchWeights(token);
      setWeights(fetchedWeights);

      if (fetchedWeights.length !== 0) {
        const latestWeightDate = new Date(fetchedWeights[0].date);
        setLatestWeightDate(latestWeightDate);
        console.log(latestWeight);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        setShowNotification(latestWeightDate < oneWeekAgo);
      }
    } catch (error) {
      console.error('Error fetching weights:', error);
    }
  })();
}, [token]);

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await deleteWeight(token, id);
      setWeights(weights.filter((record) => record.id !== id));
     
    } catch (error) {
      console.error('Error deleting weight:', error);
    }
  };

  const handleAddWeight = async (weight: number, date: string) => {
    try {
      if (!token) return;
      await addWeight(token, weight, date);
      const newWeights = await fetchWeights(token);
      setWeights(newWeights);
      setIsSuccess(true);
      setIsModalOpen(false);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error adding weight:', error);
    }
  };


  return (
    <>
     <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-md shadow-lg mb-8">
        <h1 className="text-4xl font-semibold text-white text-center">Weight Tracker</h1>
        <p className="text-xl font-light text-white text-center mt-2">Track weight here</p>
      </div>
     {showNotification && (
        <div className="bg-yellow-200 p-4">
          Please add a new weight record - it has been over a week since your last one.
        </div>
      )}
     {latestWeight > 0 && goalWeight > 0 && (
        <div className="mt-4 mb-4">
          <WeightCircle difference={weightDiff} percentage={percentDiff} goalWeight={goalWeight} />
        </div>
      )}
    <div className="pb-4">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      onClick={openModal}
    >
      <FaWeight className="mr-2" />
      <span>Add Weight</span>
    </button>
     </div>
      <WeightEntry
        onSubmit={handleAddWeight}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
       {isSuccess && (
      <div className="fixed top-10 right-0 mt-8 mr-8 bg-green-500 text-white px-4 py-2 rounded-md">
      Weight added successfully!
    </div>
    )}
      
      <WeightList weights={weights} onDelete={handleDelete} />
    </>
  );
};

export default WeightTracker;
