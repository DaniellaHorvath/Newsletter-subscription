const { dataService } = require("./data");

describe("dataService", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should fetch fetchTopics and return data successfully", async () => {
    const mockData = {
      title: "Topics",
      choices: [{ title: "Topic 1" }, { title: "Topic 2" }],
    };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await dataService.fetchTopics();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("data/topics.json");
    expect(data).toEqual(mockData);
  });

  it("should fetch fetchNewsletters and return data successfully", async () => {
    const mockData = {
      title: "Newsletters",
      choices: [{ title: "Newsletter 1" }, { title: "Newsletter 2" }],
    };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await dataService.fetchNewsletters();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("data/newsletters.json");
    expect(data).toEqual(mockData);
  });

  it("returns null on network error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network failure"));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const data = await dataService.fetchTopics();

    expect(data).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
  });
});
