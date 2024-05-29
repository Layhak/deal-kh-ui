"use client";

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Mon', sales: 400, fill: '#FFBB28' },
  { name: 'Tue', sales: 300, fill: '#00C49F' },
  { name: 'Wed', sales: 200, fill: '#000000' },
  { name: 'Thu', sales: 600, fill: '#8884d8' },
  { name: 'Fri', sales: 100, fill: '#8DD1E1' },
  { name: 'Sat', sales: 500, fill: '#82ca9d' },
  { name: 'Sun', sales: 250, fill: '#A52714' },
];

const BarChartComponent = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="w-full flex-cols justify-center">
      <h2 className="text-center p-4 font-extrabold">Traffic by Sale of week</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" barSize={50} />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
