import { apiClient } from './apiClient';

export const fetchMessages = async (groupId: string) => {
  return apiClient(`/api/message/groups/${groupId}/allMessages`);
};
