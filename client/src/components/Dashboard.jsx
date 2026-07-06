import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AIAssistant from './ResumeBuilder/AIAssistant';
import ResumePreview from './ResumeBuilder/ResumePreview';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });
  const [showEducationForm, setShowEducationForm] = useState(false);

  const handleBulletPointsGenerated = (bullets, jobTitle, company) => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          title: jobTitle || '',
          company: company || '',
          bulletPoints: bullets,
          startDate: '',
          endDate: '',
          current: false
        }
      ]
    }));
    toast.success('Experience added to resume!');
  };

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
      toast.success('Skill added!');
    }
  };

  const removeSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setResumeData(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation, id: Date.now() }]
      }));
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      });
      setShowEducationForm(false);
      toast.success('Education added!');
    } else {
      toast.error('Please fill in institution and degree');
    }
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              ResumeForge
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Builder */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Location (City, Country)"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={resumeData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <textarea
                placeholder="Professional Summary"
                value={resumeData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                rows="3"
                className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* AI Assistant */}
            <AIAssistant onBulletPointsGenerated={handleBulletPointsGenerated} />

            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Add a skill (e.g., React)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={addSkill}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {resumeData.skills.length === 0 && (
                  <p className="text-gray-400 text-sm">No skills added yet</p>
                )}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                <button
                  onClick={() => setShowEducationForm(!showEducationForm)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
                >
                  {showEducationForm ? 'Cancel' : '+ Add Education'}
                </button>
              </div>

              {showEducationForm && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Institution"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Degree (e.g., B.S. Computer Science)"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={newEducation.field}
                      onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="GPA (optional)"
                      value={newEducation.gpa}
                      onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Start Date (e.g., 2020)"
                      value={newEducation.startDate}
                      onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="End Date (e.g., 2024)"
                      value={newEducation.endDate}
                      onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    onClick={addEducation}
                    className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save Education
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">{edu.institution}</h4>
                      <p className="text-gray-600 text-sm">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                      <p className="text-gray-500 text-sm">
                        {edu.startDate} - {edu.endDate || 'Present'}
                        {edu.gpa && ` • GPA: ${edu.gpa}` }
                      </p>
                    </div>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {resumeData.education.length === 0 && !showEducationForm && (
                  <p className="text-gray-400 text-sm">No education added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-6 h-fit">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
