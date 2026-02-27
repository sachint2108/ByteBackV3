"use client";
import React from "react";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

interface ChartProps {
  data: any[];
  dataKey?: string;
  color?: string;
  type?: "line" | "bar" | "horizontal-bar";
}

const ActiveUsersChart = ({ data, dataKey = "count", color = "#000", type = "line" }: ChartProps) => {
  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        {type === "horizontal-bar" ? (
          /* TOP PRODUCTS: HORIZONTAL BAR GRAPH */
          <BarChart 
            data={data} 
            layout="vertical" 
            margin={{ left: 30, right: 60, top: 10, bottom: 10 }}
          >
            <XAxis type="number" hide /> 
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false}
              width={120}
              tick={{ fontSize: 10, fontWeight: '900', fill: '#111' }}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              formatter={(value: any) => `R ${Number(value).toLocaleString()}`}
              contentStyle={{ borderRadius: '15px', border: 'none', fontWeight: '900', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
            />
            <Bar 
              dataKey={dataKey} 
              fill={color} 
              radius={[0, 10, 10, 0]} 
              barSize={20}

              label={{ 
                position: 'right', 
                formatter: (val: any) => `R ${val.toLocaleString()}`,
                fontSize: 11,
                fontWeight: '900',
                fill: '#111',
                dx: 10
              }}
            />
          </BarChart>
        ) : type === "bar" ? (
          
          
          
          
          
          /* --- REVENUE: VERTICAL BAR GRAPH --- */
          <BarChart data={data} margin={{ left: -20, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fontWeight: 'bold', fill: '#9ca3af' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fontWeight: 'bold', fill: '#9ca3af' }}
            />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              formatter={(value: any) => `R ${Number(value).toLocaleString()}`}
              contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontWeight: '900' }}
            />
            <Bar 
              dataKey={dataKey} 
              fill={color} 
              radius={[6, 6, 0, 0]} 
              barSize={20} 
            />
          </BarChart>
        ) : (
          
          
          
          
          
          
          
          /* --- VISITORS: LINE GRAPH --- */
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip 
              formatter={(value: any) => value.toLocaleString()}
              contentStyle={{ borderRadius: '15px', border: 'none', fontWeight: 'bold' }}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={4} 
              dot={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ActiveUsersChart;