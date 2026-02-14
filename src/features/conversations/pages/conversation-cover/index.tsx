import { useQueryClient } from "@tanstack/react-query";
import { Crown, MessageCircle, Shield, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/use-user";

import { conversationsQueryKeys } from "../../conversations.hooks";

function ConversationCover() {
  const { isAdmin } = useUser();
  const queryClient = useQueryClient();
  return (
    <div>
      <Card className="m-4 h-[97vh]">
        <CardContent className="p-0 h-full">
          <div className="flex items-center justify-center h-full bg-linear-to-br from-muted/50 to-background p-8">
            <Card className="max-w-md w-full shadow-lg border-0">
              <CardContent className="p-8 text-center space-y-8">
                {/* Animated Icon with Role Badge */}
                <div className="relative">
                  <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                    {isAdmin
                      ? (
                          <Crown className="w-10 h-10 text-primary" />
                        )
                      : (
                          <MessageCircle className="w-10 h-10 text-primary" />
                        )}
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    {isAdmin
                      ? (
                          <Shield className="w-3 h-3 text-primary-foreground" />
                        )
                      : (
                          <Users className="w-3 h-3 text-primary-foreground" />
                        )}
                  </div>
                </div>

                {/* Title Section */}
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold text-foreground">
                    Welcome to Bleep
                  </h1>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {isAdmin
                      ? "Admin can only see conversations users sent"
                      : "User can send messages to admin"}
                  </p>
                </div>

                <Separator className="my-4" />

                {/* Role-based Feature Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {isAdmin
                    ? (
                        <>

                          <button
                            className="flex items-center gap-4 p-4 bg-primary text-primary-foreground rounded-lg border border-primary/50 cursor-pointer hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 "
                            onClick={() => queryClient.invalidateQueries({ queryKey: [conversationsQueryKeys.adminConversations] })}
                          >
                            <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-medium text-primary-foreground">Click Here!</h3>
                              <p className="text-sm text-primary-foreground/80">Monitor all user interactions</p>
                            </div>
                          </button>
                        </>
                      )
                    : (
                        <>
                          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-muted/50">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <MessageCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-medium text-foreground">Send Messages</h3>
                              <p className="text-sm text-muted-foreground">Communicate with admin directly</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-muted/50">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-medium text-foreground">Secure Chat</h3>
                              <p className="text-sm text-muted-foreground">Private messaging with admin</p>
                            </div>
                          </div>
                        </>
                      )}
                </div>

                {/* Bottom Hint */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <span>
                      {isAdmin
                        ? "Select a conversation from the sidebar to view messages"
                        : "Select a conversation from the sidebar to start chatting"}
                    </span>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConversationCover;
