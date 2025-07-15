import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, User } from "lucide-react";

interface Job {
  id: string;
  title: string;
  address: string;
  assignee: {
    name: string;
    avatar?: string;
    initials: string;
  };
  date: string;
  status: 'estimate' | 'install' | 'repair' | 'cleaning' | 'completed';
  isUnassigned?: boolean;
}

interface Column {
  id: string;
  title: string;
  count: number;
  jobs: Job[];
}

const getStatusColor = (status: Job['status']) => {
  switch (status) {
    case 'estimate':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'install':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'repair':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'cleaning':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'completed':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const columns: Column[] = [
  {
    id: 'to-schedule',
    title: 'To Schedule',
    count: 4,
    jobs: [
      {
        id: '#320',
        title: 'Roof Inspection',
        address: '123 Main St, Austin',
        assignee: { name: 'Unassigned', initials: 'U' },
        date: 'Oct 15, 2023',
        status: 'estimate',
        isUnassigned: true
      },
      {
        id: '#322',
        title: 'New Shingle Roof',
        address: '456 Oak Dr, Austin',
        assignee: { name: 'Unassigned', initials: 'U' },
        date: 'Oct 16, 2023',
        status: 'install',
        isUnassigned: true
      },
      {
        id: '#325',
        title: 'Gutter Replacement',
        address: '789 Pine Ln, Austin',
        assignee: { name: 'Unassigned', initials: 'U' },
        date: 'Oct 17, 2023',
        status: 'repair',
        isUnassigned: true
      },
      {
        id: '#327',
        title: 'Roof Cleaning',
        address: '101 Cedar St, Austin',
        assignee: { name: 'Unassigned', initials: 'U' },
        date: 'Oct 18, 2023',
        status: 'cleaning',
        isUnassigned: true
      }
    ]
  },
  {
    id: 'scheduled',
    title: 'Scheduled',
    count: 3,
    jobs: [
      {
        id: '#318',
        title: 'Metal Roof Installation',
        address: '202 Maple Ave, Austin',
        assignee: { name: 'Mike Johnson', initials: 'MJ' },
        date: 'Oct 15, 2023',
        status: 'install'
      },
      {
        id: '#319',
        title: 'Leak Repair',
        address: '303 Birch Rd, Austin',
        assignee: { name: 'Sarah Williams', initials: 'SW' },
        date: 'Oct 16, 2023',
        status: 'repair'
      },
      {
        id: '#321',
        title: 'Storm Damage Assessment',
        address: '404 Elm Ct, Austin',
        assignee: { name: 'David Chen', initials: 'DC' },
        date: 'Oct 14, 2023',
        status: 'estimate'
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    count: 3,
    jobs: [
      {
        id: '#315',
        title: 'Solar Roof Installation',
        address: '505 Willow Way, Austin',
        assignee: { name: 'Robert Taylor', initials: 'RT' },
        date: 'Oct 16, 2023',
        status: 'install'
      },
      {
        id: '#316',
        title: 'Annual Roof Inspection',
        address: '606 Aspen Dr, Austin',
        assignee: { name: 'Lisa Rodriguez', initials: 'LR' },
        date: 'Oct 13, 2023',
        status: 'cleaning'
      },
      {
        id: '#317',
        title: 'Chimney Flashing Repair',
        address: '707 Spruce Dr, Austin',
        assignee: { name: 'James Wilson', initials: 'JW' },
        date: 'Oct 14, 2023',
        status: 'repair'
      }
    ]
  },
  {
    id: 'completed',
    title: 'Completed',
    count: 4,
    jobs: [
      {
        id: '#311',
        title: 'Skylight Installation',
        address: '808 Redwood Ln, Austin',
        assignee: { name: 'Mike Johnson', initials: 'MJ' },
        date: 'Oct 10, 2023',
        status: 'completed'
      },
      {
        id: '#312',
        title: 'Roof Replacement',
        address: '909 Fir Blvd, Austin',
        assignee: { name: 'Robert Taylor', initials: 'RT' },
        date: 'Oct 9, 2023',
        status: 'completed'
      },
      {
        id: '#313',
        title: 'Gutter Cleaning',
        address: '1010 Hemlock St, Austin',
        assignee: { name: 'Lisa Rodriguez', initials: 'LR' },
        date: 'Oct 11, 2023',
        status: 'completed'
      },
      {
        id: '#314',
        title: 'Roof Inspection',
        address: '1111 Juniper Ct, Austin',
        assignee: { name: 'Sarah Williams', initials: 'SW' },
        date: 'Oct 12, 2023',
        status: 'completed'
      }
    ]
  }
];

function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-gray-900 mb-1">{job.id}</h4>
          <h5 className="text-gray-700 mb-2">{job.title}</h5>
          <p className="text-sm text-gray-600 mb-3">{job.address}</p>
        </div>
        <Badge
          variant="outline"
          className={`text-xs px-2 py-1 capitalize ${getStatusColor(job.status)}`}
        >
          {job.status}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {job.isUnassigned ? (
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-3 h-3 text-gray-500" />
            </div>
          ) : (
            <Avatar className="w-6 h-6">
              <AvatarImage src={job.assignee.avatar} />
              <AvatarFallback className="text-xs">{job.assignee.initials}</AvatarFallback>
            </Avatar>
          )}
          <span className="text-sm text-gray-600">{job.assignee.name}</span>
        </div>
        
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{job.date}</span>
        </div>
      </div>
    </div>
  );
}

export function KanbanBoard() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {columns.map((column) => (
        <div key={column.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">{column.title}</h3>
            <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
              {column.count}
            </span>
          </div>
          
          <div className="space-y-0">
            {column.jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}