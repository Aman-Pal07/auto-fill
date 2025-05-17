import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ExtensionStatusCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Extension Status</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-primary/20 rounded-md flex items-center justify-center mr-3">
              <span className="material-icons text-primary">extension</span>
            </div>
            <div>
              <p className="font-medium">ApplicationAuto v1.2.5</p>
              <p className="text-muted-foreground text-sm">Last updated: 3 days ago</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-success/20 text-success border-0">Active</Badge>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-background rounded-md">
            <p className="text-muted-foreground text-sm mb-1">Supported Sites</p>
            <div className="flex items-center">
              <span className="text-lg font-semibold">42</span>
              <Badge variant="outline" className="ml-2 text-xs bg-success/10 text-success border-0 h-5">+5</Badge>
            </div>
          </div>
          
          <div className="p-3 bg-background rounded-md">
            <p className="text-muted-foreground text-sm mb-1">Form Detection Rate</p>
            <div className="flex items-center">
              <span className="text-lg font-semibold">87%</span>
              <Badge variant="outline" className="ml-2 text-xs bg-success/10 text-success border-0 h-5">+3%</Badge>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium mb-3">Auto-fill Settings</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="material-icons mr-2 text-muted-foreground">toggle_on</span>
                <span>Auto-fill on page load</span>
              </div>
              <Switch id="auto-fill" checked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="material-icons mr-2 text-muted-foreground">notifications</span>
                <span>Show notifications</span>
              </div>
              <Switch id="notifications" checked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="material-icons mr-2 text-muted-foreground">history</span>
                <span>Save form history</span>
              </div>
              <Switch id="form-history" checked />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 border-t border-border">
        <Button variant="link" className="w-full py-2">Advanced settings</Button>
      </CardFooter>
    </Card>
  );
}
