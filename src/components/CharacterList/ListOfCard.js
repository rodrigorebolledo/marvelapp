import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EventIcon from '@material-ui/icons/Event';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BookIcon from '@material-ui/icons/Book';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ListOfCard(props) {
  const { events, series, stories } = props;
  const classes = useStyles();
  const [openEvents, setOpenEvents] = useState(false);
  const [openSeries, setOpenSeries] = useState(false);
  const [openStories, setOpenStories] = useState(false);

  const handleClickEvents = () => {
    setOpenEvents(!openEvents);
  };

  const handleClickSeries = () => {
    setOpenSeries(!openSeries);
  };


  const handleClickStories = () => {
    setOpenStories(!openStories);
  };

const PrintEvents = () => {
  return events.items.map((element, idx) => {
    return (
      <ListItem button className={classes.nested}>
        <ListItemIcon>
          <RadioButtonUncheckedIcon />
        </ListItemIcon>
        <ListItemText key={idx} primary={element.name}/>
    </ListItem>
    );
  });
}

const PrintSeries = () => {
  return series.items.map((element, idx) => {
    return (
      <ListItem button className={classes.nested}>
        <ListItemIcon>
          <RadioButtonUncheckedIcon />
        </ListItemIcon>
        <ListItemText key={idx} primary={element.name}/>
    </ListItem>
    );
  });
}

const PrintStories = () => {
  return stories.items.map((element, idx) => {
    return (
      <ListItem button className={classes.nested}>
        <ListItemIcon>
          <RadioButtonUncheckedIcon />
        </ListItemIcon>
        <ListItemText key={idx} primary={element.name}/>
    </ListItem>
    );
  });
}

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClickEvents}>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary={`Events (${events.available})`} />
        {openEvents ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openEvents} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <PrintEvents/>
        </List>
      </Collapse>


      <ListItem button onClick={handleClickSeries}>
        <ListItemIcon>
          <ImportContactsIcon />
        </ListItemIcon>
        <ListItemText primary={`Series (${series.available})`} />
        {openSeries ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSeries} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <PrintSeries/>
        </List>
      </Collapse>

      <ListItem button onClick={handleClickStories}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary={`Stories (${stories.available})`} />
        {openStories ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openStories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <PrintStories/>
        </List>
      </Collapse>
    </List>
  );
}
