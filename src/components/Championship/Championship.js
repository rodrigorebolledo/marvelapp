import React, { useEffect, useState } from 'react';
import { getApiCharacters} from '../commons/Api';
import Button from '@material-ui/core/Button';
import { makeStyles, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TableOrderedCharacter from './TableOrderedCharacter';
import TableResult from './TableResult';
import TableFight from './TableFight';

const powerList = [1000, 1250, 1100, 1150, 995, 1200]
const lifeList = [5000, 4750, 4500, 4250, 4000, 3750]
const defense = [1000, 950, 900, 850, 800, 750]
const randomNumberBetweenRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

const useStyles = makeStyles({
    container_buttons: {
        backgroundColor: 'white',
    },
    container:{
        paddingTop: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        height: 1000
    },

    buttonFight:{
        margin: 15
    },
    buttonAnotherBattle:{
        margin: 15
    }
});

export default function Championship(){
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorCharacters, setErrorCharacters] = useState(null);
    const [orderedCharacter, setOrderedCharacter] = useState([]);
    const [orderedCharacterClassified, setOrderedCharacterClassified] = useState([]);
    const [isFighting, setIsFighting] = useState(false);
    // const [stateFirstCharacter, setStateFirstCharacter ] = useState({})
    // const [stateSecondCharacter, setStateSecondCharacter ] = useState({})
    const [nameFirstCharacter, setNameFirstCharacter] = useState();
    const [nameSecondCharacter, setNameSecondCharacter] = useState();
    const [powerFirstCharacter, setPowerFirstCharacter] = useState();
    const [powerSecondCharacter, setPowerSecondCharacter] = useState();
    const [lifeFirstCharacter, setLifeFirstCharacter] = useState();
    const [lifeSecondCharacter, setLifeSecondCharacter] = useState();
    const [defenseFirstCharacter, setDefenseFirstCharacter] = useState();
    const [defenseSecondCharacter, setDefenseSecondCharacter] = useState();
    const [countFirstFight, setCountFirstFight] = useState(0);
    const [countSecondFight, setCountSecondFight] = useState(0);
    const [isLoadingFight, setIsLoadingFight] = useState(true)
    const [isLoadOrderedCharacter, setIsLoadOrderedCharacter] = useState(true);
    const [isLoadOrderedCharacterClassified, setIsLoadOrderedCharacterClassified] = useState(true);
    const [result, setResult] = useState([]);
    const [idFirstCharacter, setIdFirstCharacter] = useState(); 
    const [idSecondCharacter, setIdSecondCharacter] = useState();
    const [isNext, setIsNext] = useState(false);
    const [veladas, setVeladas] = useState(1);
    const [countAllFights, setCountAllFights] = useState(1);
    const [anotherFight, setAnotherFight] = useState(false);
    const [isStart, setIsStart] = useState(false);
    //Load styles
    const classes = useStyles();
    //Functions 
    const createFistListOfCharacter = () => {
        let arrayOfCharacters = []
        apiData.map((element) => {
            arrayOfCharacters.push({'id': element.id, 'name': element.name, 'wins':0});
        });

        arrayOfCharacters.map((element, idx) => {
            element.power = powerList[randomNumberBetweenRange(0,powerList.length)];
            element.life = lifeList[randomNumberBetweenRange(0,lifeList.length)];
            element.defense = defense[randomNumberBetweenRange(0,defense.length)];
        });
        
        return new Promise((resolve) => {
            if(arrayOfCharacters.length === apiData.length){
                resolve(arrayOfCharacters);
            }
        })

    }




    const orderCharacterRandom =  async (data = null) => {
        let arrayOfCharacters = []
        if(data === null){
            arrayOfCharacters = await createFistListOfCharacter();
        } else {
            arrayOfCharacters = data;
        }
        return new Promise((resolve) => {
            let elementArray = [];
            let orderedCharacters = []
            const arrayOfCharactersLength = arrayOfCharacters.length
            for(let i= 0; i <= arrayOfCharactersLength -1; i++){
                const randomNumber = randomNumberBetweenRange(0, arrayOfCharacters.length)
                elementArray.push(arrayOfCharacters[randomNumber]);
                arrayOfCharacters.splice(randomNumber, 1)
                if(elementArray.length === 2){
                    orderedCharacters.push(elementArray);
                    elementArray = [];
                }
            }
            if(orderedCharacters.length === arrayOfCharactersLength/2){
    
                if(data === null){
                    setOrderedCharacter(orderedCharacters);
                    setIsLoadOrderedCharacter(false);
                    resolve(orderedCharacters);
        
                }else{
                    setOrderedCharacterClassified(orderedCharacters);
                    setIsLoadOrderedCharacterClassified(false);
                    resolve(orderedCharacters);
                }
            }
        });

    }

    const handleButtonFight = () => {
        if(isFighting === false){
            setIsFighting(!isFighting)
        } else {
            console.log('Hay una pelea en curso');
        }
        
    }

    const handleButtonNext = () => {
        if(isNext === false){
            setIsNext(!isNext)
        } else {
            console.log('Hay una next en curso');
        }
        
    }

    const handleResults = () => {

        if(result.length === 0){
            orderedCharacter.map((parentElement) => {
                parentElement.map((childElement) => {
                    result.push(childElement);
                });
            });
        } else {
            orderedCharacter.map((parentElement) => {
                parentElement.map((childElement) => {
                    result.map((elementR) => {
                        if(elementR.id === childElement.id){
                            elementR.wins += childElement.wins;
                        }
                    });
                });
            });

        }


        result.sort((a, b) => {
            if(a.wins > b.wins){
                return -1
            }

            if(a.wins < b.wins){
                return 1
            }

            return 0;
        });
    }


    const handleVeladas = (valor) => {
        if(valor > 0){
            setVeladas(valor);
        } else {
            console.log('Ingrese valor mayor a 0');
        }
        
    }

    const handleStart = () => {
        if(veladas > 0){
            setIsStart(true);
        } else {
            alert('Ingrese un valor mayor a 0');
        }
    }


    const getDamage = (powerAttacker, defenseVictim) => {
        const randomNumberOne = Math.random();
        const randomNumberTwo = Math.random();
        let finalRandomNumber = 0;
        if(randomNumberOne === randomNumberTwo){
            finalRandomNumber = randomNumberOne;
        } else {
            if(randomNumberOne > randomNumberTwo ){
                finalRandomNumber = randomNumberOne - randomNumberTwo;
            } else {
                finalRandomNumber = randomNumberTwo - randomNumberOne;
            }
        }

        return new Promise((resolve) => {
            const finalAttack = powerAttacker * ((defenseVictim / 1000) - finalRandomNumber);
            resolve(finalAttack);
        });

    }
    const fightLoader = () => {
        if(isLoadOrderedCharacter === false && isLoadOrderedCharacterClassified === true){
            const arrayOfFight = orderedCharacter;
            const arrayOfFightLength = orderedCharacter.length -1;
            if(countFirstFight <= arrayOfFightLength ){
                let characterOne = arrayOfFight[countFirstFight][0];
                let characterTwo = arrayOfFight[countFirstFight][1];
                setIdFirstCharacter(characterOne.id);
                setIdSecondCharacter(characterTwo.id);
                setNameFirstCharacter(characterOne.name);
                setNameSecondCharacter(characterTwo.name);
                setPowerFirstCharacter(characterOne.power);
                setPowerSecondCharacter(characterTwo.power);
                setLifeFirstCharacter(characterOne.life);
                setLifeSecondCharacter(characterTwo.life);
                setDefenseFirstCharacter(characterOne.defense);
                setDefenseSecondCharacter(characterOne.defense);
                setIsLoadingFight(false);
            }
        } else if(isLoadOrderedCharacterClassified === false){
            const arrayOfSecondFight = orderedCharacterClassified;
            const arrayOfSecondFightLength = orderedCharacterClassified.length -1;
            if(countSecondFight <= arrayOfSecondFightLength ){
                let characterOne = arrayOfSecondFight[countSecondFight][0];
                let characterTwo = arrayOfSecondFight[countSecondFight][1];
                setIdFirstCharacter(characterOne.id);
                setIdSecondCharacter(characterTwo.id);
                setNameFirstCharacter(characterOne.name);
                setNameSecondCharacter(characterTwo.name);
                setPowerFirstCharacter(characterOne.power);
                setPowerSecondCharacter(characterTwo.power);
                setLifeFirstCharacter(characterOne.life);
                setLifeSecondCharacter(characterTwo.life);
                setDefenseFirstCharacter(characterOne.defense);
                setDefenseSecondCharacter(characterOne.defense);
            }
            
        }

    }

    const timeToAttack = (turn) => {
        return new Promise((resolve) =>{
            setTimeout(() => {
                resolve(turn)
            }, 500)
        })
    }
    
    const next = () => {
        setIsNext(false);
        orderCharacterRandom()
        .then((res) => {
            setCountFirstFight(0);
            setCountSecondFight(0);
            setIsFighting(false);
            setIsLoadingFight(false);
            setIsLoadOrderedCharacter(false)
            setIsLoadOrderedCharacterClassified(true)
            setOrderedCharacterClassified([]);
            setAnotherFight(false);
        });

    }

    const refreshPage = () => {
        window.location.reload(false);
    }

    const fight = async () => {


        //Este while permite que la pelea se siga ejecutando hasta que alguno de los personajes pierda toda la vida
        let turn = 0;
        let lifeFirstCharacterCopy = lifeFirstCharacter;
        let lifeSecondCharacterCopy = lifeSecondCharacter;
        let clasificados = [];
        if(countAllFights <= veladas){
            if(isLoadingFight === false && countFirstFight <= orderedCharacter.length - 1){
                while(lifeFirstCharacterCopy > 0 && lifeSecondCharacterCopy > 0){
                    if(turn === 0){
                        const damageAttacker = await getDamage(powerFirstCharacter, defenseSecondCharacter);
                        lifeSecondCharacterCopy = lifeSecondCharacterCopy - damageAttacker;
    
                        if(lifeSecondCharacterCopy > 0){
                            setLifeSecondCharacter(lifeSecondCharacterCopy);
                        } else {
                            setLifeSecondCharacter(0);
                            lifeSecondCharacterCopy = 0;
                            orderedCharacter[countFirstFight][0].wins = orderedCharacter[countFirstFight][0].wins + 1
                            setIsFighting(false);
                            setCountFirstFight(countFirstFight + 1);
                        }
                        
                        turn = await timeToAttack(1);
    
                        
                    } else{
                        const damageAttacker = await getDamage(powerSecondCharacter, defenseFirstCharacter);
                        lifeFirstCharacterCopy = lifeFirstCharacterCopy - damageAttacker;
                        if(lifeFirstCharacterCopy > 0){
                            setLifeFirstCharacter(lifeFirstCharacterCopy); 
                        } else {
                            setLifeFirstCharacter(0);
                            lifeFirstCharacterCopy = 0;
                            orderedCharacter[countFirstFight][1].wins = orderedCharacter[countFirstFight][1].wins + 1
                            setIsFighting(false);
                            setCountFirstFight(countFirstFight + 1);
                        }
                        
                        turn = await timeToAttack(0);
                        
                    }
                         //HASTA AQUI TODO BIEN          
                }
            } else{ //SEGUNDA  ETAPA PELEA, ES NECESARIO, PUESTO QUE ESTA VEZ VOLVERÁ A ARMARSE UNA BATALLA RANDOM
                if(orderedCharacterClassified.length === 0 ){
                    setIsFighting(false);
                    orderedCharacter.map((element) => {
                        element.map((element) => {
                            if(element.wins >= 1){
                                clasificados.push(element)
                            }
                        })
                    });
                    orderCharacterRandom(clasificados)
                    .then((res)=>{
                        setIsFighting(false);
                    });
                }
                //CORRECION ERROR
                if(orderedCharacterClassified.length > 0){
                    if(countSecondFight <= orderedCharacterClassified.length - 1 ){
                        while(lifeFirstCharacterCopy > 0 && lifeSecondCharacterCopy > 0){
                            if(turn === 0){
                                const damageAttacker = await getDamage(powerFirstCharacter, defenseSecondCharacter);
                                lifeSecondCharacterCopy = lifeSecondCharacterCopy - damageAttacker;
            
                                if(lifeSecondCharacterCopy > 0){
                                    setLifeSecondCharacter(lifeSecondCharacterCopy);
                                } else {
                                    setLifeSecondCharacter(0);
                                    lifeSecondCharacterCopy = 0;
                                    orderedCharacterClassified[countSecondFight][0].wins += 1    
                                    orderedCharacter.map((element, idx) => {
                                        if(element[0].id === orderedCharacterClassified[countSecondFight][0].id){
                                            console.log(orderedCharacterClassified[countSecondFight][0].wins);
                                            element[0].wins = orderedCharacterClassified[countSecondFight][0].wins
                                        }
                                    });
                                    setIsFighting(false);
                                    setCountSecondFight(countSecondFight + 1);
                                }                            
                                turn = await timeToAttack(1);
                            } else{
                                const damageAttacker = await getDamage(powerSecondCharacter, defenseFirstCharacter);
                                lifeFirstCharacterCopy = lifeFirstCharacterCopy - damageAttacker;
                                if(lifeFirstCharacterCopy > 0){
                                    setLifeFirstCharacter(lifeFirstCharacterCopy);
                                } else {
                                    setLifeFirstCharacter(0);
                                    lifeFirstCharacterCopy = 0;
                                    orderedCharacterClassified[countSecondFight][1].wins += 1
                                    orderedCharacter.map((element) => {
                                        if(element[1].id === orderedCharacterClassified[countSecondFight][1].id){
                                            element[1].wins = orderedCharacterClassified[countSecondFight][1].wins;
                                        }
                                    });
                                    setIsFighting(false);
                                    setCountSecondFight(countSecondFight + 1);
                                }
                                turn = await timeToAttack(0);
                            }               
                        }
                    } else {
                        handleResults();
                        setCountAllFights(countAllFights + 1);
                    }
                }
            }
        } else{
            console.log('Se ha excedido el número de peleas')
        }


    }

    
    //Effects


    useEffect(() => {
        getApiCharacters(setApiData, setIsLoading, setErrorCharacters);
    },[]);

    useEffect(() => {
        if(isLoading === false){
            orderCharacterRandom();
        }
    },[isLoading])

    useEffect(() => {
        if(errorCharacters != null){
            console.log(`Errors: ${errorCharacters}`);
        }
    }, [errorCharacters]);

    useEffect(() => {
        if(isFighting === true){
            fight();
        }
    }, [isFighting]);
    
    useEffect(() => {
        if(isNext === true){
            next();
        }
    }, [isNext]);

    useEffect(() => {
        fightLoader();
    },[isLoadOrderedCharacter]);

    useEffect(() => {
        fightLoader();
    },[isLoadOrderedCharacterClassified]);

    useEffect(() => {
        if(countFirstFight > 0){
            fightLoader();
        }
        if(countSecondFight > 0){
            fightLoader();
        }
    },[countFirstFight, countSecondFight])


    useEffect(() => {
        if(isFighting === true && countAllFights <= veladas){
            setAnotherFight(true);
        } else {
            setAnotherFight(false);
        }
    },[countAllFights])


    const PrintTableAndButtonFight = () => {
        if(nameFirstCharacter !== undefined && nameSecondCharacter !== undefined && 
            powerFirstCharacter !== undefined && powerSecondCharacter !== undefined && 
            lifeFirstCharacter !== undefined && lifeSecondCharacter !== undefined && defenseFirstCharacter !== undefined && defenseSecondCharacter !== undefined){
                return(
                    <Grid
                        container
                        justify="center"
                    >
                        <TableFight nameFirstCharacter={nameFirstCharacter} nameSecondCharacter={nameSecondCharacter}
                        powerFirstCharacter={powerFirstCharacter} powerSecondCharacter={powerSecondCharacter}
                        lifeFirstCharacter={lifeFirstCharacter} lifeSecondCharacter={lifeSecondCharacter}
                        defenseFirstCharacter={defenseFirstCharacter} defenseSecondCharacter={defenseSecondCharacter}
                        />
                        <Grid>
                            
                            <Button variant="contained" color="primary" className={classes.buttonFight} onClick={() => handleButtonFight()} disabled={isFighting}>Fight!</Button>
                            <Button variant="contained" color="secondary" onClick={() => handleButtonNext()} disabled={!anotherFight} className={classes.buttonAnotherBattle}>Fight Again</Button>
                            <Button variant="contained" color="secondary" onClick={() => refreshPage()} className={classes.buttonReload}>Reload</Button>
                        </Grid>
                    </Grid>
                );
            } else {
                return null;
            }
    }


    const PrintSelectVeladas = () => {
        if(isStart === false){
            return (
                <Grid>
                    <TextField min="1" id="standard-basic" label="Number of Tournaments"
                    value={veladas} key={1} onChange={(e) => {handleVeladas(e.target.value)}} type="number"
                    InputProps={{
                        inputProps: { 
                            min: 1 
                        }
                    }}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleStart()}>
                        Start
                    </Button>
                </Grid>
            );
        } else {
            return null;
        }
    }

    const PrintDashboard = () => {
        if(isStart === true){
            return (
                <Grid>
                    <PrintTableAndButtonFight/>
                    <Grid
                        container
                        justify="center"
                        spacing={4}
                    >
                        
                        {(orderedCharacter !== undefined && orderedCharacterClassified !== undefined) &&
                        <TableOrderedCharacter orderedCharacter={orderedCharacter} orderedCharacterClassified={orderedCharacterClassified} />   
                        }
                        {result.length >= 0 &&
                            <TableResult result={result}/>
                        }
                        
                    </Grid>    
            </Grid>
            )
        } else {
            return null;
        }
    }

    return (
            <Grid
                container
                direction="row"
                justify="center"
                className={classes.container}
            >

                <PrintSelectVeladas/>
                <PrintDashboard/>
            </Grid>
    );
}
