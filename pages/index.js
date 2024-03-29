import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, IconButton, CircularProgress } from '@material-ui/core';
import { useAudioPlayer } from 'react-use-audio-player';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
import Landing from 'components/landing';
import SectionTwo from 'components/sectionTwo';
import SectionThree from 'components/sectionThree';
import SectionRSVP from 'components/sectionRSVP';
import { initializeApollo } from 'lib/apolloClient';
import { GET_MESSAGES } from 'graphql/message';
import { useRouter } from 'next/router';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { animateScroll } from 'react-scroll';

const widthWindow = 500;
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: widthWindow,
    padding: 0,
  },
  boxContainer: {
    boxShadow: '0 0 48px 0 rgba(0,0,0,.2)',
    background: theme.palette.background.default,
    '& .sectionTwo': {
      paddingBottom: theme.spacing(6),
    },
  },
  audioControl: {
    left: '50%',
    maxWidth: widthWindow,
    width: '100%',
    transform: `translateX(-50%)`,
    pointerEvents: 'none',
    '& .MuiIconButton-root': {
      pointerEvents: 'visible',
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      '& svg.MuiSvgIcon-root': {
        fontSize: 22,
      },  
    },
  },
  colorDark: {
    color: theme.palette.primary.dark,
    '& .MuiCircularProgress-root' : {
      color: theme.palette.primary.dark,
    },
  },
}));

export default function Home({ data }) {
  const classes = useStyles();
  const router = useRouter();
  const { to } = router.query;
  const [ messages, setMessages ] = useState(data);
  const [ page, setPage ] = useState(2);
  const [ loadingMessage, setLoadingMessage ] = useState(false);
  const [ loadingRSVP, setLoadingRSVP ] = useState(false);
  const [ values, setValues ] = useState({});
  const [ success, setSuccess ] = useState(false);
  const [ openBody, setOpenBody ] = useState(false);
  console.log('messages', messages);
  const customCss = `body { overflow-y: ${openBody ? 'auto' : 'hidden'} }`;
  const { togglePlayPause, ready, loading, playing, play } = useAudioPlayer({
    src: '/audio/back_sound.mp3',
    format: 'mp3',
    html5: true,
    autoplay: false,
  });
  const handleChangeVal = useCallback((e) => {
    setValues({...values, [e.currentTarget.id]: e.currentTarget.value });
  }, [values]);
  const fetchData = useCallback(async () => {
    setLoadingMessage(true);
    const v = await fetch(`/api/messages/${page}`);
    const results = await v.json();
    if (results && results.length > 0) {
      setPage(page + 1);
      setMessages(messages.concat(results));
    } else {
      setPage(null);
    }
    setLoadingMessage(false);
  }, [page, messages]);
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoadingRSVP(true);
    const v = await fetch(
      '/api/message/new',
      {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    );
    const result = await v.json();
    console.log('result', result);
    console.log('values', values);
    if (result.createMessage) {
      const newArray = [values].concat(messages)
      setMessages(newArray);
      setValues({});
      setSuccess(true);
    }
    setLoadingRSVP(false);
  }, [values, messages]);
  const AudioPlayer = () => {
    if (!ready && !loading) return null;
    if (loading) {
      return (
        <IconButton className={classes.colorDark}>
          <CircularProgress size={20} thickness={4.5} />
        </IconButton>
      );
    }
    return (
      <IconButton className={classes.colorDark} onClick={() => togglePlayPause()}>
        {playing ? (
          <VolumeOffRoundedIcon size="small" />
        ) : (
          <VolumeUpRoundedIcon size="small" />
        )}
      </IconButton>
    );
  };
  useEffect(() => {
    animateScroll.scrollToTop(0);
  }, []);
  const handlePlayMusic = useCallback(() => {
    setOpenBody(true);
    play();
  }, [play]);
  const [ infiniteRef ] = useInfiniteScroll({
    loadingMessage,
    hasNextPage: page ? true : false,
    onLoadMore: fetchData,
  });
  return (
    <Container classes={{root: classes.container}}>
      <Head>
        <title>Fahmilia &amp; Anwar</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{customCss}</style>
      </Head>

      <Box
        className={classes.boxContainer}
        overflow="hidden"
        minHeight="100vh"
      >
        <Landing to={to} playMusic={handlePlayMusic} />
        <Box className="sectionTwo">
          <SectionTwo />
        </Box>
        <Box className="sectionThree">
          <SectionThree />
        </Box>
        <Box className="sectionRSVP">
          <SectionRSVP
            messages={messages}
            onChangeVal={handleChangeVal}
            onSubmit={handleSubmit}
            values={values}
            loading={loadingRSVP}
            loadingMessage={loadingMessage}
            success={success}
          />
        </Box>
        <Box paddingBottom={3}>
          <div ref={infiniteRef} />
        </Box>
      </Box>
      <Box
        position="fixed"
        bottom={0}
        className={classes.audioControl}
        display="flex"
        justifyContent="flex-end"
        zIndex={openBody ? '99' : '-1'}
      >
        <AudioPlayer />
      </Box>
    </Container>
  );
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  var messages = [];
  
  await apolloClient.query({
    query: GET_MESSAGES,
    variables: { first: 3, page: 1 }
  }).then((v) => {
    messages = v.data.getMessages;
  }).catch(err => {
    console.log('Error', err);
  });

  return {
    props: { data: messages },
  };
};