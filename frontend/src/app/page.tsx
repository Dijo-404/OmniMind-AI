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

// --- REFINED TILT CARD (SUBTLE) ---
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Less aggressive rotation for "simple and visible" look
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
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
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const landingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: landingRef, offset: ["start start", "end end"] });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

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
    toast.success("Signed out.");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    
    const userData = { name: formData.name || "Operator", email: formData.email };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsSubmitting(false);
    toast.success(isLogin ? "Identified." : "Seat reserved.");
    
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
    <div ref={landingRef} className="relative min-h-screen overflow-hidden bg-[#0a0a0a] selection:bg-blue-600 selection:text-white font-[family-name:var(--font-space-grotesk)]">
      {/* BACKGROUND ELEMENTS */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-blue-800/10 blur-[150px] rounded-full" />
      </motion.div>

      <Header 
        onSignIn={handleSignIn} 
        onSignUp={handleSignUp} 
        user={user} 
        onSignOut={handleLogout} 
        hideAuthButtons={true} 
      />

      <main className="relative z-10 pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-24">
          
          {/* LEFT: CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg border border-white/10 bg-white/5 shadow-inner">
               <Fingerprint className="w-4 h-4 text-blue-500" />
               <span className="text-[10px] font-black text-white/50 tracking-[0.3em] uppercase">Security Level Alpha</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white uppercase italic">
              COLLECTIVE <br />
              <span className="text-blue-600">INTEL.</span>
            </h1>

            <p className="max-w-xl text-white/40 text-lg md:text-xl font-medium leading-relaxed italic">
              Hyper-stable agentic orchestration for decision makers. Collapse complexity with zero hallucinations. Verified. Precise. Autonomous.
            </p>

            <div className="flex gap-12 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">0.02ms</span>
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Inference Response</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">99%</span>
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Truth Accuracy</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CLEAN AUTH CARD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 w-full max-w-lg"
          >
            <TiltCard>
              <div className="relative p-1 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-blue-500/20 shadow-[-50px_50px_100px_rgba(0,0,0,0.5)]">
                 <div className="bg-[#0f0f0f] rounded-[1.9rem] p-10 lg:p-14 border border-white/5 space-y-10">
                    
                    <div className="flex items-center justify-between">
                       <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                          {user ? "ACCESS GRANTED" : (isLogin ? "Ident Protocol" : "Join Council")}
                       </h2>
                       <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center p-2">
                          <Brain className="w-full h-full text-black" />
                       </div>
                    </div>

                    {user ? (
                      <div className="space-y-8 py-4 flex flex-col items-center">
                         <div className="text-center space-y-2">
                            <p className="text-xs font-black text-white/30 tracking-widest uppercase">Operator Linked</p>
                            <p className="text-2xl font-black text-blue-500 italic uppercase">{user.name}</p>
                         </div>
                         <Link href="/muse" className="w-full">
                           <motion.button
                             whileHover={{ scale: 1.05 }}
                             className="btn-primary w-full py-6 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em]"
                           >
                             <Layers className="w-5 h-5" />
                             Initialize Portal
                           </motion.button>
                         </Link>
                         <button onClick={handleLogout} className="text-[10px] font-bold text-white/10 hover:text-red-500 transition-colors uppercase tracking-widest underline underline-offset-4">Disconnect</button>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-6">
                         {!isLogin && (
                            <div className="relative group">
                               <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                               <input 
                                 required
                                 type="text" 
                                 placeholder="OPERATOR NAME"
                                 className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-14 text-xs font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-blue-600/50 focus:bg-white/[0.06] transition-all uppercase tracking-widest"
                                 value={formData.name}
                                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                               />
                            </div>
                         )}

                         <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                            <input 
                              required
                              type="email" 
                              placeholder="EMAIL TERMINAL"
                              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-14 text-xs font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-blue-600/50 focus:bg-white/[0.06] transition-all uppercase tracking-widest"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                         </div>

                         <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-500 transition-colors" />
                            <input 
                              required
                              type="password" 
                              placeholder="ENCRYPTION KEY"
                              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-14 text-xs font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-blue-600/50 focus:bg-white/[0.06] transition-all uppercase tracking-widest"
                              value={formData.password}
                              onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                         </div>

                         <motion.button
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           disabled={isSubmitting}
                           className="btn-primary w-full py-6 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] shadow-2xl disabled:opacity-50"
                         >
                           {isSubmitting ? <Sparkles className="w-5 h-5 animate-spin" /> : (
                             <>
                               {isLogin ? <Zap className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                               {isLogin ? "EXECUTE LOGIN" : "JOIN THE ELITE"}
                             </>
                           )}
                         </motion.button>

                         <div className="pt-4 flex flex-col items-center gap-4 border-t border-white/5">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                               {isLogin ? "New to the Collective?" : "Already Authorized?"}
                            </p>
                            <button 
                              type="button"
                              onClick={() => setIsLogin(!isLogin)}
                              className="px-8 py-3 rounded-lg bg-blue-600/10 text-blue-500 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600/20 transition-all border border-blue-600/20"
                            >
                               {isLogin ? "PROCEED TO SIGN UP" : "BACK TO LOGIN"}
                            </button>
                         </div>
                      </form>
                    )}
                 </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* FEATURES (REDUCED COMPLAXITY) */}
        <section className="mt-60 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Brain, title: "Neural Consensus", desc: "Agents debate problems in a digital round table." },
              { icon: ShieldCheck, title: "Zero Hallucination", desc: "Verified against vector knowledge vaults." },
              { icon: MessageSquare, title: "Consensus IQ", desc: "Autonomous decisions with absolute precision." }
            ].map((f, i) => (
              <div key={i} className="p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all space-y-6">
                 <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <f.icon className="w-6 h-6 text-blue-500" />
                 </div>
                 <h3 className="text-xl font-black text-white uppercase italic">{f.title}</h3>
                 <p className="text-white/40 text-sm font-medium leading-relaxed italic">{f.desc}</p>
              </div>
            ))}
        </section>
      </main>

      <footer className="border-t border-white/5 py-20 px-6 text-center">
         <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
            <div className="flex items-center gap-3">
               <Brain className="w-6 h-6 text-blue-600" />
               <span className="text-xl font-black tracking-tighter text-white">OmniMind</span>
            </div>
            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">© 2026 THE VANGUARD GROUP</p>
         </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
      />

      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(to bottom, #ffffff, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
