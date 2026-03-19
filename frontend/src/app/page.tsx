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
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-blue-600 font-[family-name:var(--font-space-grotesk)] flex flex-col items-center justify-center">
      
      {/* 🔮 ULTRA PREMIUM BACKGROUND */}
      <div className="fixed inset-0 z-0">
         <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[80%] h-[50%] bg-blue-600/10 blur-[180px] rounded-full animate-pulse" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
         <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_4px_30px_rgba(59,130,246,0.3)]" />
      </div>

      <Header onSignIn={() => {}} onSignUp={() => {}} hideAuthButtons={true} />

      <main className="relative z-10 w-full flex flex-col items-center justify-center p-6 space-y-12">
        
        {/* ✨ BRANDING */}
        <div className="text-center space-y-4">
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center -space-x-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center backdrop-blur-md">
                 <Shield className="w-4 h-4 text-blue-500" />
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center backdrop-blur-md">
                 <Activity className="w-4 h-4 text-indigo-500" />
              </div>
           </motion.div>
           <h1 className="text-4xl font-black tracking-widest text-white/40 uppercase mb-2">Council Sanctuary</h1>
        </div>

        {/* 🧱 EQUAL BREADTH & LENGTH (SQUARE) AUTH HUB */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-xl aspect-square flex items-center justify-center"
        >
          {/* Outer Glow Ring */}
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl -z-10" />
          
          <div className="w-full h-full bg-[#0a0a0a]/90 border border-white/10 rounded-[3rem] p-10 lg:p-14 shadow-2xl flex flex-col justify-between group overflow-hidden">
             
             {/* Internal Glass Highlights */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/5 blur-3xl pointer-events-none" />

             {/* Header */}
             <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-[2rem] bg-blue-600 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-all">
                   <Brain className="w-10 h-10 text-black" />
                </div>
                <div>
                   <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                      {isLogin ? "Identity Link" : "Join Council"}
                   </h2>
                   <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] mt-3">Sanctuary Sync V4.2.0</p>
                </div>
             </div>

             {/* Dynamic Form Area */}
             <div className="flex-1 flex flex-col justify-center py-10">
               <form onSubmit={handleFormSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {!isLogin && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                      >
                         <input 
                           required 
                           type="text" 
                           placeholder="OPERATOR NAME"
                           className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-10 text-sm font-black text-white placeholder:text-white/20 focus:outline-none focus:border-blue-600 transition-all uppercase tracking-widest"
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                         />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <input 
                    required 
                    type="email" 
                    placeholder="NEURAL ADDRESS"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-10 text-sm font-black text-white placeholder:text-white/20 focus:outline-none focus:border-blue-600 transition-all uppercase tracking-widest"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  
                  <input 
                    required 
                    type="password" 
                    placeholder="ACCESS KEY"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-10 text-sm font-black text-white placeholder:text-white/20 focus:outline-none focus:border-blue-600 transition-all uppercase tracking-widest"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
               </form>
             </div>

             {/* Footer Actions */}
             <div className="space-y-6 pt-4 border-t border-white/5">
                <motion.button
                   onClick={(e) => handleFormSubmit(e as any)}
                   whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)" }}
                   whileTap={{ scale: 0.98 }}
                   disabled={isSubmitting}
                   className="btn-primary w-full py-7 flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.5em] shadow-2xl bg-blue-600 text-white border-0"
                >
                   {isSubmitting ? "SYNC..." : (
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
                      {isLogin ? "No Established ID? Join" : "Identified Member? Sign In"}
                   </button>
                </div>
             </div>
          </div>
        </motion.div>

        {/* --- STATS SUBTITLE --- */}
        <div className="flex gap-16 opacity-30 group cursor-default">
           <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white">0.02ms</span>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Warp</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white">99.9%</span>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Gain</span>
           </div>
        </div>
      </main>

      <footer className="mt-20 py-10 opacity-20 text-center">
         <p className="text-[10px] font-black uppercase tracking-[1em]">© 2026 THE VANGUARD GROUP • ANALYSE. DEBATE. RESOLVE.</p>
      </footer>
    </div>
  );
}
