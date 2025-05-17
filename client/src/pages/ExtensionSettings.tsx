import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { ExtensionSettings as ExtensionSettingsType } from "@/lib/types";

// Demo data
const DEMO_USER_ID = "1";

export default function ExtensionSettings() {
  const { data: settings, isLoading } = useQuery<ExtensionSettingsType>({ 
    queryKey: ['/api/extension-settings'],
    meta: { headers: { 'user-id': DEMO_USER_ID } }
  });

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Extension Settings" />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Extension Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure how the auto-fill extension behaves across job sites
            </p>
          </div>
          
          {/* Settings tabs */}
          <Tabs defaultValue="general">
            <TabsList className="mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="detection">Form Detection</TabsTrigger>
              <TabsTrigger value="fields">Field Mapping</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
            
            {/* General Settings */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Auto-fill on page load</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatically fill forms when a job application page is detected
                      </p>
                    </div>
                    <Switch id="auto-fill" defaultChecked={settings?.autoFillOnLoad ?? true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Show notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Display browser notifications when forms are filled
                      </p>
                    </div>
                    <Switch id="notifications" defaultChecked={settings?.showNotifications ?? true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Save form history</h3>
                      <p className="text-sm text-muted-foreground">
                        Record which forms were filled and their success rate
                      </p>
                    </div>
                    <Switch id="save-history" defaultChecked={settings?.saveFormHistory ?? true} />
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <h3 className="font-medium mb-3">Default action on form detection</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Select defaultValue="prompt">
                          <SelectTrigger>
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prompt">Show prompt</SelectItem>
                            <SelectItem value="auto-fill">Auto-fill immediately</SelectItem>
                            <SelectItem value="ignore">Do nothing</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Choose what happens when a form is detected
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Form Detection Settings */}
            <TabsContent value="detection">
              <Card>
                <CardHeader>
                  <CardTitle>Form Detection Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Detect forms on page load</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatically scan for forms when a page loads
                      </p>
                    </div>
                    <Switch id="detect-on-load" defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Detect dynamically loaded forms</h3>
                      <p className="text-sm text-muted-foreground">
                        Continue scanning for forms after the page has loaded
                      </p>
                    </div>
                    <Switch id="detect-dynamic" defaultChecked={true} />
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <h3 className="font-medium mb-3">Supported Job Sites</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p>LinkedIn</p>
                        <Switch id="linkedin" defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Indeed</p>
                        <Switch id="indeed" defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Glassdoor</p>
                        <Switch id="glassdoor" defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <p>ZipRecruiter</p>
                        <Switch id="ziprecruiter" defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Monster</p>
                        <Switch id="monster" defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <p>CareerBuilder</p>
                        <Switch id="careerbuilder" defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Generic job application forms</p>
                        <Switch id="generic" defaultChecked={true} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Field Mapping Settings */}
            <TabsContent value="fields">
              <Card>
                <CardHeader>
                  <CardTitle>Field Mapping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Configure how your profile data maps to form fields on job sites
                  </p>
                  
                  <Tabs defaultValue="linkedin">
                    <TabsList className="mb-4">
                      <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                      <TabsTrigger value="indeed">Indeed</TabsTrigger>
                      <TabsTrigger value="generic">Generic Forms</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="linkedin" className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="linkedin-name">Full Name Field</Label>
                            <Input id="linkedin-name" defaultValue="input[name='name']" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="linkedin-email">Email Field</Label>
                            <Input id="linkedin-email" defaultValue="input[name='email']" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="linkedin-phone">Phone Field</Label>
                            <Input id="linkedin-phone" defaultValue="input[name='phone']" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="linkedin-resume">Resume Upload</Label>
                            <Input id="linkedin-resume" defaultValue="input[type='file']" />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button>Save LinkedIn Mappings</Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="indeed">
                      <p className="text-muted-foreground">Configure Indeed field mappings.</p>
                    </TabsContent>
                    
                    <TabsContent value="generic">
                      <p className="text-muted-foreground">Configure generic form field mappings.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Collect usage statistics</h3>
                      <p className="text-sm text-muted-foreground">
                        Send anonymous usage data to help improve the extension
                      </p>
                    </div>
                    <Switch id="usage-stats" defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Store form data locally</h3>
                      <p className="text-sm text-muted-foreground">
                        Cache form data in your browser for faster filling
                      </p>
                    </div>
                    <Switch id="local-cache" defaultChecked={true} />
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <h3 className="font-medium mb-3">Data Management</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage your personal data used by the extension
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-3">
                      <Button variant="outline">Export Extension Data</Button>
                      <Button variant="outline" className="text-destructive">
                        Clear Local Cache
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
