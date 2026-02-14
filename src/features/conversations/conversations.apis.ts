// Paths
import { getApiInstanceForJSON } from "@/api/interceptors";
import { ApiUtils } from "@/utils/api";

// =========================================
// Paths
// =========================================
const adminConversations = "/conversations/admin";
const userConversations = "/conversations/user";
const messages = "/messages";

export const conversationApiPaths = {
  adminConversations,
  userConversations,
  messages,
};

// =========================================
// API Functions
// =========================================

async function getAdminConversations() {
  const response = await getApiInstanceForJSON().get(conversationApiPaths.adminConversations);
  return response;
}

async function getUserConversations() {
  const response = await getApiInstanceForJSON().get(conversationApiPaths.userConversations);
  return response;
}

async function getConversationDetails(conversationId: string | number, queryObj: any) {
  const param = ApiUtils.queryMaker(queryObj);
  const response = await getApiInstanceForJSON().get(`${conversationApiPaths.messages}/${conversationId}${param}`);
  return response;
}

async function createMessage(payloadObj: any) {
  const response = await getApiInstanceForJSON().post(`${conversationApiPaths.messages}`, payloadObj);
  return response;
}

async function getTest() {
  return await getApiInstanceForJSON().get("/test");
}

export const ConversationApis = {
  getAdminConversations,
  getUserConversations,
  getTest,
  getConversationDetails,

  createMessage,
};
