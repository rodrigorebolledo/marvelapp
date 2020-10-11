import React, { useEffect, useState } from 'react';
import { getApiCharacters} from '../commons/Api';
import Button from '@material-ui/core/Button';

const powerList = [1000, 1250, 1100, 1150, 995, 1200]
const lifeList = [5000, 4750, 4500, 4250, 4000, 3750]
const defense = [1000, 950, 900, 850, 800, 750]
const randomNumberBetweenRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}


export default function Championship(){
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorCharacters, setErrorCharacters] = useState(null);
    const [orderedCharacter, setOrderedCharacter] = useState([]);
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
    const [countFights, setCountFights] = useState(0);
    const [isLoadingFight, setIsLoadingFight] = useState(true)
    const [isLoadOrderedCharacter, setIsLoadOrderedCharacter] = useState(true);
    //Functions 
    const createListOfCharacter = () => {
        let arrayOfCharacters = []
        apiData.map((element) => {
            arrayOfCharacters.push({'name': element.name});
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

    const orderCharacterRandom =  async () => {
        let arrayOfCharacters = await createListOfCharacter();
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
                setOrderedCharacter(orderedCharacters);
                setIsLoadOrderedCharacter(false);

            }

    }

    const handleButtonFight = () => {
        if(isFighting === false){
            setIsFighting(!isFighting)
            console.log('pelea');
        } else {
            console.log('Hay una pelea en curso');
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
        if(isLoadOrderedCharacter === false){
            const arrayOfFight = orderedCharacter;
            const arrayOfFightLength = orderedCharacter.length -1;
            if(countFights <= arrayOfFightLength ){
                let characterOne = arrayOfFight[countFights][0];
                let characterTwo = arrayOfFight[countFights][1];
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
        }

    }

    const timeToAttack = (turn) => {
        return new Promise((resolve) =>{
            setTimeout(() => {
                resolve(turn)
            }, 1000)
        })
    }
    


    const fight = async () => {
        //Este while permite que la pelea se siga ejecutando hasta que alguno de los personajes pierda toda la vida
        let turn = 0;
        let lifeFirstCharacterCopy = lifeFirstCharacter;
        let lifeSecondCharacterCopy = lifeSecondCharacter;
        if(isLoadingFight === false){
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
                        console.log(`El ganador es: ${nameFirstCharacter}`);
                        setIsFighting(false);
                        setCountFights(countFights + 1);
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
                        console.log(`El ganador es: ${nameSecondCharacter}`);
                        setIsFighting(false);
                        setCountFights(countFights + 1);
                    }
                    
                    turn = await timeToAttack(0);
                    
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
        fightLoader();
    },[isLoadOrderedCharacter]);

    return (
        <Button
            onClick={() => handleButtonFight() }
        >
            Pelear
        </Button>
    );
}
