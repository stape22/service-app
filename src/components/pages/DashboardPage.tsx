import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { JobsCalendar } from '../../../Figma Design/components/JobsCalendar';
import { KanbanBoard } from '../../../Figma Design/components/KanbanBoard';
import { JobsTable } from '../../../Figma Design/components/JobsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../Figma Design/components/ui/tabs';
import { Calendar } from '../../../Figma Design/components/ui/calendar';
import { Table } from '../../../Figma Design/components/ui/table';
// TODO: Replace with Kanban icon from design system if/when available

export const DashboardPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'calendar' | 'kanban' | 'table'>('calendar');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Navigation handler for DashboardLayout
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout
      currentPage={currentPage}
      onPageChange={handlePageChange}
      isChatOpen={isChatOpen}
      onChatToggle={() => setIsChatOpen((v) => !v)}
      onChatClose={() => setIsChatOpen(false)}
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
            <Tabs value={activeView} onValueChange={(value: 'calendar' | 'kanban' | 'table') => setActiveView(value)} className="w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="calendar" className="p-2" title="Calendar View">
                  <Calendar className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="kanban" className="p-2" title="Kanban View">
                  {/* Placeholder for Kanban icon */}
                  <span className="h-4 w-4 inline-block bg-gray-300 rounded" />
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
                <JobsCalendar />
              </TabsContent>
              <TabsContent value="kanban" className="m-0">
                <KanbanBoard />
              </TabsContent>
              <TabsContent value="table" className="m-0">
                <JobsTable />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}; 