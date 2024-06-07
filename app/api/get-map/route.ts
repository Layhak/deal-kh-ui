import { Shop } from "@/types/shop";
import { NextRequest, NextResponse } from "next/server";

export const fetchShops = (): Shop[] => [
    // Fetch your shop data here. For demonstration, we use static data.
    {
        id: 1,
        latitude: 11.5756726,
        longitude: 104.9021685,
        name: 'Coffee​ 612',
        googleMapsUrl: 'https://www.google.com/maps/@11.5756726,104.9021685,21z'
    },
    {
        id: 2,
        latitude: 11.574863,
        longitude: 104.8988427,
        name: "D'August Coffee & Wine",
        googleMapsUrl: 'https://www.google.com/maps/@11.574863,104.8988427,21z'
    },
    {
        id: 3,
        latitude: 11.5781415,
        longitude: 104.9009531,
        name: 'CHASHINE',
        googleMapsUrl: 'https://www.google.com/maps/@11.5781415,104.9009531,21z'
    },
    {
        id: 4,
        latitude: 11.5784219,
        longitude: 104.9008311,
        name: 'Donner Kebab Stand',
        googleMapsUrl: 'https://www.google.com/maps/@11.5784219,104.9008311,21z'
    },
    {
        id: 5,
        latitude: 11.5784466,
        longitude: 104.9006376,
        name: 'ម្លិះកាហ្វេ Mliss Café',
        googleMapsUrl: 'https://www.google.com/maps/@11.5784466,104.9006376,21z'
    },
    {
        id: 6,
        latitude: 11.5789174,
        longitude: 104.9008881,
        name: 'Star Anise Coffee & Eatery',
        googleMapsUrl: 'https://www.google.com/maps/@11.5789174,104.9008881,21z'
    },
    {
        id: 7,
        latitude: 11.5791265,
        longitude: 104.9007215,
        name: '30Cups Coffee Cambodai',
        googleMapsUrl: 'https://www.google.com/maps/@11.5791265,104.9007215,21z'
    },
    {
        id: 8,
        latitude: 11.5775635,
        longitude: 104.9005556,
        name: 'សំរិទ្ធ កាហ្វេ',
        googleMapsUrl: 'https://www.google.com/maps/@11.5775635,104.9005556,21z'
    },
    {
        id: 9,
        latitude: 11.5772443,
        longitude: 104.9006816,
        name: 'Plovlom_coffee TK',
        googleMapsUrl: 'https://www.google.com/maps/@11.5772443,104.9006816,21z'
    },
    {
        id: 10,
        latitude: 11.5780986,
        longitude: 104.8999994,
        name: 'Coffee Hub (Toul Kork)',
        googleMapsUrl: 'https://www.google.com/maps/@11.5780986,104.8999994,21z'
    },
]


export async function GET(req: NextRequest, res: NextResponse) {
    const shops = fetchShops();
    return NextResponse.json(shops);
}