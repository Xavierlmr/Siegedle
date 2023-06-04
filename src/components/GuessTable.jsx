import { Stack, styled } from "@mui/material"
import { Paper } from "@mui/material"
import { Tooltip } from "@mui/material"
import {useState, useEffect, useRef} from 'react'

const red = "#E54A29"
const green = "#29BF39"
const orange = "#FFA437"


const CssPaper = styled(Paper)({
    width: 90,
    height: 90,
    fontWeight : 'bold',
    fontSize: 'smaller',
    display: "flex",
    opacity: 0,
    justifyContent: "center",
    alignItems: "center",
    overflowWrap: 'break-word',
    transition: 'opacity 0.5s'
})

export default function GuessTable({operator, name, answer}){
    const nodeListRef = useRef(null);
    
    useEffect(() => {
        const stackChildren = Array.from(nodeListRef.current.children).slice(1);
        const numChildren = stackChildren.length;
    
        let currentIndex = 0;
        const interval = setInterval(() => {
          stackChildren[currentIndex].style.opacity = 1;
          currentIndex = (currentIndex + 1) % numChildren;
        }, 500);
    
        return () => clearInterval(interval);
      }, []);

    const color = function(category){
        const value = operator[category];
        if(Array.isArray(value)){
            let count = 0
            for(let i=0; i<value.length;i++){
                if(answer[1][category].includes(value[i])){
                    count = count+1;
                }
            }
            if (count==value.length){
                return green
            }
            if (count==0){
                return red
            }
            return orange
        }
        if (value === answer[1][category]){
            return green
        }
        return red
    }

    function sum(){
        return (Number(answer[1].Year)-Number(operator.Year))
      }
    return(
        <>
        <Stack
        ref={nodeListRef}
        direction="row"
        justifyContent="space-between"
        alignItems="center" marginBottom={0.5}
        >
            <Tooltip title={name}>
                <CssPaper sx={{backgroundColor: '#D2D2D2',opacity: 1}}>
                    <img
                    loading="lazy"
                    width="100"
                    src={`./assets/operatorspng/${name.toLowerCase()}.png`}
                    srcSet={`./assets/operatorspng/${name.toLowerCase()}.png 2x`}
                    alt=""
                    style={{objectFit: "cover"}}
                    />
                </CssPaper>
            </Tooltip>
            <CssPaper sx={{backgroundColor:color("Position")}}>{operator.Position}</CssPaper>
            <CssPaper sx={{backgroundColor:color("Gender")}}>{operator.Gender}</CssPaper>
            <CssPaper sx={{backgroundColor:color("Health/Speed")}}>{operator["Health/Speed"]}</CssPaper>
            <CssPaper sx={{backgroundColor:color("Year")}}>
            {operator.Year}
            {sum()>0 && '🔼'}   
            {sum()<0 && '🔽'}
            </CssPaper>
            <CssPaper sx={{backgroundColor:color("Country")}}>{operator.Country}</CssPaper>
            <CssPaper sx={{backgroundColor:color("Speciality")}}>{operator.Speciality.toString()}</CssPaper>
        </Stack>
        </>
    )
}