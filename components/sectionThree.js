import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import Title from 'components/title';
import TextIcon from 'components/textIcon';
import Gallery from 'components/gallery';
import Covid19 from 'components/covid19';
import { useStyles as useStylesRSVP } from 'components/sectionRSVP';

const useStyles = makeStyles((theme) => ({
  typo1: {
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: 0.8,
    letterSpacing: theme.spacing(0.15),
    marginBottom: theme.spacing(1),
    textTransform: 'uppercase',
  },
  note: {
    '& p': {
      fontSize: 15,
      letterSpacing: 0.8,
    },
  },
  gridItem: {
    position: 'relative',
    '&.with-line': {
      '&:before': {
        content: `''`,
        position: 'absolute',
        top: '50%',
        right: 6,
        width: 1,
        height: '84%',
        background: theme.palette.grey[700],
        transform: 'translateY(-50%)',
      },  
    },
  },
}));

const SectionThree = () => {
  console.log('render SectionThree');
  const classes = useStyles();
  const classesRSVP = useStylesRSVP();
  return (
    <>
      <Box paddingX={3}>
        <Title text="Resepsi &amp; Akad" />
        <Grid container spacing={3}>
          <Grid item xs={6} className={`with-line ${classes.gridItem}`}>
            <Typography
              classes={{root: classes.typo1}}
              variant="body1"
            >
              Akad Nikah
            </Typography>
            <TextIcon
              text="Minggu, 24 Oktober 2021<br />Pukul 07.30 WIB - Selesai"
            />
            <TextIcon
              text="Kediaman mempelai wanita"
            />
            <Box fontStyle="italic" className={classes.note}>
              <TextIcon
                text="* Khusus keluarga"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography
              classes={{root: classes.typo1}}
              variant="body1"
            >
              Resepsi
            </Typography>
            <TextIcon
              text="Minggu, 24 Oktober 2021<br />Pukul 09.00 WIB - Selesai"
            />
            <TextIcon
              text="Kediaman mempelai wanita"
            />
            <TextIcon
              text="Desa Balegondo RT 2 / RW 2, Kec.Ngariboyo, Kab.Magetan"
              link="https://maps.app.goo.gl/5mBxfWCRNAvK1JHT8"
            />
          </Grid>
        </Grid>
      </Box>
      <Box textAlign="center">
        <Button
          type="button"
          variant="contained"
          color="primary"
          disableElevation
          className={classesRSVP.submit}
        >
          Buka Google Maps
        </Button>
      </Box>
      <Gallery />
      <Covid19 />
    </>
  );
};

export default memo(SectionThree);