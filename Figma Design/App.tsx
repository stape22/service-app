import { useState } from "react";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { Roofers, RooferData } from "./components/Roofers";
import { AddRoofer } from "./components/AddRoofer";
import { EditRoofer } from "./components/EditRoofer";
import { Customers, CustomerData } from "./components/Customers";
import { AddCustomer } from "./components/AddCustomer";
import { EditCustomer } from "./components/EditCustomer";
import { Jobs, JobData } from "./components/Jobs";
import { AddJob } from "./components/AddJob";
import { EditJob } from "./components/EditJob";
import { ChatPanel } from "./components/ChatPanel";

type CurrentPage = 'dashboard' | 'jobs' | 'roofers' | 'customers' | 'add-roofer' | 'edit-roofer' | 'add-customer' | 'edit-customer' | 'add-job' | 'edit-job';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('dashboard');
  const [selectedRoofer, setSelectedRoofer] = useState<RooferData | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobData | null>(null);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  const handlePageChange = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  const handleBackToRoofers = () => {
    setCurrentPage('roofers');
    setSelectedRoofer(null);
  };

  const handleBackToCustomers = () => {
    setCurrentPage('customers');
    setSelectedCustomer(null);
  };

  const handleBackToJobs = () => {
    setCurrentPage('jobs');
    setSelectedJob(null);
  };

  const handleEditRoofer = (roofer: RooferData) => {
    setSelectedRoofer(roofer);
    setCurrentPage('edit-roofer');
  };

  const handleEditCustomer = (customer: CustomerData) => {
    setSelectedCustomer(customer);
    setCurrentPage('edit-customer');
  };

  const handleEditJob = (job: JobData) => {
    setSelectedJob(job);
    setCurrentPage('edit-job');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'roofers':
        return <Roofers onAddRoofer={() => setCurrentPage('add-roofer')} onEditRoofer={handleEditRoofer} />;
      case 'add-roofer':
        return <AddRoofer onBack={handleBackToRoofers} />;
      case 'edit-roofer':
        return selectedRoofer ? <EditRoofer roofer={selectedRoofer} onBack={handleBackToRoofers} /> : <Roofers onAddRoofer={() => setCurrentPage('add-roofer')} onEditRoofer={handleEditRoofer} />;
      case 'customers':
        return <Customers onAddCustomer={() => setCurrentPage('add-customer')} onEditCustomer={handleEditCustomer} />;
      case 'add-customer':
        return <AddCustomer onBack={handleBackToCustomers} />;
      case 'edit-customer':
        return selectedCustomer ? <EditCustomer customer={selectedCustomer} onBack={handleBackToCustomers} /> : <Customers onAddCustomer={() => setCurrentPage('add-customer')} onEditCustomer={handleEditCustomer} />;
      case 'jobs':
        return <Jobs onAddJob={() => setCurrentPage('add-job')} onEditJob={handleEditJob} />;
      case 'add-job':
        return <AddJob onBack={handleBackToJobs} />;
      case 'edit-job':
        return selectedJob ? <EditJob job={selectedJob} onBack={handleBackToJobs} /> : <Jobs onAddJob={() => setCurrentPage('add-job')} onEditJob={handleEditJob} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onChatToggle={handleChatToggle} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div className="flex">
        <div className={`flex-1 transition-all duration-300 ${isChatOpen ? 'mr-80' : ''}`}>
          {renderCurrentPage()}
        </div>
        <ChatPanel isOpen={isChatOpen} onClose={handleChatClose} />
      </div>
    </div>
  );
}