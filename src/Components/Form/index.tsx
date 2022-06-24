import React, { useContext, useState } from "react";
import { DropdownProps, Form, Grid, Input, Select } from "semantic-ui-react";
import styled from "styled-components";
import { AppContext, genderOptions } from "../Checkout";

interface IOptions {
    key: string;
    value: string;
    text: string;
    price: number;
}

interface IValidationErrors {
    field: string;
    content: string;
}

const Label = styled.label``;

const ButtonSubmit = styled.button`
    padding: 15px 30px;
    color: #f9f9f9;
    background-color: #0d75ff;
    border-radius: 4px;
    border: none;
    font-size: 1.2rem;
    font-family: "Roboto";
    transition: 1s;

    &:hover {
        transition: 1s;
        cursor: pointer;
        filter: grayscale(40%);
        filter: drop-shadow(2px 2px 4px black);
    }
`;

export default function index() {
    const context = useContext(AppContext);

    const [validationErrors, setValidationErrors] = useState<
        IValidationErrors[]
    >([]);

    const onChangeSelect = (
        event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        context.setState({
            ...context.state,
            unitValue:
                genderOptions.find((p) => p.value === data.value)?.price || 0,
            productName: String(data.value),
        });
    };

    const onChangeRequiredField = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValidationErrors([]);

        context.setState({
            ...context.state,
            clientName: ev.target.value,
        });
    };

    const HandleOnAdd = () => {
        let verifyError = [...validationErrors];

        if (verifyError.some((err) => err.field === "clientName")) {
            if (context.state.clientName.length > 0)
                verifyError.splice(
                    verifyError.findIndex((err) => err.field === "clientName"),
                    1
                );
        } else {
            if (context.state.clientName.length === 0)
                verifyError.push({
                    field: "clientName",
                    content: "Erro ao salvar o nome do cliente",
                });
        }

        if (verifyError.length === 0) {
            context.onAddItemToList();
        } else {
            setValidationErrors(verifyError);
        }
    };

    return (
        <Form>
            <Form.Group widths="equal">
                <Form.Input
                    label="Nome do Cliente"
                    required
                    error={
                        validationErrors.find(
                            (err) => err.field === "clientName"
                        ) || false
                    }
                    value={context.state.clientName}
                    onChange={onChangeRequiredField}
                    placeholder="Escrever nome do cliente"
                />
                <Form.Field>
                    <Label>Produto</Label>
                    <Select
                        options={genderOptions}
                        onChange={onChangeSelect}
                        value={context.state.productName}
                    />
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field width={8}>
                    <Label>Quantidade</Label>
                    <input
                        value={context.state.quantity}
                        onChange={(ev) =>
                            context.setState({
                                ...context.state,
                                quantity: Number(ev.target.value),
                            })
                        }
                        placeholder="Quantidade"
                        type="number"
                        max="10000"
                    />
                </Form.Field>
                <Form.Input
                    width={4}
                    label="Valor unitário"
                    value={Number(context.state.unitValue).toLocaleString(
                        "pt-BR",
                        {
                            style: "currency",
                            currency: "BRL",
                        }
                    )}
                    readOnly
                    placeholder="Valor unitário"
                />
                <Form.Input
                    width={4}
                    label="Valor unitário"
                    value={Number(
                        context.state.quantity * context.state.unitValue
                    ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                    readOnly
                    placeholder="Valor total"
                />
            </Form.Group>
            <Grid>
                <Grid.Row>
                    <Grid.Column
                        width={6}
                        verticalAlign="bottom"
                        textAlign="left"
                    >
                        <ButtonSubmit type="submit" onClick={HandleOnAdd}>
                            Incluir
                        </ButtonSubmit>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
    );
}
