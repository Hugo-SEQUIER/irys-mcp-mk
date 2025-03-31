import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Stack, TextField, InputAdornment, alpha, useMediaQuery, useTheme, Theme } from '@mui/material';
import { Search, FilterList, Explore } from '@mui/icons-material';
import ServerCard from '../components/ServerCard';
import ServerFilters from '../components/ServerFilters';
import { MCPServer, MCPServerCategory, MCPServerStatus } from '../types/MCPServer';
import { mcpServerApi } from '../api/mcpServerApi';
import Layout from '../components/Layout';
import { mockMCPServers } from '../utils/mockData';

const ExploreServersPage: React.FC = () => {
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [filteredServers, setFilteredServers] = useState<MCPServer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<MCPServerCategory[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // In a real application, you would fetch the data from an API
    // Using mockData for development
    const fetchData = async () => {
      try {
        // Uncomment this when API is ready
        // const data = await mcpServerApi.getAllServers();
        const data = mockMCPServers;
        setServers(data);
        setFilteredServers(data);

        // Extract unique categories
        const allCategories = new Set<MCPServerCategory>();
        data.forEach((server: MCPServer) => {
          server.categories.forEach((category: MCPServerCategory) => {
            allCategories.add(category);
          });
        });
        setCategories(Array.from(allCategories));
      } catch (error) {
        console.error('Error fetching servers:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = servers.filter(server => 
      server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServers(results);
  }, [searchTerm, servers]);

  const handleLike = (id: string) => {
    // In a real app, you would call the API
    // mcpServerApi.likeServer(id).then(() => {
    setServers(prevServers => 
      prevServers.map(server => 
        server.id === id ? { ...server, likes: server.likes + 1 } : server
      )
    );
    // });
  };

  const handleFilter = (selectedCategories: MCPServerCategory[], status: MCPServerStatus | 'all', minRating: number) => {
    let results = servers;
    
    if (selectedCategories.length > 0) {
      results = results.filter(server => 
        selectedCategories.some(cat => server.categories.includes(cat))
      );
    }
    
    if (status && status !== 'all') {
      results = results.filter(server => server.status === status);
    }
    
    if (minRating > 0) {
      results = results.filter(server => server.likes >= minRating);
    }
    
    setFilteredServers(results);
  };

  const handleSort = (sortBy: string) => {
    const sorted = [...filteredServers];
    
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'likes':
        sorted.sort((a, b) => b.likes - a.likes);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        // No sorting
        break;
    }
    
    setFilteredServers(sorted);
  };

  return (
    <Layout>
      <Box
        sx={{
          background: (theme: Theme) => `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.6)} 0%, ${theme.palette.background.default} 100%)`,
          pt: 8,
          pb: 12,
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box 
            sx={{ 
              p: 5, 
              mb: 6, 
              textAlign: 'center',
              borderRadius: 3,
              border: '1px solid',
              borderColor: alpha('#fff', 0.1),
              bgcolor: 'background.paper',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }
            }}
          >
            <Explore 
              sx={{ 
                fontSize: 40, 
                mb: 2, 
                color: 'primary.main',
              }} 
            />
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Explore MCP Servers
            </Typography>
            <Typography 
              variant="h6"
              sx={{ 
                color: 'text.secondary',
                maxWidth: 700, 
                mx: 'auto',
                opacity: 0.8
              }}
            >
              Discover and connect with open-source Model Context Protocol servers
            </Typography>
          </Box>

          {/* Search & Filters */}
          <Box 
            sx={{ 
              mb: 6,
              p: 4, 
              borderRadius: 3,
              border: '1px solid',
              borderColor: alpha('#fff', 0.1),
              bgcolor: 'background.paper',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <TextField
                placeholder="Search servers..."
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                  maxWidth: '100%',
                  backgroundColor: alpha(theme.palette.background.default, 0.3),
                  backdropFilter: 'blur(20px)',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: alpha('#fff', 0.1),
                      borderRadius: 2,
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <FilterList 
                        color="primary" 
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          transform: showFilters ? 'rotate(180deg)' : 'rotate(0)',
                        }} 
                        onClick={() => setShowFilters(!showFilters)} 
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {showFilters && (
              <Box sx={{ mt: 3 }}>
                <Stack 
                  direction={isMobile ? "column" : "row"} 
                  spacing={2} 
                  alignItems={isMobile ? "stretch" : "center"} 
                  justifyContent="space-between"
                >
                  <ServerFilters 
                    filters={{
                      search: searchTerm,
                      categories: [],
                      status: 'all',
                      sortBy: 'likes'
                    }} 
                    onFilterChange={(filters) => {
                      if (filters.search !== undefined) {
                        setSearchTerm(filters.search);
                      }
                      if (filters.categories !== undefined) {
                        handleFilter(filters.categories, filters.status || 'all', 0);
                      }
                      if (filters.sortBy !== undefined) {
                        handleSort(filters.sortBy);
                      }
                    }} 
                  />
                </Stack>
              </Box>
            )}
          </Box>

          {/* Showing results count */}
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 3, 
              color: 'text.secondary',
              fontWeight: 500
            }}
          >
            Showing {filteredServers.length} of {servers.length} servers
          </Typography>

          {/* Server Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
            {filteredServers.map((server) => (
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
                <ServerCard server={server} onLike={handleLike} />
              </Box>
            ))}
          </Box>

          {filteredServers.length === 0 && (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 10,
                opacity: 0.7,
                border: '1px dashed',
                borderColor: alpha('#fff', 0.1),
                borderRadius: 3,
                p: 5,
                bgcolor: alpha(theme.palette.background.paper, 0.3),
              }}
            >
              <Typography variant="h5" color="text.secondary">No servers found matching your criteria</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>Try adjusting your search or filters</Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Layout>
  );
};

export default ExploreServersPage; 