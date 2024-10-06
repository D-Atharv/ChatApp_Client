export async function fetchGroups() {
    const response = await fetch('/api/group/allGroups', {
        next: { revalidate: 60 }
    });
    const data = await response.json();

    if (!response.ok || data.response !== 'success') {
        throw new Error(data.message || 'Failed to retrieve groups');
    }

    return data.data;
}