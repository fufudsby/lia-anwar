import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
import { Link } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
  },
  name: {
    fontSize: 120,
    color: theme.palette.primary.main,
    lineHeight: 0.8,
    width: '90%',
    maxWidth: 300,
    margin: theme.spacing(0, 'auto'),
    position: 'relative',
    textShadow: `0 0 125px #d59e97`,
  },
  and: {
    fontSize: 15,
    color: theme.palette.primary.main,
    fontFamily: '\'Source Sans Pro\', sans-serif',
    letterSpacing: 4,
    paddingLeft: theme.spacing(2),
    textAlign: 'center',
    display: 'block',
    marginBottom: theme.spacing(3),
  },
  date: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 18,
    color: theme.palette.primary.dark,
    letterSpacing: 2,
    margin: theme.spacing(1, 0),
    '& span': {
      display: 'block',
      padding: theme.spacing(0, 1.5),
      position: 'relative',
      '&:before': {
        content: `''`,
        position: 'absolute',
        width: 5,
        height: 5,
        backgroundColor: theme.palette.primary.dark,
        left: 0,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
      },
      '&:first-child:before': {
        display: 'none',
      },
    },
  },
  toGuest: {
    fontSize: 16,
    color: theme.palette.grey[700],
    fontStyle: 'italic',
    letterSpacing: 2,
    textTransform: 'capitalize',
  },
  button: {
    fontSize: 15,
    marginTop: theme.spacing(5),
    borderRadius: '50%',
    letterSpacing: 10,
    lineHeight: 1.3,
    textAlign: 'center',
    padding: 0,
    width: theme.spacing(10),
    height: theme.spacing(10),
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.primary.main,
    overflow: 'hidden',
    position: 'relative',
    '&:before': {
      content: `''`,
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '92%',
      height: '92%',
      border: `1px solid ${theme.palette.background.paper}`,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '& a': {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      '& div': {
        transform: 'translateX(5px)',
        whiteSpace: 'pre-line',
      },
    }
  },
}));

const Landing = ({ to, playMusic }) => {
  console.log('render Landing');
  const classes = useStyles();
  const playMusicOn = () => {
    playMusic();
  };
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      flexDirection="column"
      paddingY={5}
      className={classes.container}
    >
      <Box width={1} display="flex" flexDirection="column" alignItems="center">
        <Box width={1} marginBottom={5}>
          <Typography
            className="custom-font"
            classes={{root: classes.name}}
            style={{textAlign: 'left'}}
          >
            Fahmilia
          </Typography>
          <span className={classes.and}>AND</span>
          <Typography
            className="custom-font"
            classes={{root: classes.name}}
            style={{textAlign: 'right'}}
          >
            Anwar
          </Typography>
        </Box>
        {/* <Typography
          classes={{root: classes.date}}
        >
          <span>08</span>
          <span>23</span>
          <span>2021</span>
        </Typography> */}
        <Typography
          classes={{root: classes.toGuest}}
        >
          Untuk {to ? to : 'Tamu'}
        </Typography>
      </Box>
      <Button
        type="button"
        disableElevation
        fullWidth
        classes={{root: classes.button}}
        
      >
        <Link
          to="sectionTwo"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          <div onClick={() => playMusicOn()}>{'OP\nEN'}</div>
        </Link>
      </Button>
    </Box>
  );
};

export default memo(Landing);