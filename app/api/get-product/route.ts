// Testing API with NextJS
import { NextRequest, NextResponse } from 'next/server'

export const product = [
    {
        id: 1,
        imageSrc: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
        title: "Basic Tee 6-Pack",
        collection: "TenTen New Collection",
        price: "$500",
    },
    {
        id: 2,
        imageSrc: "https://i.pinimg.com/236x/fe/c2/a4/fec2a4eab17950d22e69f563b45fbed5.jpg",
        title: "Another Product",
        collection: "Spring Collection",
        price: "$700"
    },
    {
        id: 3,
        imageSrc: "https://i.pinimg.com/474x/16/55/c8/1655c80363e753ae9920e8524c72c95e.jpg",
        title: "Yet Another Product",
        collection: "Summer Collection",
        price: "$600"
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