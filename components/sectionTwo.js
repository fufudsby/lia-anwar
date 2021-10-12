import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    maxWidth: theme.spacing(28),
    maxHeight: theme.spacing(28),
    width: '85%',
    height: '85%',
  },
  name: {
    fontWeight: 600,
    fontSize: 17,
    letterSpacing: 0.8,
    lineHeight: 1.3,
    marginBottom: theme.spacing(1.5),
  },
  desc: {
    maxWidth: 300,
    lineHeight: 1.2,
    fontSize: 14,
    letterSpacing: 0.8,
    color: theme.palette.grey[600],
  },
}));

const SectionTwo = () => {
  console.log('render SectionOne');
  const classes = useStyles();
  return (
    <Box minHeight="100vh">
      <Box
        textAlign="center"
        paddingX={2}
        style={{
          maxWidth: 470,
          margin: '0 auto',
          marginBottom: 30,
          paddingTop: 30,
        }}
      >
        <Typography
          variant="body1"
          style={{
            fontWeight: 700,
            marginBottom: 15,
            fontSize: 15,
            letterSpacing: 0.8,
          }}
        >
          Assalamu'alaikum Warahmatullahi Wabarakatuh
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontSize: 15,
            letterSpacing: 0.8,
          }}
        >
          Dengan memohon rahmat dan ridho Allah SWT,<br />kami bermaksud menyelenggarakan pernikahan putra/putri kami:
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" paddingY={3}>
        <Avatar src="/images/img3.jpg" classes={{root: classes.avatar}} />
        <Box marginTop={3} paddingX={1.5} maxWidth="420px" textAlign="center">
          <Typography variant="h4" classes={{root: classes.name}}>
            Fahmilia Tri Hidayati
          </Typography>
          <Typography variant="body1" classes={{root: classes.desc}}>
            Putri Ketiga Bapak Suyatno dan <br /> Ibu Endang Purbowati
          </Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" paddingY={3}>
        <Avatar src="/images/img2.jpg" classes={{root: classes.avatar}} />
        <Box marginTop={3} paddingX={2} maxWidth="420px" textAlign="center">
          <Typography variant="h4" classes={{root: classes.name}}>
            Mochammad Anwar Brian Basuki
          </Typography>
          <Typography variant="body1" classes={{root: classes.desc}}>
            Putra Pertama Bapak Zainal Arifin dan <br /> Ibu Arlien Andiany
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(SectionTwo);