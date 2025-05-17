import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import ExtensionStatusCard from "@/components/dashboard/ExtensionStatusCard";
import ProfileOverviewCard from "@/components/dashboard/ProfileOverviewCard";
import FieldStatsCard from "@/components/dashboard/FieldStatsCard";
import ExtensionPreview from "@/components/extension/ExtensionPreview";
import { FormHistory, Statistics, FieldStat } from "@/lib/types";

// Demo data
const DEMO_USER_ID = "1"; // In a real app, this would come from authentication

export default function Dashboard() {
  // Fetch statistics
  const { data: stats } = useQuery<Statistics>({ 
    queryKey: ['/api/statistics'],
    // In a real app, we'd include the user ID in the headers
    meta: { headers: { 'user-id': DEMO_USER_ID } }
  });
  
  // Fetch form history
  const { data: formHistories } = useQuery<FormHistory[]>({ 
    queryKey: ['/api/form-history'],
    // In a real app, we'd include the user ID in the headers
    meta: { headers: { 'user-id': DEMO_USER_ID } }
  });

  // Field stats data
  const fieldStats: FieldStat[] = [
    { name: "Contact Info", percentage: 100 },
    { name: "Work Experience", percentage: 92 },
    { name: "Education", percentage: 100 },
    { name: "Skills", percentage: 85 },
    { name: "Custom Fields", percentage: 64 }
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard" />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Dashboard Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Welcome back, John</h1>
              <p className="text-muted-foreground mt-1">Here's an overview of your auto-fill activity</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="inline-flex items-center justify-center">
                <span className="material-icons mr-2 text-sm">file_download</span>
                Export Data
              </Button>
              <Button className="inline-flex items-center justify-center">
                <span className="material-icons mr-2 text-sm">add</span>
                New Profile
              </Button>
            </div>
          </div>
          
          {/* Stats Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Applications Filled"
              value={stats?.applicationsFilled ?? 24}
              change={12}
              icon="description"
              iconColor="primary"
            />
            
            <StatCard
              title="Success Rate"
              value={`${stats?.successRate ?? 92}%`}
              change={5}
              icon="check_circle"
              iconColor="success"
            />
            
            <StatCard
              title="Forms Detected"
              value={stats?.formsDetected ?? 38}
              change={18}
              icon="find_in_page"
              iconColor="secondary"
            />
            
            <StatCard
              title="Time Saved"
              value={`${(stats?.timeSaved ?? 324) / 60} hrs`}
              change={8}
              icon="schedule"
              iconColor="accent"
            />
          </div>
          
          {/* Main Dashboard Content Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Activity & Extension Status Section */}
            <div className="xl:col-span-2 grid grid-cols-1 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Recent Form Activity</CardTitle>
                  <Button variant="ghost" size="icon">
                    <span className="material-icons">more_horiz</span>
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {formHistories ? (
                      formHistories.map(history => (
                        <ActivityItem key={history.id} activity={history} />
                      ))
                    ) : (
                      // Placeholder items if data is loading
                      <>
                        <ActivityItem 
                          activity={{
                            id: 1,
                            userId: 1,
                            site: "LinkedIn",
                            positionTitle: "Software Engineer",
                            fieldsAttempted: 18,
                            fieldsCompleted: 18,
                            status: "success",
                            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
                          }}
                        />
                        <ActivityItem 
                          activity={{
                            id: 2,
                            userId: 1,
                            site: "Indeed",
                            positionTitle: "Full Stack Developer",
                            fieldsAttempted: 22,
                            fieldsCompleted: 18,
                            status: "partial",
                            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
                          }}
                        />
                        <ActivityItem 
                          activity={{
                            id: 3,
                            userId: 1,
                            site: "Google Careers",
                            positionTitle: "UX Designer",
                            fieldsAttempted: 15,
                            fieldsCompleted: 15,
                            status: "success",
                            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                          }}
                        />
                        <ActivityItem 
                          activity={{
                            id: 4,
                            userId: 1,
                            site: "Microsoft Careers",
                            positionTitle: "Product Manager",
                            fieldsAttempted: 20,
                            fieldsCompleted: 0,
                            status: "failed",
                            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
                          }}
                        />
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t border-border">
                  <Button variant="link" className="w-full">View all activity</Button>
                </CardFooter>
              </Card>
              
              {/* Extension Status & Performance */}
              <ExtensionStatusCard />
            </div>
            
            {/* Profile Overview Section */}
            <div className="xl:col-span-1">
              <ProfileOverviewCard />
              
              <div className="mt-6">
                <FieldStatsCard stats={fieldStats} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Extension Preview */}
      <ExtensionPreview />
    </div>
  );
}
