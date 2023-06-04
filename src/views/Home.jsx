import { useState, useEffect } from 'react'
import React from 'react'
import logo from '../assets/siegedle.png'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import operators from '../../agents.json';
import GuessTable from '../components/GuessTable';
import { Divider } from '@mui/material';

const CssTextField = styled(TextField)({
  '& input':{
    color: 'white',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& label': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

const CssBox = styled(Box)({
  width : 90,
  fontWeight :  500,
  fontSize: 15
})
let operatorsList = Object.keys(operators);
let item = operatorsList[Math.floor(Math.random()*operatorsList.length)];
console.log(item);

const getOperator = function(name){
  return operators[name];
}


export default function Home() {
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState(null);
    const [guesses, setGuesses] = useState([]);
    const [count, setCount] = useState(0);



    useEffect(() => {
      // item = test[Math.floor(Math.random()*test.length)];

  
      // Fetch data every 24 hours
      const interval = setInterval(setItem, 86400000);
  
      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }, []);

    function handleClick(){
      if (value){
        setGuesses([...guesses,value]);
        operatorsList.splice(operatorsList.indexOf(inputValue),1)
        setValue(null);
      }
    }

    const setItem = () => {
      item = operatorsList[Math.floor(Math.random()*operatorsList.length)];
      setGuesses([]);
      setCount(0);
    };
    
    return (
      <div className="App">
        <div>
            <img src={logo} className="logo" alt="Siegedle logo" />
        </div>
        <Stack
        direction="row" 
        justifyContent="center"
        alignItems="center"
        spacing={1}
        mb={5}
        >
        <Autocomplete
        disablePortal
        sx={{ width: 300 }}
        id="combo-box-demo"
        options={operatorsList}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="65"
            src={`./assets/operatorspng/${option.toLowerCase()}.png`}
            srcSet={`./assets/operatorspng/${option.toLowerCase()}.png 2x`}
            alt=""
          />
          {option}
        </Box>
        )}
        renderInput={(params) => <CssTextField {...params} label="Pick an operator"/>}
        />       
        <IconButton disabled={!inputValue} aria-label="validate" sx={{
          'backgroundColor':"grey",
          '&:hover':{
            backgroundColor: "white",
            '& .validateIcon':{
              color: "black",
        }}}}
        onClick={() => {setCount((count) => count + 1);handleClick();}}
        >
          <ArrowForwardIcon className="validateIcon" sx={{
            'color': "white",
          }}/>
        </IconButton>
        </Stack>
        {count>0 &&
        <>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mb={1}
          divider={<Divider sx={{backgroundColor:'white'}} orientation="vertical" flexItem />}
        >
            <CssBox>Operator</CssBox>
            <CssBox>Position</CssBox>
            <CssBox>Gender</CssBox>
            <CssBox>Health / Speed</CssBox>
            <CssBox>Release year</CssBox>
            <CssBox>Country</CssBox>
            <CssBox>Speciality</CssBox>
        </Stack>
        {guesses.map((guess, index) => (
          <GuessTable key={index} operator={getOperator(guess)} name={guess} answer={[item,operators[item]]}/>
        ))}
        </>}
      </div>
    )
  }