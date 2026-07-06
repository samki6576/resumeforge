import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import TemplateSelector from './TemplateSelector';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ClassicTemplate from './templates/ClassicTemplate';

const ResumePreview = ({ data }) => {
  const { personalInfo, experience, education, skills } = data;
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const downloadPDF = () => {
    const element = document.getElementById('resume-content');
    if (!element) {
      alert('No resume content to download!');
      return;
    }
    const fileName = personalInfo?.fullName ? personalInfo.fullName + '.pdf' : 'resume.pdf';
    html2pdf()
      .set({
        margin: 1,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, letterRendering: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      })
      .from(element)
      .save();
  };

  const renderTemplate = () => {
    const props = { personalInfo, experience, education, skills };
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'minimal':
        return <MinimalTemplate {...props} />;
      case 'classic':
        return <ClassicTemplate {...props} />;
      default:
        return <ModernTemplate {...props} />;
    }
  };

  if (!personalInfo?.fullName) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-400">
        <p className="text-6xl mb-4">📄</p>
        <p className="text-lg">Your resume preview will appear here</p>
        <p className="text-sm">Start by filling in your personal information and adding skills!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Resume Preview</h3>
        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-2"
        >
          📄 Download PDF
        </button>
      </div>

      <TemplateSelector 
        selectedTemplate={selectedTemplate} 
        onSelectTemplate={setSelectedTemplate} 
      />

      <div id="resume-content">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
