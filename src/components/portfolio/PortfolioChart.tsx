"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ChainBalance } from "@/types/portfolio";
import { portfolioAPI } from "@/lib/portfolio-api";

interface PortfolioChartProps {
  chains: ChainBalance[];
  totalUSD: number;
}

interface ChartData {
  name: string;
  value: number;
  percentage: number;
  color: string;
  [key: string]: any; // Allow additional properties for recharts compatibility
}

const CHAIN_COLORS = [
  'oklch(0.75 0.25 180)', // Primary blue
  'oklch(0.75 0.25 120)', // Green
  'oklch(0.75 0.25 60)',  // Yellow
  'oklch(0.75 0.25 300)', // Purple
  'oklch(0.75 0.25 0)',   // Red
  'oklch(0.75 0.25 240)', // Cyan
];

export function PortfolioChart({ chains, totalUSD }: PortfolioChartProps) {
  // Prepare chart data
  const chartData: ChartData[] = chains.map((chain, index) => ({
    name: chain.chainName,
    value: chain.totalUSD,
    percentage: totalUSD > 0 ? (chain.totalUSD / totalUSD) * 100 : 0,
    color: CHAIN_COLORS[index % CHAIN_COLORS.length],
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-lg p-3 shadow-lg">
          <div className="font-semibold text-foreground">{data.name}</div>
          <div className="text-sm text-muted-foreground">
            {portfolioAPI.formatCurrency(data.value)} ({data.percentage.toFixed(1)}%)
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  if (chains.length === 0) {
    return (
      <motion.div
        className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-muted-foreground text-2xl">📊</span>
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">No Data to Display</h4>
          <p className="text-sm text-muted-foreground">
            Portfolio allocation will appear here once you have assets.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Portfolio Allocation</h3>
        <p className="text-sm text-muted-foreground">
          Distribution across blockchain networks
        </p>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="oklch(0.08 0.01 240)"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/20">
        {chartData.slice(0, 4).map((item, index) => (
          <motion.div
            key={item.name}
            className="text-center space-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          >
            <div
              className="w-4 h-4 rounded-full mx-auto"
              style={{ backgroundColor: item.color }}
            />
            <div className="text-sm font-medium text-foreground">{item.name}</div>
            <div className="text-xs text-muted-foreground">
              {item.percentage.toFixed(1)}%
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dominance Indicator */}
      {chartData.length > 0 && (
        <motion.div
          className="mt-6 pt-4 border-t border-border/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Largest allocation: <span className="text-foreground font-medium">{chartData[0]?.name}</span>
            </span>
            <span className="text-muted-foreground">
              {chartData[0]?.percentage.toFixed(1)}% dominance
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}