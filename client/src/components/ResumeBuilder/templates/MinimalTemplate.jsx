import React from 'react';

const MinimalTemplate = ({ personalInfo, experience, education, skills }) => (
  <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-light text-gray-900 tracking-wide">{personalInfo.fullName || 'Your Name'}</h2>
      <div className="text-sm text-gray-500 space-x-2">
        <span>{personalInfo.email}</span>
        <span>•</span>
        <span>{personalInfo.phone}</span>
        {personalInfo.location && <span>• {personalInfo.location}</span>}
      </div>
    </div>
    
    {personalInfo.summary && (
      <div className="mb-8 text-center">
        <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
      </div>
    )}
    
    <div className="border-t border-gray-200 pt-6">
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Experience</h3>
          {experience.map((exp, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{exp.title}</p>
                  <p className="text-gray-500 text-sm">{exp.company}</p>
                </div>
                <span className="text-xs text-gray-400">{exp.startDate} - {exp.endDate || 'Present'}</span>
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
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Education</h3>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                </div>
                <span className="text-xs text-gray-400">{edu.startDate} - {edu.endDate || 'Present'}</span>
              </div>
              {edu.gpa && <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {skills && skills.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="text-gray-600 text-sm border border-gray-200 px-3 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default MinimalTemplate;
