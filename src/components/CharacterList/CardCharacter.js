import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ListOfCard from './ListOfCard';
const useStyles = makeStyles({
  root: {
    border: 3,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  media: {
    height: 300,
  },
  diaglog: {
    width: '50%',
  },
});


export default function CardCharacter(props) {
  const { name, description, image, events, series, stories } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xl={4} md={4} xs={12}>
        <Card className={classes.root}>
        <CardActionArea
            onClick={handleClickOpen}
        >
            <CardMedia
            className={classes.media}
            image={`${image.path}.${image.extension}`}
            title="Imagen cortesia de Marvel"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {description !== '' ?
                        description : `This character doesn't have description, sorry for this problem`
                    }
                </Typography>
                <Typography gutterBottom variant="overline" color="textSecondary" component="p">
                    This character has had {events.available} {events.available === 1 ? 'event' : 'events'}
                </Typography>
                <Typography gutterBottom variant="overline" color="textSecondary" component="p">
                    This character has had {series.available} {series.available === 1 ? 'serie' : 'series'}
                </Typography>
                <Typography variant="overline" color="textSecondary" component="p">
                    This character has had {stories.available} {stories.available === 1 ? 'story' : 'stories'}
                </Typography>
            </CardContent>
        </CardActionArea>
        </Card>

          <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          fullWidth={true}
        >
          <DialogTitle id="responsive-dialog-title">{`Name: ${name}`}</DialogTitle>
          <DialogContent>
            <ListOfCard events={events} series={series} stories={stories}/>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

    </Grid>
  );
}
