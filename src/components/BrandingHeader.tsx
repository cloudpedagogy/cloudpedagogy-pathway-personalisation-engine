import React from 'react';

export const BrandingHeader: React.FC = () => {
  return (
    <header className="branding-header">
      <div className="branding-logo">
        <a href="https://www.cloudpedagogy.com/" target="_blank" rel="noopener noreferrer">
          CloudPedagogy
        </a>
      </div>
      <div className="app-branding-name">
        Pathway Personalisation Engine
      </div>
    </header>
  );
};
