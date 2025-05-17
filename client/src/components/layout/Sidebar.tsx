import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  href: string;
  icon: string;
  label: string;
  active: boolean;
}

const SidebarLink = ({ href, icon, label, active }: SidebarLinkProps) => {
  return (
    <li className="mb-1">
      <Link href={href}>
        <a
          className={cn(
            "px-4 py-2 rounded-md flex items-center hover:bg-primary/20 hover:text-foreground transition-colors",
            active
              ? "text-foreground bg-primary/20"
              : "text-muted-foreground"
          )}
        >
          <span className="material-icons mr-3 text-sm">{icon}</span>
          {label}
        </a>
      </Link>
    </li>
  );
};

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border hidden md:block">
      <div className="p-4 border-b border-border flex items-center">
        <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center mr-3">
          <span className="material-icons text-white text-sm">bolt</span>
        </div>
        <h1 className="text-xl font-semibold">ApplicationAuto</h1>
      </div>
      
      <nav className="p-2">
        <div className="mb-4">
          <p className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground">Main</p>
          <ul>
            <SidebarLink
              href="/"
              icon="dashboard"
              label="Dashboard"
              active={location === "/"}
            />
            <SidebarLink
              href="/profile"
              icon="person"
              label="Profile"
              active={location === "/profile"}
            />
            <SidebarLink
              href="/resumes"
              icon="description"
              label="Resumes"
              active={location === "/resumes"}
            />
            <SidebarLink
              href="/form-history"
              icon="history"
              label="Form History"
              active={location === "/form-history"}
            />
          </ul>
        </div>
        
        <div className="mb-4">
          <p className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground">Extension</p>
          <ul>
            <SidebarLink
              href="/extension/install"
              icon="extension"
              label="Installation"
              active={location === "/extension/install"}
            />
            <SidebarLink
              href="/extension/settings"
              icon="settings"
              label="Settings"
              active={location === "/extension/settings"}
            />
          </ul>
        </div>
        
        <div>
          <p className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground">Account</p>
          <ul>
            <SidebarLink
              href="/help"
              icon="help_outline"
              label="Help"
              active={location === "/help"}
            />
            <li className="mb-1">
              <a 
                href="#" 
                className="px-4 py-2 rounded-md flex items-center text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle logout here
                }}
              >
                <span className="material-icons mr-3 text-sm">logout</span>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
