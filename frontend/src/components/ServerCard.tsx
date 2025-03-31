import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button, alpha } from '@mui/material';
import { Favorite, GitHub } from '@mui/icons-material';
import { MCPServer } from '../types/MCPServer';

interface ServerCardProps {
  server: MCPServer;
  onLike?: (id: string) => void;
}

const ServerCard: React.FC<ServerCardProps> = ({ server, onLike }) => {
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onLike) {
      onLike(server.id);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        transition: 'all 0.3s ease', 
        '&:hover': { 
          transform: 'translateY(-4px)', 
          boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}` 
        },
        bgcolor: 'background.paper',
        backdropFilter: 'blur(20px)',
        border: '1px solid',
        borderColor: alpha('#fff', 0.1),
        borderRadius: 4,
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #4caf50 0%, #ff9800 50%, #f44336 100%)',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row',
        p: 2,
        flexGrow: 1,
      }}>
        {/* Icon Box on Left */}
        <Box 
          sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: 'black', 
            borderRadius: 3,
            mr: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: alpha('#fff', 0.1),
          }}
        >
          <Box 
            component="img"
            src={server.imageUrl}
            alt={server.name}
            sx={{
              width: '70%',
              height: '70%',
              objectFit: 'contain'
            }}
          />
        </Box>

        {/* Content on Right */}
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              mb: 0.5,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {server.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 1.5,
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: '0.75rem',
              lineHeight: 1.3
            }}
          >
            {server.description}
          </Typography>

          {/* Actions Row */}
          <Box sx={{ 
            mt: 'auto', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <Button
              size="small"
              startIcon={<Favorite sx={{ color: (theme) => theme.palette.secondary.main, fontSize: '0.9rem' }} />}
              onClick={handleLike}
              sx={{
                color: 'text.secondary',
                fontSize: '0.7rem',
                py: 0.5,
                minWidth: 'auto',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1)
                }
              }}
            >
              Like
            </Button>
            
            <Button 
              component={Link} 
              to={`/servers/${server.id}`} 
              size="small" 
              sx={{ 
                color: 'text.primary',
                fontSize: '0.7rem',
                py: 0.5,
                minWidth: 'auto',
                '&:hover': {
                  bgcolor: alpha('#fff', 0.05)
                }
              }}
            >
              Usage
            </Button>
            
            <Button 
              href={server.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              size="small" 
              startIcon={<GitHub sx={{ fontSize: '0.9rem' }} />}
              sx={{ 
                color: '#f44336',
                fontSize: '0.7rem',
                py: 0.5,
                minWidth: 'auto',
                '&:hover': {
                  bgcolor: alpha('#f44336', 0.05)
                }
              }}
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ServerCard; 