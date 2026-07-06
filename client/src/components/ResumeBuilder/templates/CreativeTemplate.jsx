import React from 'react';

const CreativeTemplate = ({ personalInfo, experience, education, skills }) => (
  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-lg shadow-sm">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-center border-b-2 border-indigo-300 pb-4 mb-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {personalInfo.fullName || 'Your Name'}
        </h2>
        <p className="text-gray-600">{personalInfo.email} • {personalInfo.phone}</p>
        {personalInfo.location && <p className="text-gray-500 text-sm">{personalInfo.location}</p>}
        <div className="flex justify-center gap-4 mt-2 text-sm">
          {personalInfo.linkedin && <a href={personalInfo.linkedin} className="text-indigo-600 hover:underline">LinkedIn</a>}
          {personalInfo.github && <a href={personalInfo.github} className="text-indigo-600 hover:underline">GitHub</a>}
        </div>
      </div>
      
      {personalInfo.summary && (
        <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700 italic">"{personalInfo.summary}"</p>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 text-lg mb-3 flex items-center">
            <span className="text-2xl mr-2">💼</span> Experience
          </h3>
          {experience.map((exp, idx) => (
            <div key={idx} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{exp.title}</p>
                  <p className="text-indigo-600 text-sm">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              {exp.bulletPoints && (
                <ul className="mt-2 list-disc list-inside text-gray-600 text-sm space-y-1">
                  {exp.bulletPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 text-lg mb-3 flex items-center">
            <span className="text-2xl mr-2">🎓</span> Education
          </h3>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{edu.institution}</p>
                  <p className="text-gray-600 text-sm">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                </div>
                <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate || 'Present'}</span>
              </div>
              {edu.gpa && <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {skills && skills.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 text-lg mb-2 flex items-center">
            <span className="text-2xl mr-2">🎯</span> Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default CreativeTemplate;
