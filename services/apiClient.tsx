export const apiClient = async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
  
      if (!response.ok || data.response !== 'success') {
        throw new Error(data.message || 'API request failed');
      }
  
      return data.data;
    } catch (error) {
      console.error(`API error at ${url}:`, error);
      throw error; 
    }
  };
  