interface ChartData {
    name: string;
    value: number;
}

const COLORS: string[] = ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"];

const data: ChartData[] = [
    { name: "Desktop", value: 65 },
    { name: "Tablet", value: 34 },
    { name: "Mobile", value: 45 },
    { name: "Unknown", value: 12 },
];

export { COLORS, data };
export type { ChartData };
