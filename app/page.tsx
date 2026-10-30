'use client';

import React, { useState, useMemo } from 'react';
import {
  Code2,
  Terminal as TerminalIcon,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  ArrowUpRight,
  Database,
  Cloud,
  Layers,
  Cpu,
  Mail,
  Calculator,
  Sliders,
  Send,
  Sparkles,
  TrendingUp
} from 'lucide-react';

// Contact Data
const CONTACT_DATA = {
  name: 'Yash Chaudhary',
  email: 'yash9627@gmail.com',
  phoneFormatted: '+91 9627312025',
  whatsappUrl:
    'https://wa.me/919627312025?text=Hi%20Yash,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
};

// Skills Matrix
const SKILLS = [
  {
    category: 'Full-Stack & AI Integration',
    icon: Layers,
    items: [
      'Next.js 14 / React',
      'TypeScript & JavaScript',
      'Gemini Flash API & Prompt Design',
      'Tailwind CSS UI Systems',
      'State Management & Reactive Forms',
      'Responsive Mobile-First Architecture'
    ]
  },
  {
    category: 'Backend, APIs & Logistics Logic',
    icon: Database,
    items: [
      'Node.js RESTful API Endpoints',
      'Courier & Shipping Comparative Algorithms',
      'Razorpay Payment Gateway Integration',
      'Dynamic Financial & Margin Modeling',
      'Database Modeling & PostgreSQL',
      'Input Validation & Sanitization'
    ]
  },
  {
    category: 'E-Commerce, Cloud & Deployment',
    icon: Cloud,
    items: [
      'Vercel Edge Deployments & CI/CD',
      'Git & GitHub Team Workflows',
      'Marketplace Operations (Amazon / Meesho)',
      'Web Performance & Core Web Vitals (95+)',
      'Automated Order Workflow Pipelines',
      'SEO & OpenGraph Configuration'
    ]
  }
];

// Real Live Projects
const CASE_STUDIES = [
  {
    title: 'BizNavigator',
    subtitle: 'AI-Powered Business Feasibility & Monetization Platform',
    problem:
      'Founders and aspiring entrepreneurs struggle to quickly evaluate business feasibility, calculate unit economics, and obtain structured operational execution checklists.',
    solution:
      'Architected a full-stack platform leveraging the Gemini Flash API to produce dynamic multi-tier business roadmaps, instant unit-margin formulas, and integrated Razorpay monetization.',
    stack: ['Next.js', 'TypeScript', 'Gemini Flash API', 'Tailwind CSS', 'Razorpay', 'Vercel'],
    metrics: ['Sub-2s Roadmap Synthesis', 'Razorpay Integrated', 'Dynamic Margin Engine'],
    liveUrl: 'https://biz-navigatore.vercel.app/'
  },
  {
    title: 'LogiCompare',
    subtitle: 'Intelligent Courier & Shipping Margin Comparative Tool',
    problem:
      'Online sellers and logistics coordinators spend hours manually cross-referencing zone-based freight rates, courier weight slabs, and delivery SLAs across disparate carriers.',
    solution:
      'Designed an automated logistics rate calculator that aggregates dimensional freight formulas and rate cards, allowing merchants to identify the highest-margin delivery partner instantly.',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Logistics Rate Matrix', 'Vercel'],
    metrics: ['Instant Slab Breakdown', 'Zone-based Rate Comparison', '100% Mobile Optimized'],
    liveUrl: 'https://logicompare.vercel.app/'
  },
  {
    title: 'Forte Institute Meerut Portal',
    subtitle: 'Modern Institutional Campus & Academic Web Application',
    problem:
      'Conventional college portals suffer from outdated interfaces, sluggish mobile response times, and fragmented campus access points for students and faculty.',
    solution:
      'Built a fast, modern institutional web application for Forte Institute of Technology featuring streamlined mobile navigation, department directory architectures, and event hubs.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Accessible UI', 'Vercel Edge'],
    metrics: ['Sub-second First Contentful Paint', 'High Mobile Accessibility', 'Zero Layout Shifts'],
    liveUrl: 'https://forte-institute-meerut-y62f.vercel.app/'
  }
];

