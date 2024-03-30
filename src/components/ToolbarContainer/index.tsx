import Button from '@mui/material/Button';
import {Box} from '@mui/system';
import {Typography, useMediaQuery} from '@mui/material';
import {actions, container, titleStyle} from './styles';
import {useModal} from '../../shared/hooks/useModal';

interface ToolbarContainerProps {
  title: string;
  captionButton: string;
  onCreate?: () => void;
}

export function ToolbarContainer({
  title,
  captionButton,
  onCreate,
}: ToolbarContainerProps) {
  const {openModal} = useModal();

  const matches = useMediaQuery('(max-width:480px)');
  return (
    <Box
      sx={{
        ...container,
        ...(matches && {flexDirection: 'column', marginBottom: '3rem'}),
      }}>
      <Typography style={titleStyle}>{title}</Typography>
      <Box sx={actions}>
        <Button variant="contained" onClick={onCreate}>
          {captionButton}
        </Button>
      </Box>
    </Box>
  );
}
