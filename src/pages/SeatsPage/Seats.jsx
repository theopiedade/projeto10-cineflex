import styled from "styled-components"
import { useState, useEffect } from 'react';

const circleColors = [
    "#1AAE9E",
    "#C3CFD9",
    "#FBE192"
];

const borderColors = [
    "#0E7D71",
    "#7B8B99",
    "#F7C52B"
];

export default function Seats({id, name, isAvailable, seatsSelected, setSeatsSelected}) {

 const [color, setColor] = useState();

 function seatSelect(sId, sName) {
    if (seatsSelected.indexOf(sId) === -1) {
        setSeatsSelected([...seatsSelected,sId]);
    }
    else {
        let arrSeatsSelected = seatsSelected;
        let index = seatsSelected.indexOf(sId);
        arrSeatsSelected.splice(index,1);
        setSeatsSelected(arrSeatsSelected); 
    }
  
    if (color === 0) setColor(1);
    else setColor(0);
 }
 console.log(seatsSelected);

 useEffect(() => {
    if (isAvailable) setColor(1);
    else if (!isAvailable) setColor(2);
    else setColor(0);
}, []);

 return (
    <SeatItem color={color} onClick={() => isAvailable ? seatSelect(id, name) : ""}>
        {name}
    </SeatItem>
 );

}

const SeatItem = styled.div`
    border: ${props => borderColors[props.color]};     // Essa cor deve mudar
    background-color: ${props => circleColors[props.color]};   // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`