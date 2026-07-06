import React from 'react';

const templates = [
  { id: 'modern', name: 'Modern', icon: '💼', description: 'Clean and professional' },
  { id: 'creative', name: 'Creative', icon: '🎨', description: 'Bold and colorful' },
  { id: 'minimal', name: 'Minimal', icon: '✨', description: 'Simple and elegant' },
  { id: 'classic', name: 'Classic', icon: '📋', description: 'Traditional format' },
];

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Choose Template:</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={selectedTemplate === template.id 
              ? 'p-3 rounded-lg border-2 border-purple-600 bg-purple-50 shadow-md transition-all text-center'
              : 'p-3 rounded-lg border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all text-center'
            }
          >
            <div className="text-2xl">{template.icon}</div>
            <div className="text-sm font-medium text-gray-800">{template.name}</div>
            <div className="text-xs text-gray-500">{template.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
