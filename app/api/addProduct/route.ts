import { NextRequest, NextResponse } from 'next/server';

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


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();
        const { name, price, category } = data;

        if (!name || !price || !category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newProduct = {
            id: product.length + 1,
            name,
            price,
            category
        };

        product.push(newProduct);

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Error processing POST request:", error);
        return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
    }
}