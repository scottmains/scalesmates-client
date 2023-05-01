import React from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="bg-gradient-to-br from-pastel-blue-light via-pastel-purple-light to-pastel-pink-light p-6 rounded-md shadow-black mb-8 border-2 border-black">
        <h1 className="text-4xl font-semibold text-blacvk text-center">Scalemates</h1>

        <p className="text-xl font-light text-black text-center mt-2">One stop shop for weight loss</p>
      </div>
      <div className="mt-10 space-y-8">
        <div className="bg-pastel-blue-light rounded-md p-6 shadow-md">
          <h2 className="text-xl font-semibold text-pastel-blue">What is Scalemates?</h2>
          <p className="mt-4">Scalemates is a weight management app that helps users achieve their weight loss goals. Users can log their weight, set goals, track calories burned and consumed, and keep a record of their workouts and exercises.</p>
        </div>
        <div className="bg-pastel-purple-light rounded-md p-6 shadow-md">
          <h2 className="text-xl font-semibold text-pastel-purple">Log Your Weight</h2>
          <p className="mt-4">With Scalemates, you can easily log your weight once a week and track your progress over time. You can also set weight goals and monitor your progress towards achieving them.</p>
        </div>
        <div className="bg-pastel-pink-light rounded-md p-6 shadow-md">
          <h2 className="text-xl font-semibold text-pastel-pink">Track Your Calories</h2>
          <p className="mt-4">Scalemates makes it easy to track your calorie intake and monitor your progress towards your weight loss goals. You can also keep a record of the calories you burn through exercise.</p>
        </div>
        <div className="bg-pastel-blue-light rounded-md p-6 shadow-md">
          <h2 className="text-xl font-semibold text-pastel-blue">Record Your Workouts</h2>
          <p className="mt-4">With Scalemates, you can keep a record of the workouts and exercises you do, so you can monitor your progress and stay motivated. You can also set reminders to stay on track and achieve your goals.</p>
        </div>
      </div>
    </div>
  );
};


export default HomePage;
