import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ExtensionField } from "@/lib/types";

export default function ExtensionPreview() {
  const [isVisible, setIsVisible] = useState(true);
  
  const fields: ExtensionField[] = [
    { id: "name", label: "Full Name", value: "John Doe", icon: "badge" },
    { id: "email", label: "Email", value: "john.doe@example.com", icon: "email" },
    { id: "phone", label: "Phone", value: "(555) 123-4567", icon: "phone" },
    { id: "location", label: "Location", value: "San Francisco, CA", icon: "location_on" },
    { id: "position", label: "Current Position", value: "Software Engineer", icon: "work" },
    { id: "resume", label: "Resume", value: "John_Doe_Resume_2023.pdf", icon: "description" }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 shadow-2xl rounded-lg z-50" style={{ width: "330px", height: "450px" }}>
      <Card className="w-full h-full flex flex-col overflow-hidden">
        {/* Extension Popup Header */}
        <div className="p-3 bg-primary/10 border-b border-border flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-6 w-6 bg-primary rounded flex items-center justify-center mr-2">
              <span className="material-icons text-white text-xs">bolt</span>
            </div>
            <h3 className="font-medium text-sm">ApplicationAuto</h3>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-7 w-7 p-0">
              <span className="material-icons text-sm">settings</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 p-0 ml-1"
              onClick={() => setIsVisible(false)}
            >
              <span className="material-icons text-sm">close</span>
            </Button>
          </div>
        </div>
        
        {/* Extension Popup Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-sm">Active Form Detected</p>
              <Badge variant="outline" className="bg-success/20 text-success border-0">LinkedIn</Badge>
            </div>
            <p className="text-muted-foreground text-xs">Software Engineer Application</p>
          </div>
          
          <div className="p-3">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-medium">Form Fields</p>
              <Button variant="link" size="sm" className="text-primary p-0 h-auto">Auto-fill All</Button>
            </div>
            
            <div className="space-y-3">
              {fields.map(field => (
                <div key={field.id} className="p-2 bg-background rounded flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons text-muted-foreground text-sm mr-2">{field.icon}</span>
                    <div>
                      <p className="text-xs">{field.label}</p>
                      <p className="text-xs text-muted-foreground">{field.value}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <span className="material-icons text-sm">edit</span>
                  </Button>
                </div>
              ))}
            </div>
            
            <Button variant="secondary" className="mt-4 w-full text-xs">
              Show more fields (8)
            </Button>
          </div>
        </div>
        
        {/* Extension Popup Footer */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="material-icons text-muted-foreground text-sm mr-1.5">extension</span>
              <p className="text-xs">Auto-fill enabled</p>
            </div>
            <Switch id="auto-fill-enabled" checked />
          </div>
          
          <Button className="w-full">
            Fill Form Now
          </Button>
        </div>
      </Card>
    </div>
  );
}
