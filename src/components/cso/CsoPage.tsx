import React from 'react';
import CsoLayout from './layout/CsoLayout';
import CsoHeader from './layout/CsoHeader';
import StatsGrid from './dashboard/StatsGrid';
import QueueTable from './queue/QueueTable';

const CsoPage: React.FC = () => {
  return (
    <CsoLayout>
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <CsoHeader />
        <StatsGrid />
        <QueueTable />
      </div>
    </CsoLayout>
  );
};

export default CsoPage;