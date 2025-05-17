import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FieldStat } from "@/lib/types";

interface FieldStatsCardProps {
  stats: FieldStat[];
}

export default function FieldStatsCard({ stats }: FieldStatsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Auto-fill Field Stats</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2 space-y-4">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <p className="text-sm">{stat.name}</p>
              <p className="text-sm text-muted-foreground">{stat.percentage}%</p>
            </div>
            <Progress value={stat.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="pt-2 border-t border-border">
        <Button variant="link" className="w-full">View all stats</Button>
      </CardFooter>
    </Card>
  );
}
