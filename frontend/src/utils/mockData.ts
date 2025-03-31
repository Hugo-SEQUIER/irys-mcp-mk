import { MCPServer } from '../types/MCPServer';

export const mockMCPServers: MCPServer[] = [
  {
    id: '1',
    name: 'Claude Pro MCP',
    description: 'A high-performance MCP server implementation compatible with Anthropic Claude models.',
    imageUrl: 'https://picsum.photos/id/1/400/300',
    githubUrl: 'https://github.com/anthropic/claude-pro-mcp',
    demoUrl: 'https://claude-pro-mcp-demo.com',
    author: 'Anthropic Research',
    categories: ['AI', 'LLM', 'Function-calling'],
    status: 'active',
    likes: 324,
    downloads: 8754,
    usageStats: {
      totalRequests: 1500000,
      activeUsers: 45000
    },
    version: '1.2.3',
    tags: ['claude', 'enterprise', 'high-performance'],
    license: 'MIT',
    createdAt: '2023-10-15T12:00:00Z',
    updatedAt: '2024-03-25T09:15:00Z'
  },
  {
    id: '2',
    name: 'OpenMCP',
    description: 'An open-source implementation of the Model Context Protocol with support for multiple LLMs.',
    imageUrl: 'https://picsum.photos/id/2/400/300',
    githubUrl: 'https://github.com/openmcp/server',
    author: 'OpenMCP Community',
    categories: ['AI', 'LLM', 'Multimodal', 'Tool-use'],
    status: 'active',
    likes: 256,
    downloads: 5432,
    usageStats: {
      totalRequests: 980000,
      activeUsers: 32000
    },
    version: '0.9.1',
    tags: ['open-source', 'multi-model', 'community'],
    license: 'Apache 2.0',
    createdAt: '2023-11-02T10:30:00Z',
    updatedAt: '2024-03-20T14:45:00Z'
  },
  {
    id: '3',
    name: 'Vision MCP',
    description: 'Specialized MCP server for computer vision and image understanding models.',
    imageUrl: 'https://picsum.photos/id/3/400/300',
    githubUrl: 'https://github.com/vision-ai/vision-mcp',
    demoUrl: 'https://vision-mcp.ai',
    author: 'Vision AI Labs',
    categories: ['AI', 'Image', 'Multimodal'],
    status: 'active',
    likes: 189,
    downloads: 3218,
    usageStats: {
      totalRequests: 750000,
      activeUsers: 28000
    },
    version: '2.1.0',
    tags: ['vision', 'images', 'multimodal'],
    license: 'BSD-3',
    createdAt: '2023-12-10T09:45:00Z',
    updatedAt: '2024-03-18T11:20:00Z'
  },
  {
    id: '4',
    name: 'Audio MCP Suite',
    description: 'Complete MCP server implementation focused on audio processing and understanding.',
    imageUrl: 'https://picsum.photos/id/4/400/300',
    githubUrl: 'https://github.com/audio-ai/audio-mcp-suite',
    author: 'Audio AI Collective',
    categories: ['AI', 'Audio'],
    status: 'inactive',
    likes: 132,
    downloads: 1876,
    usageStats: {
      totalRequests: 320000,
      activeUsers: 12000
    },
    version: '0.7.2',
    tags: ['audio', 'voice', 'speech'],
    license: 'MIT',
    createdAt: '2024-01-05T16:20:00Z',
    updatedAt: '2024-03-01T08:30:00Z'
  },
  {
    id: '5',
    name: 'Enterprise MCP',
    description: 'Secure, scalable MCP server implementation designed for enterprise deployments with advanced security features.',
    imageUrl: 'https://picsum.photos/id/5/400/300',
    githubUrl: 'https://github.com/enterprise-ai/enterprise-mcp',
    demoUrl: 'https://enterprise-mcp.com',
    author: 'Enterprise AI Solutions',
    categories: ['AI', 'LLM', 'Tool-use', 'Function-calling'],
    status: 'active',
    likes: 278,
    downloads: 6543,
    usageStats: {
      totalRequests: 2100000,
      activeUsers: 53000
    },
    version: '3.0.1',
    tags: ['enterprise', 'secure', 'scalable'],
    license: 'Commercial',
    createdAt: '2023-09-20T14:15:00Z',
    updatedAt: '2024-03-22T10:10:00Z'
  }
]; 