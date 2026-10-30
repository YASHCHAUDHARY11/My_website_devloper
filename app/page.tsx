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
  TrendingUp,
  Download,
  FileSpreadsheet,
  CheckCircle2
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

// Raw Standalone HTML Tool for In-Browser Instant Download
const FREIGHT_TOOL_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Freight Summary Hub - Duplicate Detection & Master Billing Log</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-slate-100 text-slate-800 antialiased p-6">
  <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-slate-200 text-center">
    <h1 class="text-2xl font-bold text-slate-900 mb-2">BillCraft Pro - Freight Summary & Duplicate Detective</h1>
    <p class="text-sm text-slate-500 mb-6">Engineered by Yash Chaudhary. 100% Client-Side In-Browser Excel Reconciliation Engine.</p>
    <p class="text-xs text-slate-600">Please refer to the source package repository for full production asset bundles.</p>
  </div>
</body>
</html>`;

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
      'In-Browser Excel SheetJS (xlsx-js-style)',
      'Razorpay Payment Gateway Integration',
      'Dynamic Financial & Margin Modeling',
      'Composite Key Duplicate Detection'
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
    title: 'BillCraft Pro (Freight Summary)',
    subtitle: 'Duplicate Detective & Master Excel Billing Engine',
    problem:
      'Freight brokers and travel operators battle duplicate bookings, accidental ₹0 invoiced items, and hours spent manually assembling customer billing ledgers from raw spreadsheets.',
    solution:
      'Engineered an in-browser client-side engine with composite-key duplicate detection, dynamic column reordering, discount sum deduction, and styled SheetJS Excel/PDF generation.',
    stack: ['JavaScript (ES6+)', 'SheetJS (xlsx-js-style)', 'Tailwind CSS', 'Lucide Icons', 'Client-Side Safe'],
    metrics: ['Zero Server Latency (100% Client-side)', 'One-Click Duplicate Pruning', 'Multi-Customer Reconciliation'],
    liveUrl: '#',
    isDownloadable: true,
    downloadFileName: 'BillCraft_Pro_Freight_Engine.html'
  },
  {
    title: 'BizNavigator',
    subtitle: 'AI-Powered Business Feasibility & Monetization Platform',
    problem:
      'Founders and aspiring entrepreneurs struggle to quickly evaluate business feasibility, calculate unit economics, and obtain structured operational execution checklists.',
    solution:
      'Architected a full-stack platform leveraging the Gemini Flash API to produce dynamic multi-tier business roadmaps, instant unit-margin formulas, and integrated Razorpay monetization.',
    stack: ['Next.js', 'TypeScript', 'Gemini Flash API', 'Tailwind CSS', 'Razorpay', 'Vercel'],
    metrics: ['Sub-2s Roadmap Synthesis', 'Razorpay Integrated', 'Dynamic Margin Engine'],
    liveUrl: 'https://biz-navigatore.vercel.app/',
    isDownloadable: false
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
    liveUrl: 'https://logicompare.vercel.app/',
    isDownloadable: false
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
    liveUrl: 'https://forte-institute-meerut-y62f.vercel.app/',
    isDownloadable: false
  }
];

export default function PortfolioPage() {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'yash --version', output: 'v3.7.0 (light-luminous-release)' },
    { cmd: 'yash --live-apps', output: 'BillCraft Pro | BizNavigator | LogiCompare | Forte Institute' },
    { cmd: 'help', output: 'Commands: about, projects, download-tool, skills, contact, clear' }
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

  const handleDownloadFreightTool = () => {
    const blob = new Blob([FREIGHT_TOOL_HTML], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BillCraft_Pro_Freight_Summary_Hub.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setToastMessage('Downloading BillCraft Pro (.html)...');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = terminalInput.trim().toLowerCase();
    if (!cleanCmd) return;

    let response = '';
    switch (cleanCmd) {
      case 'help':
        response = 'Commands: about, projects, download-tool, skills, contact, clear';
        break;
      case 'about':
        response = 'Yash Chaudhary — Full-stack developer building practical AI apps, logistics comparative engines, and client-side Excel tools.';
        break;
      case 'projects':
        response = '1. BillCraft Pro (Excel Engine) | 2. BizNavigator | 3. LogiCompare | 4. Forte Portal';
        break;
      case 'download-tool':
        handleDownloadFreightTool();
        response = 'Triggering instant browser download for BillCraft Pro (.html)...';
        break;
      case 'skills':
        response = 'Next.js, TypeScript, React, Tailwind CSS, Gemini Flash API, Razorpay, SheetJS, Node.js';
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-50 text-slate-800 antialiased selection:bg-blue-500/20 selection:text-blue-900 transition-colors duration-500">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-white/95 px-5 py-3.5 text-sm text-slate-900 shadow-2xl backdrop-blur-md transition-all duration-300 ease-out animate-bounce">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-xs transition-all duration-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2.5 font-mono text-sm tracking-tight text-slate-900 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-xs group-hover:border-blue-500/40 group-hover:shadow-sm transition-all duration-300">
              <Code2 className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
            </span>
            <span className="font-bold tracking-normal">{CONTACT_DATA.name}</span>
            <span className="text-xs text-slate-400">/dev</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-slate-500">
            <a href="#projects" className="hover:text-blue-600 transition-colors duration-200 font-medium">Live Works</a>
            <a href="#sandbox" className="hover:text-blue-600 transition-colors duration-200 font-medium">Economics Engine</a>
            <a href="#skills" className="hover:text-blue-600 transition-colors duration-200 font-medium">Stack</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors duration-200 font-medium">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CONTACT_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3.5 py-1.5 font-mono text-xs font-semibold text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-xs active:scale-95 transition-all duration-200"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 md:py-20 space-y-20">
        {/* ================= HERO SECTION ================= */}
        <section className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1 text-xs font-mono text-emerald-800 mb-6 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for select full-stack builds & freelance projects
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Full-Stack Engineer building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">verified production software</span> & tools.
              </h1>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
                I am <span className="text-slate-900 font-semibold">{CONTACT_DATA.name}</span>. I build production-grade web applications, client-side spreadsheet reconciliation engines, logistics comparative tools, and AI-powered operational software.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={CONTACT_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all duration-200"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Start WhatsApp Chat</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-mono text-slate-700 shadow-xs hover:border-slate-400 hover:bg-slate-50 active:scale-95 transition-all duration-200"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-400" />}
                  <span>{copied ? 'Copied Email' : 'Copy Email'}</span>
                </button>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-white/60 transition-all duration-200"
                >
                  <span>Explore Live Projects</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Interactive Terminal in Sleek Modern Container */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] shadow-xl hover:shadow-2xl transition-all duration-300 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 bg-[#1e293b] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500/90"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-500/90"></div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500/90"></div>
                    <span className="ml-2 text-slate-400 text-[11px]">yash@production:~</span>
                  </div>
                  <TerminalIcon className="h-3.5 w-3.5 text-slate-400" />
                </div>

                <div className="p-5 h-64 overflow-y-auto space-y-3.5 bg-slate-950/90 text-slate-200">
                  <div className="text-slate-500">// Type &apos;help&apos;, &apos;projects&apos;, or &apos;download-tool&apos;</div>
                  {terminalLogs.map((log, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-2 text-blue-400 font-semibold">
                        <span className="text-emerald-400">λ</span>
                        <span>{log.cmd}</span>
                      </div>
                      <div className="text-slate-300 pl-4 leading-relaxed">{log.output}</div>
                    </div>
                  ))}

                  <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
                    <span className="text-emerald-400 font-bold">λ</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type a command..."
                      className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-600 font-mono"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROJECT CASE STUDIES (4 BUILDS) ================= */}
        <section id="projects" className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">Production Deployments</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">Live Applications & Case Studies</h2>
            </div>
            <p className="text-sm text-slate-500 mt-2 md:mt-0 font-mono">Direct proof of execution & interactive code</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASE_STUDIES.map((project, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs hover:shadow-xl hover:border-blue-300/80 hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {project.title}
                    </h3>

                    {project.isDownloadable ? (
                      <button
                        onClick={handleDownloadFreightTool}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 shadow-xs active:scale-95 transition-all duration-200"
                        title="Download Standalone HTML File"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download HTML Tool</span>
                      </button>
                    ) : (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-mono font-semibold text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-xs active:scale-95 transition-all duration-200"
                        title="Open Live App"
                      >
                        <span>Live App</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs font-medium text-slate-500 mb-4">{project.subtitle}</p>

                  <div className="space-y-3 mb-6 text-xs text-slate-600">
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                      <strong className="text-slate-900 font-mono text-[11px] uppercase tracking-wider block mb-1">Problem Addressed:</strong>
                      <p className="leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                      <strong className="text-slate-900 font-mono text-[11px] uppercase tracking-wider block mb-1">Architecture & Solution:</strong>
                      <p className="leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.metrics.map((metric, mIdx) => (
                      <span key={mIdx} className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50/80 px-2.5 py-1 text-[11px] font-mono font-medium text-emerald-800">
                        <Sparkles className="h-3 w-3 text-emerald-600" />
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {project.stack.map((tech, tIdx) => (
                    <span key={tIdx} className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-mono text-slate-600 border border-slate-200/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= INTERACTIVE COMPONENT PLAYGROUND ================= */}
        <section id="sandbox" className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">Interactive Logic Sandbox</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">Real-Time Unit Economics Calculator</h2>
            </div>
            <p className="text-sm text-slate-500 mt-2 md:mt-0 font-mono">Live reactive module derived from BizNavigator</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <label className="flex items-center justify-between text-xs font-mono text-slate-700 mb-2">
                    <span className="flex items-center gap-1.5 font-medium"><Sliders className="h-3.5 w-3.5 text-blue-600" /> Target Retail Price (₹)</span>
                    <span className="text-slate-900 font-bold text-sm bg-blue-50 px-2 py-0.5 rounded border border-blue-200">₹{sellingPrice}</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-mono text-slate-700 mb-2">
                    <span className="flex items-center gap-1.5 font-medium"><Calculator className="h-3.5 w-3.5 text-blue-600" /> Landed Cost of Goods (COGS) (₹)</span>
                    <span className="text-slate-900 font-bold text-sm bg-slate-100 px-2 py-0.5 rounded border border-slate-200">₹{productCost}</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="3000"
                    step="25"
                    value={productCost}
                    onChange={(e) => setProductCost(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-600 mb-1.5 font-medium">Shipping / Delivery (₹)</label>
                    <input
                      type="number"
                      value={shippingFee}
                      onChange={(e) => setShippingFee(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 font-mono shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-600 mb-1.5 font-medium">Payment Gateway Fee (%)</label>
                    <input
                      type="number"
                      value={gatewayCutPercent}
                      onChange={(e) => setGatewayCutPercent(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 font-mono shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Panel */}
              <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-6 font-mono shadow-xs">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4 text-xs">
                    <span className="text-slate-500 font-medium">Contribution Margin Health</span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${Number(calculations.netProfit) >= 0 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'}`}>
                      {Number(calculations.netProfit) >= 0 ? 'NET POSITIVE' : 'DEFICIT MARGIN'}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>Gateway Surcharge (Razorpay/Cards):</span>
                      <span className="text-slate-900 font-semibold">₹{calculations.gatewayFee}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Combined Realized Overhead:</span>
                      <span className="text-slate-900 font-semibold">₹{calculations.totalExpenses}</span>
                    </div>
                    <div className="flex justify-between text-slate-700 pt-3 border-t border-slate-200">
                      <span className="font-semibold">Net Contribution Per Order:</span>
                      <span className={`text-base font-bold ${Number(calculations.netProfit) >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                        ₹{calculations.netProfit} ({calculations.profitMargin}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-3 text-[11px] space-y-1 text-slate-600 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-blue-600 mb-1">
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
        <section id="skills" className="pt-8 border-t border-slate-200">
          <div className="mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">Domain Proficiency</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">Technical Stack & Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS.map((domain, idx) => {
              const Icon = domain.icon;
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{domain.category}</h3>
                  </div>

                  <ul className="space-y-2.5">
                    {domain.items.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-xs font-mono text-slate-700">
                        <Cpu className="h-3 w-3 text-blue-500" />
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
        <section id="contact" className="pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">Initiate Collaboration</span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1 mb-4">Let&apos;s build production software.</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Whether you need a custom web application built, AI workflows embedded, or automated logistics & spreadsheet reconciliation systems, contact me directly.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="text-xs font-mono text-slate-900 font-medium">{CONTACT_DATA.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors duration-200"
                    title="Copy Email"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                <a
                  href={CONTACT_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 text-emerald-900 hover:bg-emerald-100 shadow-xs active:scale-98 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-mono font-bold">Chat via WhatsApp ({CONTACT_DATA.phoneFormatted})</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
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
                className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5 font-medium">
                      Your Name / Org
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5 font-medium">
                      Email or WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="alex@company.com"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5 font-medium">
                    Project Scope / Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what you would like to build or automate..."
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none resize-none transition-all duration-200"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-slate-500">Typical response time: &lt; 2 hours</span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all duration-200"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <footer className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Yash Chaudhary. All rights reserved.</p>
            <div className="flex items-center gap-6 font-medium">
              <a href={CONTACT_DATA.whatsappUrl} className="hover:text-emerald-700 transition-colors duration-200">WhatsApp Direct</a>
              <a href={`mailto:${CONTACT_DATA.email}`} className="hover:text-blue-600 transition-colors duration-200">Direct Email</a>
              <a href="#projects" className="hover:text-slate-800 transition-colors duration-200">Live Applications</a>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
