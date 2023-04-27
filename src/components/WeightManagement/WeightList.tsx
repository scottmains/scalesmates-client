import React from 'react';
import WeightRecordCard from './WeightRecordCard';
import { WeightRecord } from '../interfaces/WeightInterfaces';

interface WeightListProps {
  weights: WeightRecord[];
  onDelete: (id: number) => void;
}

const WeightList: React.FC<WeightListProps> = ({ weights, onDelete }) => {
  const sortedWeights = weights.sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  );

  return (
    <div className="space-y-4">
      {sortedWeights.map((record) => (
        <WeightRecordCard
          key={record.id}
          weight={record.weight}
          date={record.date}
          onDelete={() => onDelete(record.id)}
        />
      ))}
    </div>
  );
};

export default WeightList;
