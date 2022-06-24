import React, { useState } from "react";
import TableProducts from "../Table";
import styled from "styled-components";
import FormComponent from "../Form";
import HandleOrderComponent from "../HandleOrder";
import axios from "../../configs/axios";
import { Message } from "semantic-ui-react";

interface ICheckoutComponentProps {
    orderNumber: number;
}

interface IState {
    orderNumber: number;
    clientName: string;
    productName: string;
    quantity: number;
    unitValue: number;
    totalValue: number;
}

interface IOptions {
    key: string;
    value: string;
    text: string;
    price: number;
}

interface IProductList {
    productName: string;
    quantity: number;
    unitValue: number;
    totalValue: number;
}

interface IShowMessage {
    show: boolean;
    type: "success" | "error";
    message: string;
}

interface IContext {
    state: IState;
    productList: IProductList[];
    setState: (state: IState) => void;
    onAddItemToList: () => void;
    handleOnSave: () => void;
    handleOnCancel: () => void;
}

const CheckoutContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1200px) {
        flex-direction: column;
    }
`;

const CheckoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;

    width: 750px;
    max-width: 800px;
    height: 70vh;
    background-color: #fff;
    padding: 30px;
    box-shadow: 0px 24px 64px -8px rgba(1, 30, 63, 0.2);

    @media (max-width: 1200px) {
        width: 80vw;
        height: auto;
        max-width: none;
    }
`;

const MessageResponse = styled(Message)`
    position: absolute !important;
    top: 30px;
    right: 30px;
`;

export const genderOptions: IOptions[] = [
    { key: "1", value: "Mouse Gamer", text: "Mouse Gamer", price: 99 },
    {
        key: "2",
        value: "Computador Gamer",
        text: "Computador Gamer",
        price: 7799.99,
    },
    { key: "3", value: "Teclado", text: "Teclado", price: 195 },
    { key: "4", value: "Processador", text: "Processador", price: 899.98 },
    { key: "5", value: "Headset", text: "Headset", price: 88 },
];

export const AppContext = React.createContext<IContext>({
    state: {
        orderNumber: 1,
        clientName: "",
        productName: "",
        quantity: 1,
        unitValue: 0,
        totalValue: 0,
    },
    productList: [],
    setState: () => {},
    onAddItemToList: () => {},
    handleOnSave: () => {},
    handleOnCancel: () => {},
});

export default function index({ orderNumber }: ICheckoutComponentProps) {
    const initialState: IState = {
        orderNumber,
        clientName: "",
        productName: "",
        quantity: 1,
        unitValue: 0,
        totalValue: 0,
    };

    const [state, setState] = useState<IState>({ ...initialState });
    const [showMessage, setShowMessage] = useState<IShowMessage>({
        show: false,
        type: "success",
        message: "",
    });
    const [productList, setProductList] = useState<IProductList[]>([]);

    const onAddItemToList = () => {
        const newlist = [...productList];

        newlist.push({
            ...state,
            totalValue: state.quantity * state.unitValue,
        });

        setState({ ...initialState, orderNumber: state.orderNumber + 1 });

        setProductList(newlist);
    };

    const handleOnCancel = () => {
        setState({ ...initialState });
        setProductList([]);
    };

    const handleOnSave = async () => {
        if (productList.length === 0) {
            setShowMessage({
                show: true,
                type: "error",
                message: "Opa parece que você não adicionou nenhum item!",
            });
            setTimeout(
                () =>
                    setShowMessage((state) => ({
                        ...state,
                        show: false,
                        message: "",
                    })),
                5000
            );
            return;
        }

        return await axios
            .post("/create-purchase", { productList })
            .then((res) => {
                setState({ ...initialState });
                setProductList([]);
                setShowMessage({
                    show: true,
                    type: "success",
                    message: "Seu Pedido foi recebido com sucesso.",
                });
                setTimeout(
                    () =>
                        setShowMessage((state) => ({
                            ...state,
                            show: false,
                            message: "",
                        })),
                    5000
                );
            })
            .catch((err) => {
                setShowMessage({
                    show: true,
                    type: "error",
                    message: err.data?.error || "Aconteceu um erro",
                });
                setTimeout(
                    () =>
                        setShowMessage((state) => ({
                            ...state,
                            show: false,
                            message: "",
                        })),
                    5000
                );
            });
    };

    return (
        <AppContext.Provider
            value={{
                state: { ...state },
                productList,
                setState,
                onAddItemToList,
                handleOnCancel,
                handleOnSave,
            }}
        >
            <CheckoutContainer>
                <CheckoutWrapper>
                    <FormComponent />
                    <TableProducts />
                </CheckoutWrapper>
                <HandleOrderComponent />
            </CheckoutContainer>
            {showMessage.show && (
                <MessageResponse
                    positive={showMessage.type === "success"}
                    negative={showMessage.type === "error"}
                >
                    <Message.Header>
                        {showMessage.type === "success"
                            ? "Sucesso!!"
                            : "Ops algo deu errado!"}
                    </Message.Header>
                    <p>{showMessage.message}</p>
                </MessageResponse>
            )}
        </AppContext.Provider>
    );
}
