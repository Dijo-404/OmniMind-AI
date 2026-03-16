'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Cpu, 
  LayoutDashboard, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import ConsensusPanel from '../ai/ConsensusPanel';
import SimulationResults from '../ai/SimulationResults';

interface DashboardProps {
  user: { name: string; email: string };
  activeTab?: string;
}

export default function Dashboard({ user, activeTab = 'dashboard' }: DashboardProps) {
  const stats = [
    { name: 'Sovereign Nodes', value: '1,248', icon: Cpu, trend: '+12% this month' },
    { name: 'Mission Success', value: '98.4%', icon: Target, trend: 'Sustained peak' },
    { name: 'Dominion Growth', value: '14.2B', icon: TrendingUp, trend: 'Exponential' },
    { name: 'Protocol Uptime', value: '99.99%', icon: ShieldCheck, trend: 'Unbreakable' },
  ];

  const recentHistory = [
    { id: '1', title: 'Urban Development Strategy', date: '2 hours ago', status: 'Completed', agents: 5 },
    { id: '2', title: 'Global Supply Optimization', date: '5 hours ago', status: 'In Review', agents: 8 },
    { id: '3', title: 'Fusion Reactor Efficiency', date: '1 day ago', status: 'Completed', agents: 12 },
  ];

  const renderOverview = () => (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <p className="text-royal-gold/60 text-[10px] font-black uppercase tracking-[0.4em] mb-1">
            Dominion Command Center
          </p>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Strategic <span className="text-royal-gold">Overview</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary px-8 text-xs font-black uppercase tracking-widest"
          >
            Manage Protocol
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 text-xs font-black uppercase tracking-widest flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Launch Mission
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="royal-card p-8 group hover:border-royal-gold/30 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-royal-gold/5 border border-royal-gold/10 flex items-center justify-center group-hover:bg-royal-gold/10 group-hover:border-royal-gold/20 transition-all duration-500">
                <stat.icon className="w-6 h-6 text-royal-gold" />
              </div>
              <span className="text-[10px] font-black text-green-500/80 bg-green-500/5 px-2 py-1 rounded-md uppercase tracking-widest">
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-royal-text-secondary uppercase tracking-[0.2em] mb-2">{stat.name}</p>
            <h3 className="text-3xl font-black italic tracking-tighter">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="royal-card p-10">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-black italic uppercase tracking-tight">Active Analytics</h2>
              <button className="text-[10px] font-black text-royal-gold uppercase tracking-[0.2em] hover:text-royal-gold-light transition-colors">
                View Full Logs
              </button>
            </div>
            <SimulationResults />
          </div>
        </div>

        <div className="space-y-10">
          <div className="royal-card p-10">
            <h2 className="text-xl font-black italic uppercase tracking-tight mb-8">Mission History</h2>
            <div className="space-y-6">
              {recentHistory.map((item, index) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-black group-hover:text-royal-gold transition-colors">{item.title}</h3>
                    <ChevronRight className="w-4 h-4 text-royal-text-secondary group-hover:text-royal-gold transform group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex items-center gap-4 text-[9px] font-black text-royal-text-secondary uppercase tracking-widest">
                    <span>{item.date}</span>
                    <span className="w-1 h-1 rounded-full bg-royal-gold/10" />
                    <span className="text-royal-gold/60">{item.agents} Experts</span>
                    <span className="w-1 h-1 rounded-full bg-royal-gold/10" />
                    <span>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 border border-royal-gold/10 rounded-xl text-[10px] font-black text-royal-text-secondary uppercase tracking-[0.2em] hover:bg-royal-gold/5 transition-all">
              Archieve Command
            </button>
          </div>

          <ConsensusPanel />
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title: string, subtitle: string) => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
      <div className="w-24 h-24 rounded-3xl bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center mb-8 relative">
        <Sparkles className="text-royal-gold w-12 h-12" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-royal-gold/20 blur-xl rounded-full"
        />
      </div>
      <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">{title}</h2>
      <p className="text-royal-gold/60 text-xs font-black uppercase tracking-[0.3em] mb-12 max-w-md">{subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        <div className="royal-card p-8 border-dashed border-royal-gold/10">
          <div className="w-10 h-10 rounded-xl bg-royal-gold/5 flex items-center justify-center mb-4 mx-auto">
            <Zap className="text-royal-gold w-5 h-5" />
          </div>
          <p className="text-[10px] font-black text-royal-text-secondary mb-2 uppercase tracking-widest">Status</p>
          <p className="text-sm font-black italic uppercase tracking-tight">Protocol Initializing</p>
        </div>
        <div className="royal-card p-8 border-dashed border-royal-gold/10">
           <div className="w-10 h-10 rounded-xl bg-royal-gold/5 flex items-center justify-center mb-4 mx-auto">
            <ShieldCheck className="text-royal-gold w-5 h-5" />
          </div>
          <p className="text-[10px] font-black text-royal-text-secondary mb-2 uppercase tracking-widest">Security</p>
          <p className="text-sm font-black italic uppercase tracking-tight">Biometric Verified</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-full">
      <AnimatePresence mode="wait">
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.4 }}
        >
          {activeTab === 'dashboard' && renderOverview()}
          {activeTab === 'chat' && renderPlaceholder('Multi-Agent Chat', 'The sovereign dialectics center is coming online.')}
          {activeTab === 'rag' && renderPlaceholder('Knowledge Vault', 'Expanding the RAG horizon with verified intelligence.')}
          {activeTab === 'sim' && (
            <div className="p-8 max-w-7xl mx-auto">
              <div className="mb-12">
                <p className="text-royal-gold/60 text-[10px] font-black uppercase tracking-[0.4em] mb-1">Future Forecasting</p>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Strategic <span className="text-royal-gold">Simulation</span></h2>
              </div>
              <div className="royal-card p-10">
                <SimulationResults />
              </div>
            </div>
          )}
          {activeTab === 'consensus' && renderPlaceholder('Sovereign Consensus', 'Synthesizing elite constructs for absolute certainty.')}
          {activeTab === 'analytics' && renderPlaceholder('Intelligence Logs', 'Recording your legacy across the digital dominion.')}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

