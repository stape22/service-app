import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
// TODO: Replace with atomic/organism KanbanBoard, JobsCalendar, JobsTable implementations. See dev-log.md for rationale.
// import { JobsCalendar } from '../../../Figma Design/components/JobsCalendar';
// import { KanbanBoard } from '../../../Figma Design/components/KanbanBoard';
// import { JobsTable } from '../../../Figma Design/components/JobsTable';
// TODO: Replace with atomic/organism Tabs, Calendar, Table implementations. See dev-log.md for rationale.
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../Figma Design/components/ui/tabs';
// import { Calendar } from '../../../Figma Design/components/ui/calendar';
// import { Table } from '../../../Figma Design/components/ui/table';
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
            <div className="w-auto">
              <div className="grid w-full grid-cols-3">
                <button value="calendar" className="p-2" title="Calendar View">
                  <div>Calendar Placeholder</div>
                </button>
                <button value="kanban" className="p-2" title="Kanban View">
                  {/* Placeholder for Kanban icon */}
                  <span className="h-4 w-4 inline-block bg-gray-300 rounded" />
                </button>
                <button value="table" className="p-2" title="Table View">
                  <div>Table Placeholder</div>
                </button>
              </div>
            </div>
          </div>
          {/* Content Area */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="w-full">
              <div className="m-0">
                {/* JobsCalendar component will be replaced with atomic/organism */}
                <div>Calendar View Placeholder</div>
              </div>
              <div className="m-0">
                {/* KanbanBoard component will be replaced with atomic/organism */}
                <div>Kanban View Placeholder</div>
              </div>
              <div className="m-0">
                {/* JobsTable component will be replaced with atomic/organism */}
                <div>Table View Placeholder</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}; 