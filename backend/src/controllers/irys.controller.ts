import { getIrysUploader } from "../services/irys.service";
import { MCPServerMetaData, UploadDataOnIrysResponse, TransactionRootTxGQL, FetchDataFromTransactionResponse, GetListOfTransactionsFromIrysResponse } from '../types/index';
import { v4 as uuidv4 } from 'uuid';
import { gql, GraphQLClient } from "graphql-request";
import dotenv from "dotenv";
import { FastifyRequest, FastifyReply } from 'fastify';

dotenv.config();

const endpointForTransactionId: string = "https://uploader.irys.xyz/graphql";
const endpointForData: string = "https://gateway.irys.xyz/mutable";

async function uploadMcpServerMetaDataToIrys(mcpServerMetaData: MCPServerMetaData): Promise<UploadDataOnIrysResponse> {
    const mcpServerIdTag = uuidv4();
    const irysUploader = await getIrysUploader();
    let listTags = [
        {
            name: "Content-Type",
            value: "application/json"
        },
        {
            name: "Application",
            value: "MCP Storage"
        },
        {
            name: "application-id",
            value: mcpServerIdTag
        },
        {
            name: "Author",
            value: mcpServerMetaData.author
        }
    ]
    mcpServerMetaData.id = mcpServerIdTag;
    try {
        const uploadResult = await irysUploader.upload(JSON.stringify(mcpServerMetaData), {tags: listTags});
        return {
            success: true,
            url: `${endpointForData}/${uploadResult.id}`
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Error uploading to Irys, " + error 
        };
    }
}

async function retrieveRootTxWithId(id: string): Promise<string> {
    const graphQLClient = new GraphQLClient(endpointForTransactionId);
    const QUERY = gql`
        query($owners: [String!], $tags: [TagFilter!]) {
            transactions(owners: $owners, tags: $tags) {
                edges {
                    node {
                        id,
                        tags {
                            name,
                            value
                        }
                    }
                }
            }
        }
    `;
    const variables = {
        owners: [process.env.EVM_PUBLIC_ADDRESS],
        tags: [{
            name: "application-id",
            values: [id]
        }]
    }
    const data: TransactionRootTxGQL = await graphQLClient.request(QUERY, variables);
    const listOfTransactions = data.transactions.edges.map((edge) => {
        let hasRootTx = false;
        if (edge.node.tags.find((tag) => tag.name === "Root-TX")) {
            hasRootTx = true;
        }
        if (!hasRootTx) {
            return edge.node.id;
        }
        return null;
    });
    const filteredListOfTransactions = listOfTransactions.filter((transaction) => transaction !== null);    
    console.log("Transaction IDs retrieved")
    console.log(filteredListOfTransactions);
    return filteredListOfTransactions[0];
}

async function updateMcpServerMetaDataOnIrys(mcpServerMetaData: MCPServerMetaData): Promise<UploadDataOnIrysResponse> {
    const irysUploader = await getIrysUploader();
    const id = mcpServerMetaData.id || "no-id";
    console.log("ID: ", id);
    const rootTxId = await retrieveRootTxWithId(id);
    console.log("Root Tx ID: ", rootTxId);
    let listTags = [
        {
            name: "Content-Type",
            value: "application/json"
        },
        {
            name: "Application",
            value: "MCP Storage"
        },
        {
            name: "application-id",
            value: id
        },
        {
            name: "Author",
            value: mcpServerMetaData.author
        },
        {
            name: "Root-TX",
            value: rootTxId
        }
    ]
    try {
        const uploadResult = await irysUploader.upload(JSON.stringify(mcpServerMetaData), {tags: listTags});
        return {
            success: true,
            url: `${endpointForData}/${rootTxId}`
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Error uploading to Irys, " + error 
        };
    }
}

