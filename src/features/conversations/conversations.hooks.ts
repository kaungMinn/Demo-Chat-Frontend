import { useQuery } from "@tanstack/react-query";

import { getApiInstanceForJSON } from "@/api/interceptors";

import { ConversationApis } from "./conversations.apis";

// =====================================================
// Query Keys
// =====================================================
const adminConversations = "admin-conversations";
const userConversations = "user-conversations";
const conversationDetails = "conversation-details";

export const conversationsQueryKeys = {
  adminConversations,
  userConversations,
  conversationDetails,
};

// =====================================================
// Queries
// =====================================================

function getAdminConversations() {
  return useQuery({
    queryKey: [conversationsQueryKeys.adminConversations],
    queryFn: () => ConversationApis.getAdminConversations(),
    select: apiResponse => apiResponse?.data?.details,
  });
}

export function getTest() {
  return useQuery({
    queryKey: ["Test"],
    queryFn: async () => await getApiInstanceForJSON().get("/test"),
    select: apiResponse => apiResponse?.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

// =====================================================
// Export Hooks
// =====================================================

export const useConversations = {
  queryKeys: conversationsQueryKeys,
  queriesAndMutations: {
    getAdminConversations,
    getTest,
  },

};
