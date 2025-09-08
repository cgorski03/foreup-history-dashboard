import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface PlayPatternData {
  day: string;
  count: number;
}

interface PlayPatternChartProps {
  data: PlayPatternData[];
}

const PlayPatternChart: React.FC<PlayPatternChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-emerald-600 font-semibold">
            {payload[0].value} rounds
          </p>
        </div>
      );
    }
    return null;
  };

  const formatXAxisLabel = (day: string) => {
    return day.slice(0, 3);
  };

  return (
    <div className="chart-container">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        📅 Play Patterns by Day
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="day" 
              tickFormatter={formatXAxisLabel}
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlayPatternChart;
