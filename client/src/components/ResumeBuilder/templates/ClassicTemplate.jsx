import React from 'react';

const ClassicTemplate = ({ personalInfo, experience, education, skills }) => (
  <div className="bg-white p-8 rounded-lg shadow-sm font-serif">
    <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
      <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-wider">
        {personalInfo.fullName || 'Your Name'}
      </h2>
      <p className="text-gray-600 text-sm">{personalInfo.email} • {personalInfo.phone}</p>
      {personalInfo.location && <p className="text-gray-500 text-sm">{personalInfo.location}</p>}
    </div>
    
    {personalInfo.summary && (
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Profile</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
      </div>
    )}

    {experience && experience.length > 0 && (
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Professional Experience</h3>
        {experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-800">{exp.title}</p>
                <p className="text-gray-600 text-sm">{exp.company}</p>
              </div>
              <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
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
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Education</h3>
        {education.map((edu, idx) => (
          <div key={idx} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-800">{edu.institution}</p>
                <p className="text-gray-600 text-sm">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
              </div>
              <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate || 'Present'}</span>
            </div>
            {edu.gpa && <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>
    )}

    {skills && skills.length > 0 && (
      <div>
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default ClassicTemplate;
