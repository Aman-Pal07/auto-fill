import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormHistory } from "@/lib/types";

interface ActivityItemProps {
  activity: FormHistory;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  // Format the time from timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return diffDays === 1 ? "Yesterday" : `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else {
      return "Just now";
    }
  };

  // Icon color based on site
  const getIconColor = (site: string) => {
    switch (site.toLowerCase()) {
      case "linkedin": return "bg-primary/20 text-primary";
      case "indeed": return "bg-accent/20 text-accent";
      case "google careers": return "bg-secondary/20 text-secondary";
      default: return "bg-danger/20 text-danger";
    }
  };

  // Status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="outline" className="bg-success/20 text-success border-0">Success</Badge>;
      case "partial":
        return <Badge variant="outline" className="bg-warning/20 text-warning border-0">Partial</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-destructive/20 text-destructive border-0">Failed</Badge>;
      default:
        return <Badge variant="outline" className="bg-success/20 text-success border-0">Success</Badge>;
    }
  };

  return (
    <div className="p-4 flex items-center border-b border-border last:border-0">
      <div className={cn("h-10 w-10 rounded-full flex items-center justify-center mr-4", getIconColor(activity.site))}>
        <span className="material-icons">business</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">{activity.site} - {activity.positionTitle}</p>
            <p className="text-muted-foreground text-sm">
              {activity.status === "failed" 
                ? "Autofill failed" 
                : `Autofilled ${activity.fieldsCompleted} fields`}
            </p>
          </div>
          <span className="text-muted-foreground text-sm">{formatTime(activity.timestamp)}</span>
        </div>
        <div className="flex items-center mt-2">
          {getStatusBadge(activity.status)}
          <Button variant="link" size="sm" className="text-accent p-0 h-auto ml-2">View details</Button>
        </div>
      </div>
    </div>
  );
}
