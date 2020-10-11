import React, { useEffect, useState } from 'react';
import { getApiCharacters }  from '../commons/Api';
import CardCharacter from './CardCharacter';
import Grid from '@material-ui/core/Grid';
import { makeStyles, CircularProgress } from '@material-ui/core';




//Styles
const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 30
    },
    grid: {
        width: '80%',
    },

    circularProgress: {
        color: 'red',
    },
});
//EndStyles



export default function CharacterList(){

    const classes = useStyles();

//States
    const [apiData, setApiData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [errorCharacters, setErrorCharacters] = useState(null);
//EndStates

//Functions
    const PrintApiData = () => {
        return apiData.map((element) => (
               <CardCharacter key={element.id} name={element.name} description={element.description}
                image={element.thumbnail} events={element.events} stories={element.stories} series={element.series} />
            ));
        }
//EndFunctions

//Effects
    useEffect(() => {
        getApiCharacters(setApiData, setIsLoading, setErrorCharacters);
        console.log(`Errors: ${errorCharacters}`);
    }, [errorCharacters])
    
//EndEffects




    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                spacing={3}
                className={classes.grid}
            >
                {isLoading === false ?
                    <PrintApiData/> : <CircularProgress className={classes.circularProgress} />
                }

                
            </Grid>
        </div>
    )
}
