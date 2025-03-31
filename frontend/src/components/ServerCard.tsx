import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button, Chip, Stack, Tooltip, alpha } from '@mui/material';
import { Favorite, GitHub, Download, Person } from '@mui/icons-material';
import { MCPServer } from '../types/MCPServer';

interface ServerCardProps {
  server: MCPServer;
  onLike?: (id: string) => void;
}

const ServerCard: React.FC<ServerCardProps> = ({ server, onLike }) => {
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onLike) {
      onLike(server.id);
    }
  };

  const handleCardClick = () => {
    navigate(`/servers/${server.id}`);
  };

  return (
    <Card 
      onClick={handleCardClick}
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
        opacity: server.status === 'active' ? 1 : 0.8,
        cursor: 'pointer',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: server.status === 'active' 
            ? 'linear-gradient(90deg, #4caf50 0%, #ff9800 50%, #f44336 100%)'
            : 'linear-gradient(90deg, #616161 0%, #9e9e9e 50%, #616161 100%)',
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
            <Tooltip title={`Status: ${server.status}`} arrow placement="top">
              <Box
                component="span"
                sx={{
                  ml: 1,
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  bgcolor: server.status === 'active' 
                    ? 'success.main'
                    : 'error.main',
                  verticalAlign: 'middle'
                }}
              />
            </Tooltip>
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 0.5,
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
          
          {/* Author */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Person sx={{ fontSize: '0.8rem', color: 'text.secondary', mr: 0.5 }} />
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.7rem',
                fontStyle: 'italic'
              }}
            >
              by <Box component="span" sx={{ color: 'primary.main' }}>{server.author}</Box>
            </Typography>
          </Box>

          {/* Categories */}
          <Box sx={{ mb: 1 }}>
            <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
              {server.categories.slice(0, 2).map((category) => (
                <Chip 
                  key={category} 
                  label={category} 
                  size="small" 
                  sx={{ 
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    fontWeight: 500,
                    borderRadius: 1,
                    height: 20,
                    fontSize: '0.65rem'
                  }} 
                />
              ))}
              {server.categories.length > 2 && (
                <Chip 
                  label={`+${server.categories.length - 2}`} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha('#fff', 0.05), 
                    color: 'text.secondary',
                    borderRadius: 1,
                    height: 20,
                    fontSize: '0.65rem'
                  }}
                />
              )}
            </Stack>
          </Box>

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
              {server.likes}
            </Button>
            
            <Button 
              component={Link} 
              to={`/servers/${server.id}`} 
              size="small" 
              startIcon={<Download sx={{ color: 'text.primary', fontSize: '0.9rem' }} />}
              onClick={(e) => e.stopPropagation()}
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
              {server.downloads || 0}
            </Button>
            
            <Button 
              href={server.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              size="small" 
              startIcon={<GitHub sx={{ fontSize: '0.9rem' }} />}
              onClick={(e) => e.stopPropagation()}
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