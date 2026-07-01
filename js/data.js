export const dataService = {
  async fetchTopics() {
    try {
      const response = await fetch("data/topics.json"); // (Preview fallback)
      if (!response.ok) throw new Error("Network error");
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch topics:", error);
      return null;
    }
  },
  async fetchNewsletters() {
    try {
      const response = await fetch("data/newsletters.json"); // (Preview fallback)
      if (!response.ok) throw new Error("Network error");
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch newsletters:", error);
      return null;
    }
  },
};
