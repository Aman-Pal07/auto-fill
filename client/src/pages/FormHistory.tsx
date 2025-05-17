import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { FormHistory } from "@/lib/types";

// Demo data
const DEMO_USER_ID = "1";

export default function FormHistoryPage() {
  const [selectedHistory, setSelectedHistory] = useState<FormHistory | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  const { data: formHistories, isLoading } = useQuery<FormHistory[]>({ 
    queryKey: ['/api/form-history'],
    meta: { headers: { 'user-id': DEMO_USER_ID } }
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get status badge
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
  
  const viewDetails = (history: FormHistory) => {
    setSelectedHistory(history);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Form History" />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Form Filling History</h1>
            <p className="text-muted-foreground mt-1">
              View and analyze your auto-filled job applications
            </p>
          </div>
          
          {/* Form history tabs */}
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Forms</TabsTrigger>
              <TabsTrigger value="success">Successful</TabsTrigger>
              <TabsTrigger value="partial">Partial</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="space-y-4">
                {(formHistories || [
                  {
                    id: 1,
                    userId: 1,
                    site: "LinkedIn",
                    positionTitle: "Software Engineer",
                    fieldsAttempted: 18,
                    fieldsCompleted: 18,
                    status: "success",
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    details: { fields: ["name", "email", "phone", "resume"] }
                  },
                  {
                    id: 2,
                    userId: 1,
                    site: "Indeed",
                    positionTitle: "Full Stack Developer",
                    fieldsAttempted: 22,
                    fieldsCompleted: 18,
                    status: "partial",
                    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                    details: { fields: ["name", "email", "phone", "resume"] }
                  },
                  {
                    id: 3,
                    userId: 1,
                    site: "Google Careers",
                    positionTitle: "UX Designer",
                    fieldsAttempted: 15,
                    fieldsCompleted: 15,
                    status: "success",
                    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    details: { fields: ["name", "email", "phone", "resume"] }
                  },
                  {
                    id: 4,
                    userId: 1,
                    site: "Microsoft Careers",
                    positionTitle: "Product Manager",
                    fieldsAttempted: 20,
                    fieldsCompleted: 0,
                    status: "failed",
                    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    details: { error: "Unknown form structure" }
                  }
                ]).map((history) => (
                  <Card key={history.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{history.site}</h3>
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mx-2" />
                            <p>{history.positionTitle}</p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatDate(history.timestamp)}
                          </p>
                        </div>
                        
                        <div className="flex items-center mt-2 md:mt-0">
                          {getStatusBadge(history.status)}
                          <p className="text-sm mx-4">
                            {history.fieldsCompleted}/{history.fieldsAttempted} fields filled
                          </p>
                          <Button variant="outline" size="sm" onClick={() => viewDetails(history)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="success">
              <p className="text-muted-foreground">Showing only successful form submissions.</p>
            </TabsContent>
            
            <TabsContent value="partial">
              <p className="text-muted-foreground">Showing only partially filled forms.</p>
            </TabsContent>
            
            <TabsContent value="failed">
              <p className="text-muted-foreground">Showing only failed form submissions.</p>
            </TabsContent>
          </Tabs>
          
          {/* Analytics card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Form Filling Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-card border border-border rounded-md">
                  <p className="text-muted-foreground text-sm">Most Common Site</p>
                  <p className="text-xl font-medium mt-1">LinkedIn</p>
                  <p className="text-sm text-muted-foreground mt-1">8 applications</p>
                </div>
                
                <div className="p-4 bg-card border border-border rounded-md">
                  <p className="text-muted-foreground text-sm">Average Fields Filled</p>
                  <p className="text-xl font-medium mt-1">92%</p>
                  <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
                </div>
                
                <div className="p-4 bg-card border border-border rounded-md">
                  <p className="text-muted-foreground text-sm">Problematic Fields</p>
                  <p className="text-xl font-medium mt-1">Cover Letter</p>
                  <p className="text-sm text-muted-foreground mt-1">Failed 6 times</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Form Details</DialogTitle>
          </DialogHeader>
          
          {selectedHistory && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{selectedHistory.site} - {selectedHistory.positionTitle}</h3>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedHistory.timestamp)}</p>
                </div>
                {getStatusBadge(selectedHistory.status)}
              </div>
              
              <div className="border-t border-border pt-4">
                <h4 className="font-medium mb-2">Form Filling Summary</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Fields Attempted</p>
                    <p className="font-medium">{selectedHistory.fieldsAttempted}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fields Completed</p>
                    <p className="font-medium">{selectedHistory.fieldsCompleted}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="font-medium">
                      {Math.round((selectedHistory.fieldsCompleted / selectedHistory.fieldsAttempted) * 100) || 0}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Saved</p>
                    <p className="font-medium">~5 minutes</p>
                  </div>
                </div>
              </div>
              
              {selectedHistory.status === "failed" && selectedHistory.details?.error && (
                <div className="border-t border-border pt-4">
                  <h4 className="font-medium mb-2">Error Details</h4>
                  <p className="text-sm p-2 bg-destructive/10 text-destructive rounded">
                    {selectedHistory.details.error}
                  </p>
                </div>
              )}
              
              {selectedHistory.details?.fields && (
                <div className="border-t border-border pt-4">
                  <h4 className="font-medium mb-2">Fields Filled</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedHistory.details.fields.map((field, index) => (
                      <Badge key={index} variant="outline" className="justify-start">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
