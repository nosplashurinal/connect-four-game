

import React from "react";
import MuiDialogContent from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

const component = ({ classes, message }) => {
    return (
        <MuiDialogContent className={classes.root}>
            <Typography gutterBottom>
                <Box fontSize={16} m={1} fontWeight={600} textAlign="center">
                    {message}
                </Box>
            </Typography>
        </MuiDialogContent>
      );
}

const styles = theme => ({
    root: {
        padding: theme.spacing(2)
    }
});

export const DialogContent = withStyles(styles)(component);