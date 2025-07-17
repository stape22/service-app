import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/Tabs';
import { Calendar, Layout, Table } from 'lucide-react';
import { JobsCalendar } from '../organisms/JobsCalendar';
import { JobsTable } from '../molecules/JobsTable';

// Local jobs data for demonstration (should be replaced with real data source)
const jobsData = [
  { id: '#318', date: 'June 4, 2025', jobType: 'Install', status: 'scheduled', roofer: 'Mike Johnson', address: '1234 Oak Street', customer: 'John Smith' },
  { id: '#319', date: 'June 5, 2025', jobType: 'Repair', status: 'to-schedule', roofer: 'Sarah Williams', address: '567 Pine Avenue', customer: 'Emily Davis' },
  { id: '#320', date: 'June 5, 2025', jobType: 'Estimate', status: 'completed', roofer: 'David Chen', address: '890 Maple Drive', customer: 'Robert Johnson' },
  { id: '#321', date: 'June 6, 2025', jobType: 'Install', status: 'in-progress', roofer: 'James Wilson', address: '123 Elm Court', customer: 'Patricia Brown' },
  { id: '#322', date: 'June 7, 2025', jobType: 'Repair', status: 'scheduled', roofer: 'Lisa Martinez', address: '456 Cedar Lane', customer: 'Michael Wilson' },
  { id: '#323', date: 'June 8, 2025', jobType: 'Cleaning', status: 'to-schedule', roofer: 'Thomas Anderson', address: '789 Birch Street', customer: 'Jennifer Taylor' },
];

const jobsForCalendar = jobsData.map(j => ({
  id: j.id,
  title: j.jobType,
  type: (j.jobType.toLowerCase() as 'estimate' | 'install' | 'repair' | 'cleaning'),
  date: new Date(j.date),
}));

export const DashboardPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'calendar' | 'kanban' | 'table'>('calendar');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={handlePageChange}
    >
      <main className="px-6 lg:px-8 py-8">
        <div className="max-w-full mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Overview of your roofing jobs and schedule</p>
            </div>
            {/* View Toggle */}
            <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'calendar' | 'kanban' | 'table')} className="w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="calendar" className="p-2" title="Calendar View">
                  <Calendar className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="kanban" className="p-2" title="Kanban View">
                  <Layout className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="table" className="p-2" title="Table View">
                  <Table className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {/* Content Area */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Tabs value={activeView} className="w-full">
              <TabsContent value="calendar" className="m-0">
                <JobsCalendar jobs={jobsForCalendar} />
              </TabsContent>
              <TabsContent value="kanban" className="m-0">
                {/* KanbanBoard placeholder */}
                <div className="p-8 text-center text-gray-500">Kanban view coming soon.</div>
              </TabsContent>
              <TabsContent value="table" className="m-0">
                <JobsTable jobs={jobsData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}; 