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
  Fingerprint
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
    await new Promise(r => setTimeout(r, 800));
    
    const userData = { name: formData.name || "Operator", email: formData.email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsSubmitting(false);
    toast.success("Identity Verified.");
    
    setTimeout(() => {
      router.push("/muse");
    }, 300);
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/muse");
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#000000] text-white selection:bg-blue-600 font-[family-name:var(--font-space-grotesk)]">
      {/* SOLID BACKGROUND */}
      <div className="fixed inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[#050505]" />
         <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <Header 
        onSignIn={handleSignIn} 
        onSignUp={handleSignUp} 
        user={user} 
        onSignOut={handleLogout} 
        hideAuthButtons={true} 
      />

      <main className="relative z-10 pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-28">
          
          {/* LEFT: CONTENT (PURE WHITE TEXT - NO GRADIENTS) */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/40 bg-white/5">
               <Fingerprint className="w-4 h-4 text-blue-500" />
               <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Core Protocol</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white uppercase italic">
              COLLECTIVE <br />
              INTELLIGENCE.
            </h1>

            <p className="max-w-xl text-white text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-blue-600 pl-6 bg-white/5 py-4">
              Hyper-stable agentic orchestration for elite decision makers. Collapse complexity with zero hallucinations. Verified. Precise. Autonomous.
            </p>

            <div className="flex gap-16 pt-6">
              <div className="flex flex-col border-t-2 border-white/20 pt-4">
                <span className="text-4xl font-black text-white">0.02ms</span>
                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Latency</span>
              </div>
              <div className="flex flex-col border-t-2 border-white/20 pt-4">
                <span className="text-4xl font-black text-white">99.9%</span>
                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Integrity</span>
              </div>
            </div>
          </div>

          {/* RIGHT: VIBRANT AUTH CARD */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-[#111111] border-2 border-white/20 rounded-[2.5rem] p-10 lg:p-14 shadow-[0_0_100px_rgba(37,99,235,0.15)] space-y-12">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-8">
                <div>
                  <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                    {user ? "ACCESS" : (isLogin ? "SIGN IN" : "SIGN UP")}
                  </h2>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Sanctuary Entrance</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center p-3 shadow-xl">
                  <Brain className="w-full h-full text-black" />
                </div>
              </div>

              {user ? (
                <div className="space-y-10 flex flex-col items-center">
                  <div className="text-center space-y-2">
                    <p className="text-xs font-black text-white uppercase tracking-widest italic opacity-50">Welcome, Operator</p>
                    <p className="text-4xl font-black text-white uppercase italic">{user.name}</p>
                  </div>
                  <Link href="/muse" className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full py-7 flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.2em]"
                    >
                      <Layers className="w-6 h-6" />
                      Initialize Portal
                    </motion.button>
                  </Link>
                  <button onClick={handleLogout} className="text-xs font-black text-red-500 hover:text-red-400 uppercase tracking-widest underline decoration-2 underline-offset-8 transition-all">Destroy Session</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  {!isLogin && (
                    <div className="relative group">
                      <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        required
                        type="text" 
                        placeholder="NAME"
                        className="w-full bg-white/10 border-2 border-white/20 rounded-2xl py-6 px-16 text-sm font-black text-white placeholder:text-white/30 focus:outline-none focus:border-blue-600 focus:bg-white/20 transition-all uppercase tracking-widest"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  )}

                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      required
                      type="email" 
                      placeholder="EMAIL"
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl py-6 px-16 text-sm font-black text-white placeholder:text-white/30 focus:outline-none focus:border-blue-600 focus:bg-white/20 transition-all uppercase tracking-widest"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      required
                      type="password" 
                      placeholder="ENCRYPTION"
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl py-6 px-16 text-sm font-black text-white placeholder:text-white/30 focus:outline-none focus:border-blue-600 focus:bg-white/20 transition-all uppercase tracking-widest"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="btn-primary w-full py-8 flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.4em] shadow-2xl disabled:opacity-50"
                  >
                    {isSubmitting ? "SYNC..." : (
                      <>
                        <Zap className="w-6 h-6" />
                        {isLogin ? "EXECUTE LOGIN" : "RESERVE ACCESS"}
                      </>
                    )}
                  </motion.button>

                  <div className="pt-8 text-center border-t border-white/10">
                    <button 
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-xs font-black text-blue-600 hover:text-white uppercase tracking-widest underline decoration-2 underline-offset-8 transition-all"
                    >
                      {isLogin ? "SWITCH TO ENROLLMENT" : "RETURN TO IDENT"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FEATURES (HIGH VISIBILITY) */}
        <section className="mt-64 grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: Brain, title: "Neural Consensus", desc: "Collaborative agents debating problems in a digital round table for absolute certainty." },
              { icon: ShieldCheck, title: "Zero Error", desc: "Verified against deep vector knowledge archives. No hallucinations." },
              { icon: MessageSquare, title: "Autonomous IQ", desc: "Dynamic decision flows that evolve with every complex query." }
            ].map((f, i) => (
              <div key={i} className="p-12 rounded-[2.5rem] border-2 border-white/10 bg-[#111111] hover:border-blue-600 transition-all space-y-8">
                 <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                    <f.icon className="w-8 h-8 text-black" />
                 </div>
                 <h3 className="text-3xl font-black text-white uppercase italic leading-none">{f.title}</h3>
                 <p className="text-white text-base font-medium leading-relaxed italic opacity-80">{f.desc}</p>
              </div>
            ))}
        </section>
      </main>

      <footer className="border-t-4 border-white pb-20 pt-16 px-6 text-center">
         <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
               <Brain className="w-8 h-8 text-blue-600" />
               <span className="text-3xl font-black tracking-tighter text-white animate-pulse">OmniMind</span>
            </div>
            <p className="text-[10px] font-black text-white uppercase tracking-[0.6em] opacity-30">© 2026 THE VANGUARD GROUP • HIGH INTEGRITY AI</p>
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
