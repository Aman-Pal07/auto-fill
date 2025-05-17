import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Profile as ProfileType } from "@/lib/types";

// Demo data
const DEMO_USER_ID = "1";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  
  const { data: profile, isLoading } = useQuery<ProfileType>({ 
    queryKey: ['/api/profile'],
    meta: { headers: { 'user-id': DEMO_USER_ID } }
  });

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Profile" />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Profile Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal information to optimize auto-filling job applications
            </p>
          </div>
          
          {/* Profile tabs */}
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="work">Work Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="custom">Custom Fields</TabsTrigger>
            </TabsList>
            
            {/* Personal Info Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        defaultValue={profile?.personalInfo.name || "John Doe"} 
                        placeholder="Full Name" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue={profile?.personalInfo.email || "john.doe@example.com"} 
                        placeholder="Email Address" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        defaultValue={profile?.personalInfo.phone || "(555) 123-4567"} 
                        placeholder="Phone Number" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        defaultValue={profile?.personalInfo.location || "San Francisco, CA"} 
                        placeholder="City, State" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currentPosition">Current Position</Label>
                      <Input 
                        id="currentPosition" 
                        defaultValue={profile?.personalInfo.currentPosition || "Software Engineer"} 
                        placeholder="Current Job Title" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input 
                        id="website" 
                        defaultValue={profile?.personalInfo.website || "https://johndoe.com"} 
                        placeholder="https://yourwebsite.com" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Summary</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="A brief summary of your professional background"
                      className="min-h-[100px]"
                      defaultValue="Experienced software engineer with expertise in full-stack development using React, Node.js, and MongoDB."
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Work Experience Tab */}
            <TabsContent value="work">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Work Experience</CardTitle>
                  <Button size="sm">Add Experience</Button>
                </CardHeader>
                <CardContent>
                  {/* Work experience items */}
                  <div className="space-y-6">
                    {(profile?.workExperience || [
                      {
                        title: "Software Engineer",
                        company: "Tech Corp",
                        location: "San Francisco, CA",
                        startDate: "2020-01",
                        endDate: "Present",
                        description: "Full-stack development with React and Node.js"
                      },
                      {
                        title: "Junior Developer",
                        company: "StartUp Inc",
                        location: "San Jose, CA",
                        startDate: "2018-05",
                        endDate: "2019-12",
                        description: "Frontend development with React"
                      }
                    ]).map((job, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{job.title}</h3>
                            <p className="text-muted-foreground">{job.company} - {job.location}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <span className="material-icons">edit</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <span className="material-icons">delete</span>
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center text-sm mb-2">
                          <span className="material-icons text-muted-foreground mr-1 text-sm">calendar_today</span>
                          <span>{job.startDate} - {job.endDate}</span>
                        </div>
                        <p className="text-sm">{job.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Education Tab */}
            <TabsContent value="education">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Education</CardTitle>
                  <Button size="sm">Add Education</Button>
                </CardHeader>
                <CardContent>
                  {/* Education items */}
                  <div className="space-y-6">
                    {(profile?.education || [
                      {
                        institution: "University of California",
                        degree: "Bachelor of Science in Computer Science",
                        startDate: "2014-09",
                        endDate: "2018-05",
                        gpa: "3.8"
                      }
                    ]).map((edu, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{edu.institution}</h3>
                            <p className="text-muted-foreground">{edu.degree}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <span className="material-icons">edit</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <span className="material-icons">delete</span>
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center text-sm mb-2">
                          <span className="material-icons text-muted-foreground mr-1 text-sm">calendar_today</span>
                          <span>{edu.startDate} - {edu.endDate}</span>
                          {edu.gpa && (
                            <>
                              <span className="mx-2">•</span>
                              <span>GPA: {edu.gpa}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {(profile?.skills || [
                        "JavaScript", "TypeScript", "React", "Node.js", "MongoDB", 
                        "Express.js", "HTML", "CSS", "Git", "REST APIs"
                      ]).map((skill, index) => (
                        <Badge key={index} className="py-1.5 px-3">
                          {skill}
                          <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0">
                            <span className="material-icons text-xs">close</span>
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input placeholder="Add a skill..." className="max-w-xs" />
                      <Button>Add</Button>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Suggested skills for your profile:</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Docker</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">AWS</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">GraphQL</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Jest</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Cypress</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Custom Fields Tab */}
            <TabsContent value="custom">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Fields</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Add custom fields for specific job platforms that aren't automatically detected
                  </p>
                  
                  {/* LinkedIn section */}
                  <div className="border border-border rounded-lg p-4 mb-6">
                    <h3 className="font-medium mb-3">LinkedIn</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="linkedin-headline">LinkedIn Headline</Label>
                          <Input 
                            id="linkedin-headline" 
                            defaultValue="Full-stack developer with 5 years of experience" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin-profile">LinkedIn Profile URL</Label>
                          <Input 
                            id="linkedin-profile" 
                            defaultValue="https://linkedin.com/in/johndoe" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin-summary">LinkedIn Summary</Label>
                        <Textarea 
                          id="linkedin-summary" 
                          className="min-h-[100px]"
                          defaultValue="Passionate about building web applications" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Indeed section */}
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Indeed</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="indeed-desired-salary">Desired Salary</Label>
                          <Input 
                            id="indeed-desired-salary" 
                            defaultValue="$120,000" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="indeed-availability">Availability</Label>
                          <Input 
                            id="indeed-availability" 
                            defaultValue="2 weeks" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button>Save Custom Fields</Button>
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
