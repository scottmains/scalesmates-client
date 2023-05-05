import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery} from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../store/state';
import WeightList from '../components/WeightManagement/WeightList';
import WeightEntry from '../components/WeightManagement/WeightEntry';
import { WeightRecord } from '../interfaces/WeightInterfaces';
import { FaWeight } from "react-icons/fa";
import { useActiveGoals } from '../hooks/useActiveGoals';
import { weightDifference, percentageDifference } from '../utils/weightHelpers';
import { WeightCircle } from '../components/WeightManagement/WeightGoalCircle';
import { fetchWeights, deleteWeight, addWeight } from '../services/weightService';

const WeightTracker: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const activeGoal = useActiveGoals(token);
  
  const { data: weights, refetch } = useQuery<WeightRecord[] | undefined, Error>('weights', () => fetchWeights(token || ''), {
    enabled: !!token,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
  };
  const latestWeight = weights?.[0]?.weight ?? 0;
  const goalWeight = activeGoal?.goalWeight ?? 0;
  const weightDiff = useMemo(() => weightDifference(latestWeight, goalWeight), [latestWeight, goalWeight]);
  const percentDiff = useMemo(() => percentageDifference(latestWeight, goalWeight), [latestWeight, goalWeight]);

  const deleteWeightMutation = useMutation((id: number) => deleteWeight(token ?? '', id), {
    onSuccess: () => {
      refetch();
    },
  });
  const addWeightMutation = useMutation(({ weight, date }: { weight: number; date: string }) => addWeight(token ?? '', weight, date), {
    onSuccess: () => {
      refetch();
      setIsSuccess(true);
      setIsModalOpen(false);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    },
  });
  const handleDelete = useCallback(async (id: number) => {
    await deleteWeightMutation.mutateAsync(id);
  }, [deleteWeightMutation]);

  const handleAddWeight = useCallback(async (weight: number, date: string) => {
    await addWeightMutation.mutateAsync({ weight, date });
  }, [addWeightMutation]);

  useEffect(() => {
    if (!weights) return;

    const latestWeightDate = new Date(weights[0].date);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    setShowNotification(latestWeightDate < oneWeekAgo);
  }, [weights]);

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
      
      <WeightList weights={weights ?? []} onDelete={handleDelete} />

    </>
  );
};

export default WeightTracker;
