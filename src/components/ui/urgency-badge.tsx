import { cn } from "@/lib/utils";

interface UrgencyBadgeProps {
  level: 'Critical' | 'High' | 'Medium' | 'Low';
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

export function UrgencyBadge({ level, size = 'md', showDot = true, className }: UrgencyBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const colorClasses = {
    Critical: 'bg-critical/10 text-critical border-critical/30',
    High: 'bg-high/10 text-high border-high/30',
    Medium: 'bg-medium/10 text-medium border-medium/30',
    Low: 'bg-low/10 text-low border-low/30',
  };

  const dotColors = {
    Critical: 'bg-critical',
    High: 'bg-high',
    Medium: 'bg-medium',
    Low: 'bg-low',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border',
        sizeClasses[size],
        colorClasses[level],
        className
      )}
    >
      {showDot && (
        <span className={cn('w-2 h-2 rounded-full animate-pulse', dotColors[level])} />
      )}
      {level}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'New' | 'In Progress' | 'Under Review' | 'Resolved' | 'Closed';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const colorClasses = {
    'New': 'bg-info/10 text-info border-info/30',
    'In Progress': 'bg-warning/10 text-warning border-warning/30',
    'Under Review': 'bg-primary/10 text-primary border-primary/30',
    'Resolved': 'bg-success/10 text-success border-success/30',
    'Closed': 'bg-muted text-muted-foreground border-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        sizeClasses[size],
        colorClasses[status],
        className
      )}
    >
      {status}
    </span>
  );
}
