import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bot, ChevronUp, Loader, Loader2, Send, User } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

import { ConversationApis } from "../../conversations.apis";
import { conversationsQueryKeys } from "../../conversations.hooks";
import ConversationLoader from "./conversation-loader";

type ChatFormTypes = {
  message: string;
};

const CHAT_FORM_DEFAULT_VALUES: ChatFormTypes = {
  message: "",
};

function ConnectionStatusBadge({ status }: { status: any }) {
  const config: any = {
    connected: { color: "bg-green-500", text: "Connected", icon: "🟢" },
    reconnecting: { color: "bg-yellow-500", text: "Reconnecting", icon: "🟡" },
    disconnected: { color: "bg-red-500", text: "Disconnected", icon: "🔴" },
  };

  const current = config[status];

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border w-33">
      <span className={cn("w-2 h-2 rounded-full animate-pulse", current.color)} />
      <span className="text-xs font-medium">{current.text}</span>
    </div>
  );
}

function ConversationDetails() {
  const { id } = useParams();

  const { user, isAdmin } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(true);
  const queryClient = useQueryClient();

  const form = useForm<ChatFormTypes>({ defaultValues: CHAT_FORM_DEFAULT_VALUES });

  const message = useWatch({
    control: form.control,
    name: "message",
  });

  const showTheMessageEnd = () => {
    if (messagesEndRef.current) {
      // 1. Find the internal viewport created by Radix
      const viewport = messagesEndRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      ) as HTMLElement;

      if (viewport) {
        // 2. Scroll to the maximum possible height
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  const adminConversationQuery = useQuery({
    queryKey: [conversationsQueryKeys.adminConversations],
    queryFn: () => ConversationApis.getAdminConversations(),
    enabled: isAdmin,
  });

  const userConversationQuery = useQuery({
    queryKey: [conversationsQueryKeys.userConversations],
    queryFn: () => ConversationApis.getUserConversations(),
    enabled: !isAdmin,
  });

  const createMessageMutation = useMutation({
    mutationFn: (payload: any) => ConversationApis.createMessage(payload),
    onSuccess: async (response) => {
      if (response?.data?.success) {
        queryClient.invalidateQueries({ queryKey: [conversationsQueryKeys.conversationDetails, { id }] });
        queryClient.invalidateQueries({ queryKey: [conversationsQueryKeys.adminConversations] });
        setIsScrollable(true);
        form.reset();
      }
    },
  });

  // 1. Using Infinite Query to support the "Load More" functionality
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [conversationsQueryKeys.conversationDetails, { id }],
    queryFn: ({ pageParam = 1 }) =>
      ConversationApis.getConversationDetails(id!, { page: pageParam }),
    enabled: !!id,
    getNextPageParam: (lastPage: any) => {
      const meta = lastPage?.data?.details?.pagination;
      return meta?.hasNextPage ? meta.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // 2. Format data for traditional scroll
  // We reverse the page order so older messages (Page 2, 3...) appear at the top
  // But keep message order within each page intact for proper chronological flow
  const allMessages = useMemo(() => {
    const pages = data?.pages || [];
    // Reverse pages: Page 2, Page 1 (oldest to newest)
    // But keep messages within each page in their original order
    return [...pages].reverse().flatMap((page: any) => page?.data?.details?.messages || []);
  }, [data]);
    // 3. Scroll to bottom on initial load

  useEffect(() => {
    // console.log(allMessages.length);
    // if (allMessages.length > 20)
    //     return;
    if (messagesEndRef.current && allMessages.length > 0 && isScrollable) {
      showTheMessageEnd();
    }
  }, [allMessages, isScrollable]);

  // 4. Handle manual load more
  const handleLoadMore = () => {
    setIsScrollable(false);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const onSubmit = async (formData: ChatFormTypes) => {
    // Find the current conversation from the query cache
    const query = isAdmin ? adminConversationQuery : userConversationQuery;
    const currentConversation = query.data?.data?.details?.find(
      (conv: any) => conv._id === id,
    );

    if (currentConversation) {
      const payload = {
        message: formData.message,
        senderId: isAdmin ? currentConversation.adminId : currentConversation.userId._id,
        receiverId: isAdmin ? currentConversation.userId._id : currentConversation.adminId._id,
        conversationId: currentConversation._id,
      };

      createMessageMutation.mutate(payload);
    }
    else {
      toast.error("Conversation not found!");
    }
  };

  const { connectionStatus } = useChatSocket(id!);

  if (isLoading || adminConversationQuery.isLoading) {
    return (
      <ConversationLoader />
    );
  }

  return (
    <div>
      <Card className="m-4 h-[97vh]">
        <CardContent className="p-0 h-full">
          <ScrollArea className="h-[85%]" ref={messagesEndRef}>
            {/* Load More Section */}
            <div className="sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-10 p-4 border-b">

              <ConnectionStatusBadge status={connectionStatus} />
              {isFetchingNextPage
                ? (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Loading older messages...</span>
                    </div>
                  )
                : hasNextPage
                  ? (
                      <div className="flex justify-center">
                        <Button
                          onClick={handleLoadMore}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <ChevronUp className="w-4 h-4" />
                          Load More Messages
                        </Button>
                      </div>
                    )
                  : (
                      <div className="text-center">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Beginning of History</span>
                      </div>
                    )}
            </div>

            {/* Messages */}
            <div className="p-4 space-y-4">
              {allMessages.map((message: any, index: number) => {
                const isMe = message.senderId === user.id;
                const showDateSeparator = index === 0
                  || new Date(message.createdAt).toDateString() !== new Date(allMessages[index - 1]?.createdAt).toDateString();

                return (
                  <div key={message._id}>
                    {/* Date Separator */}
                    {showDateSeparator && (
                      <div className="flex items-center gap-4 my-4">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground uppercase">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                        <Separator className="flex-1" />
                      </div>
                    )}

                    {/* Message */}
                    <div className={cn(
                      "flex gap-3",
                      isMe ? "justify-end" : "justify-start",
                    )}
                    >
                      {!isMe && (
                        <Avatar className="w-8 h-8 mt-1">
                          <AvatarFallback className="text-xs">
                            <Bot size={14} />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-3 shadow-sm",
                        isMe
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted rounded-bl-sm",
                      )}
                      >
                        <p className="text-sm leading-relaxed">{message.message}</p>
                        <p className={cn(
                          "text-xs mt-1 opacity-70",
                          isMe ? "text-right" : "text-left",
                        )}
                        >
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      {isMe && (
                        <Avatar className="w-8 h-8 mt-1">
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            <User size={14} />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </ScrollArea>

          <Form {...form}>
            <form className="px-10" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="message"

                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bleep Chat</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput

                          placeholder="Write a comment..."
                          {...field}
                          style={{ overflow: "hidden" }}
                          disabled={createMessageMutation.isPending || connectionStatus === "disconnected"}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText>
                            {message.length}
                            /280
                          </InputGroupText>
                          <InputGroupButton
                            variant="default"
                            size="sm"
                            className="ml-auto"
                            type="submit"
                            disabled={createMessageMutation.isPending || connectionStatus === "disconnected"}
                          >
                            {createMessageMutation.isPending && <Loader className="animate-spin" />}
                            {" "}
                            <Send />
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConversationDetails;
