import axios from 'axios';
import { MCPServer } from '../types/MCPServer';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const mcpServerApi = {
  getAllServers: async (): Promise<MCPServer[]> => {
    const response = await axios.get(`${API_URL}/servers`);
    return response.data;
  },

  getServerById: async (id: string): Promise<MCPServer> => {
    const response = await axios.get(`${API_URL}/servers/${id}`);
    return response.data;
  },

  createServer: async (serverData: Omit<MCPServer, 'id' | 'likes' | 'usageStats' | 'createdAt' | 'updatedAt'>): Promise<MCPServer> => {
    const response = await axios.post(`${API_URL}/servers`, serverData);
    return response.data;
  },

  updateServer: async (id: string, serverData: Partial<MCPServer>): Promise<MCPServer> => {
    const response = await axios.put(`${API_URL}/servers/${id}`, serverData);
    return response.data;
  },

  likeServer: async (id: string): Promise<MCPServer> => {
    const response = await axios.post(`${API_URL}/servers/${id}/like`);
    return response.data;
  },

  deleteServer: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/servers/${id}`);
  }
}; 