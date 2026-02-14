import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { ACCESS_TOKEN } from "@/constants/storage";
import { conversationsQueryKeys } from "@/features/conversations/conversations.hooks";
import { getCookie } from "@/utils/storage";

// Define our three states
export type ConnectionStatus = "connected" | "reconnecting" | "disconnected";

export function useChatSocket(id: string | undefined) {
  const queryClient = useQueryClient();

  // State for Task 3
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!id)
      return;

    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:4000", {
      reconnectionAttempts: 10, // Try 10 times before giving up
      reconnectionDelay: 2000, // Wait 2 seconds between tries
    });

    // --- Task 3: Connection State Logic ---
    socket.on("connect", () => {
      setConnectionStatus("connected");
      console.log("🟢 Connected");

      // Update chat history without refresh
      queryClient.invalidateQueries({
        queryKey: [conversationsQueryKeys.conversationDetails, { id }],
      });
      // Update sidebar preview
      queryClient.invalidateQueries({ queryKey: [conversationsQueryKeys.adminConversations] });
      queryClient.invalidateQueries({ queryKey: [conversationsQueryKeys.userConversations] });

      const token = getCookie(ACCESS_TOKEN);
      socket.emit("authenticate", token);
      socket.emit("join_conversation", id);
    });

    socket.on("reconnecting", (attempt) => {
      setConnectionStatus("reconnecting");
      console.log(`🟡 Reconnecting... Attempt: ${attempt}`);
    });

    socket.on("disconnect", (reason) => {
      // If the reason is "io server disconnect", the server kicked us.
      // Otherwise, it's likely a network drop.
      setConnectionStatus("disconnected");
      console.log("🔴 Disconnected:", reason);
    });

    socket.on("connect_error", () => {
      setConnectionStatus("disconnected");
    });

    // --- Task 1 & 2: Real-time & History Logic ---
    const handleNewMessage = () => {
      // Update chat history without refresh
      queryClient.invalidateQueries({
        queryKey: [conversationsQueryKeys.conversationDetails, { id }],
      });
      // Update sidebar preview
      queryClient.invalidateQueries({ queryKey: [conversationsQueryKeys.adminConversations] });
      queryClient.invalidateQueries({ queryKey: [conversationsQueryKeys.userConversations] });
    };

    socket.on("new_message", handleNewMessage);
    socket.on("get_online_users", users => setOnlineUsers(users));

    return () => {
      socket.off("connect");
      socket.off("reconnecting");
      socket.off("disconnect");
      socket.off("new_message", handleNewMessage);
      socket.disconnect();
    };
  }, [id, queryClient]);

  return { connectionStatus, onlineUsers };
}
