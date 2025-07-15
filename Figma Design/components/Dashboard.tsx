import { useState } from "react";
import { JobsCalendar } from "./JobsCalendar";
import { KanbanBoard } from "./KanbanBoard";
import { JobsTable } from "./JobsTable";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar, Layout, Table } from "lucide-react";

interface DashboardProps {
  onJobEdit?: (jobId: number) => void;
}

export function Dashboard({ onJobEdit }: DashboardProps) {
  const [activeView, setActiveView] = useState<'calendar' | 'kanban' | 'table'>('calendar');

  return (
    <div className="bg-gray-50 min-h-screen">
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
                <JobsCalendar onJobEdit={onJobEdit} />
              </TabsContent>
              
              <TabsContent value="kanban" className="m-0">
                <KanbanBoard onJobEdit={onJobEdit} />
              </TabsContent>
              
              <TabsContent value="table" className="m-0">
                <JobsTable onJobEdit={onJobEdit} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}