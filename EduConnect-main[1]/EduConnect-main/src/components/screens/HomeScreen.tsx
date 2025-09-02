import React from "react";

interface HomeScreenProps {
  onNavigateToStudy: (subject: string) => void;
}

const subjects = ["Math", "Science", "History", "English"];

export default function HomeScreen({ onNavigateToStudy }: HomeScreenProps) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Welcome to EduConnect 🎓</h1>
      <p className="mb-4 text-gray-300">Select a subject to start learning:</p>
      <div className="grid grid-cols-2 gap-4">
        {subjects.map((subj) => (
          <button
            key={subj}
            onClick={() => onNavigateToStudy(subj)}
            className="p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition"
          >
            {subj}
          </button>
        ))}
      </div>
    </div>
  );
}
