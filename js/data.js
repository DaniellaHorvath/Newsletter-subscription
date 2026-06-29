// FETCH data from the the data folder 
const dataServic = {
    async fetchTopics() {
        try {
            const response = await fetch('data/topics.json');
            console.log('Response from fetchTopics:', response);
            if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
         } catch (error) {
            console.error('Error fetching topics:', error);
            throw error; 
         }
    },
    async fetchNewsletters() {
        try {
            const response = await fetch('data/newsletters.json');
            console.log('Response from fetchNewsletters:', response);
            if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
         } catch (error) {
            console.error('Error fetching newsletters:', error);
            throw error; 
        }
    },
};