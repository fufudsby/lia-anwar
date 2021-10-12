import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import Title from 'components/title';
import Wishes from 'components/wishes';

export const useStyles = makeStyles((theme) => ({
  typo2: {
    fontSize: 74,
    textAlign: 'center',
    lineHeight: 1,
    color: theme.palette.primary.main,
  },
  submit: {
    fontSize: 13,
    letterSpacing: 0.8,
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.background.paper,
    border: `1px solid #d59e97`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  textField: {
    '& label, & input, & textarea': {
      fontSize: 15,
      letterSpacing: 0.8,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[600],
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SectionRSVP = ({
  messages,
  onChangeVal,
  onSubmit,
  values,
  loading,
  loadingMessage,
  success,
 }) => {
  const classes = useStyles();
  return (
    <Box paddingTop={8} paddingX={3}>
      <Title text="Berikan Ucapan &amp; Doa" />
      {loading ? (
        <Box display="flex" justifyContent="center" paddingBottom={6} paddingTop={3}>
          <CircularProgress size={22} thickness={4.5} />
        </Box>
      ) : (
        <>
          {success ? (
            <Box paddingBottom={6} paddingTop={3}>
              <Typography className="custom-font" classes={{root: classes.typo2}}>
                Terima Kasih
              </Typography>
            </Box>
          ) : (
            <>
              <form onSubmit={onSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nama"
                  name="name"
                  autoComplete="off"
                  size="small"
                  value={values.name ? values.name : ''}
                  disabled={loading}
                  onChange={onChangeVal}
                  className={classes.textField}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={3}
                  id="message"
                  label="Ucapan"
                  name="message"
                  autoComplete="off"
                  size="small"
                  value={values.message ? values.message : ''}
                  disabled={loading}
                  onChange={onChangeVal}
                  className={classes.textField}
                />
                <Button
                  type="submit"
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  color="primary"
                  disableElevation
                  className={classes.submit}
                >
                  Kirim
                </Button>
              </form>
            </>
          )}
        </>
      )}
      <Wishes messages={messages} loadingMessage={loadingMessage} />
    </Box>
  );
};

export default memo(SectionRSVP);