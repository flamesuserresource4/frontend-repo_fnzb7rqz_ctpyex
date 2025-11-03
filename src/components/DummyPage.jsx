import React from 'react';

export default function DummyPage({ title }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-800">This is the {title} page (Under Construction)</h2>
        <p className="mt-3 text-gray-600">We are working hard to bring this feature to you soon.</p>
      </div>
    </div>
  );
}
