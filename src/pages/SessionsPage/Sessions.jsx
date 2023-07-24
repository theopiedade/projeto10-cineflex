import styled from "styled-components"
import { Link } from "react-router-dom";


export default function Sessions ({id, weekday, date, showtimes}) {
    return(
    <SessionContainer key={id} data-test="movie-day" >
                        <h1> {weekday} - {date} </h1> 
                        <ButtonsContainer key={id}> 
                            {
                            showtimes.map(show =>
                                <Link key={show.id} to={`/assentos/${show.id}`}>
                                    <button data-test="showtime">{show.name}</button>
                                </Link>
                            )}
                        </ButtonsContainer>
    </SessionContainer>
    );
}

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
    h1 {
        color: #293845;
        font-family: Roboto;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.4px;
    }
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        color: #FFF;
        margin-right: 20px;
        width: 83px;
        height: 43px;
        flex-shrink: 0;
        border-radius: 3px;
        background: #E8833A;
        border-color: #E8833A;
    }
    a {
        text-decoration: none;
        color: #FFF;
    }
`