export default function PortfolioPage() {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'yash --version', output: 'v3.5.0 (verified-production-build)' },
    { cmd: 'yash --live-apps', output: 'BizNavigator | LogiCompare | Forte Institute Portal' },
    { cmd: 'help', output: 'Commands: about, projects, skills, contact, clear' }
  ]);

  // Live Unit Economics Playground
  const [sellingPrice, setSellingPrice] = useState(999);
  const [productCost, setProductCost] = useState(380);
  const [shippingFee, setShippingFee] = useState(85);
  const [gatewayCutPercent, setGatewayCutPercent] = useState(2);

  const calculations = useMemo(() => {
    const gatewayFee = (sellingPrice * gatewayCutPercent) / 100;
    const totalExpenses = productCost + shippingFee + gatewayFee;
    const netProfit = sellingPrice - totalExpenses;
    const profitMargin = sellingPrice > 0 ? ((netProfit / sellingPrice) * 100).toFixed(1) : '0';
    return {
      gatewayFee: gatewayFee.toFixed(1),
      totalExpenses: totalExpenses.toFixed(1),
      netProfit: netProfit.toFixed(1),
      profitMargin
    };
  }, [sellingPrice, productCost, shippingFee, gatewayCutPercent]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_DATA.email);
      setCopied(true);
      setToastMessage('Copied yash9627@gmail.com to clipboard!');
      setTimeout(() => setCopied(false), 2500);
      setTimeout(() => setToastMessage(null), 3000);
    } catch {
      setToastMessage('Please manually copy: ' + CONTACT_DATA.email);
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = terminalInput.trim().toLowerCase();
    if (!cleanCmd) return;

    let response = '';
    switch (cleanCmd) {
      case 'help':
        response = 'Commands: about, projects, skills, contact, clear';
        break;
      case 'about':
        response = 'Yash Chaudhary — Full-stack developer building practical AI apps, logistics comparative engines, and modern web apps.';
        break;
      case 'projects':
        response = '1. biz-navigatore.vercel.app | 2. logicompare.vercel.app | 3. forte-institute-meerut-y62f.vercel.app';
        break;
      case 'skills':
        response = 'Next.js, TypeScript, React, Tailwind CSS, Gemini Flash API, Razorpay, Logistics Logic, Node.js';
        break;
      case 'contact':
        response = `Email: ${CONTACT_DATA.email} | WhatsApp: ${CONTACT_DATA.phoneFormatted}`;
        break;
      case 'clear':
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      default:
        response = `zsh: command not found: ${cleanCmd}. Try 'help'`;
    }

    setTerminalLogs((prev) => [...prev, { cmd: terminalInput, output: response }]);
    setTerminalInput('');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-blue-600/30 selection:text-blue-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#18181b] px-4 py-3 text-sm text-white shadow-2xl backdrop-blur transition-all">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[rgba(255,255,255,0.08)] bg-[#09090b]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2.5 font-mono text-sm tracking-tight text-white group">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[rgba(255,255,255,0.12)] bg-zinc-900 group-hover:border-blue-500/50 transition">
              <Code2 className="h-4 w-4 text-blue-400" />
            </span>
            <span className="font-semibold tracking-normal">{CONTACT_DATA.name}</span>
            <span className="text-xs text-zinc-500">/dev</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <a href="#projects" className="hover:text-white transition">Live Works</a>
            <a href="#sandbox" className="hover:text-white transition">Economics Engine</a>
            <a href="#skills" className="hover:text-white transition">Stack</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CONTACT_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-950/20 px-3 py-1.5 font-mono text-xs font-medium text-emerald-400 hover:bg-emerald-900/30 transition"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pb-16 md:pb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/20 px-3 py-1 text-xs font-mono text-emerald-400 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for select full-stack builds & freelance projects
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Full-Stack Engineer building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">verified production software</span> & tools.
              </h1>
              <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-8">
                I am <span className="text-white font-medium">{CONTACT_DATA.name}</span>. I build production-grade web applications, automated business calculators, logistics comparative systems, and AI-powered operational tools.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={CONTACT_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Start WhatsApp Chat</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-md border border-[rgba(255,255,255,0.1)] bg-zinc-900 px-4 py-2.5 text-sm font-mono text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-zinc-400" />}
                  <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
                </button>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm text-zinc-400 hover:text-white transition"
                >
                  <span>Explore Live Projects</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Terminal Window */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0d1117] shadow-2xl font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] bg-[#161b22] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                    <span className="ml-2 text-zinc-400 text-[11px]">yash@production:~</span>
                  </div>
                  <TerminalIcon className="h-3.5 w-3.5 text-zinc-500" />
                </div>

                <div className="p-4 h-64 overflow-y-auto space-y-3">
                  <div className="text-zinc-500">// Type &apos;help&apos;, &apos;projects&apos;, or &apos;about&apos;</div>
                  {terminalLogs.map((log, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-2 text-blue-400">
                        <span className="text-emerald-400">λ</span>
                        <span>{log.cmd}</span>
                      </div>
                      <div className="text-zinc-300 pl-4">{log.output}</div>
                    </div>
                  ))}

                  <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-1">
                    <span className="text-emerald-400">λ</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type a command..."
                      className="w-full bg-transparent text-zinc-200 outline-none placeholder:text-zinc-600 font-mono"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROJECT CASE STUDIES (ALL 3 LIVE APPS) ================= */}
        <section id="projects" className="py-16 border-t border-[rgba(255,255,255,0.08)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Production Deployments</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Live Applications & Case Studies</h2>
            </div>
            <p className="text-sm text-zinc-400 mt-2 md:mt-0 font-mono">Direct proof of execution & verified URLs</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((project, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-xl border border-[rgba(255,255,255,0.08)] bg-zinc-950/60 p-6 hover:border-zinc-700 transition duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                      {project.title}
                    </h3>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded bg-zinc-900 border border-zinc-800 px-2 py-1 text-xs font-mono text-blue-400 hover:text-white hover:border-blue-500 transition"
                      title="Open Live App"
                    >
                      <span>Live App</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <p className="text-xs font-medium text-zinc-300 mb-4">{project.subtitle}</p>

                  <div className="space-y-3 mb-6 text-xs text-zinc-400">
                    <div>
                      <strong className="text-zinc-200 font-mono text-[11px] uppercase tracking-wider block mb-1">Problem Addressed:</strong>
                      <p className="leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <strong className="text-zinc-200 font-mono text-[11px] uppercase tracking-wider block mb-1">Architecture & Solution:</strong>
                      <p className="leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.metrics.map((metric, mIdx) => (
                      <span key={mIdx} className="inline-flex items-center gap-1 rounded border border-emerald-500/20 bg-emerald-950/20 px-2 py-0.5 text-[11px] font-mono text-emerald-400">
                        <Sparkles className="h-2.5 w-2.5" />
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  {project.stack.map((tech, tIdx) => (
                    <span key={tIdx} className="rounded bg-zinc-900 px-2 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= INTERACTIVE COMPONENT PLAYGROUND ================= */}
        <section id="sandbox" className="py-16 border-t border-[rgba(255,255,255,0.08)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Interactive Logic Sandbox</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Real-Time Unit Economics Calculator</h2>
            </div>
            <p className="text-sm text-zinc-400 mt-2 md:mt-0 font-mono">Live reactive module derived from BizNavigator</p>
          </div>

          <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-zinc-950/70 p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <label className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-2">
                    <span className="flex items-center gap-1.5"><Sliders className="h-3.5 w-3.5 text-blue-400" /> Target Retail Price (₹)</span>
                    <span className="text-white font-bold">₹{sellingPrice}</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-2">
                    <span className="flex items-center gap-1.5"><Calculator className="h-3.5 w-3.5 text-blue-400" /> Landed Cost of Goods (COGS) (₹)</span>
                    <span className="text-white font-bold">₹{productCost}</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="3000"
                    step="25"
                    value={productCost}
                    onChange={(e) => setProductCost(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">Shipping / Delivery (₹)</label>
                    <input
                      type="number"
                      value={shippingFee}
                      onChange={(e) => setShippingFee(Number(e.target.value))}
                      className="w-full rounded-md border border-[rgba(255,255,255,0.08)] bg-zinc-900/60 px-3 py-2 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">Payment Gateway Fee (%)</label>
                    <input
                      type="number"
                      value={gatewayCutPercent}
                      onChange={(e) => setGatewayCutPercent(Number(e.target.value))}
                      className="w-full rounded-md border border-[rgba(255,255,255,0.08)] bg-zinc-900/60 px-3 py-2 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Panel */}
              <div className="lg:col-span-6 flex flex-col justify-between rounded-lg border border-zinc-800 bg-[#0d1117] p-6 font-mono">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-4 text-xs">
                    <span className="text-zinc-400">Contribution Margin Health</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${Number(calculations.netProfit) >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {Number(calculations.netProfit) >= 0 ? 'NET POSITIVE' : 'DEFICIT MARGIN'}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs mb-6">
                    <div className="flex justify-between text-zinc-400">
                      <span>Gateway Surcharge (Razorpay/Cards):</span>
                      <span className="text-zinc-200">₹{calculations.gatewayFee}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Combined Realized Overhead:</span>
                      <span className="text-zinc-200">₹{calculations.totalExpenses}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400 pt-2 border-t border-zinc-800">
                      <span>Net Contribution Per Order:</span>
                      <span className={`text-sm font-bold ${Number(calculations.netProfit) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        ₹{calculations.netProfit} ({calculations.profitMargin}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded bg-black/60 p-3 text-[11px] space-y-1 text-zinc-300 border border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-blue-400 mb-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span className="font-semibold">BizNavigator Financial Engine</span>
                  </div>
                  <div>Net Profit = Retail - (COGS + Shipping + GatewayCut)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SKILLS MATRIX ================= */}
        <section id="skills" className="py-16 border-t border-[rgba(255,255,255,0.08)]">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Domain Proficiency</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Technical Stack & Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS.map((domain, idx) => {
              const Icon = domain.icon;
              return (
                <div key={idx} className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-zinc-950/40 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-semibold text-white text-base">{domain.category}</h3>
                  </div>

                  <ul className="space-y-2.5">
                    {domain.items.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                        <Cpu className="h-3 w-3 text-blue-400/70" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= CONTACT SECTION & FOOTER ================= */}
        <section id="contact" className="py-16 border-t border-[rgba(255,255,255,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Initiate Collaboration</span>
              <h2 className="text-3xl font-bold text-white mt-1 mb-4">Let&apos;s build production software.</h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Whether you need a custom web application built, AI workflows embedded, or automated logistics & commerce tools, contact me directly.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-lg border border-[rgba(255,255,255,0.08)] bg-zinc-900/50">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-mono text-zinc-200">{CONTACT_DATA.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
                    title="Copy Email"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-zinc-400" />}
                  </button>
                </div>

                <a
                  href={CONTACT_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-950/30 transition group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-mono font-medium">Chat via WhatsApp ({CONTACT_DATA.phoneFormatted})</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you! Yash Chaudhary will review your message promptly.');
                }}
                className="space-y-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-zinc-950/60 p-6 md:p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Your Name / Org
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full rounded-md border border-[rgba(255,255,255,0.08)] bg-zinc-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Email or WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="alex@company.com"
                      className="w-full rounded-md border border-[rgba(255,255,255,0.08)] bg-zinc-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Project Scope / Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what you would like to build or automate..."
                    className="w-full rounded-md border border-[rgba(255,255,255,0.08)] bg-zinc-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-zinc-500">Typical response time: &lt; 2 hours</span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-md hover:bg-blue-500 transition"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <footer className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
            <p>© {new Date().getFullYear()} Yash Chaudhary. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href={CONTACT_DATA.whatsappUrl} className="hover:text-zinc-300 transition">WhatsApp Direct</a>
              <a href={`mailto:${CONTACT_DATA.email}`} className="hover:text-zinc-300 transition">Direct Email</a>
              <a href="#projects" className="hover:text-zinc-300 transition">Live Applications</a>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
