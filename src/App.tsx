import { useState } from 'react';
import { Terminal, Trash2, Shield, Zap, Key, Database, LogOut, DollarSign, Menu } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import AdminDashboard from './AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'admin'>('landing');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'waitlist'), {
        email,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setEmail('');
    } catch (error: any) {
      console.error('Error adding to waitlist:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to join waitlist. Please try again.');
    }
  };

  if (currentView === 'admin') {
    return <AdminDashboard onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary selection:text-on-primary">
      {/* TopAppBar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/5">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tighter text-primary font-headline">
            LeadScrub
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="text-primary font-bold font-headline text-sm tracking-wide" href="#">Product</a>
            <a className="text-secondary hover:bg-primary/10 transition-colors px-3 py-1 font-headline text-sm tracking-wide" href="#">Privacy</a>
            <a className="text-secondary hover:bg-primary/10 transition-colors px-3 py-1 font-headline text-sm tracking-wide" href="#">Pricing</a>
            <button className="bg-primary text-on-primary px-4 py-2 text-xs font-bold uppercase tracking-widest hover:scale-95 duration-100 rounded-sm">
              Early Access
            </button>
          </div>
          <div className="md:hidden">
            <Menu className="text-primary w-6 h-6" />
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Section 1: Hero */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center max-w-5xl mx-auto py-20">
          <div className="inline-block border border-primary/20 px-3 py-1 mb-8">
            <span className="font-label text-xs tracking-[0.2em] text-primary uppercase">v1.0-beta // local-first architecture</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-8 leading-[1.1]">
            STOP WASTING HOURS <br />
            <span className="text-primary italic">FORMATTING MESSY</span> SALES LEADS.
          </h1>
          <p className="font-sans text-lg md:text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed">
            100% Local AI Lead Extractor for Windows/Mac. Plug in your own DeepSeek/OpenAI Key and pay fractions of a cent per lead. Built for Solo Sales Reps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-on-primary font-bold px-8 py-4 text-sm uppercase tracking-widest hover:brightness-110 transition-all rounded-sm"
            >
              Join the Waitlist (Get 50% Off Early Access)
            </button>
            <div className="flex items-center gap-2 px-6 py-4 border border-outline-variant/30 text-on-surface-variant rounded-sm">
              <Terminal className="w-4 h-4" />
              <span className="font-label text-[10px] tracking-widest uppercase">Desktop App Required</span>
            </div>
          </div>
        </section>

        {/* Section 2: Problem Area */}
        <section className="bg-surface-container-low py-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-6 text-on-surface">
                "I hate manual data entry. <br /> My CRM import always fails."
              </h2>
              <p className="font-sans text-on-surface-variant mb-8 leading-relaxed">
                You spent $500 on ZoomInfo/Apollo/LinkedIn. Now you spend your Friday night fixing: names like <code className="text-secondary bg-surface-container-high px-1 rounded-sm">john SMITH</code>, phone numbers with special chars, and a chaos of notes. It's messy, private, and takes hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-surface-container-high/50 rounded-sm">
                  <Trash2 className="text-error mt-1 w-5 h-5" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-on-surface font-label">Garbage In, Garbage Out</p>
                    <p className="text-xs text-on-surface-variant mt-1">Messy strings break your cold email automation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
              <div className="relative bg-surface-container-lowest border border-outline-variant/20 shadow-2xl p-0">
                <div className="aspect-square overflow-hidden border border-outline-variant/20 shadow-2xl relative group">
                  <img 
                    alt="INPUT_LOG_RAW.CSV" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 border border-primary/10 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Solution Area */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="font-headline text-4xl font-bold mb-4">Enter LeadScrub: <span className="text-primary">A Smarter Way</span> to Format Leads.</h2>
            <p className="font-sans text-on-surface-variant max-w-2xl mx-auto">One click. Zero manual work. Our local-first desktop app uses AI to automatically parse and structure your lists into a pixel-perfect CRM-ready format.</p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-2 border border-outline-variant/20 bg-surface-container-low p-2 rounded-sm">
            <div className="bg-surface-dim p-8 relative rounded-sm">
              <div className="absolute top-4 left-4 font-label text-[10px] text-error-dim tracking-tighter uppercase font-bold">Raw Input</div>
              <div className="pt-8 font-mono text-xs text-on-surface-variant space-y-4">
                <p className="border-b border-outline-variant/5 pb-2">"John sMITHE" | (555) 123-4567 | notes: interested in saas, call back dec 12th</p>
                <p className="border-b border-outline-variant/5 pb-2">mrs. Sarah Connor, Los Angeles, tech corp, 9876543210</p>
                <p className="border-b border-outline-variant/5 pb-2">DOE, JANE - HR Director - JDOE@COMPANY.COM - 123-123-1234</p>
              </div>
            </div>
            <div className="bg-surface-container-high p-8 relative rounded-sm">
              <div className="absolute top-4 left-4 font-label text-[10px] text-primary tracking-tighter uppercase font-bold">LeadScrub Output</div>
              <div className="pt-8 space-y-4">
                <div className="flex gap-2 items-center">
                  <div className="h-2 w-2 bg-primary rounded-full shrink-0"></div>
                  <div className="bg-surface-container-lowest p-3 border border-primary/10 w-full rounded-sm">
                    <span className="text-[10px] font-mono text-primary">{'{ "first_name": "John", "last_name": "Smithe", "phone": "5551234567" }'}</span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="h-2 w-2 bg-primary rounded-full shrink-0"></div>
                  <div className="bg-surface-container-lowest p-3 border border-primary/10 w-full rounded-sm">
                    <span className="text-[10px] font-mono text-primary">{'{ "first_name": "Sarah", "last_name": "Connor", "city": "Los Angeles" }'}</span>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="h-2 w-2 bg-primary rounded-full shrink-0"></div>
                  <div className="bg-surface-container-lowest p-3 border border-primary/10 w-full rounded-sm">
                    <span className="text-[10px] font-mono text-primary">{'{ "first_name": "Jane", "last_name": "Doe", "role": "HR Director" }'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Core Features */}
        <section className="bg-surface-container-low py-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-surface-dim border border-outline-variant/10 hover:border-primary/30 transition-all group rounded-sm">
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-surface-container-high rounded-sm">
                <Shield className="text-primary w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-4">100% Local-First Privacy</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">Your client data never leaves your hard drive. No NDA issues. Totally safe from GDPR fine risks. We don't even have a database for your leads.</p>
            </div>
            <div className="p-8 bg-surface-dim border border-outline-variant/10 hover:border-secondary/30 transition-all group rounded-sm">
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-surface-container-high rounded-sm">
                <Zap className="text-secondary w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-4">Blazing Fast Speed</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">Since there are no cloud uploads, it processes thousands of rows locally on your PC. Your local AI models or API calls happen in parallel streams.</p>
            </div>
            <div className="p-8 bg-surface-dim border border-outline-variant/10 hover:border-tertiary/30 transition-all group rounded-sm">
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-surface-container-high rounded-sm">
                <Key className="text-tertiary w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-4">BYOK (Bring Your Own Key)</h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">Connect your own DeepSeek/OpenAI API key. Have total control over your AI spend. No middleman markup on processing fees.</p>
            </div>
          </div>
        </section>

        {/* Section 5: BYOK Price Advantage */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto bg-surface-container-high/30 p-12 border border-primary/10 relative overflow-hidden rounded-sm">
            <div className="absolute -right-8 -bottom-8 opacity-5 select-none">
              <DollarSign className="w-96 h-96 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8">
                <DollarSign className="text-4xl text-primary w-10 h-10" />
              </div>
              <h2 className="font-headline text-4xl font-bold mb-6">Save 90% on Software. <br /> Pay only for Tokens.</h2>
              <p className="font-sans text-on-surface-variant mb-10 leading-relaxed text-lg">
                We don't charge a $100/mo subscription. You can use DeepSeek Coder API for ultra-low costs (<span className="text-primary font-bold">fractions of a cent per lead</span>).
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="p-4 bg-surface-dim border border-outline-variant/20 rounded-sm">
                  <p className="font-label text-[10px] uppercase text-on-surface-variant mb-1">Standard SaaS</p>
                  <p className="text-xl font-bold text-error-dim line-through decoration-error-dim/50">$1,200/yr</p>
                </div>
                <div className="p-4 bg-surface-dim border border-primary/20 rounded-sm">
                  <p className="font-label text-[10px] uppercase text-primary mb-1">LeadScrub BYOK</p>
                  <p className="text-xl font-bold text-primary">~$12/yr</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Use Cases */}
        <section className="bg-surface-container-low py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="font-headline text-2xl font-bold flex items-center gap-3">
                  <Database className="text-secondary w-6 h-6" />
                  Works with your sources
                </h3>
                <p className="font-sans text-on-surface-variant leading-relaxed">
                  Perfect for leads scraped from: <span className="text-on-surface font-semibold">ZoomInfo / Apollo / Seamless.ai</span>, LinkedIn / Sales Navigator, or any custom scraping script.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-surface-container-high text-[10px] font-label tracking-widest border border-outline-variant/20 rounded-sm">APOLLO.IO</span>
                  <span className="px-3 py-1 bg-surface-container-high text-[10px] font-label tracking-widest border border-outline-variant/20 rounded-sm">LINKEDIN</span>
                  <span className="px-3 py-1 bg-surface-container-high text-[10px] font-label tracking-widest border border-outline-variant/20 rounded-sm">ZOOMINFO</span>
                </div>
              </div>
              <div className="space-y-8">
                <h3 className="font-headline text-2xl font-bold flex items-center gap-3">
                  <LogOut className="text-primary w-6 h-6" />
                  Ready for your CRM
                </h3>
                <p className="font-sans text-on-surface-variant leading-relaxed">
                  Generates a clean CSV ready for: <span className="text-on-surface font-semibold">Salesforce / HubSpot / Pipedrive / Notion.</span> No more "Field Mapping Error" alerts.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-primary/10 text-[10px] font-label tracking-widest border border-primary/20 text-primary rounded-sm">HUBSPOT</span>
                  <span className="px-3 py-1 bg-primary/10 text-[10px] font-label tracking-widest border border-primary/20 text-primary rounded-sm">SALESFORCE</span>
                  <span className="px-3 py-1 bg-primary/10 text-[10px] font-label tracking-widest border border-primary/20 text-primary rounded-sm">PIPEDRIVE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Final CTA */}
        <section id="waitlist" className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center border-2 border-primary/20 p-16 relative rounded-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-4 text-primary font-label text-xs tracking-widest uppercase">Launch Offer</div>
            <h2 className="font-headline text-5xl font-bold mb-6">The Last Lead Cleaner <br /> You'll Ever Buy.</h2>
            <p className="font-sans text-on-surface-variant mb-12 text-lg">Professional-grade lead formatting for solo sales reps. <br /> Early Bird: $49 (One-time payment). Standard Price will be $99 after launch.</p>
            
            <form onSubmit={handleJoinWaitlist} className="flex flex-col md:flex-row gap-0 max-w-xl mx-auto">
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface px-6 py-4 focus:ring-1 focus:ring-secondary focus:border-secondary outline-none transition-all placeholder:text-on-surface-variant/40 rounded-l-sm rounded-r-none" 
                placeholder="Enter your work email" 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="bg-primary text-on-primary font-bold px-8 py-4 uppercase tracking-widest hover:brightness-110 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed rounded-r-sm rounded-l-none transition-all"
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Get Early Bird Access ($49)'}
              </button>
            </form>
            
            {status === 'success' && (
              <p className="mt-4 text-sm text-primary font-medium">Thanks for joining! We'll be in touch soon.</p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm text-error font-medium">{errorMessage}</p>
            )}
            
            <p className="mt-6 text-[10px] font-label tracking-widest text-on-surface-variant uppercase opacity-50">Join 450+ sales reps on the waitlist</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-primary/10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-8">
          <div className="text-primary font-bold font-headline tracking-tighter text-lg">
            LeadScrub
          </div>
          <div className="font-headline text-[10px] uppercase tracking-[0.2em] text-outline text-center">
            © 2024 LeadScrub. Local-First Precision.
          </div>
          <div className="flex gap-8">
            <button onClick={() => setCurrentView('admin')} className="font-headline text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors">Admin</button>
            <a className="font-headline text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="font-headline text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="#">Terms</a>
            <a className="font-headline text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors" href="#">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
