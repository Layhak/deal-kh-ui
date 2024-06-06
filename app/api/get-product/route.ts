// Testing API with NextJS
import { NextRequest, NextResponse } from 'next/server'

const product = [
    {
        id: 1,
        name: "Product 1",
        price: 100,
        category: {
            type: "Drink",
            date: "2023-01-01",
        },
    },
    {
        id: 2,
        name: "Product 2",
        price: 200,
        category: {
            type: "Drink",
            date: "2023-01-01",
        },
    },
]

export async function GET(req: NextRequest, res: NextResponse) {
    console.log("Testing API in NextJS (Serverless)");
    console.log("url", req.url);
    console.log("method", req.method);
    console.log("body", req.body);
    console.log("header", req.headers);

    return NextResponse.json(product);
    
}