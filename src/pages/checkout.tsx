import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Message } from "semantic-ui-react";
import styled from "styled-components";
import CheckoutComponent from "../Components/Checkout";

interface ICheckoutProps {
    orderNumber: number;
}

const Title = styled.h1`
    margin: 0 0 32px 0;
    color: #011e3f;
    font-weight: 700;
    font-size: 2.5rem;
    font-family: "Roboto";
    
    @media (max-width: 600px) {
        font-size: 2rem;
        width: 80%;

        @media (max-width: 370px) { font-size: 1.75rem; }
    }
`;

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #f9f9f9;

    @media (max-width: 1200px) {
        padding: 10vh 0;
        height: 100%;
    }
`;

const Checkout: NextPage<ICheckoutProps> = ({ orderNumber }) => {

    return (
        <Body>
            <Title>Carrinho - Numero do Pedido: {orderNumber + 1}</Title>
            <CheckoutComponent orderNumber={orderNumber + 1} />
        </Body>
    );
};

export async function getStaticProps() {
    const response = await fetch(`${process.env.API_URL}/get-total-orders`);
    const data = await response.json();
    
    return {
        props: { ...data },
    };
}

export default Checkout;
