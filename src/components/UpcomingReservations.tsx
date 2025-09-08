import React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Calendar, Users, MapPin, Clock } from 'lucide-react';
import type { Reservation } from '../types';

interface UpcomingReservationsProps {
  reservations: Reservation[];
}

const UpcomingReservations: React.FC<UpcomingReservationsProps> = ({ reservations }) => {
  const formatTeeTime = (timeString: string) => {
    try {
      // Parse the time format from the data (e.g., "2025-08-15 08:06")
      return format(parseISO(timeString), 'MMM dd • h:mm a');
    } catch {
      return timeString;
    } 
  };

  const getCourseName = (side: string) => {
    return side === 'front' ? 'Front 9' : 'Back 9';
  };

  const getDaysUntil = (timeString: string) => {
    try {
      const reservationDate = parseISO(timeString);
      const now = new Date();
      const diffTime = reservationDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Tomorrow';
      if (diffDays > 0) return `In ${diffDays} days`;
      return 'Past';
    } catch {
      return '';
    }
  };

  return (
    <div className="stat-card">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-emerald-600" />
        Upcoming Tee Times
      </h3>
      <div className="space-y-4">
        {reservations.map((reservation, index) => (
          <motion.div
            key={reservation.TTID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  {formatTeeTime(reservation.time)}
                </h4>
                <p className="text-sm text-emerald-600 font-medium">
                  {getDaysUntil(reservation.time)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">
                  Booking #{reservation.TTID.slice(-6)}
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{getCourseName(reservation.side)} • {reservation.holes} holes</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{reservation.player_count} players</span>
              </div>
              
              <div className="text-xs text-gray-500 mt-2 p-2 bg-white/50 rounded">
                {reservation.details}
              </div>
            </div>
          </motion.div>
        ))}
        
        {reservations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No upcoming reservations</p>
            <p className="text-sm">Book your next round!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingReservations;
