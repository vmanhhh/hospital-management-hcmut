import { useTheme } from '@mui/material/styles';
import { ReactComponent as LogoSvg } from '../assets/images/logo.svg';

const Logo = () => {
  const theme = useTheme();

  return (
    <LogoSvg width="92" height="34" fill={theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.dark} />
  );
};

export default Logo;
