export interface MCPServerMetaData {
    id?: string;
    name: string;
    description: string;
    image: string;
    githubUrl: string;
    author: string;
    usage: number;
    likes: number;
    categories: string[];
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

export interface UploadDataOnIrysResponse {
    success: boolean;
    url?: string;
    error?: string;
}

interface NodeRootTxGQL {
    id: string;
    tags: {
        name: string;
        value: string;
    }[];
}

export interface TransactionRootTxGQL {
    transactions: {
        edges: Array<{ node: NodeRootTxGQL }>;
    };
}

export interface FetchDataFromTransactionResponse {
    success: boolean;
    data: string;
    error?: string;
}

export interface GetListOfTransactionsFromIrysResponse {
    success: boolean;
    data: string[];
    error?: string;
}