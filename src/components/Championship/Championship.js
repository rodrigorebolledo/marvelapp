import React, { useEffect, useState } from 'react';
import { getApiCharacters} from '../commons/Api';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const powerList = [1000, 1250, 1100, 1150, 995, 1200]
const lifeList = [5000, 4750, 4500, 4250, 4000, 3750]
const defense = [1000, 950, 900, 850, 800, 750]
const randomNumberBetweenRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
    }
});

export default function Championship(){
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorCharacters, setErrorCharacters] = useState(null);
    const [orderedCharacter, setOrderedCharacter] = useState([]);
    const [orderedCharacterClassified, setOrderedCharacterClassified] = useState([]);
    const [isFighting, setIsFighting] = useState(false);
    const [stateFirstCharacter, setStateFirstCharacter ] = useState({})
    const [stateSecondCharacter, setStateSecondCharacter ] = useState({})
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
    const [isLoadingSecondFight, setIsLoadingSecondFight] = useState(true)
    const [isLoadOrderedCharacter, setIsLoadOrderedCharacter] = useState(true);
    const [isLoadOrderedCharacterClassified, setIsLoadOrderedCharacterClassified] = useState(true);
    const [result, setResult] = useState([]);
    const [idFirstCharacter, setIdFirstCharacter] = useState();
    const [idSecondCharacter, setIdSecondCharacter] = useState();
    const [isNext, setIsNext] = useState(false);
    const [veladas, setVeladas] = useState(3);
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
        })

    }

    const handleButtonFight = () => {
        if(isFighting === false){
            setIsFighting(!isFighting)
            console.log('pelea');
        } else {
            console.log('Hay una pelea en curso');
        }
        
    }

    const handleButtonNext = () => {
        if(isNext === false){
            setIsNext(!isNext)
            console.log('Next');
        } else {
            console.log('Hay una next en curso');
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
        console.log('isLoadOrderedCharacter: ' + isLoadOrderedCharacter);
        console.log('isLoadOrderedCharacterClassified: ' + isLoadOrderedCharacterClassified);
        if(isLoadOrderedCharacter === false && isLoadOrderedCharacterClassified === true){
            console.log('Primera etapa pelea');
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
            console.log('Segunda etapa pelea');
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
                setIsLoadingSecondFight(false);
            }
            
        }

    }

    const timeToAttack = (turn) => {
        return new Promise((resolve) =>{
            setTimeout(() => {
                resolve(turn)
            }, 0)
        })
    }
    
    const next = () => {
        console.log('ejecuta next');
        setIsNext(false);
        orderCharacterRandom(result)
        .then((res) => {
            setCountFirstFight(0);
            setCountSecondFight(0);
            setIsFighting(false);
            setIsLoadingFight(false);
            setIsLoadOrderedCharacter(false)
            setIsLoadOrderedCharacterClassified(true)
            setOrderedCharacterClassified([]);
        });

    }

    const fight = async () => {
        //Este while permite que la pelea se siga ejecutando hasta que alguno de los personajes pierda toda la vida
        let turn = 0;
        let lifeFirstCharacterCopy = lifeFirstCharacter;
        let lifeSecondCharacterCopy = lifeSecondCharacter;
        let clasificados = [];
        console.log('isLoadingFight ' + isLoadingFight);
        console.log('countFirstFight ' + countFirstFight);
        console.log('orderedCharacter.length  ' + (orderedCharacter.length -1));
        if(isLoadingFight === false && countFirstFight <= orderedCharacter.length - 1){
            while(lifeFirstCharacterCopy > 0 && lifeSecondCharacterCopy > 0){
                if(turn === 0){
                    const damageAttacker = await getDamage(powerFirstCharacter, defenseSecondCharacter);
                    console.log('ataque efectivo primer lugar: ' + damageAttacker);
                    lifeSecondCharacterCopy = lifeSecondCharacterCopy - damageAttacker;

                    if(lifeSecondCharacterCopy > 0){
                        setLifeSecondCharacter(lifeSecondCharacterCopy);
                    } else {
                        setLifeSecondCharacter(0);
                        lifeSecondCharacterCopy = 0;
                        orderedCharacter[countFirstFight][0].wins = orderedCharacter[countFirstFight][0].wins + 1
                        console.log(`El ganador es: ${nameFirstCharacter}`);
                        console.log(orderedCharacter[countFirstFight][1].id);
                        result.push(orderedCharacter[countFirstFight][1]);
                        setIsFighting(false);
                        setCountFirstFight(countFirstFight + 1);
                    }
                    
                    turn = await timeToAttack(1);

                    
                } else{
                    const damageAttacker = await getDamage(powerSecondCharacter, defenseFirstCharacter);
                    console.log('ataque efectivo segundo lugar: ' + damageAttacker);
                    lifeFirstCharacterCopy = lifeFirstCharacterCopy - damageAttacker;
                    if(lifeFirstCharacterCopy > 0){
                        setLifeFirstCharacter(lifeFirstCharacterCopy); 
                    } else {
                        setLifeFirstCharacter(0);
                        lifeFirstCharacterCopy = 0;
                        orderedCharacter[countFirstFight][1].wins = orderedCharacter[countFirstFight][1].wins + 1
                        console.log(`El ganador es: ${nameSecondCharacter}`);
                        
                        result.push(orderedCharacter[countFirstFight][0]);
                        setIsFighting(false);
                        setCountFirstFight(countFirstFight + 1);
                    }
                    
                    turn = await timeToAttack(0);
                    
                }
                               
            }
        } else{ //SEGUNDA  ETAPA PELEA, ES NECESARIO, PUESTO QUE ESTA VEZ VOLVERÁ A ARMARSE UNA BATALLA RANDOM
            if(orderedCharacterClassified.length === 0 ){
                orderedCharacter.map((element) => {
                    element.map((element) => {
                        if(element.wins >= 1){
                            clasificados.push(element)
                        }
                    })
                });
                orderCharacterRandom(clasificados)
                .then((res)=>{
                    setOrderedCharacterClassified(res);
                    setIsFighting(false);
                });
            }
            if(orderedCharacterClassified.length > 0){
                if(countSecondFight <= orderedCharacterClassified.length - 1 ){
                    while(lifeFirstCharacterCopy > 0 && lifeSecondCharacterCopy > 0){
                        if(turn === 0){
                            const damageAttacker = await getDamage(powerFirstCharacter, defenseSecondCharacter);
                            console.log('ataque efectivo primer lugar: ' + damageAttacker);
                            lifeSecondCharacterCopy = lifeSecondCharacterCopy - damageAttacker;
        
                            if(lifeSecondCharacterCopy > 0){
                                setLifeSecondCharacter(lifeSecondCharacterCopy);
                            } else {
                                setLifeSecondCharacter(0);
                                lifeSecondCharacterCopy = 0;
                                orderedCharacterClassified[countSecondFight][0].wins = orderedCharacterClassified[countSecondFight][0].wins + 1
                                console.log(`El ganador es: ${nameFirstCharacter}`);
                                result.push(orderedCharacterClassified[countSecondFight][1]);
                                result.push(orderedCharacterClassified[countSecondFight][0]);
                                setIsFighting(false);
                                setCountSecondFight(countSecondFight + 1);
                            }
                            
                            turn = await timeToAttack(1);
        
                            
                        } else{
                            const damageAttacker = await getDamage(powerSecondCharacter, defenseFirstCharacter);
                            console.log('ataque efectivo segundo lugar: ' + damageAttacker);
                            lifeFirstCharacterCopy = lifeFirstCharacterCopy - damageAttacker;
                            if(lifeFirstCharacterCopy > 0){
                                setLifeFirstCharacter(lifeFirstCharacterCopy); 
                            } else {
                                setLifeFirstCharacter(0);
                                lifeFirstCharacterCopy = 0;
                                orderedCharacterClassified[countSecondFight][1].wins = orderedCharacterClassified[countSecondFight][1].wins + 1
                                console.log(`El ganador es: ${nameSecondCharacter}`);
                                result.push(orderedCharacterClassified[countSecondFight][0]);
                                result.push(orderedCharacterClassified[countSecondFight][1]);
                                setIsFighting(false);
                                setCountSecondFight(countSecondFight + 1);
                            }
                            
                            turn = await timeToAttack(0);
                            
                        }
                                       
                    }
                } else {
                    console.log(orderedCharacterClassified);
                }
            }
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

    return (
        <div className={classes.root}>
        <Button
            onClick={() => handleButtonFight() }
        >
            Pelear
        </Button>
        <Button
            onClick={() => console.log(result)}
        >
            Resultados
        </Button>
        <Button
            onClick={() => handleButtonNext() }
        >
            Otra Batalla
        </Button>
        </div>


    );
}
