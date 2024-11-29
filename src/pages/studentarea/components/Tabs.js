import React from 'react';

const Tabs = ({ subfields, selectedTab, onSelectTab }) => {
  return (
    <>
      {subfields.map((subfield, index) => (
        <div
          key={subfield}
          className={`tab ${selectedTab === subfield ? 'active' : ''}`}
          onClick={() => onSelectTab(subfield)}
        >
          {subfield}
        </div>
      ))}
    </>
  );
};

export default Tabs;
