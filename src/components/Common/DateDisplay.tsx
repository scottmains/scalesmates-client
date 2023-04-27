import React from 'react';

const DateDisplay: React.FC<{ date: string }> = ({ date }) => {
  const formattedDate = new Date(date).toLocaleDateString();

  return <div>{formattedDate}</div>;
};

export default DateDisplay;