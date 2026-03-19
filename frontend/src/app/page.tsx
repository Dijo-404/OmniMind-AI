"use client";

import { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring,
  useMotionValue
} from "framer-motion";
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
  Sparkles,
  Layers,
  Search,
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

// --- 3D TILT COMPONENT ---
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"signin" | "signup">("signin");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Local Auth Form State
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const landingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: landingRef, offset: ["start start", "end end"] });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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
    toast.success("Signed out safely.");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    
    const userData = { name: formData.name || "Vanguard", email: formData.email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsSubmitting(false);
    toast.success(isLogin ? "Identified as Vanguard." : "Council seat reserved.");
    
    setTimeout(() => {
      router.push("/muse");
    }, 800);
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setTimeout(() => {
      router.push("/muse");
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div ref={landingRef} className="relative min-h-screen overflow-hidden bg-[#050505] selection:bg-blue-600 selection:text-white font-[family-name:var(--font-space-grotesk)]">
      {/* 3D PARALLAX BACKGROUND */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[180px] rounded-full" />
        
        {/* Animated Particles Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      </motion.div>

      <Header 
        onSignIn={handleSignIn} 
        onSignUp={handleSignUp} 
        user={user} 
        onSignOut={handleLogout} 
      />

      <main className="relative z-10 pt-44 pb-32 px-6 max-w-7xl mx-auto">
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 mb-60">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-12"
          >
            <motion.div
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] shadow-[0_0_40px_rgba(37,99,235,0.15)]"
            >
              <Fingerprint className="w-4 h-4" />
              SYSTEM IDENTIFICATION ACTIVE
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] text-white">
              MASTER THE <br />
              <span className="gradient-text drop-shadow-[0_0_60px_rgba(59,130,246,0.5)] italic">COLLECTIVE.</span>
            </h1>

            <p className="max-w-xl text-white/50 text-lg md:text-xl font-medium leading-relaxed italic">
              Experience the pinnacle of agentic collaboration. OmniMind orchestrates specialized LLM architectures into a hyper-stable decision engine with zero hallucinations.
            </p>

            <div className="flex gap-10 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">0.02ms</span>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Inference Warp</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">99.9%</span>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Truth Accuracy</span>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: GLASSMORTPHIC 3D AUTH CARD --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 w-full max-w-xl perspective-1000"
          >
            <TiltCard>
              <div className="relative group p-[1px] rounded-[3rem] bg-gradient-to-br from-blue-600/30 via-transparent to-purple-600/30 overflow-hidden shadow-2xl">
                {/* 3D Brain Glow behind card */}
                <div className="absolute -inset-10 bg-blue-600/10 blur-[80px] rounded-full group-hover:bg-blue-600/20 transition-all duration-1000" />
                
                <div className="relative bg-[#0a0a0a]/90 backdrop-blur-3xl rounded-[3rem] p-10 lg:p-14 border border-white/5 space-y-10">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                      <Brain className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                        {user ? `Welcome, ${user.name.split(' ')[0]}` : (isLogin ? "Ident Protocol" : "Reserve Seat")}
                      </h2>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] font-mono">
                        {user ? "Session Token: Verified" : (isLogin ? "Authorize terminal access" : "Establish neural link")}
                      </p>
                    </div>
                  </div>

                  {user ? (
                    <div className="flex flex-col items-center space-y-8 py-4">
                      <Link href="/muse" className="w-full">
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(59, 130, 246, 0.4)" }}
                          className="btn-primary w-full py-6 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] shadow-2xl"
                        >
                          <Layers className="w-5 h-5 animate-spin-slow" />
                          Initialize Terminal
                        </motion.button>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="text-[10px] font-black text-red-500/50 hover:text-red-500 uppercase tracking-widest transition-colors"
                      >
                        Disconnect Link
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      {!isLogin && (
                        <div className="relative p-[1px] rounded-2xl bg-white/5 focus-within:bg-blue-600/30 transition-all">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input 
                            required
                            type="text" 
                            placeholder="OPERATOR NAME"
                            className="w-full bg-black/40 rounded-2xl py-5 px-12 text-xs font-black text-white placeholder:text-white/10 focus:outline-none tracking-widest uppercase transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                      )}
                      <div className="relative p-[1px] rounded-2xl bg-white/5 focus-within:bg-blue-600/30 transition-all">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                          required
                          type="email" 
                          placeholder="NEURAL ADDRESS"
                          className="w-full bg-black/40 rounded-2xl py-5 px-12 text-xs font-black text-white placeholder:text-white/10 focus:outline-none tracking-widest uppercase transition-all"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="relative p-[1px] rounded-2xl bg-white/5 focus-within:bg-blue-600/30 transition-all">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input 
                          required
                          type="password" 
                          placeholder="CIPHER KEY"
                          className="w-full bg-black/40 rounded-2xl py-5 px-12 text-xs font-black text-white placeholder:text-white/10 focus:outline-none tracking-widest uppercase transition-all"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(59, 130, 246, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        className="btn-primary w-full py-6 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] shadow-2xl disabled:opacity-50"
                        type="submit"
                      >
                        {isSubmitting ? (
                          <Sparkles className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            {isLogin ? "Execute Login" : "Initialize Vanguard"}
                          </>
                        )}
                      </motion.button>

                      <div className="text-center">
                        <button 
                          type="button"
                          onClick={() => setIsLogin(!isLogin)}
                          className="text-[10px] font-black text-white/20 hover:text-blue-500 uppercase tracking-widest transition-all"
                        >
                          {isLogin ? "Need a Seat in the Council?" : "Already an established Operator?"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </TiltCard>
            
            {/* Visual background imagery (Brain) floating around the card */}
            <motion.div
               animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
               transition={{ duration: 5, repeat: Infinity }}
               className="absolute -z-10 top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 w-full max-w-sm"
            >
               <img src="/hero-3d.png" className="w-full mix-blend-screen opacity-20 filter blur-sm" alt="" />
            </motion.div>
          </motion.div>
        </div>

        {/* --- 3D TILT FEATURE GRID --- */}
        <section id="features" className="space-y-40">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
             <div className="inline-block px-4 py-1 rounded-sm bg-white/5 border-l-4 border-blue-600">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">System Architecture</span>
             </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
              Hyper-Driven <br /> <span className="text-blue-600">Decision Flux.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: Brain,
                title: "Neural Collective",
                desc: "Four specialized agents engage in cross-referencing debate. Error rates reduced by 94% through autonomous oversight.",
                val: "47.2B OPS"
              },
              {
                icon: ShieldCheck,
                title: "Truth Protocol",
                desc: "Every recommendation is triple-checked against vector knowledge bases. Built for zero-hallucination environments.",
                val: "99.9% ACCURACY"
              },
              {
                icon: MessageSquare,
                title: "Consensus IQ",
                desc: "Dynamic weighting system that adjusts agent priority based on confidence intervals and past success metrics.",
                val: "NEURAL WEAVE"
              }
            ].map((f, i) => (
              <TiltCard key={i} className="h-full">
                <div className="h-full bg-gradient-to-br from-white/10 to-transparent p-[1px] shadow-2xl rounded-[2.5rem]">
                  <div className="h-full bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[2.5rem] p-12 flex flex-col space-y-10 border border-white/5 hover:border-blue-500/30 transition-all duration-700">
                    <div className="flex justify-between items-start">
                      <div className="w-20 h-20 rounded-[1.5rem] bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                        <f.icon className="w-10 h-10 text-blue-500" />
                      </div>
                      <span className="text-[10px] font-black text-blue-600/60 tracking-widest uppercase italic">{f.val}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tight mb-4 uppercase italic leading-none">{f.title}</h3>
                      <p className="text-white/40 leading-relaxed font-medium italic">{f.desc}</p>
                    </div>
                    <div className="pt-6 mt-auto">
                      <div className="flex items-center gap-4 group-hover:gap-8 transition-all duration-500">
                        <div className="h-[2px] w-12 bg-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-blue-500 transition-all">Layer Established</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* --- 3D INTERACTIVE CTA --- */}
        <section className="mt-60 relative group">
           <div className="absolute inset-0 bg-blue-600/20 blur-[150px] opacity-0 group-hover:opacity-100 transition-all duration-1000" />
           <motion.div 
             whileHover={{ scale: 1.01 }}
             className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-800 p-[1px] rounded-[4rem] overflow-hidden shadow-3xl"
           >
             <div className="bg-[#050505]/95 backdrop-blur-3xl rounded-[4rem] px-10 py-32 flex flex-col items-center text-center space-y-16">
               <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-[0.8]">
                 REWRITE THE <br /> <span className="text-blue-500 italic">EPOCH.</span>
               </h2>
               <p className="max-w-2xl text-white/40 text-xl font-medium tracking-tight italic">
                 OmniMind is not just another tool. It is the architectural shift in how intelligence should be deployed.
               </p>
               
               <motion.button
                 onClick={handleSignUp}
                 whileHover={{ scale: 1.1, boxShadow: "0 0 100px rgba(59, 130, 246, 0.4)" }}
                 className="btn-primary px-24 py-8 text-sm font-black uppercase tracking-[0.4em] shadow-2xl"
               >
                 ASCEND TO VANGUARD
               </motion.button>
             </div>
           </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Brain className="text-black w-7 h-7" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white animate-pulse">OmniMind</span>
            </div>
            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em] leading-relaxed">
               Neural Decision Sanctuary <br /> Powered by Multi-Agent Protocols
            </p>
          </div>

          <div className="flex flex-col gap-8 text-center md:text-left">
             <span className="text-[10px] font-black text-blue-600/60 uppercase tracking-widest">Connective Nodes</span>
             <div className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                <a href="#" className="hover:text-blue-500 transition-all">Terminal Access</a>
                <a href="#" className="hover:text-blue-500 transition-all">Privacy Encryption</a>
                <a href="#" className="hover:text-blue-500 transition-all">Neural Whitepaper</a>
             </div>
          </div>

          <div className="text-right">
             <p className="text-[10px] font-bold text-white/5 uppercase tracking-[0.6em]">
                © 22-03-2026 <br /> THE VANGUARD GROUP
             </p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
      />
      
      {/* 3D Global Effects */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .gradient-text {
          background: linear-gradient(to bottom, #ffffff, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
