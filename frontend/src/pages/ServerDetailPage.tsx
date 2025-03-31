import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Stack,
  alpha,
  Theme,
  useTheme
} from '@mui/material';
import {
  Favorite,
  GitHub,
  Language,
  Code,
  Today,
  Update,
  Category,
  Tag,
  Description,
  Person,
  BarChart,
  Groups,
  RequestPage,
  ArrowBack
} from '@mui/icons-material';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mcpServerApi } from '../api/mcpServerApi';
import { MCPServer } from '../types/MCPServer';
import { mockMCPServers } from '../utils/mockData';
import Layout from '../components/Layout';

const ServerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [server, setServer] = useState<MCPServer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fetchServer = async () => {
      try {
        setIsLoading(true);
        // In a real application, we would use the API
        // const data = await mcpServerApi.getServerById(id);
        
        // Using mock data for now
        const mockServer = mockMCPServers.find(s => s.id === id);
        if (mockServer) {
          setServer(mockServer);
        } else {
          setError('Server not found');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching server:', error);
        setError('Failed to load server details. Please try again later.');
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchServer();
    }
  }, [id]);

  const handleLike = async () => {
    if (!server) return;
    
    try {
      // In a real application, we would use the API
      // await mcpServerApi.likeServer(server.id);
      
      // Update local state
      setServer(prev => {
        if (!prev) return null;
        return { ...prev, likes: prev.likes + 1 };
      });
    } catch (error) {
      console.error('Error liking server:', error);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Container sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress size={60} color="primary" />
        </Container>
      </Layout>
    );
  }

  if (error || !server) {
    return (
      <Layout>
        <Container sx={{ py: 8 }}>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4, 
              bgcolor: alpha(theme.palette.error.main, 0.1),
              color: 'error.main',
              border: '1px solid',
              borderColor: alpha(theme.palette.error.main, 0.2),
            }}
          >
            {error || 'Server not found'}
          </Alert>
          <Button 
            component={Link} 
            to="/explore" 
            startIcon={<ArrowBack />} 
            variant="outlined"
            sx={{
              borderColor: alpha('#fff', 0.1),
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            Back to Explore
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ 
        background: (theme: Theme) => `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.6)} 0%, ${theme.palette.background.default} 100%)`,
        pt: 6,
        pb: 10,
      }}>
        <Container maxWidth="lg">
          {/* Back button */}
          <Button 
            component={Link} 
            to="/explore" 
            startIcon={<ArrowBack />}
            sx={{ 
              mb: 4,
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.05)
              }
            }}
          >
            Back to Explore
          </Button>
          
          {/* Header */}
          <Box 
            sx={{ 
              mb: 5, 
              overflow: 'hidden', 
              borderRadius: 3,
              border: '1px solid',
              borderColor: alpha('#fff', 0.1),
              bgcolor: 'background.paper',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Box sx={{ 
              height: { xs: '180px', md: '260px' }, 
              backgroundImage: `url(${server.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <Box sx={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                p: 4,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                color: 'white'
              }}>
                <Typography 
                  variant="h3" 
                  component="h1"
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.5rem' }
                  }}
                >
                  {server.name}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mt: 1,
                    opacity: 0.8,
                    maxWidth: '800px'
                  }}
                >
                  {server.description}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ 
              p: 3, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexWrap: 'wrap',
              borderTop: '1px solid',
              borderColor: alpha('#fff', 0.1),
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: { xs: 2, md: 0 } 
              }}>
                <Person sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                  By <Box component="span" sx={{ color: 'primary.main' }}>{server.author}</Box>
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  startIcon={<Favorite />}
                  onClick={handleLike}
                  sx={{
                    fontWeight: 500,
                    boxShadow: theme => `0 4px 14px ${alpha(theme.palette.secondary.main, 0.4)}`,
                  }}
                >
                  Like ({server.likes})
                </Button>
                
                <Button 
                  variant="outlined" 
                  startIcon={<GitHub />}
                  href={server.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderColor: alpha('#fff', 0.2),
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.1)
                    }
                  }}
                >
                  GitHub
                </Button>
                
                {server.demoUrl && (
                  <Button 
                    variant="outlined" 
                    startIcon={<Language />}
                    href={server.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderColor: alpha('#fff', 0.2),
                      color: 'text.primary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                      }
                    }}
                  >
                    Demo
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          
          {/* Main content */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {/* Left column - Details */}
            <Box sx={{ flex: 2 }}>
              <Box 
                sx={{ 
                  p: 4, 
                  mb: 4, 
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: alpha('#fff', 0.1),
                  bgcolor: 'background.paper',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    fontWeight: 600,
                    color: 'primary.main'
                  }}
                >
                  <Description sx={{ mr: 1 }} /> About this server
                </Typography>
                
                <Divider 
                  sx={{ 
                    my: 3, 
                    borderColor: alpha('#fff', 0.1),
                  }} 
                />
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Category sx={{ fontSize: '1rem', mr: 1, color: 'primary.main' }} />
                      Categories
                    </Typography>
                    <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {server.categories.map(category => (
                        <Chip 
                          key={category} 
                          label={category} 
                          sx={{ 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            fontWeight: 500,
                            borderRadius: 1
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Tag sx={{ fontSize: '1rem', mr: 1, color: 'primary.main' }} />
                      Tags
                    </Typography>
                    <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {server.tags.map(tag => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          variant="outlined" 
                          size="small" 
                          sx={{ 
                            borderColor: alpha('#fff', 0.1),
                            color: 'text.secondary',
                            '&:hover': {
                              borderColor: 'primary.main',
                              color: 'primary.main',
                            },
                            borderRadius: 1
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Code sx={{ fontSize: '1rem', mr: 1, color: 'primary.main' }} />
                      Version
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.primary' }}>
                      {server.version}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      License
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.primary' }}>
                      {server.license}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Today sx={{ fontSize: '1rem', mr: 1, color: 'primary.main' }} />
                      Created
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.primary' }}>
                      {new Date(server.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Update sx={{ fontSize: '1rem', mr: 1, color: 'primary.main' }} />
                      Last Updated
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.primary' }}>
                      {new Date(server.updatedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            {/* Right column - Stats and usage info */}
            <Box sx={{ flex: 1 }}>
              <Box 
                sx={{ 
                  p: 3, 
                  mb: 4, 
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: alpha('#fff', 0.1),
                  bgcolor: 'background.paper',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    fontWeight: 600,
                    color: 'primary.main'
                  }}
                >
                  <BarChart sx={{ mr: 1 }} /> Usage Statistics
                </Typography>
                
                <Stack spacing={2} sx={{ mt: 3 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <RequestPage fontSize="small" sx={{ mr: 1, opacity: 0.7 }} /> Total Requests
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {server.usageStats.totalRequests.toLocaleString()}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <Groups fontSize="small" sx={{ mr: 1, opacity: 0.7 }} /> Active Users
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {server.usageStats.activeUsers.toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              
              <Box 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: alpha('#fff', 0.1),
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  backdropFilter: 'blur(20px)',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Server Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Box 
                    sx={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: '50%', 
                      bgcolor: server.status === 'active' ? 'success.main' : 'text.disabled',
                      mr: 1,
                      boxShadow: server.status === 'active' 
                        ? (theme) => `0 0 12px ${theme.palette.success.main}` 
                        : 'none'
                    }} 
                  />
                  <Typography 
                    variant="body1"
                    sx={{ 
                      textTransform: 'capitalize',
                      color: server.status === 'active' ? 'success.main' : 'text.secondary',
                      fontWeight: 500
                    }}
                  >
                    {server.status}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default ServerDetailPage; 