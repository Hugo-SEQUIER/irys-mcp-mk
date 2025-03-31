import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TextField,
  InputAdornment,
  OutlinedInput,
  SelectChangeEvent,
  Paper,
  Typography,
  Stack
} from '@mui/material';
import { Search, FilterList, Sort } from '@mui/icons-material';
import { MCPServerCategory, MCPServerStatus } from '../types/MCPServer';

interface FilterOptions {
  search: string;
  categories: MCPServerCategory[];
  status: MCPServerStatus | 'all';
  sortBy: 'likes' | 'newest' | 'mostUsed' | 'recentlyUpdated';
}

interface ServerFiltersProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: Partial<FilterOptions>) => void;
}

const ServerFilters: React.FC<ServerFiltersProps> = ({ filters, onFilterChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handleCategoryChange = (event: SelectChangeEvent<MCPServerCategory[]>) => {
    const { value } = event.target;
    onFilterChange({
      categories: typeof value === 'string' ? [value as MCPServerCategory] : value as MCPServerCategory[],
    });
  };

  const handleStatusChange = (event: SelectChangeEvent<MCPServerStatus | 'all'>) => {
    onFilterChange({ status: event.target.value as MCPServerStatus | 'all' });
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    onFilterChange({
      sortBy: event.target.value as 'likes' | 'newest' | 'mostUsed' | 'recentlyUpdated',
    });
  };

  const categories: MCPServerCategory[] = [
    'AI', 'LLM', 'Image', 'Audio', 'Video', 'Multimodal', 'Tool-use', 'Function-calling', 'Other'
  ];

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <FilterList sx={{ mr: 1 }} /> Filter & Sort
      </Typography>
      
      <Stack spacing={3}>
        <TextField
          fullWidth
          placeholder="Search servers..."
          variant="outlined"
          value={filters.search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="categories-filter-label">Categories</InputLabel>
            <Select
              labelId="categories-filter-label"
              multiple
              value={filters.categories}
              onChange={handleCategoryChange}
              input={<OutlinedInput label="Categories" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={filters.status}
              onChange={handleStatusChange}
              input={<OutlinedInput label="Status" />}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel id="sort-by-label">
              <Sort fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
              Sort By
            </InputLabel>
            <Select
              labelId="sort-by-label"
              value={filters.sortBy}
              onChange={handleSortChange}
              input={<OutlinedInput label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Sort fontSize="small" sx={{ mr: 0.5 }} />
                  Sort By
                </Box>
              } />}
            >
              <MenuItem value="likes">Most Liked</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="mostUsed">Most Used</MenuItem>
              <MenuItem value="recentlyUpdated">Recently Updated</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ServerFilters; 