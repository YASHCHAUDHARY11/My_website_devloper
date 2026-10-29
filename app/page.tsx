'use client';

import React, { useState, useEffect } from 'react';
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
  Zap,
  Sliders,
  Send,
  Sparkles
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

// Skills Data
const SKILLS = [
  {
    category: 'Frontend Architecture',
    icon: Layers,
    items: ['React / Next.js 14', 'TypeScript', 'Tailwind CSS', 'State Machines (Zustand)', 'WebSockets / SSR', 'WAI-ARIA Accessibility']
  },
  {
    category: 'Backend & APIs',
    icon: Database,
    items: ['Node.js / Express', 'PostgreSQL / Prisma', 'Redis Caching', 'REST & GraphQL', 'OAuth / Auth0 / JWT', 'Microservices']
  },
  {
    category: 'Cloud, Automation & DevOps',
    icon: Cloud,
    items: ['Docker & Containerization', 'AWS (S3, Lambda, ECS)', 'CI/CD (GitHub Actions)', 'Workflow Automation (n8n/Webhooks)', 'Linux Sysadmin', 'Monitoring & Tracing']
  }
];

// Project Case Studies
const CASE_STUDIES = [
  {
    title: 'NexusFlow Engine',
    subtitle: 'Distributed Async Workflow & Webhook Orchestrator',
    problem: 'Clients faced dropped webhooks and concurrency race conditions handling 2M+ incoming payload events daily across multi-tenant integrations.',
    solution: 'Engineered a resilient queue processing pipeline with distributed locking, dead-letter retries, and sub-40ms execution monitoring.',
    stack: ['Next.js', 'Node.js', 'Redis Queue', 'PostgreSQL', 'Docker'],
    metrics: ['99.98% Deliverability', '3.8x Latency Reduction', '0 Data Drops'],
    liveUrl: '#',
    codeUrl: '#'
  },
  {
    title: 'PulseMetrics Analytics',
    subtitle: 'Zero-Latency Edge Real-Time Analytics Dashboard',
    problem: 'Traditional client-side tracking packages inflated bundle footprints by 140kB and severely degraded Core Web Vitals (LCP/CLS).',
    solution: 'Designed an ultra-lightweight (<2.1kB) client telemetry script paired with serverless edge consumers streaming updates to a live canvas UI.',
    stack: ['TypeScript', 'Tailwind CSS', 'Cloudflare Workers', 'ClickHouse', 'Chart.js'],
    metrics: ['100 Lighthouse Perf', '<15ms Edge Processing', 'Real-time WebSockets'],
    liveUrl: '#',
    codeUrl: '#'
  }
];

