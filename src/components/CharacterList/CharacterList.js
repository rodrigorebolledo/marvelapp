import React, { useEffect, useState } from 'react';
import api from '../commons/Api';
import CardCharacter from './CardCharacter';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';




//Styles
const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 30
    },
    grid: {
        width: '80%',
    }
});
//EndStyles



export default function CharacterList(){

    const classes = useStyles();

//States
    const [isLoading, setIsLoading] = useState(true);
    const [apiData, setApiData] = useState();
//EndStates

//Functions
    const getApiData = () => {
        api.get('/v1/public/characters')
        .then((res) => {
            console.log(res.data.data.results)
            setApiData(res.data.data.results);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const PrintApiData = () => {
        return apiData.map((element) => (
               <CardCharacter key={element.id} name={element.name} description={element.description}
                image={element.thumbnail} events={element.events} stories={element.stories} series={element.series} />
            ));
        }
//EndFunctions

//Effects
    useEffect(getApiData, [])
    
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
                {isLoading === false &&
                    <PrintApiData/>
                }

                
            </Grid>
        </div>
    )
}
