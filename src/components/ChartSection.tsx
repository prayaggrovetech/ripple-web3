"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine, LabelList } from 'recharts';
import { HyperText } from "@/components/ui/hyper-text";

export function ChartSection() {
  // Realistic 5-year growth data for Bitcoin and Ethereum (simplified)
  const data = [
    { year: '2019', bitcoin: 100, ethereum: 100 },
    { year: '2020', bitcoin: 280, ethereum: 320 },
    { year: '2021', bitcoin: 1650, ethereum: 2800 },
    { year: '2022', bitcoin: 420, ethereum: 890 },
    { year: '2023', bitcoin: 1120, ethereum: 1450 },
    { year: '2024', bitcoin: 1680, ethereum: 1920 }
  ];

  const CustomDot = ({ cx, cy, payload, dataKey }: any) => {
    if (payload.year === '2021' && dataKey === 'bitcoin') {
      return (
        <g>
          <circle cx={cx} cy={cy} r={6} fill="oklch(0.75 0.25 180)" />
          <text x={cx + 15} y={cy - 10} fill="oklch(0.98 0.01 240)" fontSize="12" fontWeight="bold">
            BTC
          </text>
        </g>
      );
    }
    if (payload.year === '2021' && dataKey === 'ethereum') {
      return (
        <g>
          <circle cx={cx} cy={cy} r={5} fill="oklch(0.70 0.30 280)" fillOpacity={0.8} />
          <text x={cx + 15} y={cy - 10} fill="oklch(0.98 0.01 240)" fontSize="12" fontWeight="bold" opacity={0.8}>
            ETH
          </text>
        </g>
      );
    }
    return null;
  };

  const CustomLabel = ({ x, y, index }: any) => {
    if (index === data.length - 1) {
      return (
        <g>
          <rect x={x - 35} y={y - 25} width={70} height={20} rx={10} fill="oklch(0.75 0.25 180)" />
          <text x={x} y={y - 10} textAnchor="middle" fill="oklch(0.08 0.01 240)" fontSize="12" fontWeight="bold">
            ~1580%
          </text>
        </g>
      );
    }
    return null;
  };

  const CustomEthLabel = ({ x, y, index }: any) => {
    if (index === data.length - 1) {
      return (
        <g>
          <rect x={x - 35} y={y - 25} width={70} height={20} rx={10} fill="oklch(0.70 0.30 280)" fillOpacity={0.8} />
          <text x={x} y={y - 10} textAnchor="middle" fill="oklch(0.08 0.01 240)" fontSize="12" fontWeight="bold">
            ~1820%
          </text>
        </g>
      );
    }
    return null;
  };

  return (
    <section className="rounded-3xl py-16 md:py-24 glass glow">
      {/* Header Section */}
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            {/* Left - Main Heading */}
            <div>
              <HyperText 
                as="h2"
                className="text-3xl md:text-4xl lg:text-5xl font-black leading-[0.9] tracking-tight hero-title py-0"
                startOnView={false}
                duration={1200}
                animateOnHover={true}
              >
                WHAT IF YOU HAD BOUGHT BITCOIN OR ETHEREUM 5 YEARS AGO?
              </HyperText>
            </div>

            {/* Right - Subheading */}
            <div className="lg:pt-4">
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
                Early crypto adopters who bought Bitcoin or Ethereum 5 years ago have seen astronomical returns.
                These digital assets have revolutionized finance and continue to grow. Your next 5 years in DeFi
                could be just as transformative!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Width Chart */}
      <div className="relative w-full">
        <div className="relative h-[500px] md:h-[600px]">
          {/* Y-axis label */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 -rotate-90 z-10">
            <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider mono">Price Growth</span>
          </div>

          {/* Chart Container */}
          <div className="ml-16 mr-8 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 60, right: 100, left: 40, bottom: 60 }}>
                {/* Grid lines */}
                <ReferenceLine y={500} stroke="oklch(0.20 0.02 240)" strokeDasharray="3 3" strokeOpacity={0.3} />
                <ReferenceLine y={1000} stroke="oklch(0.20 0.02 240)" strokeDasharray="3 3" strokeOpacity={0.3} />
                <ReferenceLine y={1500} stroke="oklch(0.20 0.02 240)" strokeDasharray="3 3" strokeOpacity={0.3} />

                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'oklch(0.65 0.01 240)', fontSize: 14, fontWeight: 500 }}
                  interval={1}
                  tickMargin={20}
                />
                <YAxis hide />

                {/* Bitcoin Line - Dramatic Growth */}
                <Line
                  type="monotone"
                  dataKey="bitcoin"
                  stroke="oklch(0.75 0.25 180)"
                  strokeWidth={4}
                  dot={<CustomDot dataKey="bitcoin" />}
                  activeDot={{ r: 8, fill: 'oklch(0.75 0.25 180)', strokeWidth: 2, stroke: 'oklch(0.12 0.015 240)' }}
                >
                  <LabelList content={<CustomLabel />} />
                </Line>

                {/* Ethereum Line - Strong Growth */}
                <Line
                  type="monotone"
                  dataKey="ethereum"
                  stroke="oklch(0.70 0.30 280)"
                  strokeWidth={3}
                  strokeOpacity={0.8}
                  dot={<CustomDot dataKey="ethereum" />}
                  activeDot={{ r: 6, fill: 'oklch(0.70 0.30 280)', fillOpacity: 0.8, strokeWidth: 2, stroke: 'oklch(0.12 0.015 240)' }}
                >
                  <LabelList content={<CustomEthLabel />} />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* X-axis label */}
          <div className="absolute bottom-4 right-8">
            <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider mono">Timeline</span>
          </div>
        </div>
      </div>
    </section>
  );
}