export default function PortfolioPage() {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Terminal interactive state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'yash --version', output: 'v3.4.0 (production-ready-release)' },
    { cmd: 'yash --status', output: 'Available for high-impact contracts & full-stack roles' },
    { cmd: 'help', output: 'Available commands: about, skills, contact, clear' }
  ]);

  // Interactive Sandbox Playground state
  const [rateLimitRate, setRateLimitRate] = useState(15);
  const [burstCount, setBurstCount] = useState(0);
  const [isThrottled, setIsThrottled] = useState(false);

  // Copy to clipboard helper
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_DATA.email);
      setCopied(true);
      setToastMessage('Copied yash9627@gmail.com to clipboard!');
      setTimeout(() => setCopied(false), 2500);
      setTimeout(() => setToastMessage(null), 3000);
    } catch {
      setToastMessage('Failed to copy. Please manually copy: ' + CONTACT_DATA.email);
    }
  };

  // Terminal command execution
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = terminalInput.trim().toLowerCase();
    if (!cleanCmd) return;

    let response = '';
    switch (cleanCmd) {
      case 'help':
        response = 'Commands: about, skills, contact, clear';
        break;
      case 'about':
        response = 'Yash Chaudhary — Full-stack engineer crafting high-performance web applications and scalable automation.';
        break;
      case 'skills':
        response = 'Frontend (React, Next.js, TS), Backend (Node, Postgres, Redis), DevOps (Docker, AWS, CI/CD).';
        break;
      case 'contact':
        response = `Email: ${CONTACT_DATA.email} | Phone/WA: ${CONTACT_DATA.phoneFormatted}`;
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

  // Interactive Sandbox trigger
  const triggerSandboxAction = () => {
    if (burstCount >= rateLimitRate) {
      setIsThrottled(true);
      return;
    }
    setBurstCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (burstCount > 0) {
      const timer = setTimeout(() => {
        setBurstCount((prev) => Math.max(0, prev - 1));
        if (burstCount - 1 < rateLimitRate) {
          setIsThrottled(false);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [burstCount, rateLimitRate]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-blue-600/30 selection:text-blue-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-border bg-[#18181b] px-4 py-3 text-sm text-white shadow-2xl backdrop-blur transition-all">
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
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#sandbox" className="hover:text-white transition">Sandbox</a>
            <a href="#skills" className="hover:text-white transition">Skills Matrix</a>
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
            Available for select contracts & full-stack roles
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Full-Stack Engineer crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">high-performance</span> digital engines.
              </h1>
              <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-8">
                I am <span className="text-white font-medium">{CONTACT_DATA.name}</span>. I architect resilient web architectures, zero-latency APIs, and robust workflow automations that transform technical complexity into streamlined business software.
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
                  <span>Explore Work</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Terminal Window / Interactive Element */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0d1117] shadow-2xl font-mono text-xs">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] bg-[#161b22] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                    <span className="ml-2 text-zinc-400 text-[11px]">yash@production:~</span>
                  </div>
                  <TerminalIcon className="h-3.5 w-3.5 text-zinc-500" />
                </div>

                {/* Body */}
                <div className="p-4 h-64 overflow-y-auto space-y-3">
                  <div className="text-zinc-500">// Type &apos;help&apos;, &apos;skills&apos;, or &apos;about&apos; below</div>
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

        {/* ================= PROJECT CASE STUDIES ================= */}
        <section id="projects" className="py-16 border-t border-[rgba(255,255,255,0.08)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Engineering Portfolio</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Featured Case Studies</h2>
            </div>
            <p className="text-sm text-zinc-400 mt-2 md:mt-0 font-mono">Proof of architecture & measurable impact</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASE_STUDIES.map((project, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-xl border border-[rgba(255,255,255,0.08)] bg-zinc-950/60 p-6 md:p-8 hover:border-zinc-700 transition duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      <a href={project.liveUrl} className="rounded p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-zinc-300 mb-4">{project.subtitle}</p>

                  <div className="space-y-3 mb-6 text-sm text-zinc-400">
                    <div>
                      <strong className="text-zinc-200 font-mono text-xs uppercase tracking-wider block mb-1">Problem Statement:</strong>
                      <p className="text-xs leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <strong className="text-zinc-200 font-mono text-xs uppercase tracking-wider block mb-1">Architecture & Solution:</strong>
                      <p className="text-xs leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  {/* Metrics Badge Row */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.metrics.map((metric, mIdx) => (
                      <span key={mIdx} className="inline-flex items-center gap-1 rounded border border-emerald-500/20 bg-emerald-950/20 px-2.5 py-1 text-xs font-mono text-emerald-400">
                        <Sparkles className="h-3 w-3" />
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  {project.stack.map((tech, tIdx) => (
                    <span key={tIdx} className="rounded bg-zinc-900 px-2 py-0.5 text-[11px] font-mono text-zinc-400 border border-zinc-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= INTERACTIVE DEV SANDBOX ================= */}
        <section id="sandbox" className="py-16 border-t border-[rgba(255,255,255,0.08)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Interactive Execution</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Token-Bucket Rate Limiter Sandbox</h2>
            </div>
            <p className="text-sm text-zinc-400 mt-2 md:mt-0 font-mono">Real-time state & backpressure simulation</p>
          </div>

          <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-zinc-950/70 p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-2">
                    <span className="flex items-center gap-1.5"><Sliders className="h-3.5 w-3.5 text-blue-400" /> Max Concurrency Ceiling</span>
                    <span>{rateLimitRate} req/s</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={rateLimitRate}
                    onChange={(e) => setRateLimitRate(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <button
                    onClick={triggerSandboxAction}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-blue-600/90 hover:bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition active:scale-[0.98]"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Dispatch Payload Pulse</span>
                  </button>
                  <p className="text-[11px] text-zinc-500 mt-2 font-mono">
                    Click rapidly to trigger upstream backpressure & circuit breaking.
                  </p>
                </div>
              </div>

              {/* Real-time State Visualizer */}
              <div className="lg:col-span-2 border border-[rgba(255,255,255,0.06)] rounded-lg bg-[#0d1117] p-5 font-mono">
                <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                  <span className="text-xs text-zinc-400 uppercase">Memory State Monitor</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-mono ${isThrottled ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                    {isThrottled ? 'STATUS: 429 THROTTLED' : 'STATUS: 200 HEALTHY'}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1 text-zinc-400">
                      <span>Queue Pressure Capacity</span>
                      <span>{burstCount} / {rateLimitRate} in-flight</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${burstCount >= rateLimitRate ? 'bg-red-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(100, (burstCount / rateLimitRate) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="rounded bg-black/60 p-3 text-[11px] space-y-1 text-zinc-300 border border-zinc-800/80">
                    <div>{`{"timestamp": "${new Date().toISOString()}",`}</div>
                    <div className="pl-4">{`"inFlightEvents": ${burstCount},`}</div>
                    <div className="pl-4">{`"threshold": ${rateLimitRate},`}</div>
                    <div className="pl-4 text-emerald-400">{`"evictionStrategy": "LeakyBucket-AsyncDrain"`}</div>
                    <div>{`}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SKILLS MATRIX ================= */}
        <section id="skills" className="py-16 border-t border-[rgba(255,255,255,0.08)]">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Domain Competence</span>
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
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Initiate Dialogue</span>
              <h2 className="text-3xl font-bold text-white mt-1 mb-4">Let&apos;s build something exceptional.</h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Whether you need a greenfield system built, an existing application scaled, or mission-critical workflows automated—reach out directly.
              </p>

              {/* Direct Channels */}
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
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
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

            {/* Structured Contact Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for reaching out! Yash Chaudhary will review your message promptly.');
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
                      placeholder="e.g. Alex Vance"
                      className="w-full rounded-md border border-[rgba(255,255,255,0.08)] bg-zinc-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Contact Email or Phone
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
                    Project Scope / Timeline
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your technical requirements, goals, and target deadlines..."
                    className="w-full rounded-md border border-[rgba(255,255,255,0.08)] bg-zinc-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-zinc-500">Average response time: &lt; 4 hours</span>
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
              <a href="#projects" className="hover:text-zinc-300 transition">Architectures</a>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
