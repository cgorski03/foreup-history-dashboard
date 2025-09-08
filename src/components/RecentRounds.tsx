import React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Clock } from 'lucide-react';
import type { PassUse } from '../types';

interface RecentRoundsProps {
  rounds: PassUse[];
}

const RecentRounds: React.FC<RecentRoundsProps> = ({ rounds }) => {
  const getTeeSheetName = (teeSheetId: string) => {
    return teeSheetId === '6992' ? 'Main Course' : 'Par 3 Course';
  };

  const getTeeSheetColor = (teeSheetId: string) => {
    return teeSheetId === '6992' ? 'bg-primary-600' : 'bg-emerald-500';
  };

  return (
    <div className="stat-card">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary-600" />
        Recent Rounds
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
        {rounds.map((round, index) => (
          <motion.div
            key={round.pass_history_id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${getTeeSheetColor(round.teesheet_id)}`}></div>
                <span className="text-sm font-medium text-gray-800">
                  {getTeeSheetName(round.teesheet_id)}
                </span>
              </div>
              <div className="text-xs text-gray-600">
                {format(parseISO(round.date_created), 'MMM dd, yyyy • h:mm a')}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">
                Round #{rounds.length - index}
              </div>
            </div>
          </motion.div>
        ))}
        {rounds.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No recent rounds found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentRounds;
