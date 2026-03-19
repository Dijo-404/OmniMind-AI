"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Brain, 
  ShieldCheck,
  Layers,
  Lock,
  Mail,
  User as UserIcon,
  Fingerprint,
  ArrowRight,
  Shield,
  Activity
} from "lucide-react";
import Header from "@/components/layout/Header";
import AuthModal from "@/components/ui/AuthModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LandingPage() {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    
    const userData = { name: formData.name || "Operator", email: formData.email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsSubmitting(false);
    toast.success(isLogin ? "Neural Sync Verified." : "Vanguard Initialized.");
    
    setTimeout(() => {
      router.push("/muse");
    }, 400);
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-blue-600 font-[family-name:var(--font-space-grotesk)]">
      
      {/* --- PREMIUM BACKGROUND --- */}
      <div className="fixed inset-0 z-0">
         <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
         <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-800/10 blur-[120px] rounded-full" />
         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      <Header 
        onSignIn={() => {}} 
        onSignUp={() => {}} 
        hideAuthButtons={true} 
      />

      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pt-32 lg:pt-0 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
        
        {/* --- LEFT COLUMN: PROJECT DESCRIPTION --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 space-y-12 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md">
             <Fingerprint className="w-5 h-5 text-blue-500" />
             <span className="text-xs font-black text-white uppercase tracking-[0.4em]">Integrated Sanctuary IQ v4.2</span>
          </div>

          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.75] text-white uppercase italic">
            OMNIMIND <br />
            <span className="text-blue-600">INTEL.</span>
          </h1>

          <p className="max-w-2xl text-white text-xl md:text-2xl font-medium leading-relaxed italic border-l-8 border-blue-600 pl-10 py-4 bg-white/5 rounded-r-[2rem]">
            The hyper-stable, multi-agent sanctuary for decision intelligence. Collapse complexity with zero hallucinations. Verified. Precise. Autonomous.
          </p>

          <div className="flex justify-center lg:justify-start gap-12 pt-8">
            <div className="flex flex-col border-t-4 border-blue-600 pt-6 pr-12">
              <span className="text-5xl font-black text-white tracking-tighter">0.02ms</span>
              <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.5em] mt-2 italic">Response Time</span>
            </div>
            <div className="flex flex-col border-t-4 border-white/20 pt-6">
              <span className="text-5xl font-black text-white tracking-tighter">99.9%</span>
              <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.5em] mt-2 italic">Truth Integrity</span>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT COLUMN: PERFECT SQUARE AUTH HUB --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2 flex justify-center" 
        >
          <div className="relative w-full max-w-[520px] aspect-square flex items-center justify-center">
             {/* Glow shadow */}
             <div className="absolute -inset-2 bg-blue-600/10 blur-[100px] -z-10 rounded-full" />
             
             <div className="w-full h-full bg-[#0a0a0a]/90 border-2 border-white/10 rounded-[3.5rem] p-10 lg:p-14 shadow-2xl flex flex-col justify-between group relative overflow-hidden">
                
                {/* Internal accents */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-600/5 blur-3xl rounded-full" />

                {/* Identity Header */}
                <div className="flex flex-col items-center text-center space-y-6">
                   <div className="w-20 h-20 rounded-[2rem] bg-blue-600 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.6)]">
                      <Brain className="w-10 h-10 text-black" />
                   </div>
                   <div>
                      <h2 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                         {isLogin ? "Identity Link" : "Join Council"}
                      </h2>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] mt-3">Establish Linkage v4.2.0</p>
                   </div>
                </div>

                {/* Form Logic */}
                <div className="flex-1 flex flex-col justify-center py-8">
                   <form onSubmit={handleFormSubmit} className="space-y-6">
                      {!isLogin && (
                        <input 
                          required 
                          type="text" 
                          placeholder="OPERATOR NAME"
                          className="w-full bg-white/[0.03] border-2 border-white/10 rounded-2xl py-6 px-10 text-sm font-black text-white placeholder:text-white/20 focus:outline-none focus:border-blue-600 transition-all uppercase tracking-widest"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      )}
                      
                      <input 
                        required 
                        type="email" 
                        placeholder="NEURAL ADDRESS"
                        className="w-full bg-white/[0.03] border-2 border-white/10 rounded-2xl py-6 px-10 text-sm font-black text-white placeholder:text-white/20 focus:outline-none focus:border-blue-600 transition-all uppercase tracking-widest"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      
                      <input 
                        required 
                        type="password" 
                        placeholder="ACCESS CIPHER"
                        className="w-full bg-white/[0.03] border-2 border-white/10 rounded-2xl py-6 px-10 text-sm font-black text-white placeholder:text-white/20 focus:outline-none focus:border-blue-600 transition-all uppercase tracking-widest"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                   </form>
                </div>

                {/* Vertical Space Footer */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                   <motion.button
                      onClick={(e) => handleFormSubmit(e as any)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full py-8 flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.5em] shadow-2xl bg-blue-600 text-white border-0"
                   >
                      {isSubmitting ? "SYNCING..." : (
                        <>
                          <Zap className="w-6 h-6" />
                          {isLogin ? "EXECUTE LOGIN" : "RESERVE SEAT"}
                        </>
                      )}
                   </motion.button>

                   <div className="text-center">
                      <button 
                         type="button" 
                         onClick={() => setIsLogin(!isLogin)}
                         className="text-[10px] font-black text-white/30 hover:text-blue-500 uppercase tracking-[0.4em] underline decoration-2 underline-offset-8 transition-all"
                      >
                         {isLogin ? "No ID? Initiate Sync" : "Operator? Sign In"}
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </main>

      {/* Simplified Footer */}
      <footer className="fixed bottom-10 left-10 opacity-30">
         <div className="flex items-center gap-4">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white">Council Protocol v4.2</span>
         </div>
      </footer>
    </div>
  );
}
