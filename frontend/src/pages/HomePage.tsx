import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Button,
  Stack, 
  Paper, 
  alpha
} from '@mui/material';
import { Explore, Add } from '@mui/icons-material';
import ServerCard from '../components/ServerCard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mcpServerApi } from '../api/mcpServerApi';
import { MCPServer } from '../types/MCPServer';
import { mockMCPServers } from '../utils/mockData';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
  const [popularServers, setPopularServers] = useState<MCPServer[]>([]);
  const [recentServers, setRecentServers] = useState<MCPServer[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, we would use the API to get this data
        // const data = await mcpServerApi.getAllServers();
        
        // Using mock data for now
        const sortedByLikes = [...mockMCPServers].sort((a, b) => b.likes - a.likes).slice(0, 3);
        const sortedByDate = [...mockMCPServers].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ).slice(0, 3);
        
        setPopularServers(sortedByLikes);
        setRecentServers(sortedByDate);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching servers:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLike = async (id: string) => {
    try {
      // In a real app, we would use the API to like a server
      // await mcpServerApi.likeServer(id);
      
      // Update local state for now
      setPopularServers(prev => 
        prev.map(server => server.id === id ? { ...server, likes: server.likes + 1 } : server)
      );
      setRecentServers(prev => 
        prev.map(server => server.id === id ? { ...server, likes: server.likes + 1 } : server)
      );
    } catch (error) {
      console.error('Error liking server:', error);
    }
  };

  return (
    <Layout>
      <Box sx={{ 
        background: `linear-gradient(180deg, #121212 0%, #1a1a1a 100%)`, 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Background decoration */}
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '100%', 
          opacity: 0.05, 
          background: `radial-gradient(circle at 20% 30%, #00f8e0 0%, transparent 50%)`,
          zIndex: 0
        }} />

        <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
          {/* Hero Section */}
          <Box sx={{ 
            textAlign: 'center',
            mb: 12, 
            pt: 4,
          }}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{ 
                color: 'white',
                fontSize: { xs: '3rem', md: '4.5rem' },
                lineHeight: 1.1,
                mb: 2,
                textTransform: 'uppercase'
              }}
            >
              <Box component="span" sx={{ display: 'block' }}>MCP SERVER</Box>
              <Box component="span" sx={{ display: 'block' }}>MARKETPLACE</Box>
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#00f8e0', 
                mb: 5, 
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}
            >
              DISCOVER AND REGISTER MCP SERVERS
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              sx={{ 
                mt: 4,
                justifyContent: 'center'
              }}
            >
              <Button 
                component={Link} 
                to="/explore" 
                variant="contained" 
                size="large" 
                startIcon={<Explore />}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  minWidth: 240
                }}
              >
                Explore MCP Servers
              </Button>
              
              <Button 
                component={Link} 
                to="/register" 
                variant="outlined" 
                size="large" 
                startIcon={<Add />}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderColor: 'primary.main',
                  minWidth: 240
                }}
              >
                Register MCP Server
              </Button>
            </Stack>
          </Box>

          {/* Popular Servers */}
          <Box sx={{ mb: 10 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h4" component="h2" sx={{ color: 'white', fontWeight: 'bold' }}>
                Popular MCP Servers
              </Typography>
              <Button component={Link} to="/explore" endIcon={<Explore />} color="primary">
                View All
              </Button>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
              {popularServers.map(server => (
                <Box 
                  key={server.id} 
                  sx={{ 
                    gridColumn: {
                      xs: 'span 12',
                      sm: 'span 6',
                      md: 'span 4'
                    },
                    animationName: 'fadeIn',
                    animationDuration: '0.5s'
                  }}
                >
                  <ServerCard server={server} onLike={handleLike} />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Recent Servers */}
          <Box sx={{ mb: 10 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h4" component="h2" sx={{ color: 'white', fontWeight: 'bold' }}>
                Recently Added
              </Typography>
              <Button component={Link} to="/explore" endIcon={<Explore />} color="primary">
                View All
              </Button>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
              {recentServers.map(server => (
                <Box 
                  key={server.id} 
                  sx={{ 
                    gridColumn: {
                      xs: 'span 12',
                      sm: 'span 6',
                      md: 'span 4'
                    },
                    animationName: 'fadeIn',
                    animationDuration: '0.5s'
                  }}
                >
                  <ServerCard server={server} onLike={handleLike} />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Call to Action */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 6, 
              borderRadius: 3, 
              textAlign: 'center',
              background: 'transparent',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: alpha('#fff', 0.1),
              bgcolor: 'background.paper',
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
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ready to Join the Ecosystem?
            </Typography>
            <Typography 
              variant="h6"
              sx={{ 
                color: 'text.secondary',
                maxWidth: 700, 
                mx: 'auto',
                mb: 5,
                opacity: 0.8
              }}
            >
              Register your MCP server or explore the available options to find the perfect fit for your needs.
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center"
            >
              <Button 
                component={Link} 
                to="/register" 
                variant="contained" 
                size="large" 
                startIcon={<Add />}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem'
                }}
              >
                Register Your Server
              </Button>
              <Button 
                component={Link} 
                to="/explore" 
                variant="outlined" 
                size="large" 
                startIcon={<Explore />}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderColor: alpha('#fff', 0.2),
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: alpha('#00f8e0', 0.1)
                  }
                }}
              >
                Explore Servers
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default HomePage; 