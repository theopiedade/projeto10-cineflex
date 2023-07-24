import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom"
import Sessions from "./Sessions";

export default function SessionsPage() {
    
    const [items, setItems] = useState([]);
    const movieId = useParams().idFilme;

    useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${movieId}/showtimes`);

        requisicao.then(resposta => {
            setItems(resposta.data);
        });

        }, []);

    if(items.length === 0 || items === null) {
        return <h1>Loading...</h1>;
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
            {
            items.days.map(item =>
                    <Sessions key={item.id} weekday={item.weekday} date={item.date} showtimes={item.showtimes} />
             )}
            </div>

            <FooterContainer>
                <div>
                    <img data-test="footer" src={items.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{items.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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