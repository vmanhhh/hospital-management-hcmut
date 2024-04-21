import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface CustomizedSnackbarsProps {
    message: string
    severity: 'error' | 'warning' | 'info' | 'success'
}

export default function SnackbarAlert({ message, severity }: CustomizedSnackbarsProps) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}