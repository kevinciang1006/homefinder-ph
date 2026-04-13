"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { formatPHP } from "@/lib/format";

interface PriceTrendChartProps {
  data: { month: string; price: number }[];
  status: "for-sale" | "for-rent";
}

export function PriceTrendChart({ data, status }: PriceTrendChartProps) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10 }}
            tickFormatter={(v: string) => v.split(" ")[0] ?? v}
          />
          <YAxis
            tick={{ fontSize: 10 }}
            tickFormatter={(v: number) => formatPHP(v)}
            width={60}
          />
          <Tooltip
            formatter={(value) => [
              `${formatPHP(Number(value))}${status === "for-rent" ? "/mo" : ""}`,
              "Price",
            ]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(0 84% 60%)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
