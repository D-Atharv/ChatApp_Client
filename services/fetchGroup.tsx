import { apiClient } from './apiClient';

export const fetchGroups = async () => {
  return apiClient('/api/group/allGroups', {
    next: { revalidate: 60 }, 
  });
};

export const addUserToGroup = async (email: string) => {
  return apiClient('/api/group/createGroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ otherUserEmail: email }),
  });
};
