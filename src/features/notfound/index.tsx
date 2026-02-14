import { Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConversationRoutes } from "@/features/conversations/conversation.routes";

function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-muted/50 to-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg border-0">
        <CardContent className="p-8 text-center space-y-6">
          {/* 404 Animation */}
          <div className="relative">
            <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-4xl font-bold text-primary">404</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center animate-bounce">
              <Search className="w-4 h-4 text-destructive-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to={ConversationRoutes.paths.cover}>
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Link>
            </Button>

            <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
              <Search className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Check the URL for typos</p>
            <p>• Return to the dashboard</p>
            <p>• Contact support if the problem persists</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default NotFound;
