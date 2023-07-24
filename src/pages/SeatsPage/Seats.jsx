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

export default function Seats({id, name, isAvailable, 
    seatsSelected, setSeatsSelected, seatsNumSelected, setSeatsNumSelected}) {

 const [color, setColor] = useState();

 function seatSelect(sId, sName) {
    if (seatsSelected.indexOf(sId) === -1) {
        setSeatsSelected([...seatsSelected,sId]);
        setSeatsNumSelected([...seatsNumSelected,sName]);
    }
    else {
        let arrSeatsNumSelected = seatsNumSelected;
        let arrSeatsSelected = seatsSelected;

        let index = seatsSelected.indexOf(sId);
        let index2 = seatsNumSelected.indexOf(sId);

        arrSeatsSelected.splice(index,1);
        arrSeatsNumSelected.splice(index2, 1);

        setSeatsSelected(arrSeatsSelected);
        setSeatsNumSelected(arrSeatsNumSelected);
    }
  
    if (color === 0) setColor(1);
    else setColor(0);
 }

 useEffect(() => {
    if (isAvailable) setColor(1);
    else if (!isAvailable) setColor(2);
    else setColor(0);
}, []);

 return (
    <SeatItem color={color} onClick={() => isAvailable ? seatSelect(id, name) : alert("Esse assento não está disponível")}>
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