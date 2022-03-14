import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Backdrop from "@material-ui/core/Backdrop";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";
import IconButton from "@material-ui/core/IconButton";
import { Button, Typography } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    height: 350,
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  card: {
    height: 350,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",

    backgroundColor: "#212121",
  },

  icons: {
    backgroundColor: "#eceff1",
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  },
  iconsSize: {
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  },
  button: {
    position: "absolute",
    zIndex: 2,
    left: "0%",
    top: "1%",
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  },
  imgBackdrop: {
    width: "100%",
    height: 600,
    zIndex: 1,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  boxgrid: { position: "absolute", top: "45%" },
  div: {
    position: "relative",
  },
  icondelete: {
    position: "absolute",
    right: 0,
    zIndex: 5,
  },
  box: {
    width: "100%",
  },
}));
export default function ListImage(props) {
  const classes = useStyles();
  const { arrImage, setArrImage } = props;
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [getImg, setGetImg] = useState();
  const [getId, setGetId] = useState();
  const [isClickRecently, setIsClickRecently] = useState(false);
  const [indexImage, setIndexImage] = useState([]);
  console.log("indexImage", indexImage);
  console.log("arrImageádasdasdasd", arrImage);
  //function set click button Rêcntly
  const handleClickRecently = () => {
    setIsClickRecently(true);
  };
  //function xử lý khi click button TRỞ VỀ
  const handleClickComeback = () => {
    // arrImage.sort(function (a, b) {
    //   return a.id - b.id;
    // });

    setIsClickRecently(false);
  };
  //restore image function
  const handleRestoreImage = (data) => {
    console.log("dataRestore", data);
    arrImage.splice(data.getIndex, 0, data);
    arrImage.sort(function (a, b) {
      return a.id - b.id;
    });
    console.log("arrImageádasdasdasd", arrImage);
    // setArrImage([arrImage.length = data.getIndex, data]);
    const newRecentlyArr = indexImage.filter((item) => item.id !== data.id);
    setIndexImage(newRecentlyArr);
  };

  const handleClose = () => {
    setOpenBackdrop(false);
  };
  const handleToggle = (data) => {
    setGetId(data.id);
    setGetImg(data.img);
    setOpenBackdrop(!openBackdrop);
  };
  const handleClickDeleteImage = (data, index) => {
    const a = { ...data, getIndex: data.id - 1 };
    console.log("a", a);
    setIndexImage((indexImage) => [...indexImage, a]);
    // const d = [...imgRecentlyDeleted];
    // d.push(data);
    // setImgRecentlyDeleted(d);

    const newImage = arrImage.filter((item) => item.id !== data.id);
    setArrImage(newImage);
  };
  useEffect(() => {
    console.log("getId sau khi click", getId);
    arrImage.filter((item) => {
      if (item.id === getId) {
        setGetImg(item.img);
      }
      return false;
    });
  }, [getId]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {isClickRecently === false ? (
          <Typography align="right">
            <Button variant="outlined" onClick={() => handleClickRecently()}>
              Đã xoá gần đây
            </Button>
          </Typography>
        ) : (
          <Typography align="right">
            <Button variant="outlined" onClick={() => handleClickComeback()}>
              trở về
            </Button>
          </Typography>
        )}
      </Grid>
      {isClickRecently === false
        ? arrImage.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card className={classes.root}>
                <CardActions component="div" className={classes.card}>
                  <IconButton
                    className={classes.icondelete}
                    onClick={() => handleClickDeleteImage(item, index)}
                  >
                    <DeleteForeverSharpIcon color="secondary" />
                  </IconButton>

                  <CardMedia
                    title="Contemplative Reptile"
                    onClick={() => handleToggle(item)}
                  >
                    <img
                      src={item.img}
                      className={classes.media}
                      alt="some value"
                    />
                  </CardMedia>
                </CardActions>
              </Card>
            </Grid>
          ))
        : indexImage.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card className={classes.root}>
                <CardActions component="div" className={classes.card}>
                  <IconButton
                    className={classes.icondelete}
                    onClick={() => handleRestoreImage(item)}
                  >
                    <RestoreIcon />
                  </IconButton>

                  <CardMedia
                    title="Contemplative Reptile"
                    onClick={() => handleToggle(item)}
                  >
                    <img
                      src={item.img}
                      className={classes.media}
                      alt="some value"
                    />
                  </CardMedia>
                </CardActions>
              </Card>
            </Grid>
          ))}

      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <Fab
          color="default"
          aria-label="add"
          className={classes.button}
          onClick={handleClose}
        >
          <CloseIcon />
        </Fab>
        <div className={classes.div}>
          <Box>
            <Grid
              container
              justifyContent="space-between"
              className={classes.boxgrid}
            >
              <Grid item>
                {getId > 1 ? (
                  <IconButton
                    color="default"
                    aria-label="add"
                    onClick={() => setGetId(getId - 1)}
                    className={classes.icons}
                  >
                    <KeyboardArrowLeftIcon
                      color="primary"
                      className={classes.iconSize}
                    />
                  </IconButton>
                ) : (
                  <IconButton className={classes.icons}>
                    <KeyboardArrowLeftIcon
                      disabled
                      color="disabled"
                      className={classes.iconSize}
                    />
                  </IconButton>
                )}
              </Grid>
              <Grid item>
                {arrImage.length > getId ? (
                  <IconButton
                    color="default"
                    aria-label="add"
                    onClick={() => setGetId(getId + 1)}
                    className={classes.icons}
                  >
                    <KeyboardArrowRightIcon
                      color="primary"
                      className={classes.iconSize}
                    />
                  </IconButton>
                ) : (
                  <IconButton className={classes.icons}>
                    <KeyboardArrowRightIcon
                      color="disabled"
                      disabled
                      className={classes.iconSize}
                    />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Box>

          <Box>
            <img
              src={getImg}
              alt="some value"
              className={classes.imgBackdrop}
            />
          </Box>
        </div>
      </Backdrop>
    </Grid>
  );
}
