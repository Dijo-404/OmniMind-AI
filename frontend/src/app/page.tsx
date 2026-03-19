"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Brain, 
  ShieldCheck,
  Star,
  Layers,
  MessageSquare,
  Lock,
  Mail,
  User as UserIcon,
  Fingerprint,
  Sparkles,
  Target
} from "lucide-react";
import Header from "@/components/layout/Header";
import AuthModal from "@/components/ui/AuthModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LandingPage() {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"signin" | "signup">("signin");
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
    toast.success("Disconnected.");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    
    const userData = { name: formData.name || "Operator", email: formData.email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsSubmitting(false);
    toast.success(isLogin ? "Session Active." : "Seat Reserved.");
    
    setTimeout(() => {
      router.push("/muse");
    }, 500);
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/muse");
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white selection:bg-blue-600 font-[family-name:var(--font-space-grotesk)]">
      
      {/* AESTHETIC BACKGROUND */}
      <div className="fixed inset-0 z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-800/10 blur-[120px] rounded-full" />
         {/* Top Beam */}
         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      <Header 
        onSignIn={handleSignIn} 
        onSignUp={handleSignUp} 
        user={user} 
        onSignOut={handleLogout} 
        hideAuthButtons={true} 
      />

      <main className="relative z-10 pt-44 pb-32 px-6 max-w-7xl mx-auto">
        
        {/* --- SPLIT HERO: RIGHT SIDE AUTH --- */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LEFT: CONTENT (ULTRA-WHITE HEADERS) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-12"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-lg border border-white/20 bg-white/5 shadow-inner">
               <Fingerprint className="w-4 h-4 text-blue-500" />
               <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Neural Sanctuary v2</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] text-white uppercase italic">
              COLLECTIVE <br />
              <span className="text-blue-600">INTEL.</span>
            </h1>

            <p className="max-w-xl text-white text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-blue-600 pl-8 py-2">
              The hyper-stable, multi-agent sanctuary for decision intelligence. Collapse complexity with zero hallucinations. Verified. Precise. Autonomous.
            </p>

            <div className="flex gap-12 pt-4">
              <div className="flex items-center gap-4">
                <Target className="w-8 h-8 text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">0.02ms</span>
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Warp Speed</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">99.9%</span>
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Truth Gain</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: PREMIUM AUTH CARD (REVERTED TO RIGHT SIDE) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 w-full max-w-lg"
          >
            <div className="bg-[#111111] border border-white/10 rounded-[2.5rem] p-10 lg:p-12 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden group">
               <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none" />

               <div className="relative z-10 space-y-10">
                 <div className="flex flex-col items-center text-center space-y-5">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-600/30">
                       <Brain className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white italic tracking-tighter">
                         {user ? "IDENTIFIED" : (isLogin ? "IDENTITY LINK" : "JOIN COUNCIL")}
                      </h2>
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Establish Secure Connect</p>
                    </div>
                 </div>

                 {user ? (
                   <div className="space-y-10 py-4 flex flex-col items-center">
                      <div className="text-center p-8 rounded-3xl bg-white/[0.03] border border-white/5 w-full">
                         <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Authenticated Operator</p>
                         <p className="text-3xl font-black text-white italic uppercase">{user.name}</p>
                      </div>
                      <Link href="/muse" className="w-full">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="btn-primary w-full py-7 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.4em]"
                        >
                          <Layers className="w-5 h-5" />
                          Initialize Portal
                        </motion.button>
                      </Link>
                      <button onClick={handleLogout} className="text-[10px] font-black text-white/20 hover:text-red-500 transition-colors uppercase tracking-[0.4em] underline decoration-2 underline-offset-8">Terminate Link</button>
                   </div>
                 ) : (
                   <form onSubmit={handleFormSubmit} className="space-y-6">
                      {!isLogin && (
                        <input 
                          required
                          type="text" 
                          placeholder="OPERATOR NAME"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-6 px-8 text-xs font-black text-white placeholder:text-white/20 focus:outline-none focus:border-blue-600 focus:bg-white/[0.06] transition-all uppercase tracking-widest"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      )}
                      <input 
                        required
                        type="email" 
                        placeholder="NEURAL ADDRESS"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-6 px-8 text-xs font-black text-white placeholder:text-white/20 focus:outline-none focus:border-blue-600 focus:bg-white/[0.06] transition-all uppercase tracking-widest"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <input 
                        required
                        type="password" 
                        placeholder="ACCESS CIPHER"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-6 px-8 text-xs font-black text-white placeholder:text-white/20 focus:outline-none focus:border-blue-600 focus:bg-white/[0.06] transition-all uppercase tracking-widest"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />

                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(59, 130, 246, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        className="btn-primary w-full py-7 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.4em] shadow-2xl disabled:opacity-50"
                      >
                        {isSubmitting ? "SYNC..." : (
                          <>
                            <Zap className="w-6 h-6" />
                            {isLogin ? "EXECUTE LOGIN" : "RESERVE SEAT"}
                          </>
                        )}
                      </motion.button>

                      <div className="pt-10 text-center border-t border-white/5">
                         <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">
                            {isLogin ? "No Established ID?" : "Identified Vanguard?"}
                         </p>
                         <button 
                           type="button"
                           onClick={() => setIsLogin(!isLogin)}
                           className="w-full py-4 rounded-xl border border-white/10 hover:border-blue-600 hover:text-blue-500 text-[10px] font-black text-white uppercase tracking-[0.4em] transition-all"
                         >
                            {isLogin ? "CREATE ACCOUNT" : "BACK TO LOGIN"}
                         </button>
                      </div>
                   </form>
                 )}
               </div>
            </div>
          </motion.div>
        </div>

        {/* --- FEATURES GRID --- */}
        <section className="mt-60 grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: Brain, title: "Neural Unity", desc: "Collaborative agents debating complex business problems in a unified decision environment." },
              { icon: ShieldCheck, title: "Zero Error", desc: "Every word is verified against our decentralized knowledge stores using RAG v3." },
              { icon: MessageSquare, title: "Consensus IQ", desc: "Multi-modal reasoning chains that deliver absolute strategic clarity for leadership." }
            ].map((f, i) => (
              <div key={i} className="p-12 rounded-[2.5rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-600/50 transition-all space-y-8">
                 <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                    <f.icon className="w-8 h-8 text-black" />
                 </div>
                 <h3 className="text-3xl font-black text-white uppercase italic leading-none">{f.title}</h3>
                 <p className="text-white text-base font-medium leading-relaxed italic opacity-80">{f.desc}</p>
              </div>
            ))}
        </section>
      </main>

      <footer className="border-t border-white/5 py-24 px-6 text-center">
         <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
               <Brain className="w-8 h-8 text-blue-600" />
               <span className="text-3xl font-black tracking-tighter text-white">OmniMind</span>
            </div>
            <p className="text-[10px] font-black text-white/10 uppercase tracking-[1em]">© 2026 THE VANGUARD GROUP • SYSTEM V3.1.2</p>
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
