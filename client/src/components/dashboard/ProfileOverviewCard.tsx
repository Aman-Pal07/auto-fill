import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function ProfileOverviewCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Profile Overview</CardTitle>
        <Button variant="ghost" size="icon">
          <span className="material-icons">edit</span>
        </Button>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src="https://github.com/shadcn.png" alt="User profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">John Doe</h4>
            <p className="text-muted-foreground text-sm">Software Engineer</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground text-xs mb-1">Email</p>
            <p className="text-sm">john.doe@example.com</p>
          </div>
          
          <div>
            <p className="text-muted-foreground text-xs mb-1">Phone</p>
            <p className="text-sm">(555) 123-4567</p>
          </div>
          
          <div>
            <p className="text-muted-foreground text-xs mb-1">Location</p>
            <p className="text-sm">San Francisco, CA</p>
          </div>
          
          <div>
            <p className="text-muted-foreground text-xs mb-1">Resume</p>
            <div className="flex items-center mt-1 p-2 bg-background rounded">
              <span className="material-icons text-accent mr-2">description</span>
              <span className="text-sm truncate flex-1">John_Doe_Resume_2023.pdf</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <span className="material-icons text-sm">download</span>
              </Button>
            </div>
          </div>
          
          <div>
            <p className="text-muted-foreground text-xs mb-2">Profile Completeness</p>
            <Progress value={85} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">85% complete</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 border-t border-border">
        <Button variant="link" className="w-full">View full profile</Button>
      </CardFooter>
    </Card>
  );
}
