import CardComponent from "@/components/card/CardDetail";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

const ENDPOINT = `https://6668f7e12e964a6dfed36875.mockapi.io/api/v1/products`;

const getData = async (id: string) => {
	try { 
		const res = await fetch(`${ENDPOINT}/${id}`);
		if (!res.ok) throw new Error('Network response was not ok');
		const data = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error("Failed to fetch data:", error);
		throw error; // Rethrow or handle as needed
	}
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const id = params.id;
	const product = await fetch(`https://665d3148e88051d60405a47d.mockapi.io/api/v1/products/${id}`).then((res) => res.json());
	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: product.image,
		},
	};
}

export default async function Detail(props: Props) {
	let data = await getData(props.params.id);

	return (
		<div className="h-screen grid place-content-center">
			<CardComponent
				id={data?.id || "No ID"}
				name={data?.name || "NoTitle"}
				original_price={data?.original_price || "No Prce"}
				image={data?.image ||
					"https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"} shop_name={""} discount_price={0} discount={0} expired_at={""} description={""} category={""}	/>
		</div>
	);
}