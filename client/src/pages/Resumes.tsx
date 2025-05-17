import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Resume } from "@/lib/types";

// Demo data
const DEMO_USER_ID = "1";

export default function Resumes() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  const { data: resumes, isLoading } = useQuery<Resume[]>({ 
    queryKey: ['/api/resumes'],
    meta: { headers: { 'user-id': DEMO_USER_ID } }
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Resumes" />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Resume Management</h1>
              <p className="text-muted-foreground mt-1">
                Upload and manage your resumes for auto-filling job applications
              </p>
            </div>
            
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 inline-flex items-center">
                  <span className="material-icons mr-2 text-sm">upload_file</span>
                  Upload Resume
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Resume</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="resume-name">Resume Name</Label>
                    <Input id="resume-name" placeholder="e.g. Software Engineer Resume 2023" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resume-file">Upload PDF</Label>
                    <Input id="resume-file" type="file" accept=".pdf" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="default-resume" className="rounded border-border" />
                    <Label htmlFor="default-resume">Set as default resume</Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setUploadDialogOpen(false)}>Upload</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Resumes list */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(resumes || [
              {
                id: 1,
                userId: 1,
                filename: "John_Doe_Resume_2023.pdf",
                fileContent: "Sample base64 content",
                isDefault: true,
                createdAt: new Date().toISOString()
              },
              {
                id: 2,
                userId: 1,
                filename: "John_Doe_Frontend_Resume.pdf",
                fileContent: "Sample base64 content",
                isDefault: false,
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
              }
            ]).map((resume) => (
              <Card key={resume.id}>
                <CardContent className="p-0">
                  <div className="p-4 flex items-center space-x-4">
                    <div className="h-12 w-12 bg-primary/20 rounded-md flex items-center justify-center">
                      <span className="material-icons text-primary">description</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h3 className="font-medium truncate">{resume.filename}</h3>
                        {resume.isDefault && (
                          <Badge className="ml-2 px-2 py-0">Default</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Uploaded {formatDate(resume.createdAt)}
                      </p>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon">
                        <span className="material-icons">visibility</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <span className="material-icons">edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <span className="material-icons">download</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <span className="material-icons">delete</span>
                      </Button>
                    </div>
                  </div>
                  
                  {!resume.isDefault && (
                    <div className="px-4 py-2 border-t border-border">
                      <Button variant="link" className="h-auto p-0 text-sm text-primary">
                        Set as default resume
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Resume tips */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resume Tips for Successful Auto-Filling</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li>Use a clean, ATS-friendly format for better parsing accuracy.</li>
                <li>Include relevant keywords from job descriptions you're targeting.</li>
                <li>Ensure your contact information is up-to-date and matches your profile.</li>
                <li>Use standard section headings (e.g., "Experience", "Education", "Skills").</li>
                <li>Upload your resume as a PDF to maintain formatting consistency.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
