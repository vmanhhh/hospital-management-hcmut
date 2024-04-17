// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://hcmut.edu.vn" target="_blank" underline="hover">
      hcmut.edu.vn
    </Typography>
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://github.com/vmanhhhh/hospital-management-hcmut.git"
      target="_blank"
      underline="hover"
    >
      &copy; hospital-management-hcmut
    </Typography>
  </Stack>
);

export default AuthFooter;
