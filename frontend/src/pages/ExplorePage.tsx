import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Stack, Pagination, Alert, CircularProgress } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';
import ServerCard from '../components/ServerCard';
import ServerFilters from '../components/ServerFilters';
import { mcpServerApi } from '../api/mcpServerApi';
import { MCPServer, MCPServerCategory, MCPServerStatus } from '../types/MCPServer';
import { mockMCPServers } from '../utils/mockData';

interface FilterOptions {
  search: string;
  categories: MCPServerCategory[];
  status: MCPServerStatus | 'all';
  sortBy: 'likes' | 'newest' | 'mostUsed' | 'recentlyUpdated';
}

const ExplorePage: React.FC = () => {
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [filteredServers, setFilteredServers] = useState<MCPServer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    categories: [],
    status: 'all',
    sortBy: 'likes'
  });
  
  const serversPerPage = 9;

  useEffect(() => {
    const fetchServers = async () => {
      try {
        setIsLoading(true);
        // In a real application, we would use the API
        // const data = await mcpServerApi.getAllServers();
        
        // Using mock data for now
        setServers(mockMCPServers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching servers:', error);
        setError('Failed to load MCP servers. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchServers();
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...servers];
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(server => 
        server.name.toLowerCase().includes(searchLower) || 
        server.description.toLowerCase().includes(searchLower) ||
        server.author.toLowerCase().includes(searchLower) ||
        server.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter(server => 
        filters.categories.some(category => server.categories.includes(category))
      );
    }
    
    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(server => server.status === filters.status);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'likes':
        result.sort((a, b) => b.likes - a.likes);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'mostUsed':
        result.sort((a, b) => b.usageStats.totalRequests - a.usageStats.totalRequests);
        break;
      case 'recentlyUpdated':
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      default:
        break;
    }
    
    setFilteredServers(result);
    setPage(1); // Reset to first page when filters change
  }, [servers, filters]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleLike = async (id: string) => {
    try {
      // In a real app, we would use the API
      // await mcpServerApi.likeServer(id);
      
      // Update local state
      setServers(prev => 
        prev.map(server => server.id === id ? { ...server, likes: server.likes + 1 } : server)
      );
    } catch (error) {
      console.error('Error liking server:', error);
    }
  };

  // Calculate pagination
  const startIndex = (page - 1) * serversPerPage;
  const endIndex = startIndex + serversPerPage;
  const paginatedServers = filteredServers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredServers.length / serversPerPage);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Paper 
        elevation={2}
        sx={{ 
          p: 4, 
          mb: 4, 
          textAlign: 'center',
          background: 'linear-gradient(45deg, #283593 30%, #1a237e 90%)',
          color: 'white',
          borderRadius: 2
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Explore MCP Servers
        </Typography>
        <Typography variant="h6">
          Discover and connect with open-source Model Context Protocol servers
        </Typography>
      </Paper>
      
      {/* Filters */}
      <ServerFilters filters={filters} onFilterChange={handleFilterChange} />
      
      {/* Server List */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 4 }}>{error}</Alert>
      ) : paginatedServers.length > 0 ? (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredServers.length)} of {filteredServers.length} servers
            </Typography>
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
            {paginatedServers.map(server => (
              <Box 
                key={server.id} 
                sx={{ 
                  gridColumn: {
                    xs: 'span 12',
                    sm: 'span 6',
                    md: 'span 6',
                    lg: 'span 4'
                  },
                  animationName: 'fadeIn',
                  animationDuration: '0.5s'
                }}
              >
                <ServerCard key={server.id} server={server} onLike={handleLike} />
              </Box>
            ))}
          </Box>
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      ) : (
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <RocketLaunch sx={{ fontSize: 60, color: '#9e9e9e', mb: 2 }} />
          <Typography variant="h5" gutterBottom>No servers found</Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your filters or search terms to find MCP servers.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default ExplorePage; 