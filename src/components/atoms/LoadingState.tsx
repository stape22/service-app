import { LoadingSpinner } from './LoadingSpinner';

interface LoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  skeleton?: React.ReactNode;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  children,
  message = 'Loading...',
  skeleton,
  className = ''
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <LoadingSpinner size="lg" className="mb-4" />
      <p className="text-gray-600 text-sm">{message}</p>
      {skeleton && (
        <div className="w-full mt-4">
          {skeleton}
        </div>
      )}
    </div>
  );
};

// Skeleton components for common UI patterns
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className = '' 
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white p-4 rounded-lg shadow border ${className}`}>
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
      </div>
    </div>
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; columns?: number; className?: string }> = ({ 
  rows = 5, 
  columns = 4, 
  className = '' 
}) => (
  <div className={`bg-white rounded-lg shadow border ${className}`}>
    <div className="p-4 border-b">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
    <div className="divide-y">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);