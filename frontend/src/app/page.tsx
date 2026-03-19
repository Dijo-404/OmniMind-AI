"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Brain, 
  Target, 
  Users, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Cpu,
  Globe,
  Star,
  Sparkles
} from "lucide-react";
import Header from "@/components/layout/Header";
import AuthModal from "@/components/ui/AuthModal";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"signin" | "signup">("signin");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignIn = () => {
    setAuthType("signin");
    setIsAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthType("signup");
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    // Provide a small delay before redirecting for effect
    setTimeout(() => {
      router.push("/muse");
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-main)]">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-800/10 blur-[150px] rounded-full animate-pulse italic" />
      
      <Header 
        onSignIn={handleSignIn} 
        onSignUp={handleSignUp} 
        user={user} 
        onSignOut={handleLogout} 
      />

      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-500 text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-blue-600/5"
          >
            <Sparkles className="w-4 h-4" />
            The Future of Decision Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[var(--text-primary)]"
          >
            TRANSFORM COMPLEXITY <br /> 
            <span className="gradient-text">INTO CLARITY.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-2xl text-[var(--text-secondary)] text-lg md:text-xl font-medium leading-relaxed"
          >
            OmniMind is a hyper-intelligent, multi-agent AI sanctuary designed for decision makers who demand superhuman precision. Collapse complexity with collaborative autonomous agents.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            {user ? (
              <Link href="/muse">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex items-center gap-3 px-12 py-5 text-sm font-black uppercase tracking-widest group"
                >
                  <Cpu className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                  Launch Interface
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            ) : (
              <>
                <motion.button
                  onClick={handleSignUp}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex items-center gap-3 px-10 py-5 text-sm font-black uppercase tracking-widest"
                >
                  <Zap className="w-5 h-5" />
                  Become the Vanguard
                </motion.button>
                <motion.button
                  onClick={handleSignIn}
                  whileHover={{ x: 5 }}
                  className="text-sm font-black uppercase tracking-widest text-[var(--text-primary)]/40 hover:text-blue-500 transition-all flex items-center gap-2"
                >
                  Enter Sanctuary
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </>
            )}
          </motion.div>
        </section>

        {/* PROJECT DESCRIPTION SECTION */}
        <section id="features" className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: Brain,
              title: "Consensus IQ",
              desc: "Four specialized agents debate your problems in a digital round table. Final decisions are reached only through absolute validation.",
              color: "blue"
            },
            {
              icon: Target,
              title: "Precision Vector",
              desc: "Zero hallucination. Built-in RAG (Retrieval-Augmented Generation) ensures every claim is verified against your knowledge vaults.",
              color: "indigo"
            },
            {
              icon: Users,
              title: "Agentic Harmony",
              desc: "Deploy a legion of Analysts, Critics, and Strategists working asynchronously to solve what humans cannot see.",
              color: "violet"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card group relative overflow-hidden p-10 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <feature.icon className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-600/10 flex items-center justify-center border border-${feature.color}-600/20`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-500`} />
                </div>
                <h3 className="text-2xl font-black tracking-tight">{feature.title}</h3>
                <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* TRUST & STATS */}
        <section id="how-it-works" className="mt-40 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700"
          >
           {/* Symbolic Stats/Trust Items */}
           <div className="flex flex-col items-center gap-2">
             <ShieldCheck className="w-8 h-8" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em]">Quantum Encrypted</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <Globe className="w-8 h-8" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em]">Global Intelligence</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <Star className="w-8 h-8" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em]">Vanguard Standard</span>
           </div>
          </motion.div>
        </section>

        {/* CALL TO ACTION */}
        {!user && (
          <section id="pricing" className="mt-40 mb-20 relative p-1 leading-none rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-800 animate-gradient-x" />
            <div className="relative bg-[var(--bg-main)] m-[1px] rounded-[3rem] px-10 py-20 flex flex-col items-center text-center space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic underline decoration-blue-500/50 decoration-4 underline-offset-8">
                Ready to transcend?
              </h2>
              <p className="max-w-xl text-[var(--text-secondary)] font-medium">
                Standard AI is for consumers. OmniMind is for the architects of tomorrow. Claim your seat at the Council now.
              </p>
              <motion.button
                onClick={handleSignUp}
                whileHover={{ scale: 1.05 }}
                className="btn-primary px-16 py-6 text-sm font-black uppercase tracking-widest"
              >
                Apply for Access
              </motion.button>
            </div>
          </section>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-black tracking-tighter text-white">OmniMind</span>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-white/30">
            <a href="#" className="hover:text-blue-500 transition-colors">Neural Terminal</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Ethics Policy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Protocol v1.0.4</a>
          </div>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
            © 2026 OmniMind Research Group
          </p>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
