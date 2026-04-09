import api from "../api";
import UserService from "../UserService";

jest.mock("../api", () => ({
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
}));

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserProfile", () => {
    it("should call GET /users/profile", async () => {
      const mockResponse = {
        data: { id: 1, username: "testuser", email: "test@example.com" },
      };
      api.get.mockResolvedValue(mockResponse);

      await UserService.getUserProfile();

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith("/users/profile");
    });

    it("should return user profile data on successful fetch", async () => {
      const mockUser = {
        id: 1,
        username: "testuser",
        email: "test@example.com",
      };
      const mockResponse = { data: mockUser };
      api.get.mockResolvedValue(mockResponse);

      const result = await UserService.getUserProfile();

      expect(result).toEqual(mockUser);
    });

    it("should throw an error on profile fetch failure", async () => {
      const errorMessage = "Failed to fetch profile";
      api.get.mockRejectedValue(new Error(errorMessage));

      await expect(UserService.getUserProfile()).rejects.toThrow(errorMessage);
    });
  });

  describe("updateUserProfile", () => {
    it("should call PUT /users/profile with correct data", async () => {
      const profileData = { firstName: "John", lastName: "Doe" };
      const mockResponse = { data: { id: 1, ...profileData } };
      api.put.mockResolvedValue(mockResponse);

      await UserService.updateUserProfile(profileData);

      expect(api.put).toHaveBeenCalledTimes(1);
      expect(api.put).toHaveBeenCalledWith("/users/profile", profileData);
    });

    it("should return updated user profile on success", async () => {
      const profileData = { firstName: "Jane" };
      const mockResponse = {
        data: { id: 1, email: "test@example.com", ...profileData },
      };
      api.put.mockResolvedValue(mockResponse);

      const result = await UserService.updateUserProfile(profileData);

      expect(result).toEqual(mockResponse.data);
    });

    it("should throw an error on update failure", async () => {
      const errorMessage = "Failed to update profile";
      api.put.mockRejectedValue(new Error(errorMessage));

      await expect(
        UserService.updateUserProfile({ firstName: "Jane" }),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("getTransactionHistory", () => {
    it("should call GET /users/transactions", async () => {
      const mockResponse = { data: { transactions: [] } };
      api.get.mockResolvedValue(mockResponse);

      await UserService.getTransactionHistory();

      expect(api.get).toHaveBeenCalledWith("/users/transactions", {
        params: undefined,
      });
    });

    it("should pass params when provided", async () => {
      const params = { page: 1, limit: 10 };
      const mockResponse = { data: { transactions: [] } };
      api.get.mockResolvedValue(mockResponse);

      await UserService.getTransactionHistory(params);

      expect(api.get).toHaveBeenCalledWith("/users/transactions", { params });
    });

    it("should return transaction history on success", async () => {
      const mockTxs = [{ id: "tx1", amount: 100 }];
      const mockResponse = { data: { transactions: mockTxs } };
      api.get.mockResolvedValue(mockResponse);

      const result = await UserService.getTransactionHistory();

      expect(result).toEqual(mockResponse.data);
    });

    it("should throw an error on failure", async () => {
      api.get.mockRejectedValue(new Error("Unauthorized"));

      await expect(UserService.getTransactionHistory()).rejects.toThrow(
        "Unauthorized",
      );
    });
  });
});