async function fetchDataFromTransactionId(transactionId: string): Promise<FetchDataFromTransactionResponse> {
    try {
        const response = await fetch(`${endpointForData}/${transactionId}`);
        if (!response.ok) {
            console.error(`Error fetching data for transaction ID ${transactionId}: ${response.status} ${response.statusText}`);
            return { 
            success: false, 
            data: "", 
            error: `Error fetching data from transaction ID: ${response.status} ${response.statusText}` 
        };
        }
        const data = await response.json();
        return {
            success: true,
            data: data
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            data: "",
            error: "Error fetching data from transaction ID: " + error
        };
    }
}

async function getListOfTransactionsFromIrys() : Promise<GetListOfTransactionsFromIrysResponse> {
    const graphQLClient = new GraphQLClient(endpointForTransactionId);
    const QUERY = gql`
        query($owners: [String!], $tags: [TagFilter!]) {
            transactions(owners: $owners, tags: $tags) {
                edges {
                    node {
                        id,
                        tags {
                            name,
                            value
                        }
                    }
                }
            }
        }
    `;
    const variables = {
        owners: [process.env.EVM_PUBLIC_ADDRESS],
        tags: [
            {
                name: "Content-Type",
                values: ["application/json"]
            },
            {
                name: "Application",
                values: ["MCP Storage"]
            }
        ]
    }
    try {
        const data: TransactionRootTxGQL = await graphQLClient.request(QUERY, variables);
        const listOfTransactions : string[] = data.transactions.edges.map((edge: any) => {
            let hasRootTx = false;
            if (edge.node.tags.find((tag: any) => tag.name === "Root-TX")) {
                hasRootTx = true;
            }
            if (!hasRootTx) {
                return edge.node.id;
            }
            return null;
        }).filter((transaction) => transaction !== null);
        console.log("Transaction IDs retrieved")
        return { success: true, data: listOfTransactions };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            data: [],
            error: "Error fetching data from transaction ID: " + error
        };
    }
}

async function retrieveMcpServerMetaDataFromIrys() {
    const listOfTransactions = await getListOfTransactionsFromIrys();
    if (!listOfTransactions.success) {
        return {
            success: false,
            error: listOfTransactions.error
        };
    }
    const listOfTransactionsIds = listOfTransactions.data;
    const dataPromises: Promise<any>[] = listOfTransactionsIds.map(async (transactionId: string) => {
        try {
            const fetchDataFromTransactionIdResponse = await fetchDataFromTransactionId(transactionId);
            if (!fetchDataFromTransactionIdResponse.success) {
                return null;
            }
            return fetchDataFromTransactionIdResponse.data;
        } catch (error) {
            console.error(`Error processing transaction ${transactionId}: ${error}`);
            return null;
        }
    });
    const dataResponses = await Promise.all(dataPromises);
    const filteredDataResponses = dataResponses.filter((data) => data !== null);
    return {
        success: true,
        data: filteredDataResponses
    };
}

export async function uploadIrysAPI(req: FastifyRequest, res: FastifyReply) {
    const { mcpServerMetaData } = req.body as {mcpServerMetaData: MCPServerMetaData};
    const uploadResult = await uploadMcpServerMetaDataToIrys(mcpServerMetaData);
    return {
        state: uploadResult.success,
        response: uploadResult.url ? uploadResult.url : uploadResult.error
    }
}

export async function retrieveIrysAPI(req: FastifyRequest, res: FastifyReply) {
    const retrieveResult = await retrieveMcpServerMetaDataFromIrys();
    return {
        state: retrieveResult.success,
        response: retrieveResult.data ? retrieveResult.data : retrieveResult.error
    }
}

export async function updateIrysAPI(req: FastifyRequest, res: FastifyReply) {
    const { mcpServerMetaData } = req.body as {mcpServerMetaData: MCPServerMetaData};
    const updateResult = await updateMcpServerMetaDataOnIrys(mcpServerMetaData);
    return {
        state: updateResult.success,
        response: updateResult.url ? updateResult.url : updateResult.error
    }
}