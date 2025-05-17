import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function Help() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Help & Support" />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Help & Support</h1>
            <p className="text-muted-foreground mt-1">
              Find answers to common questions and learn how to use ApplicationAuto
            </p>
          </div>
          
          {/* Search bar */}
          <div className="relative mb-8">
            <Input 
              placeholder="Search for help topics..." 
              className="pl-10"
            />
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">search</span>
          </div>
          
          <Tabs defaultValue="faq">
            <TabsList className="mb-6">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="guides">User Guides</TabsTrigger>
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
            </TabsList>
            
            {/* FAQ Tab */}
            <TabsContent value="faq">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>How does the auto-fill extension work?</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">
                              The ApplicationAuto extension analyzes job application forms on various websites, detecting input fields like name, email, phone, etc. It then automatically fills these fields with your profile information stored in our secure database. You can customize which fields are filled and review them before submission.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Which job sites are supported?</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground mb-2">
                              ApplicationAuto currently supports the following job sites:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                              <li>LinkedIn</li>
                              <li>Indeed</li>
                              <li>Glassdoor</li>
                              <li>ZipRecruiter</li>
                              <li>Monster</li>
                              <li>CareerBuilder</li>
                              <li>Many company career portals</li>
                            </ul>
                            <p className="text-muted-foreground mt-2">
                              We're constantly adding support for more job sites. If you have a specific site request, please contact our support team.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Is my data secure?</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">
                              Yes, we take security seriously. Your profile data is encrypted both in transit and at rest. We use HTTPS for all communications and secure database encryption for stored data. Your information is only used for auto-filling job applications, and you can delete your data at any time.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-4">
                          <AccordionTrigger>How do I customize which fields are auto-filled?</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">
                              Go to the Extension Settings page to customize which fields are auto-filled. You can enable or disable specific fields and create custom field mappings for different job sites. You can also use the extension popup to edit field values before filling a form.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-5">
                          <AccordionTrigger>What should I do if the extension isn't detecting a form?</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">
                              If the extension isn't detecting a form, try the following:
                            </p>
                            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground mt-2">
                              <li>Refresh the page</li>
                              <li>Make sure the extension is enabled</li>
                              <li>Check if the job site is supported</li>
                              <li>For dynamic forms that load after clicking buttons, try clicking through to the actual application form</li>
                              <li>If none of these work, you can manually trigger the extension by clicking the extension icon in your browser toolbar</li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-6">
                          <AccordionTrigger>Can I use multiple resumes for different job applications?</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">
                              Yes, you can upload multiple resumes to your profile and set one as the default. Before auto-filling a form, you can select which resume to use from the extension popup. This allows you to tailor your applications for different job types.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  {/* Popular Topics */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Popular Topics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li>
                          <Button variant="link" className="p-0 h-auto">Getting Started Guide</Button>
                        </li>
                        <li>
                          <Button variant="link" className="p-0 h-auto">Troubleshooting Extension Issues</Button>
                        </li>
                        <li>
                          <Button variant="link" className="p-0 h-auto">Field Mapping Tutorial</Button>
                        </li>
                        <li>
                          <Button variant="link" className="p-0 h-auto">Managing Multiple Resumes</Button>
                        </li>
                        <li>
                          <Button variant="link" className="p-0 h-auto">Privacy & Data Security</Button>
                        </li>
                        <li>
                          <Button variant="link" className="p-0 h-auto">Upgrading Your Account</Button>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  {/* Support Options */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Need More Help?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start">
                        <span className="material-icons text-primary mr-2">email</span>
                        <div>
                          <h3 className="font-medium mb-1">Email Support</h3>
                          <p className="text-sm text-muted-foreground">support@applicationauto.com</p>
                          <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <span className="material-icons text-primary mr-2">forum</span>
                        <div>
                          <h3 className="font-medium mb-1">Community Forum</h3>
                          <p className="text-sm text-muted-foreground">Join our user community to get help from other users</p>
                          <Button variant="link" className="p-0 h-auto text-sm">Visit Forum</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <span className="material-icons text-primary mr-2">chat</span>
                        <div>
                          <h3 className="font-medium mb-1">Live Chat</h3>
                          <p className="text-sm text-muted-foreground">Available Monday-Friday, 9am-5pm PT</p>
                          <Button className="mt-2 w-full">Start Chat</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* User Guides Tab */}
            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-border">
                      <h3 className="font-medium text-lg mb-2">Getting Started Guide</h3>
                      <p className="text-sm text-muted-foreground">Learn how to set up and use ApplicationAuto effectively</p>
                    </div>
                    <div className="p-4">
                      <Button variant="link" className="p-0 h-auto">Read Guide</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-border">
                      <h3 className="font-medium text-lg mb-2">Extension Tutorial</h3>
                      <p className="text-sm text-muted-foreground">Step-by-step guide to using the browser extension</p>
                    </div>
                    <div className="p-4">
                      <Button variant="link" className="p-0 h-auto">Read Guide</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-border">
                      <h3 className="font-medium text-lg mb-2">Field Mapping Guide</h3>
                      <p className="text-sm text-muted-foreground">Learn how to customize field mappings for different sites</p>
                    </div>
                    <div className="p-4">
                      <Button variant="link" className="p-0 h-auto">Read Guide</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-border">
                      <h3 className="font-medium text-lg mb-2">Resume Management</h3>
                      <p className="text-sm text-muted-foreground">How to use multiple resumes for different job types</p>
                    </div>
                    <div className="p-4">
                      <Button variant="link" className="p-0 h-auto">Read Guide</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-border">
                      <h3 className="font-medium text-lg mb-2">Troubleshooting Guide</h3>
                      <p className="text-sm text-muted-foreground">Solutions to common issues and problems</p>
                    </div>
                    <div className="p-4">
                      <Button variant="link" className="p-0 h-auto">Read Guide</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-border">
                      <h3 className="font-medium text-lg mb-2">Advanced Features</h3>
                      <p className="text-sm text-muted-foreground">Learn about the advanced capabilities of ApplicationAuto</p>
                    </div>
                    <div className="p-4">
                      <Button variant="link" className="p-0 h-auto">Read Guide</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-border rounded-md overflow-hidden">
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <span className="material-icons text-4xl text-muted-foreground">play_circle</span>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium">Getting Started</h4>
                        <p className="text-xs text-muted-foreground mt-1">5:32</p>
                      </div>
                    </div>
                    
                    <div className="border border-border rounded-md overflow-hidden">
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <span className="material-icons text-4xl text-muted-foreground">play_circle</span>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium">Auto-filling LinkedIn</h4>
                        <p className="text-xs text-muted-foreground mt-1">4:17</p>
                      </div>
                    </div>
                    
                    <div className="border border-border rounded-md overflow-hidden">
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <span className="material-icons text-4xl text-muted-foreground">play_circle</span>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium">Custom Field Mapping</h4>
                        <p className="text-xs text-muted-foreground mt-1">7:45</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Contact Support Tab */}
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="issue-type" className="text-sm font-medium">Issue Type</label>
                        <select id="issue-type" className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground">
                          <option value="">Select an issue type</option>
                          <option value="extension">Extension Problem</option>
                          <option value="account">Account Issue</option>
                          <option value="billing">Billing Question</option>
                          <option value="feature">Feature Request</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                        <textarea 
                          id="message" 
                          className="w-full min-h-[150px] p-3 rounded-md border border-border bg-background text-foreground" 
                          placeholder="Please describe your issue in detail"
                        ></textarea>
                      </div>
                      
                      <Button className="w-full md:w-auto">Submit Support Request</Button>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-3">Support Hours</h3>
                        <p className="text-sm text-muted-foreground">
                          Our support team is available Monday through Friday, 9am to 5pm Pacific Time.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          We strive to respond to all inquiries within 24 hours.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-3">Alternative Contact Methods</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <span className="material-icons text-primary mr-2">email</span>
                            <span>support@applicationauto.com</span>
                          </div>
                          <div className="flex items-center">
                            <span className="material-icons text-primary mr-2">phone</span>
                            <span>+1 (800) 555-1234</span>
                          </div>
                          <div className="flex items-center">
                            <span className="material-icons text-primary mr-2">forum</span>
                            <Button variant="link" className="p-0 h-auto">Community Forum</Button>
                          </div>
                        </div>
                      </div>
                      
                      <Card className="bg-primary/10 border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <span className="material-icons text-primary mr-2">lightbulb</span>
                            <div>
                              <h4 className="font-medium mb-1">Pro Tip</h4>
                              <p className="text-sm">
                                For faster support, please include details such as your browser version, the job site where you experienced issues, and any error messages you received.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
