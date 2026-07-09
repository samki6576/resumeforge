import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SparklesIcon } from '@heroicons/react/24/outline';

const AIAssistant = ({ onBulletPointsGenerated }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedBullets, setGeneratedBullets] = useState([]);

  const fallbackApiUrl = 'https://resumeforg.pxxl.run';
  const apiUrl = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? 'http://localhost:5000'
    : ((process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim() && !process.env.REACT_APP_API_URL.includes('resumeforge.pxxl.app'))
      ? process.env.REACT_APP_API_URL.trim()
      : fallbackApiUrl);

  const handleGenerate = async () => {
    if (!jobTitle || !company || !description) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/ai/generate-bullets`, {
        jobTitle,
        company,
        description
      });

      if (response.data.success) {
        setGeneratedBullets(response.data.bulletPoints);
        onBulletPointsGenerated(response.data.bulletPoints);
        toast.success('✨ Bullet points generated!');
      }
    } catch (error) {
      toast.error('Failed to generate bullet points');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <SparklesIcon className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          AI Experience Assistant
        </h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title (e.g., Frontend Developer)"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <textarea
          placeholder="Describe your role and achievements (e.g., Led a team of 5, built a new feature, improved performance)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : '🚀 Generate Bullet Points'}
        </button>
      </div>

      {generatedBullets.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-3">Generated Bullet Points</h3>
          <ul className="space-y-2">
            {generatedBullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <span className="text-purple-500">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
