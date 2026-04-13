"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const viewsData = Array.from({ length: 14 }, (_, i) => ({
  day: `Day ${i + 1}`,
  views: Math.floor(Math.random() * 80 + 20),
}));

const sourceData = [
  { name: "Direct", value: 35 },
  { name: "Search", value: 28 },
  { name: "Referral", value: 20 },
  { name: "Social", value: 17 },
];

const COLORS = ["hsl(0 84% 60%)", "hsl(220 40% 20%)", "hsl(220 70% 60%)", "hsl(0 0% 60%)"];

export function SellerAnalytics() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-3 text-sm font-semibold">Property Views — Last 14 Days</h4>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={viewsData} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Bar dataKey="views" fill="hsl(0 84% 60%)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-3 text-sm font-semibold">Inquiry Sources</h4>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                label={({ name, value }) =>
                  `${name ?? ""} ${value ?? ""}%`
                }
                labelLine={false}
              >
                {sourceData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
