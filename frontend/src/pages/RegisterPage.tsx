import React from 'react';
import { Container, Typography, Box, alpha, useTheme, Theme } from '@mui/material';
import ServerRegistrationForm from '../components/ServerRegistrationForm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mcpServerApi } from '../api/mcpServerApi';
import { MCPServerCategory } from '../types/MCPServer';
import Layout from '../components/Layout';
import { AddCircle } from '@mui/icons-material';

const RegisterPage: React.FC = () => {
  const theme = useTheme();

  const handleSubmit = async (formData: {
    name: string;
    description: string;
    imageUrl: string;
    githubUrl: string;
    demoUrl: string;
    author: string;
    categories: MCPServerCategory[];
    status: 'active' | 'inactive';
    version: string;
    tags: string[];
    license: string;
  }) => {
    try {
      // In a real application, we would use the API to register the server
      // await mcpServerApi.createServer({
      //   ...formData,
      //   // Add other necessary fields
      // });
      
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Server registered:', formData);
      return Promise.resolve();
    } catch (error) {
      console.error('Error registering server:', error);
      return Promise.reject(error);
    }
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
        <Container maxWidth="md">
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
            <AddCircle 
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
              Register MCP Server
            </Typography>
            <Typography 
              variant="h6"
              sx={{ 
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto',
                opacity: 0.8
              }}
            >
              Share your Model Context Protocol server with the community
            </Typography>
          </Box>
          
          {/* Information Box */}
          <Box 
            sx={{ 
              mb: 6,
              p: 4, 
              borderRadius: 3,
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.2),
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              backdropFilter: 'blur(20px)',
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: 'primary.main',
                fontWeight: 600
              }}
            >
              Register Your MCP Server
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              By registering your MCP server, you're making it discoverable to developers and organizations looking for
              Model Context Protocol implementations. Make sure your server follows MCP standards
              and has clear documentation in the GitHub repository.
            </Typography>
          </Box>
          
          {/* Registration Form */}
          <ServerRegistrationForm onSubmit={handleSubmit} />
        </Container>
      </Box>
    </Layout>
  );
};

export default RegisterPage; 