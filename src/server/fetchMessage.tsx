export async function fetchMessages(groupId: string) {
    const response = await fetch(`api/message/groups/${groupId}/allMessages`);
    const data = await response.json();

    if (!response.ok || data.response !== 'success') {
        throw new Error(data.message || 'Failed to retrieve messages');
    }

    return data.data;
}
