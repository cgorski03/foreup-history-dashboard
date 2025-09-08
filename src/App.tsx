import { motion } from 'framer-motion';
import GolfDashboard from './components/GolfDashboard';
import golferData from './golfer_data.json';
import type { GolferData } from './types';

function App() {
  const typedGolferData = golferData as GolferData;

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="glass-card mx-4 mt-4 mb-8">
          <div className="px-8 py-6">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3"
            >
              🏌️‍♂️ Golf Journey Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-white/90 font-medium"
            >
              {typedGolferData.first_name} {typedGolferData.last_name} - H Smith Richardson Golf Course
            </motion.p>
          </div>
        </header>
      </motion.div>
      
      <main className="px-4 pb-8">
        <GolfDashboard data={typedGolferData} />
      </main>
    </div>
  );
}

export default App;
