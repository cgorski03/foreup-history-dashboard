import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO, getYear, getMonth } from 'date-fns';
import { 
  Calendar,
  Clock,
  Award,
  MapPin,
  CreditCard,
  Target
} from 'lucide-react';

import type { GolferData, PassUse } from '../types';
import StatCard from './StatCard';
import GolfHistoryChart from './GolfHistoryChart';
import PlayPatternChart from './PlayPatternChart';
import RecentRounds from './RecentRounds';
import UpcomingReservations from './UpcomingReservations';

interface GolfDashboardProps {
  data: GolferData;
}

const GolfDashboard: React.FC<GolfDashboardProps> = ({ data }) => {
  const passData = Object.values(data.passes)[0];
  
  const golfStats = useMemo(() => {
    if (!passData?.uses) return null;
    
    const rounds = passData.uses;
    const totalRounds = rounds.length;
    const firstRound = rounds[0]?.date_created;
    const lastRound = rounds[rounds.length - 1]?.date_created;
    
    // Calculate yearly data
    const currentYear = new Date().getFullYear();
    const currentYearRounds = rounds.filter(round => 
      getYear(parseISO(round.date_created)) === currentYear
    ).length;
    
    const lastYear = currentYear - 1;
    const lastYearRounds = rounds.filter(round => 
      getYear(parseISO(round.date_created)) === lastYear
    ).length;
    
    // Calculate average rounds per month
    const yearsActive = Math.max(1, Math.ceil(
      (new Date().getTime() - parseISO(firstRound).getTime()) / (1000 * 60 * 60 * 24 * 365)
    ));
    const avgRoundsPerMonth = (totalRounds / yearsActive).toFixed(1);
    
    // Calculate favorite day of week
    const dayOfWeekCounts: { [key: string]: number } = {};
    rounds.forEach(round => {
      const dayOfWeek = format(parseISO(round.date_created), 'EEEE');
      dayOfWeekCounts[dayOfWeek] = (dayOfWeekCounts[dayOfWeek] || 0) + 1;
    });
    
    const favoriteDay = Object.entries(dayOfWeekCounts).reduce((a, b) => 
      dayOfWeekCounts[a[0]] > dayOfWeekCounts[b[0]] ? a : b
    )[0];
    
    // Calculate favorite time
    const hourCounts: { [key: number]: number } = {};
    rounds.forEach(round => {
      const hour = new Date(round.date_created).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    
    const favoriteHour = Object.entries(hourCounts).reduce((a, b) => 
      hourCounts[parseInt(a[0])] > hourCounts[parseInt(b[0])] ? a : b
    )[0];
    
    const favoriteTime = `${parseInt(favoriteHour)}:00`;
    
    return {
      totalRounds,
      currentYearRounds,
      lastYearRounds,
      avgRoundsPerMonth,
      favoriteDay,
      favoriteTime,
      firstRound,
      lastRound,
      yearOverYearChange: lastYearRounds > 0 ? 
        ((currentYearRounds - lastYearRounds) / lastYearRounds * 100).toFixed(1) : 0
    };
  }, [passData]);
  
  const chartData = useMemo(() => {
    if (!passData?.uses) return [];
    
    const monthlyData: { [key: string]: number } = {};
    
    passData.uses.forEach((round: PassUse) => {
      const date = parseISO(round.date_created);
      const monthKey = format(date, 'yyyy-MM');
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
    });
    
    return Object.entries(monthlyData)
      .map(([date, count]) => ({
        date,
        count,
        year: getYear(parseISO(date + '-01')),
        month: getMonth(parseISO(date + '-01'))
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [passData]);
  
  const dayOfWeekData = useMemo(() => {
    if (!passData?.uses) return [];
    
    const dayData: { [key: string]: number } = {};
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    passData.uses.forEach((round: PassUse) => {
      const dayOfWeek = format(parseISO(round.date_created), 'EEEE');
      dayData[dayOfWeek] = (dayData[dayOfWeek] || 0) + 1;
    });
    
    return dayOrder.map(day => ({
      day,
      count: dayData[day] || 0
    }));
  }, [passData]);
  
  if (!golfStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading golf data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total Rounds"
          value={golfStats.totalRounds}
          icon={<Target className="w-8 h-8 text-primary-600" />}
          subtitle="Since 2021"
        />
        
        <StatCard
          title="This Year"
          value={golfStats.currentYearRounds}
          icon={<Calendar className="w-8 h-8 text-emerald-600" />}
          subtitle={`${golfStats.avgRoundsPerMonth} per year avg`}
          trend={{
            value: parseFloat(golfStats.yearOverYearChange.toString()),
            isPositive: parseFloat(golfStats.yearOverYearChange.toString()) > 0
          }}
        />
        
        <StatCard
          title="Favorite Day"
          value={golfStats.favoriteDay}
          icon={<Clock className="w-8 h-8 text-teal-600" />}
          subtitle={`Usually at ${golfStats.favoriteTime}`}
        />
        
        <StatCard
          title="Member Since"
          value={format(parseISO(data.date_created), 'yyyy')}
          icon={<Award className="w-8 h-8 text-amber-600" />}
          subtitle="Resident ID Pass"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <GolfHistoryChart data={chartData} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <PlayPatternChart data={dayOfWeekData} />
        </motion.div>
      </div>

      {/* Additional Info Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <RecentRounds rounds={passData?.uses?.slice(0, 10) || []} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <UpcomingReservations reservations={data.reservations} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="stat-card"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-600" />
            Golfer Info
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-gray-600">Location:</span>
              <p className="text-gray-800">{data.city}, {data.state} {data.zip}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Member ID:</span>
              <p className="text-gray-800">{data.person_id}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Pass Type:</span>
              <p className="text-gray-800">{passData?.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Pass Valid Until:</span>
              <p className="text-gray-800">{format(parseISO(passData?.expiration_date || ''), 'MMM dd, yyyy')}</p>
            </div>
            {data.credit_cards.length > 0 && (
              <div className="pt-2 border-t border-gray-200">
                <span className="font-medium text-gray-600 flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  Payment Method:
                </span>
                <p className="text-gray-800">
                  {data.credit_cards[0].card_type} •••• {data.credit_cards[0].masked_account.slice(-4)}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GolfDashboard;
