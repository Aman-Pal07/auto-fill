import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function ExtensionInstall() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Extension Installation" />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Install ApplicationAuto Extension</h1>
            <p className="text-muted-foreground mt-1">
              Follow the steps below to install our browser extension for easy job application auto-filling
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="chrome">
                <TabsList className="mb-6">
                  <TabsTrigger value="chrome">Chrome</TabsTrigger>
                  <TabsTrigger value="firefox">Firefox</TabsTrigger>
                  <TabsTrigger value="edge">Edge</TabsTrigger>
                </TabsList>
                
                {/* Chrome Installation */}
                <TabsContent value="chrome">
                  <Card>
                    <CardHeader>
                      <CardTitle>Install on Chrome</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="font-semibold text-primary">1</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Download the extension</h3>
                            <Button>
                              <span className="material-icons mr-2 text-sm">download</span>
                              Download Extension
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="font-semibold text-primary">2</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Open Chrome Extensions page</h3>
                            <p className="text-sm text-muted-foreground mb-2">Go to Chrome menu &gt; More Tools &gt; Extensions or enter <code className="bg-muted p-1 rounded">chrome://extensions</code> in the address bar.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="font-semibold text-primary">3</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Enable Developer Mode</h3>
                            <p className="text-sm text-muted-foreground mb-2">Toggle on "Developer mode" in the top-right corner of the Extensions page.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="font-semibold text-primary">4</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Load unpacked extension</h3>
                            <p className="text-sm text-muted-foreground mb-2">Click "Load unpacked" button, then select the extracted extension folder.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="font-semibold text-primary">5</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Pin the extension</h3>
                            <p className="text-sm text-muted-foreground mb-2">Click the puzzle icon in the Chrome toolbar and pin ApplicationAuto for easy access.</p>
                          </div>
                        </div>
                      </div>
                      
                      <Alert>
                        <span className="material-icons mr-2">info</span>
                        <AlertTitle>Coming Soon to Chrome Web Store</AlertTitle>
                        <AlertDescription>
                          We're in the process of publishing ApplicationAuto to the Chrome Web Store for easier installation. Stay tuned!
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Firefox Installation */}
                <TabsContent value="firefox">
                  <Card>
                    <CardHeader>
                      <CardTitle>Install on Firefox</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="font-semibold text-primary">1</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Download the extension</h3>
                            <Button>
                              <span className="material-icons mr-2 text-sm">download</span>
                              Download Extension
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="font-semibold text-primary">2</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Open Firefox Debugging page</h3>
                            <p className="text-sm text-muted-foreground mb-2">Enter <code className="bg-muted p-1 rounded">about:debugging#/runtime/this-firefox</code> in the address bar.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="font-semibold text-primary">3</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Load Temporary Add-on</h3>
                            <p className="text-sm text-muted-foreground mb-2">Click "Load Temporary Add-on" button, then select the manifest.json file from the extracted extension folder.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="font-semibold text-primary">4</span>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Access the extension</h3>
                            <p className="text-sm text-muted-foreground mb-2">Click the extension icon in the Firefox toolbar to use ApplicationAuto.</p>
                          </div>
                        </div>
                      </div>
                      
                      <Alert>
                        <span className="material-icons mr-2">info</span>
                        <AlertTitle>Coming Soon to Firefox Add-ons</AlertTitle>
                        <AlertDescription>
                          We're in the process of publishing ApplicationAuto to the Firefox Add-ons store for easier installation. Stay tuned!
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Edge Installation */}
                <TabsContent value="edge">
                  <Card>
                    <CardHeader>
                      <CardTitle>Install on Edge</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Microsoft Edge supports Chrome extensions. Follow the Chrome installation instructions.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              {/* Extension Benefits */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="material-icons text-primary mr-2 text-sm">check_circle</span>
                      <span>Auto-fill job applications in seconds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-icons text-primary mr-2 text-sm">check_circle</span>
                      <span>Works on LinkedIn, Indeed, and more</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-icons text-primary mr-2 text-sm">check_circle</span>
                      <span>Customizable for different job types</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-icons text-primary mr-2 text-sm">check_circle</span>
                      <span>Track your application history</span>
                    </li>
                    <li className="flex items-start">
                      <span className="material-icons text-primary mr-2 text-sm">check_circle</span>
                      <span>Save hours of repetitive form filling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Extension Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Extension Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Version</p>
                      <p>1.2.5</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p>July 15, 2023</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Users</p>
                      <p>5,000+</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Compatible with</p>
                      <p>Chrome, Firefox, Edge, Brave</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Troubleshooting Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Extension not working?</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Make sure you're logged into the ApplicationAuto website</li>
                    <li>Try refreshing the job application page</li>
                    <li>Check if the extension is enabled in your browser</li>
                    <li>Ensure you have the latest version installed</li>
                    <li>Clear your browser cache and restart the browser</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Need more help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Visit our <Button variant="link" className="p-0 h-auto">Help Center</Button> or <Button variant="link" className="p-0 h-auto">contact support</Button> for assistance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
