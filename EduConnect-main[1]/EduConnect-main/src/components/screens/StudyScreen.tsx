import React from "react";

export default function StudyScreen({ subject }: { subject: string | null }) {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-2">📘 Study Screen</h1>
      {subject ? (
        <p>Showing study material for <span className="text-emerald-400">{subject}</span>.</p>
      ) : (
        <p className="text-gray-400">No subject selected.</p>
      )}
    </div>
  );
}
