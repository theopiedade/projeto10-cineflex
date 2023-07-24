import styled from "styled-components"
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios';
import Seats from "./Seats";

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

export default function SeatsPage() {

    const [items, setItems] = useState([]);
    const sessionId = useParams().idSessao;
    const [seatsSelected, setSeatsSelected] = useState([]);
    const [seatsNumSelected, setSeatsNumSelected] = useState([]);
    const [name, setName] = useState();
    const [cpf, setCPF] = useState();
    const navigate = useNavigate();

    function sendSelect(event) {
        event.preventDefault();

        console.log("Entrou em sendSelect");
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`;

        const obj = {
            ids: seatsSelected,
            name: name,
            cpf: cpf
        }

        const promisse = axios.post(URL, obj);

        const sTitle = items.movie.title;
        const sDay = items.day.weekday;
        const sHour = items.name;
        const sSeats = seatsNumSelected;
        const sName = name;
        const sCPF = cpf;

        promisse.then(() => navigate("/sucesso", { 
            state: { sTitle, sDay, sHour, sSeats, sName, sCPF}
         }));
      }

    useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessionId}/seats`);

        requisicao.then(resposta => {
            setItems(resposta.data);
        });

        }, []);

    if(items.length === 0 || items === null) {
        return <h1>Loading...</h1>;
    }


    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
            {
            items.seats.map(item =>
                <Seats key={item.id} id={item.id} name={item.name} isAvailable={item.isAvailable}
                seatsSelected={seatsSelected} setSeatsSelected={setSeatsSelected} 
                seatsNumSelected={seatsNumSelected} setSeatsNumSelected={setSeatsNumSelected}
                />
             )
            }
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle color="0" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="1" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="2" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer >
                <form onSubmit={sendSelect}>
                Nome do Comprador:
                <input type="text" data-test="client-name" onChange={e => setName(e.target.value)}  />

                CPF do Comprador:
                <input type="number" data-test="client-cpf" onChange={e => setCPF(e.target.value)}  />

                <button data-test="book-seat-btn">Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={items.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{items.movie.title}</p>
                    <p>{items.day.weekday} - {items.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        margin-top: 20px;
        align-self: center;
        border-radius: 3px;
        background: #E8833A;
        color: #FFF;
        height: 42px;
        width: 225px;
        border-color: #E8833A;
    }
    input {
        margin-bottom: 9px;
        width: calc(100vw - 60px);
        border-radius: 3px;
        border: 1px solid #D4D4D4;
        background: #FFF;
        height: 51px;
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border-color: ${props => borderColors[props.color]};         // Essa cor deve mudar
    background-color: ${props => circleColors[props.color]};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
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
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`