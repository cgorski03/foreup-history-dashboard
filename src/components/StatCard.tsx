import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  subtitle, 
  trend 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="stat-card group cursor-default"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {value}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend.isPositive ? 'text-primary-600' : 'text-red-500'
            }`}>
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(trend.value)}% vs last year</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
