export const updateUser = async (name: string, image: File | null, newPassword: string) => {
    if (image) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('newPassword', newPassword);
  
      const response = await fetch('/api/user/updateUser', {
        method: 'PATCH',
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      return response.json();
    } else {
      const response = await fetch('/api/user/updateUser', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, image: null, newPassword }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      return response.json();
    }
  };
  