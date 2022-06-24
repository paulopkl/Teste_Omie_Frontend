import Link from "next/link";
import React, { useContext } from "react";
import { Icon } from "semantic-ui-react";
import styled, { css } from "styled-components";
import { AppContext } from "../Checkout";

interface IButtonProps {
    cancel?: boolean;
    save?: boolean;
}

interface IContainer {
    height?: string;
}

interface ITitle {
    mini?: boolean;
}

const HandleOrderWrapper = styled.div`
    width: 420px;
    background-color: #031d3e;
    height: 94%;
    padding: 60px 20px;

    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 20px;

    @media (max-width: 1200px) {
        height: 80vh;
        flex-direction: column;
        width: 75vw;
        padding: 60px 10%;

        @media (max-width: 600px) {
            width: 80vw;
            padding: 60px 8%;
        }
    }
`;

const Container = styled.div<IContainer>`
    background: #20344c;
    padding: 20px 16px;
    border-radius: 8px;
    height: ${(props) => props.height ?? "25vh"};

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 1200px) {
        /* margin: 12px 20% 12px 20%; */
        /* paddig: 12px 20% 12px 20%; */
    }
`;

const Title = styled.h2<ITitle>`
    ${({ mini }) =>
        mini
            ? css`
                  font-size: 0.9rem;
                  color: #ff5c47;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  font-weight: 400;
              `
            : css`
                  color: #fff;
                  font-size: 1.5rem;
              `}
`;

const SubTitle = styled.p`
    color: #fff;
    font-size: 1rem;
    margin-bottom: 50px;
`;

const Value = styled.span`
    color: #fff;
    font-size: 1.2rem;
    font-family: "Roboto";
    font-weight: 700;
`;

const Table = styled.table`
    border-collapse: separate;
    border-radius: 4px 4px 4px 4px;
    border-width: 0px;
    border-spacing: 0px 0px;
    text-align: left;
    width: 100%;
    margin: 0 0 15px;
    line-height: 1.7em;
`;

const ColumnLabel = styled.th`
    color: #8696a8;
    padding: 12px 12px 12px 0;
    line-height: 1.5em;
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: space-around;
`;

const Button = styled.button<IButtonProps>`
    padding: 15px 30px;
    color: #f9f9f9;
    border-radius: 4px;
    border: none;
    transition: 1s;
    font-size: 1.2rem;
    font-family: "Roboto";

    &:hover {
        transition: 1s;
        cursor: pointer;
        filter: grayscale(40%);
        filter: drop-shadow(2px 2px 4px black);
    }

    ${({ cancel, save }) =>
        cancel
            ? css`
                  background-color: #971c1c;
              `
            : save
            ? css`
                  background-color: #258a25;
              `
            : css`
                  background-color: #f9f9f9;
                  color: #0d75ff;

                  &:hover {
                      background-color: #c4c4c4;
                  }
              `}
`;

export default function index() {
    const context = useContext(AppContext);

    return (
        <HandleOrderWrapper>
            <Container>
                <Title>Total do Carrinho</Title>
                <Table>
                    <tbody>
                        <tr>
                            <ColumnLabel>Quantidade de itens:</ColumnLabel>
                            <td data-title="Subtotal">
                                <Value>
                                    <bdi>{context.productList.length}</bdi>
                                </Value>
                            </td>
                        </tr>
                        <tr>
                            <ColumnLabel>Valor total do pedido:</ColumnLabel>
                            <td data-title="Total">
                                <Value>
                                    <bdi>
                                        {context.productList
                                            .map((p) => p.totalValue)
                                            .reduce(
                                                (currentValue, nextValue) =>
                                                    currentValue + nextValue,
                                                0
                                            )
                                            .toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                    </bdi>
                                </Value>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <ActionButtons>
                    <Button cancel onClick={context.handleOnCancel}>
                        Cancelar
                    </Button>
                    <Button save onClick={context.handleOnSave}>
                        Salvar
                    </Button>
                </ActionButtons>
            </Container>
            <Container height="auto">
                <Title mini>Continuar comprando</Title>
                <SubTitle>Aproveite as promoções</SubTitle>
                <Link href="/">
                    <Button>
                        <Icon name="chevron left" /> Voltar
                    </Button>
                </Link>
            </Container>
        </HandleOrderWrapper>
    );
}
