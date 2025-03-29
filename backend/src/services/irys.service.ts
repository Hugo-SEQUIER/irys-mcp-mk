import { Uploader } from "@irys/upload";
import { BaseEth } from "@irys/upload-ethereum";
import dotenv from "dotenv"

dotenv.config();

export const getIrysUploader = async () => {
    if (!process.env.PRIVATE_KEY) {
        throw new Error("PRIVATE_KEY is not set in .env file");
    }
    const irysUploader = await Uploader(BaseEth).withWallet(process.env.PRIVATE_KEY);
    return irysUploader;
};