import {NextApiRequest, NextApiResponse} from "next";
import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';
import {NextRequest, NextResponse} from "next/server";
import {writeFile} from "node:fs/promises";
export default function handler(req , res: NextApiResponse) {
    const { method, query } = req;
    switch (method) {

        case 'POST':
            // Handle POST request
            handleReq(req, res, query);
            break;

        default:
            res.status(405).end(); // Method Not Allowed
    }
}

const handleReq = async(req: NextRequest, res: NextApiResponse, query: object) => {
    const formData = await req.json();
    console.log(formData);

    const file = formData.get("file");
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    console.log(filename);
    try {
        await writeFile(
            path.join(process.cwd(), "public/uploads/" + filename),
            buffer
        );
        return NextResponse.json({ Message: "Success", status: 201 });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
};