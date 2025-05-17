import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  iconColor: "primary" | "success" | "secondary" | "accent";
}

export default function StatCard({ title, value, change, icon, iconColor }: StatCardProps) {
  const getColorClass = (color: string) => {
    switch (color) {
      case "primary": return "text-primary";
      case "success": return "text-success";
      case "secondary": return "text-secondary";
      case "accent": return "text-accent";
      default: return "text-primary";
    }
  };

  const getBackgroundClass = (color: string) => {
    switch (color) {
      case "primary": return "bg-primary/20";
      case "success": return "bg-success/20";
      case "secondary": return "bg-secondary/20";
      case "accent": return "bg-accent/20";
      default: return "bg-primary/20";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
        <div className={cn("p-2 rounded-md", getBackgroundClass(iconColor))}>
          <span className={cn("material-icons", getColorClass(iconColor))}>{icon}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs">
        <span className="text-success flex items-center">
          <span className="material-icons text-xs mr-1">arrow_upward</span>
          {change}%
        </span>
        <span className="text-muted-foreground ml-2">from last week</span>
      </div>
    </div>
  );
}
