import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormHelperText,
  Typography,
  Paper,
  OutlinedInput,
  SelectChangeEvent,
  FormControlLabel,
  Switch,
  Alert,
  Stack
} from '@mui/material';
import { MCPServerCategory, MCPServerStatus } from '../types/MCPServer';

interface FormData {
  name: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  author: string;
  categories: MCPServerCategory[];
  status: MCPServerStatus;
  version: string;
  tags: string;
  license: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  imageUrl?: string;
  githubUrl?: string;
  author?: string;
  categories?: string;
  version?: string;
  license?: string;
}

interface ServerRegistrationFormProps {
  onSubmit: (formData: Omit<FormData, 'tags'> & { tags: string[] }) => Promise<void>;
}

const categories: MCPServerCategory[] = [
  'AI', 'LLM', 'Image', 'Audio', 'Video', 'Multimodal', 'Tool-use', 'Function-calling', 'Other'
];

const ServerRegistrationForm: React.FC<ServerRegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    imageUrl: '',
    githubUrl: '',
    demoUrl: '',
    author: '',
    categories: [],
    status: 'active',
    version: '',
    tags: '',
    license: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent<MCPServerCategory[]>) => {
    const { value } = event.target;
    setFormData(prev => ({
      ...prev,
      categories: typeof value === 'string' ? [value as MCPServerCategory] : value as MCPServerCategory[],
    }));
    
    // Clear category error
    if (errors.categories) {
      setErrors(prev => ({ ...prev, categories: undefined }));
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      status: event.target.checked ? 'active' : 'inactive',
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }
    
    if (!formData.githubUrl.trim()) {
      newErrors.githubUrl = 'GitHub URL is required';
    } else if (!isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid URL';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (formData.categories.length === 0) {
      newErrors.categories = 'Please select at least one category';
    }
    
    if (!formData.version.trim()) {
      newErrors.version = 'Version is required';
    }
    
    if (!formData.license.trim()) {
      newErrors.license = 'License is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');
    
    try {
      const formattedData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };
      
      await onSubmit(formattedData);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        githubUrl: '',
        demoUrl: '',
        author: '',
        categories: [],
        status: 'active',
        version: '',
        tags: '',
        license: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to register server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Register a New MCP Server
      </Typography>
      
      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          MCP Server registered successfully!
        </Alert>
      )}
      
      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            
            <TextField
              required
              fullWidth
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              error={!!errors.author}
              helperText={errors.author}
            />
          </Stack>
          
          <TextField
            required
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description}
          />
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              required
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              error={!!errors.imageUrl}
              helperText={errors.imageUrl}
            />
            
            <TextField
              required
              fullWidth
              label="GitHub URL"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              error={!!errors.githubUrl}
              helperText={errors.githubUrl}
            />
          </Stack>
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Demo URL (optional)"
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleChange}
            />
            
            <TextField
              required
              fullWidth
              label="Version"
              name="version"
              value={formData.version}
              onChange={handleChange}
              error={!!errors.version}
              helperText={errors.version}
            />
          </Stack>
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <FormControl fullWidth required error={!!errors.categories}>
              <InputLabel id="categories-label">Categories</InputLabel>
              <Select
                labelId="categories-label"
                multiple
                value={formData.categories}
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
              {errors.categories && (
                <FormHelperText>{errors.categories}</FormHelperText>
              )}
            </FormControl>
            
            <TextField
              required
              fullWidth
              label="License"
              name="license"
              value={formData.license}
              onChange={handleChange}
              error={!!errors.license}
              helperText={errors.license}
            />
          </Stack>
          
          <TextField
            fullWidth
            label="Tags (comma separated)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., fast, secure, enterprise"
            helperText="Enter tags separated by commas"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={formData.status === 'active'}
                onChange={handleStatusChange}
              />
            }
            label="Active"
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={submitting}
            fullWidth
          >
            {submitting ? 'Submitting...' : 'Register MCP Server'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ServerRegistrationForm; 