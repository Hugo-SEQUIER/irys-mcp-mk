export type MCPServerCategory = 
  | 'AI' 
  | 'LLM' 
  | 'Image' 
  | 'Audio' 
  | 'Video' 
  | 'Multimodal' 
  | 'Tool-use' 
  | 'Function-calling'
  | 'Other';

export type MCPServerStatus = 'active' | 'inactive';

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl?: string;
  author: string;
  categories: MCPServerCategory[];
  status: MCPServerStatus;
  likes: number;
  downloads: number;
  usageStats: {
    totalRequests: number;
    activeUsers: number;
  };
  version: string;
  tags: string[];
  license: string;
  createdAt: string;
  updatedAt: string;
} 