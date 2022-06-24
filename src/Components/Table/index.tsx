import React, { useContext } from "react";
import { Table } from "semantic-ui-react";
import styled from "styled-components";
import { AppContext } from "../Checkout";

interface ITableProps {}

const Container = styled.div`
    overflow-y: auto;
`;

export default function index({}: ITableProps) {
    const context = useContext(AppContext);

    return (
        <Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan="2">Nome</Table.HeaderCell>
                        <Table.HeaderCell rowSpan="2">
                            Quantidade
                        </Table.HeaderCell>
                        <Table.HeaderCell rowSpan="2">
                            Valor Unitário
                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan="3">
                            Valor Total
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {context.productList.map((p, key: number) => (
                        <Table.Row key={key}>
                            <Table.Cell>{p.productName}</Table.Cell>
                            <Table.Cell>{p.quantity}</Table.Cell>
                            <Table.Cell>
                                {p.unitValue.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </Table.Cell>
                            <Table.Cell>
                                {p.totalValue.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    );
}
