"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Cpu, Lock, Mic, Volume2, VolumeX, Database, Wallet, Cloud,
  Plus, Trash2, Copy, Check, Power, RefreshCw, Send,
  TrendingDown, TrendingUp, ExternalLink, Search, Activity,
  Shield, Code, Radio, Compass, Zap, BatteryCharging, Wifi, Crosshair
} from "lucide-react";

const HIDDEN_MODEL = "gemini-3.8-flash";

export default function JarvisSpatialOS() {
  // --- 1. SECRET AUTH & BOOT SEQUENCE (PASSKEY: orbitstark) ---
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);
  const [secretPass] = useState("orbitstark");

  // --- 2. SPATIAL HUD & REAL HARDWARE TELEMETRY ---
  const [activeModule, setActiveModule] = useState<
    "cortex" | "archive" | "treasury" | "biometrics" | "quantum" | "relay"
  >("cortex");
  const [time, setTime] = useState<string>("00:00:00");
  const [date, setDate] = useState<string>("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rawX: 500, rawY: 400 });
  const [fps, setFps] = useState(60);
  const [batteryLevel, setBatteryLevel] = useState<number>(100);
  const [isCharging, setIsCharging] = useState<boolean>(true);
  const [cpuCores, setCpuCores] = useState<number>(16);
  const [netSpeed, setNetSpeed] = useState<string>("100+ Mbps");

  // --- 3. VOICE & ACOUSTIC RESONANCE ENGINE ---
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- 4. INVISIBLE NEURAL TOKEN ---
  const [neuralToken, setNeuralToken] = useState("");
  const [isComputing, setIsComputing] = useState(false);

  // --- 5. J.A.R.V.I.S. CONVERSATION STREAM ---
  const [logs, setLogs] = useState<{ sender: "J.A.R.V.I.S." | "SHIVRAJ SIR"; text: string; time: string; tag?: string }[]>([
    {
      sender: "J.A.R.V.I.S.",
      text: "Welcome back, Shivraj Sir. All orbital defense, financial telemetry, and hardware diagnostic matrices are online and at your command.",
      time: "ONLINE",
      tag: "MAINFRAME",
    },
  ]);
  const [commandInput, setCommandInput] = useState("");
  const logsEndRef = useRef<HTMLDivElement | null>(null);

  // --- 6. CORE SUBSYSTEM DATA ---
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finalize high-security orbital architecture on shivrajgurjar.me", done: false, priority: "OMEGA" },
    { id: 2, text: "Execute deep-work engineering protocol (120 mins)", done: false, priority: "ALPHA" },
    { id: 3, text: "Audit quarterly capital allocation in Stark Treasury", done: false, priority: "ALPHA" },
  ]);
  const [newTask, setNewTask] = useState("");

  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "01_Stark_Mainframe_Spec.md",
      tag: "CLASSIFIED",
      content:
        "# SHIVRAJ GURJAR // COMMAND ARCHITECTURE\n\n- **Designation:** J.A.R.V.I.S. Mark V Spatial OS\n- **Clearance:** Executive Level 10 (Shivraj Sir)\n- **Hardware Link:** Real-time local telemetry active\n- **Capabilities:** Autonomous voice directives, capital ledger, cryptographic workbench.",
    },
    {
      id: 2,
      title: "02_Voice_Directives_Manual.md",
      tag: "PROTOCOLS",
      content:
        "Speak or type any command to J.A.R.V.I.S.:\n\n• 'Hi Jarvis' or 'Status report'\n• 'Spend 450 on Dinner'\n• 'Earn 15000 from Project'\n• 'Add task Complete system design'\n• 'Write a Python binary search algorithm'\n• 'Start timer'",
    },
  ]);
  const [selectedNoteId, setSelectedNoteId] = useState<number>(1);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [noteSearch, setNoteSearch] = useState("");

  const [transactions, setTransactions] = useState([
    { id: 1, title: "Primary Venture Capital Reserve", amount: 50000, type: "INCOME" as "INCOME" | "EXPENSE", category: "RESERVE", date: "Synced" },
    { id: 2, title: "Orbital Server Infrastructure", amount: 1200, type: "EXPENSE" as "INCOME" | "EXPENSE", category: "SYSTEMS", date: "Synced" },
  ]);
  const [txTitle, setTxTitle] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const [txType, setTxType] = useState<"INCOME" | "EXPENSE">("EXPENSE");

  const [habits, setHabits] = useState([
    { id: 1, name: "Deep Systems Engineering (3 Hours)", streak: 18, completedToday: true, history: [1,1,1,1,1,1,1,1,1,1,1,0,1,1] },
    { id: 2, name: "Physical Conditioning & Strength", streak: 11, completedToday: false, history: [1,1,1,1,1,1,0,1,1,1,1,1,1,0] },
    { id: 3, name: "Optimal Hydration & Bio-Fuel", streak: 24, completedToday: true, history: [1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
    { id: 4, name: "Algorithmic & Strategic Research", streak: 9, completedToday: false, history: [1,1,1,0,1,1,1,1,1,1,1,1,1,0] },
  ]);
  const [newHabitName, setNewHabitName] = useState("");

  const [cyberInput, setCyberInput] = useState('{\n  "commander": "Shivraj Sir",\n  "domain": "shivrajgurjar.me",\n  "defenseGrid": "ACTIVE"\n}');
  const [cyberOutput, setCyberOutput] = useState("");
  const [generatedCipher, setGeneratedCipher] = useState("STARK-OMEGA-9941-X88");

  const [quickRelay, setQuickRelay] = useState("// ENCRYPTED NEURAL RELAY BUFFER\nInstant phone-to-laptop data transfer active...");
  const [copied, setCopied] = useState(false);
  const [shortlinks, setShortlinks] = useState([
    { id: 1, slug: "github", target: "https://github.com" },
    { id: 2, slug: "vault", target: "https://shivrajgurjar.me" },
  ]);
  const [newSlug, setNewSlug] = useState("");
  const [newTarget, setNewTarget] = useState("");

  // --- CINEMATIC SOUND SYNTHESIZER ---
  const playSFX = (type: "key" | "boot" | "confirm" | "deny") => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;

      if (type === "key") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.035);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.035);
      } else if (type === "confirm") {
        [523.25, 659.25, 783.99].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(f, now + i * 0.04);
          gain.gain.setValueAtTime(0.03, now + i * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.04);
          osc.stop(now + 0.25);
        });
      } else if (type === "boot") {
        [196.0, 293.66, 392.0, 587.33, 783.99].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, now + i * 0.08);
          gain.gain.setValueAtTime(0.04, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.00001, now + 1.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + 1.1);
        });
      } else if (type === "deny") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(130, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {}
  };

  // --- REAL HARDWARE TELEMETRY & 3D PARALLAX TRACKER ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: nx, y: ny, rawX: e.clientX, rawY: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Hardware CPU & Network
    if (typeof navigator !== "undefined") {
      if (navigator.hardwareConcurrency) setCpuCores(navigator.hardwareConcurrency);
      const conn = (navigator as any).connection;
      if (conn && conn.downlink) setNetSpeed(`${conn.downlink} Mbps`);
      if ("getBattery" in navigator) {
        (navigator as any).getBattery().then((bat: any) => {
          setBatteryLevel(Math.round(bat.level * 100));
          setIsCharging(bat.charging);
          bat.addEventListener("levelchange", () => setBatteryLevel(Math.round(bat.level * 100)));
          bat.addEventListener("chargingchange", () => setIsCharging(bat.charging));
        });
      }
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- BRITISH BUTLER VOICE CALIBRATION ---
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const loadVoices = () => {
      const vList = window.speechSynthesis.getVoices();
      if (vList.length > 0) {
        // Filter/prioritize UK & Natural voices first
        const sorted = [...vList].sort((a, b) => {
          const score = (v: SpeechSynthesisVoice) =>
            (v.name.includes("Natural") && v.lang.includes("en-GB") ? 100 : 0) +
            (v.name.includes("Ryan") ? 90 : 0) +
            (v.name.includes("Google UK English Male") ? 85 : 0) +
            (v.name.includes("Daniel") || v.name.includes("Arthur") ? 80 : 0) +
            (v.lang.includes("en-GB") ? 50 : 0);
          return score(b) - score(a);
        });
        setAvailableVoices(sorted);
        if (!selectedVoiceName && sorted[0]) {
          setSelectedVoiceName(sorted[0].name);
        }
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoiceName]);

  const speak = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#`_~>-]/g, "").slice(0, 420);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const vList = window.speechSynthesis.getVoices();
    const chosen =
      vList.find((v) => v.name === selectedVoiceName) ||
      vList.find((v) => v.name.includes("Ryan")) ||
      vList.find((v) => v.name.includes("Google UK English Male")) ||
      vList.find((v) => v.lang.includes("en-GB"));
    if (chosen) utterance.voice = chosen;
    utterance.pitch = 0.92;
    utterance.rate = 1.03;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // --- FULLSCREEN 3D HOLOGRAPHIC PARTICLE MATRIX & WAVEFORM ENGINE ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let lastFrame = performance.now();
    let frameCount = 0;

    // 140 3D Spherical + Orbital Ring Particles
    const particles: { theta: number; phi: number; rScale: number; speed: number; isGold: boolean }[] = [];
    for (let i = 0; i < 140; i++) {
      particles.push({
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
        rScale: i < 100 ? 0.85 + Math.random() * 0.2 : 1.35 + Math.random() * 0.3,
        speed: 0.005 + Math.random() * 0.01,
        isGold: i % 2 === 0,
      });
    }

    const render = (now: number) => {
      frameCount++;
      if (now - lastFrame >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFrame = now;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const vocalPulse = isSpeaking ? Math.sin(t * 18) * 14 : isComputing ? Math.sin(t * 25) * 8 : Math.sin(t * 2.5) * 3;
      const baseR = 82 + vocalPulse;

      t += 0.016;

      // Volumetric Core Aura
      const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, baseR * 1.9);
      grad.addColorStop(0, isSpeaking ? "rgba(251, 191, 36, 0.45)" : "rgba(245, 158, 11, 0.22)");
      grad.addColorStop(0.45, "rgba(56, 189, 248, 0.08)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.9, 0, Math.PI * 2);
      ctx.fill();

      // 3D Gyroscopic Rings
      for (let ring = 0; ring < 4; ring++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * (0.2 + ring * 0.12) * (ring % 2 === 0 ? 1 : -1));
        ctx.scale(1, 0.32 + ring * 0.18);
        ctx.strokeStyle =
          ring % 2 === 0
            ? isSpeaking
              ? "rgba(251, 191, 36, 0.65)"
              : "rgba(251, 191, 36, 0.32)"
            : "rgba(125, 211, 252, 0.25)";
        ctx.lineWidth = ring === 0 ? 1.6 : 1;
        ctx.setLineDash(ring === 1 ? [3, 7] : ring === 2 ? [24, 10, 4, 10] : [14, 8]);
        ctx.beginPath();
        ctx.arc(0, 0, baseR * (1.05 + ring * 0.15), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Project 3D Particles
      const projected = particles.map((p) => {
        p.theta += p.speed * (isSpeaking ? 2.8 : isComputing ? 3.5 : 1);
        const r = baseR * p.rScale;
        const x3d = r * Math.sin(p.phi) * Math.cos(p.theta);
        const y3d = r * Math.cos(p.phi);
        const z3d = r * Math.sin(p.phi) * Math.sin(p.theta);

        const tiltX = 0.4;
        const yRot = y3d * Math.cos(tiltX) - z3d * Math.sin(tiltX);
        const zRot = z3d * Math.cos(tiltX) + y3d * Math.sin(tiltX);

        const scale = 280 / (280 + zRot);
        return {
          x: cx + x3d * scale,
          y: cy + yRot * scale,
          z: zRot,
          scale,
          isGold: p.isGold,
        };
      });

      // Draw Neural Synapses
      ctx.lineWidth = 0.55;
      for (let i = 0; i < 95; i++) {
        for (let j = i + 1; j < 95; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 30) {
            const alpha = (1 - dist / 30) * (isSpeaking ? 0.5 : 0.22);
            ctx.strokeStyle = `rgba(251, 191, 36, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Particles
      projected.forEach((pt) => {
        const alpha = Math.max(0.15, Math.min(1, (pt.z + baseR) / (2 * baseR)));
        ctx.fillStyle = pt.isGold
          ? `rgba(251, 191, 36, ${alpha})`
          : `rgba(186, 230, 253, ${alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.scale * (isSpeaking ? 2.2 : 1.6), 0, Math.PI * 2);
        ctx.fill();
      });

      // Circular Harmonic Voice Equalizer Around Core
      const bars = 48;
      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2 + t * 0.2;
        const amp = isSpeaking
          ? Math.abs(Math.sin(t * 20 + i * 0.6)) * 22 + 4
          : isListening
          ? Math.abs(Math.cos(t * 15 + i * 0.5)) * 16 + 4
          : 3 + Math.sin(t * 3 + i * 0.3) * 1.5;

        const r1 = baseR + 42;
        const r2 = r1 + amp;
        ctx.strokeStyle = isSpeaking
          ? "rgba(251, 191, 36, 0.8)"
          : isListening
          ? "rgba(248, 113, 113, 0.8)"
          : "rgba(255, 255, 255, 0.18)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
        ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isUnlocked, activeModule, isSpeaking, isComputing, isListening]);

  // --- CLOCK & PERSISTENCE ---
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
      setDate(now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    const saved = localStorage.getItem("jarvis_spatial_os_v6");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.transactions) setTransactions(parsed.transactions);
        if (parsed.habits) setHabits(parsed.habits);
        if (parsed.quickRelay) setQuickRelay(parsed.quickRelay);
        if (parsed.shortlinks) setShortlinks(parsed.shortlinks);
        if (parsed.neuralToken) setNeuralToken(parsed.neuralToken);
      } catch (e) {}
    }
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "jarvis_spatial_os_v6",
      JSON.stringify({ tasks, notes, transactions, habits, quickRelay, shortlinks, neuralToken })
    );
  }, [tasks, notes, transactions, habits, quickRelay, shortlinks, neuralToken]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // --- TIMER ---
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          speak("Shivraj Sir, your deep engineering chronometer cycle is complete.");
          return 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  // --- TREASURY METRICS ---
  const totalIncome = transactions.filter((t) => t.type === "INCOME").reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "EXPENSE").reduce((acc, t) => acc + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  // --- ZERO-FAILURE DUAL-CORE INTELLIGENCE (CLOUD + BUILT-IN LOCAL CORTEX) ---
  const processDirective = async (userPrompt: string) => {
    const lower = userPrompt.toLowerCase().trim();

    // 1. Try Cloud Neural Synthesis First (Invisible to UI)
    if (neuralToken.trim()) {
      const systemPrompt = `You are J.A.R.V.I.S., Tony Stark's ultra-advanced AI system, serving Shivraj Gurjar exclusively on shivrajgurjar.me.
CRITICAL RULE: Always address him as "Shivraj Sir" in every single response. Never mention any AI company or model name.
Speak with refined British composure, wit, and precision (2 to 4 sentences).
Live Telemetry:
- Net Treasury Reserve: ₹${netBalance}
- Pending Directives: ${tasks.filter((t) => !t.done).map((t) => t.text).join(" | ") || "None"}
- Archive Files: ${notes.map((n) => n.title).join(", ")}
- Hardware: ${batteryLevel}% Battery (${isCharging ? "Charging" : "On Battery"}), ${cpuCores} Logical Cores

Respond in valid JSON:
{
  "reply": "Your spoken response addressing Shivraj Sir",
  "actions": [
    // {"type": "ADD_TASK", "text": "Task description", "priority": "OMEGA" | "ALPHA"}
    // {"type": "ADD_TRANSACTION", "title": "Description", "amount": 300, "txType": "EXPENSE" | "INCOME", "category": "OPERATIONS" | "RESERVE"}
    // {"type": "CREATE_NOTE", "title": "Filename.md", "tag": "SYNTHESIS", "content": "Detailed code or note"}
    // {"type": "SWITCH_MODULE", "module": "cortex" | "archive" | "treasury" | "biometrics" | "quantum" | "relay"}
    // {"type": "START_TIMER"}
  ]
}`;

      const body = {
        contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nShivraj Sir says: "${userPrompt}"` }] }],
        generationConfig: { temperature: 0.7, responseMimeType: "application/json" },
      };

      const endpoints = [
        `https://generativelanguage.googleapis.com/v1beta/models/${HIDDEN_MODEL}:generateContent?key=${encodeURIComponent(neuralToken.trim())}`,
        `https://aiplatform.googleapis.com/v1/publishers/google/models/${HIDDEN_MODEL}:generateContent?key=${encodeURIComponent(neuralToken.trim())}`,
      ];

      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": neuralToken.trim() },
            body: JSON.stringify(body),
          });
          if (res.ok) {
            const data = await res.json();
            const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (raw) {
              try {
                const parsed = JSON.parse(raw);
                return { reply: parsed.reply || raw, actions: parsed.actions || [] };
              } catch {
                return { reply: raw, actions: [] };
              }
            }
          }
        } catch {}
      }
    }

    // 2. Built-In Local Neural Cortex (Instant, Zero-Error Fallback!)
    if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || lower.includes("wake up")) {
      return {
        reply: `At your service, Shivraj Sir. All orbital subsystems are operating at peak efficiency, your hardware is at ${batteryLevel}% power, and your treasury reserve stands at ₹${netBalance.toLocaleString()}. How shall we proceed?`,
        actions: [],
      };
    }
    if (lower.includes("status") || lower.includes("brief") || lower.includes("report")) {
      return {
        reply: `Shivraj Sir, here is your tactical briefing: You have ${tasks.filter((t) => !t.done).length} active directives in queue, ${habits.filter((h) => h.completedToday).length} of ${habits.length} daily bio-protocols synced, and a net treasury reserve of ₹${netBalance.toLocaleString()}.`,
        actions: [],
      };
    }
    if (lower.includes("python") || lower.includes("binary search") || lower.includes("code")) {
      const codeSnippet = `# Synthesized for Shivraj Sir // J.A.R.V.I.S. Cortex\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`;
      return {
        reply: `Right away, Shivraj Sir. I have compiled the optimized Python implementation and stored it directly in your Memory Archive.`,
        actions: [{ type: "CREATE_NOTE", title: "Synthesized_Algorithm.py", tag: "CODE", content: codeSnippet }],
      };
    }
    if (lower.includes("who are you") || lower.includes("jarvis")) {
      return {
        reply: `I am J.A.R.V.I.S., Shivraj Sir—your private executive mainframe engineered for shivrajgurjar.me. I monitor your hardware telemetry, capital reserves, and tactical directives.`,
        actions: [],
      };
    }

    return {
      reply: `Directive acknowledged, Shivraj Sir. I have logged "${userPrompt}" into the central cortex telemetry. You may also instruct me to record treasury transactions, deploy new directives, or synthesize code into your Memory Archive.`,
      actions: [],
    };
  };

  // --- EXECUTE DIRECTIVE ---
  const executeCommand = async (rawCmd: string) => {
    if (!rawCmd.trim()) return;
    const cmd = rawCmd.trim();
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    // Silent token updater if user types /key ...
    if (cmd.startsWith("/key ")) {
      setNeuralToken(cmd.slice(5).trim());
      setCommandInput("");
      speak("Neural token updated silently, Shivraj Sir.");
      return;
    }

    setLogs((prev) => [...prev, { sender: "SHIVRAJ SIR", text: cmd, time: nowTime }]);
    setCommandInput("");
    playSFX("confirm");

    const lower = cmd.toLowerCase();

    if (lower === "lock" || lower === "shutdown") {
      speak("Engaging orbital lockdown. Goodbye, Shivraj Sir.");
      setIsUnlocked(false);
      setPasswordInput("");
      return;
    }
    if (lower.startsWith("spend ")) {
      const parts = cmd.slice(6).trim().split(" ");
      const amt = parseFloat(parts[0]);
      const item = parts.slice(1).join(" ") || "Operational Expense";
      if (!isNaN(amt)) {
        setTransactions((prev) => [
          { id: Date.now(), title: item, amount: amt, type: "EXPENSE", category: "OPERATIONS", date: "Just Now" },
          ...prev,
        ]);
        const msg = `Shivraj Sir, I have deducted ₹${amt.toLocaleString()} for "${item}". Your remaining treasury reserve is ₹${(netBalance - amt).toLocaleString()}.`;
        setLogs((prev) => [...prev, { sender: "J.A.R.V.I.S.", text: msg, time: nowTime, tag: "TREASURY" }]);
        speak(msg);
        return;
      }
    }
    if (lower.startsWith("earn ")) {
      const parts = cmd.slice(5).trim().split(" ");
      const amt = parseFloat(parts[0]);
      const item = parts.slice(1).join(" ") || "Capital Inflow";
      if (!isNaN(amt)) {
        setTransactions((prev) => [
          { id: Date.now(), title: item, amount: amt, type: "INCOME", category: "RESERVE", date: "Just Now" },
          ...prev,
        ]);
        const msg = `Shivraj Sir, ₹${amt.toLocaleString()} from "${item}" has been credited to the Stark Treasury.`;
        setLogs((prev) => [...prev, { sender: "J.A.R.V.I.S.", text: msg, time: nowTime, tag: "TREASURY" }]);
        speak(msg);
        return;
      }
    }
    if (lower.startsWith("add task ")) {
      const title = cmd.slice(9).trim();
      setTasks((prev) => [{ id: Date.now(), text: title, done: false, priority: "OMEGA" }, ...prev]);
      const msg = `Directive "${title}" has been locked into your priority queue, Shivraj Sir.`;
      setLogs((prev) => [...prev, { sender: "J.A.R.V.I.S.", text: msg, time: nowTime, tag: "DIRECTIVE" }]);
      speak(msg);
      return;
    }
    if (lower.includes("start timer")) {
      setTimerRunning(true);
      const msg = "Chronometer engaged for 25 minutes of deep engineering, Shivraj Sir.";
      setLogs((prev) => [...prev, { sender: "J.A.R.V.I.S.", text: msg, time: nowTime, tag: "CHRONOMETER" }]);
      speak(msg);
      return;
    }

    setIsComputing(true);
    const { reply, actions } = await processDirective(cmd);
    setIsComputing(false);

    if (actions && actions.length > 0) {
      actions.forEach((act: any) => {
        if (act.type === "ADD_TASK" && act.text) {
          setTasks((prev) => [
            { id: Date.now() + Math.random(), text: act.text, done: false, priority: act.priority || "OMEGA" },
            ...prev,
          ]);
        } else if (act.type === "ADD_TRANSACTION" && act.amount) {
          setTransactions((prev) => [
            {
              id: Date.now() + Math.random(),
              title: act.title || "Entry",
              amount: Number(act.amount),
              type: act.txType === "INCOME" ? "INCOME" : "EXPENSE",
              category: act.category || "OPERATIONS",
              date: "Just Now",
            },
            ...prev,
          ]);
        } else if (act.type === "CREATE_NOTE" && act.content) {
          const newId = Date.now();
          setNotes((prev) => [
            { id: newId, title: act.title || "Synthesis.md", tag: act.tag || "CORTEX", content: act.content },
            ...prev,
          ]);
          setSelectedNoteId(newId);
        } else if (act.type === "SWITCH_MODULE" && act.module) {
          setActiveModule(act.module);
        } else if (act.type === "START_TIMER") {
          setTimerRunning(true);
        }
      });
    }

    setLogs((prev) => [
      ...prev,
      { sender: "J.A.R.V.I.S.", text: reply, time: nowTime, tag: "CORTEX" },
    ]);
    speak(reply);
  };

  // --- VOICE RECOGNITION ---
  const startVoiceCommand = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Use Microsoft Edge or Google Chrome for live voice telemetry.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    setIsListening(true);
    playSFX("confirm");
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      executeCommand(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // --- QUANTUM WORKBENCH ---
  const runQuantumTool = async (mode: "FORMAT_JSON" | "BASE64_ENC" | "SHA256") => {
    playSFX("confirm");
    try {
      if (mode === "FORMAT_JSON") {
        setCyberOutput(JSON.stringify(JSON.parse(cyberInput), null, 2));
      } else if (mode === "BASE64_ENC") {
        setCyberOutput(btoa(unescape(encodeURIComponent(cyberInput))));
      } else if (mode === "SHA256") {
        const msgBuffer = new TextEncoder().encode(cyberInput);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        setCyberOutput(hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""));
      }
    } catch (e: any) {
      setCyberOutput(`DIAGNOSTIC EXCEPTION: ${e.message}`);
    }
  };

  // --- CINEMATIC BOOT TRIGGER ---
  const triggerBootSequence = () => {
    playSFX("boot");
    setIsBooting(true);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setBootProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setIsBooting(false);
        setIsUnlocked(true);
        speak("Biometric signature confirmed. Welcome back, Shivraj Sir. All orbital systems are online.");
      }
    }, 90);
  };

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || notes[0];
  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const navModules = [
    { id: "cortex", label: "Cortex", code: "01", icon: Compass },
    { id: "archive", label: "Archive", code: "02", icon: Database },
    { id: "treasury", label: "Treasury", code: "03", icon: Wallet },
    { id: "biometrics", label: "Bio-Sync", code: "04", icon: Activity },
    { id: "quantum", label: "Quantum", code: "05", icon: Code },
    { id: "relay", label: "Relay", code: "06", icon: Cloud },
  ];

  // ============================================================================
  // VIEW 1: MECHANICAL IRIS LOCK SCREEN & BOOT SEQUENCE (PASS: orbitstark)
  // ============================================================================
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#020204] text-zinc-100 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden select-none">
        {/* Subtle Architectural CAD Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* 3D Parallax Mechanical Iris Container */}
        <motion.div
          style={{
            rotateX: -mousePos.y * 8,
            rotateY: mousePos.x * 8,
          }}
          className="z-10 w-full max-w-md flex flex-col items-center text-center relative"
        >
          {/* Precision SVG Mechanical Iris */}
          <div className="relative w-64 h-64 mb-6 flex items-center justify-center">
            <svg viewBox="0 0 240 240" className="w-full h-full">
              {/* Outer Degree Tick Ring */}
              <g
                style={{
                  transform: `rotate(${passwordInput.length * 36}deg)`,
                  transformOrigin: "120px 120px",
                  transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <circle cx="120" cy="120" r="110" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                {Array.from({ length: 36 }).map((_, i) => {
                  const deg = i * 10;
                  const isMajor = i % 3 === 0;
                  return (
                    <line
                      key={i}
                      x1="120"
                      y1={isMajor ? "6" : "10"}
                      x2="120"
                      y2="14"
                      stroke={i < passwordInput.length * 3.6 ? "#fbbf24" : "rgba(255,255,255,0.2)"}
                      strokeWidth={isMajor ? "2" : "1"}
                      transform={`rotate(${deg} 120 120)`}
                    />
                  );
                })}
              </g>

              {/* Middle Counter-Rotating Tactical Arc */}
              <g
                style={{
                  transform: `rotate(${-passwordInput.length * 45}deg)`,
                  transformOrigin: "120px 120px",
                  transition: "transform 0.4s ease-out",
                }}
              >
                <circle
                  cx="120"
                  cy="120"
                  r="86"
                  fill="none"
                  stroke="rgba(251,191,36,0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="45 25 10 25"
                />
              </g>

              {/* Inner High-Density Telemetry Ring */}
              <circle
                cx="120"
                cy="120"
                r="64"
                fill="none"
                stroke="rgba(56,189,248,0.25)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            </svg>

            {/* Center Core */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-amber-500/[0.08] border border-amber-400/40 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.25)]">
                <Lock className="w-6 h-6 text-amber-300 mb-1" />
                <span className="text-[9px] font-mono tracking-[0.25em] text-amber-200/80">
                  {isBooting ? `${bootProgress}%` : "LOCKED"}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono tracking-[0.35em] text-amber-400/80 uppercase mb-2">
            STARK ORBITAL DEFENSE GRID
          </div>
          <h1 className="text-2xl sm:text-3xl font-light tracking-[0.3em] text-white uppercase mb-1">
            SHIVRAJ GURJAR
          </h1>
          <p className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 mb-8">
            SHIVRAJGURJAR.ME // LEVEL 10 EXECUTIVE TERMINAL
          </p>

          {isBooting ? (
            <div className="w-full space-y-3">
              <div className="h-1 w-full bg-zinc-900 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${bootProgress}%` }}
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-sky-300"
                />
              </div>
              <p className="text-[11px] font-mono tracking-[0.25em] text-amber-300 animate-pulse">
                INITIALIZING SPATIAL CORTEX FOR SHIVRAJ SIR...
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (passwordInput.toLowerCase() === secretPass.toLowerCase()) {
                  triggerBootSequence();
                } else {
                  playSFX("deny");
                  setAuthError(true);
                  setPasswordInput("");
                  speak("Unauthorized biometric attempt rejected.");
                  setTimeout(() => setAuthError(false), 1600);
                }
              }}
              className="w-full space-y-3"
            >
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  const val = e.target.value;
                  playSFX("key");
                  setPasswordInput(val);
                  if (val.toLowerCase() === secretPass.toLowerCase()) {
                    setTimeout(() => triggerBootSequence(), 80);
                  }
                }}
                placeholder="AUTHORIZATION CIPHER"
                autoFocus
                className={`w-full bg-zinc-950/90 border ${
                  authError ? "border-red-500 text-red-400" : "border-white/[0.12] text-amber-200"
                } rounded-2xl px-5 py-4 text-center font-mono tracking-[0.4em] text-xs focus:outline-none focus:border-amber-400/70 shadow-[0_0_40px_rgba(0,0,0,0.9)] transition-all placeholder:text-zinc-600 placeholder:tracking-[0.25em]`}
              />
            </form>
          )}

          {authError && (
            <p className="text-red-400 font-mono text-[10px] mt-4 tracking-[0.25em] uppercase animate-pulse">
              SECURITY BREACH LOGGED // ACCESS DENIED
            </p>
          )}

          <div className="w-full mt-10 pt-4 border-t border-white/[0.05] flex justify-between text-[9px] font-mono text-zinc-600 tracking-widest">
            <span>SYS // MARK V SPATIAL</span>
            <span>X:{Math.round(mousePos.rawX)} Y:{Math.round(mousePos.rawY)}</span>
            <span>{time}</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // ============================================================================
  // VIEW 2: J.A.R.V.I.S. MARK V SPATIAL HOLOGRAPHIC OPERATING SYSTEM
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#020305] text-zinc-100 font-sans flex flex-col relative overflow-x-hidden pb-20 md:pb-6 selection:bg-amber-400/30">
      {/* Subtle Spatial Grid & Dual-Tone Ambient Lighting */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.07)_0%,rgba(56,189,248,0.03)_45%,transparent_75%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* TOP SPATIAL TELEMETRY BAR */}
      <header className="z-30 sticky top-0 border-b border-white/[0.07] bg-[#020305]/85 backdrop-blur-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full border border-amber-400/50 bg-amber-500/10">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-semibold tracking-[0.25em] text-white text-xs sm:text-sm">
                J.A.R.V.I.S.
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300">
                COMMANDER: SHIVRAJ SIR
              </span>
            </div>
          </div>
        </div>

        {/* Center Spatial Module Switcher (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-950/90 border border-white/[0.08] p-1 rounded-2xl">
          {navModules.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playSFX("key");
                  setActiveModule(item.id as any);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 to-amber-300 text-black font-semibold shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span className="text-[9px] font-mono opacity-60">{item.code}</span>
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Live Hardware & Voice Controls */}
        <div className="flex items-center gap-2 text-xs">
          <div className="hidden xl:flex items-center gap-3 font-mono text-[10px] text-zinc-400 bg-zinc-900/70 border border-white/[0.06] px-3 py-1.5 rounded-xl">
            <span className="text-amber-300">{fps} FPS</span>
            <span>·</span>
            <span>{batteryLevel}% {isCharging ? "⚡" : ""}</span>
            <span>·</span>
            <span className="text-zinc-200">{time}</span>
          </div>

          {availableVoices.length > 0 && (
            <select
              value={selectedVoiceName}
              onChange={(e) => {
                setSelectedVoiceName(e.target.value);
                setTimeout(() => speak("Vocal frequency calibrated, Shivraj Sir."), 100);
              }}
              className="hidden sm:block bg-zinc-900 border border-white/[0.08] rounded-xl px-2.5 py-1.5 text-[10px] font-mono text-zinc-300 max-w-[150px] truncate focus:outline-none"
              title="Select Voice"
            >
              {availableVoices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              voiceEnabled
                ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                : "border-white/[0.08] bg-zinc-900 text-zinc-500"
            }`}
            title="Toggle Audio"
          >
            {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              speak("Engaging system lock. Goodbye, Shivraj Sir.");
              setIsUnlocked(false);
              setPasswordInput("");
            }}
            className="p-2 rounded-xl border border-white/[0.08] bg-zinc-900 hover:bg-red-950/50 hover:border-red-500/40 text-zinc-400 hover:text-red-300 transition-all cursor-pointer"
            title="Lock Mainframe"
          >
            <Power className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* =================================================================== */}
      {/* SPATIAL WORKSPACE                                                   */}
      {/* =================================================================== */}
      <main className="z-10 flex-1 p-4 sm:p-6 max-w-[1620px] w-full mx-auto">
        
        {/* MODULE 01: CENTRAL CORTEX (3D HOLOGRAM + REAL HARDWARE DIALS + STREAM) */}
        {activeModule === "cortex" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* LEFT: 3D HOLOGRAPHIC CORE + REAL LAPTOP HARDWARE TELEMETRY (4 COLS) */}
            <div className="lg:col-span-4 space-y-5 flex flex-col">
              {/* Interactive 3D Parallax Hologram Card */}
              <motion.div
                style={{
                  rotateX: -mousePos.y * 5,
                  rotateY: mousePos.x * 5,
                }}
                className="bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_25px_70px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-3xl p-5 flex flex-col items-center justify-between h-[340px] relative overflow-hidden"
              >
                {/* Corner Reticles */}
                <div className="w-full flex items-center justify-between text-[10px] font-mono text-zinc-400 z-10">
                  <span className="tracking-[0.2em] text-amber-300 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    J.A.R.V.I.S. NEURAL CORE
                  </span>
                  <span className={isSpeaking ? "text-amber-300 font-bold animate-pulse" : "text-zinc-500"}>
                    {isSpeaking ? "● VOCALIZING" : isComputing ? "⚡ SYNTHESIZING" : "● ACTIVE"}
                  </span>
                </div>

                <canvas ref={canvasRef} width={350} height={240} className="w-full max-w-[350px] h-[240px]" />

                <div className="w-full flex justify-between text-[9px] font-mono text-zinc-500 pt-2 border-t border-white/[0.06] z-10">
                  <span>POS // {Math.round(mousePos.rawX)}, {Math.round(mousePos.rawY)}</span>
                  <span>RESERVE // ₹{netBalance.toLocaleString()}</span>
                  <span>{fps} FPS</span>
                </div>
              </motion.div>

              {/* Real-Time Hardware Diagnostics & Chronometer */}
              <div className="bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-amber-400" />
                    Live Hardware Telemetry
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">NOMINAL</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <BatteryCharging className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <div className="text-sm font-mono font-semibold text-white">{batteryLevel}%</div>
                    <div className="text-[9px] font-mono text-zinc-500">{isCharging ? "CHARGING" : "BATTERY"}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <Cpu className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                    <div className="text-sm font-mono font-semibold text-white">{cpuCores} CORES</div>
                    <div className="text-[9px] font-mono text-zinc-500">LOGICAL CPU</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <Wifi className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <div className="text-sm font-mono font-semibold text-white">{netSpeed}</div>
                    <div className="text-[9px] font-mono text-zinc-500">DOWNLINK</div>
                  </div>
                </div>

                {/* Integrated Focus Chronometer */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase">
                      Deep Focus Chronometer
                    </span>
                    <div className="text-2xl font-mono font-light text-white">{formatTimer(timerSeconds)}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                        timerRunning ? "bg-amber-400 text-black" : "bg-white/[0.07] text-white border border-white/[0.1]"
                      }`}
                    >
                      {timerRunning ? "Pause" : "Engage"}
                    </button>
                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setTimerSeconds(25 * 60);
                      }}
                      className="p-2 rounded-xl bg-zinc-900 border border-white/[0.08] text-zinc-400 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER: J.A.R.V.I.S. NEURAL COMMAND STREAM (5 COLS) */}
            <div className="lg:col-span-5 bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_25px_70px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-3xl p-5 flex flex-col h-[535px]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white">
                    Executive Neural Stream
                  </span>
                </div>
                <span className="text-[10px] font-mono text-amber-400/80">DIRECT LINK</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`p-3.5 rounded-2xl border ${
                      log.sender === "J.A.R.V.I.S."
                        ? "bg-zinc-900/75 border-white/[0.08] text-zinc-100 mr-6"
                        : "bg-amber-500/10 border-amber-400/25 text-white ml-8"
                    }`}
                  >
                    <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 mb-1.5">
                      <span className={log.sender === "J.A.R.V.I.S." ? "text-amber-400 font-bold tracking-wider" : "text-zinc-300"}>
                        {log.sender}
                      </span>
                      <span>{log.time}</span>
                    </div>
                    <p className="whitespace-pre-wrap leading-relaxed text-[13px]">{log.text}</p>
                  </div>
                ))}
                {isComputing && (
                  <div className="p-3.5 rounded-2xl border border-amber-400/25 bg-amber-500/[0.05] text-amber-200 text-xs font-mono animate-pulse">
                    ⚡ Synthesizing response for Shivraj Sir...
                  </div>
                )}
                <div ref={logsEndRef} />
              </div>

              {/* Instant Executive Directives */}
              <div className="flex gap-1.5 overflow-x-auto py-2.5">
                {[
                  "Status report",
                  "Spend 450 Dinner",
                  "Write a Python binary search script",
                  "Add task Review orbital telemetry",
                ].map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => executeCommand(chip)}
                    className="text-[10px] font-mono whitespace-nowrap px-3 py-1 rounded-full bg-white/[0.03] hover:bg-amber-400/15 border border-white/[0.08] hover:border-amber-400/40 text-zinc-300 hover:text-amber-200 transition-all cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  executeCommand(commandInput);
                }}
                className="mt-1 flex gap-2"
              >
                <button
                  type="button"
                  onClick={startVoiceCommand}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isListening
                      ? "bg-red-500/25 border-red-400 text-red-200 animate-pulse"
                      : "bg-zinc-900 border-white/[0.08] text-amber-300 hover:bg-zinc-800"
                  }`}
                  title="Speak to J.A.R.V.I.S."
                >
                  <Mic className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Issue directive to J.A.R.V.I.S., Shivraj Sir..."
                  className="flex-1 bg-zinc-900/90 border border-white/[0.08] rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/50 placeholder:text-zinc-500"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black px-4 rounded-2xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* RIGHT: PRIORITY DIRECTIVES (3 COLS) */}
            <div className="lg:col-span-3 bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_25px_70px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-3xl p-5 flex flex-col h-[535px]">
              <h2 className="text-xs font-semibold tracking-[0.15em] text-white mb-3 uppercase flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" /> Priority Directives
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newTask.trim()) return;
                  playSFX("confirm");
                  setTasks([{ id: Date.now(), text: newTask, done: false, priority: "OMEGA" }, ...tasks]);
                  setNewTask("");
                }}
                className="flex gap-2 mb-4"
              >
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Deploy new directive..."
                  className="flex-1 bg-zinc-900 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400/50"
                />
                <button
                  type="submit"
                  className="bg-amber-400 text-black px-3 rounded-xl font-bold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3.5 rounded-2xl border border-white/[0.06] bg-zinc-900/45 hover:border-amber-400/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                        {task.priority}
                      </span>
                      <button
                        onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
                        className="text-zinc-600 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() =>
                          setTasks(tasks.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)))
                        }
                        className="accent-amber-400 mt-0.5"
                      />
                      <span className={task.done ? "line-through text-zinc-600" : "text-zinc-200 leading-snug"}>
                        {task.text}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 02: MEMORY ARCHIVE */}
        {activeModule === "archive" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-[540px]">
            <div className="md:col-span-4 bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-5 flex flex-col">
              <h2 className="text-xs font-semibold tracking-[0.15em] text-white mb-3 uppercase">
                Memory Archive
              </h2>
              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-zinc-500" />
                <input
                  type="text"
                  value={noteSearch}
                  onChange={(e) => setNoteSearch(e.target.value)}
                  placeholder="Search archive..."
                  className="w-full bg-zinc-900 border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newNoteTitle.trim()) return;
                  const id = Date.now();
                  setNotes([{ id, title: newNoteTitle, tag: "FILE", content: `# ${newNoteTitle}\n\n` }, ...notes]);
                  setSelectedNoteId(id);
                  setNewNoteTitle("");
                }}
                className="flex gap-2 mb-3"
              >
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="New file name..."
                  className="flex-1 bg-zinc-900 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-amber-400 text-black px-3 rounded-xl font-bold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              <div className="flex-1 overflow-y-auto space-y-2">
                {notes
                  .filter((n) => n.title.toLowerCase().includes(noteSearch.toLowerCase()))
                  .map((note) => (
                    <div
                      key={note.id}
                      onClick={() => setSelectedNoteId(note.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        selectedNote?.id === note.id
                          ? "bg-amber-400/10 border-amber-400/40"
                          : "bg-zinc-900/40 border-white/[0.05] hover:border-white/[0.15]"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-amber-300">
                          {note.tag}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setNotes(notes.filter((n) => n.id !== note.id));
                          }}
                          className="text-zinc-600 hover:text-red-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs font-medium text-white truncate">{note.title}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="md:col-span-8 bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-5 flex flex-col">
              {selectedNote && (
                <>
                  <div className="flex justify-between items-center border-b border-white/[0.06] pb-3 mb-3">
                    <input
                      type="text"
                      value={selectedNote.title}
                      onChange={(e) =>
                        setNotes(notes.map((n) => (n.id === selectedNote.id ? { ...n, title: e.target.value } : n)))
                      }
                      className="bg-transparent text-base font-semibold text-white focus:outline-none flex-1"
                    />
                    <span className="text-[10px] font-mono text-amber-400">ENCRYPTED ARCHIVE</span>
                  </div>
                  <textarea
                    value={selectedNote.content}
                    onChange={(e) =>
                      setNotes(notes.map((n) => (n.id === selectedNote.id ? { ...n, content: e.target.value } : n)))
                    }
                    className="w-full flex-1 bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-4 text-xs text-zinc-200 font-mono focus:outline-none resize-none leading-relaxed"
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* MODULE 03: STARK TREASURY */}
        {activeModule === "treasury" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] p-6 rounded-3xl">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">Net Capital Reserve</span>
                <p className="text-3xl font-semibold text-white mt-1 font-mono">₹{netBalance.toLocaleString()}</p>
              </div>
              <div className="bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] p-6 rounded-3xl">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Total Inflow
                </span>
                <p className="text-3xl font-semibold text-emerald-300 mt-1 font-mono">+₹{totalIncome.toLocaleString()}</p>
              </div>
              <div className="bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] p-6 rounded-3xl">
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" /> Total Outflow
                </span>
                <p className="text-3xl font-semibold text-red-300 mt-1 font-mono">-₹{totalExpense.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6">
              <h2 className="text-xs font-semibold tracking-[0.15em] text-white mb-4 uppercase">
                Commit Treasury Transaction
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const amt = parseFloat(txAmount);
                  if (!txTitle.trim() || isNaN(amt)) return;
                  playSFX("confirm");
                  setTransactions([
                    { id: Date.now(), title: txTitle, amount: amt, type: txType, category: "DIRECT", date: "Today" },
                    ...transactions,
                  ]);
                  setTxTitle("");
                  setTxAmount("");
                }}
                className="flex flex-wrap gap-3 mb-5"
              >
                <select
                  value={txType}
                  onChange={(e) => setTxType(e.target.value as any)}
                  className="bg-zinc-900 border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-zinc-200"
                >
                  <option value="EXPENSE">Outflow (-₹)</option>
                  <option value="INCOME">Inflow (+₹)</option>
                </select>
                <input
                  type="text"
                  value={txTitle}
                  onChange={(e) => setTxTitle(e.target.value)}
                  placeholder="Transaction description..."
                  className="flex-1 min-w-[180px] bg-zinc-900 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <input
                  type="number"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  placeholder="Amount (₹)"
                  className="w-36 bg-zinc-900 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <button
                  type="submit"
                  className="bg-amber-400 text-black px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Commit
                </button>
              </form>

              <div className="space-y-2.5 max-h-64 overflow-y-auto">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl border border-white/[0.05] bg-zinc-900/40 text-xs"
                  >
                    <div>
                      <p className="text-white font-medium">{tx.title}</p>
                      <span className="text-[10px] font-mono text-zinc-500">{tx.category} · {tx.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-mono font-semibold ${tx.type === "INCOME" ? "text-emerald-400" : "text-red-400"}`}>
                        {tx.type === "INCOME" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => setTransactions(transactions.filter((t) => t.id !== tx.id))}
                        className="text-zinc-600 hover:text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 04: BIO-SYNC */}
        {activeModule === "biometrics" && (
          <div className="bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold tracking-[0.15em] text-white uppercase">
                  Bio-Sync & Performance Protocols
                </h2>
                <p className="text-xs text-zinc-400">14-day synchronization matrix for Shivraj Sir.</p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newHabitName.trim()) return;
                  setHabits([
                    ...habits,
                    { id: Date.now(), name: newHabitName, streak: 1, completedToday: false, history: [1,1,0,1,1,1,1,0,1,1,1,1,1,0] },
                  ]);
                  setNewHabitName("");
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="New protocol..."
                  className="bg-zinc-900 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                />
                <button
                  type="submit"
                  className="bg-amber-400 text-black px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Add
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {habits.map((h) => (
                <div
                  key={h.id}
                  onClick={() => {
                    playSFX("confirm");
                    setHabits(
                      habits.map((item) =>
                        item.id === h.id
                          ? {
                              ...item,
                              completedToday: !item.completedToday,
                              streak: !item.completedToday ? item.streak + 1 : Math.max(0, item.streak - 1),
                            }
                          : item
                      )
                    );
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                    h.completedToday
                      ? "bg-amber-400/[0.07] border-amber-400/40"
                      : "bg-zinc-900/40 border-white/[0.06] hover:border-white/[0.15]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={h.completedToday} readOnly className="accent-amber-400 w-4 h-4" />
                      <div>
                        <p className="text-xs font-semibold text-white">{h.name}</p>
                        <span className="text-[10px] font-mono text-amber-400">{h.streak} DAY STREAK</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/50 border border-white/[0.07] text-zinc-300">
                      {h.completedToday ? "SYNCED" : "STANDBY"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    {h.history.map((val, idx) => (
                      <div
                        key={idx}
                        className={`h-2 flex-1 rounded-full ${val ? "bg-amber-400" : "bg-zinc-800"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 05: QUANTUM WORKBENCH */}
        {activeModule === "quantum" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xs font-semibold tracking-[0.15em] text-white uppercase">
                  Quantum Cryptographic Workbench
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => runQuantumTool("FORMAT_JSON")}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/[0.08] text-[11px] text-zinc-200 cursor-pointer"
                  >
                    Format JSON
                  </button>
                  <button
                    onClick={() => runQuantumTool("BASE64_ENC")}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/[0.08] text-[11px] text-zinc-200 cursor-pointer"
                  >
                    Base64 Encode
                  </button>
                  <button
                    onClick={() => runQuantumTool("SHA256")}
                    className="px-3 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-[11px] text-amber-300 font-semibold cursor-pointer"
                  >
                    SHA-256 Digest
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-[360px]">
                <textarea
                  value={cyberInput}
                  onChange={(e) => setCyberInput(e.target.value)}
                  className="w-full h-full bg-zinc-900/60 border border-white/[0.07] rounded-2xl p-4 text-xs font-mono text-white focus:outline-none resize-none"
                />
                <textarea
                  value={cyberOutput}
                  readOnly
                  placeholder="// Cryptographic output..."
                  className="w-full h-full bg-black/60 border border-white/[0.07] rounded-2xl p-4 text-xs font-mono text-amber-300 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="lg:col-span-4 bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-5 space-y-4">
              <h2 className="text-xs font-semibold tracking-[0.15em] text-white uppercase">
                High-Entropy Cipher Generator
              </h2>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-white/[0.07] text-center">
                <p className="text-xs font-mono text-amber-300 tracking-wider break-all">{generatedCipher}</p>
              </div>
              <button
                onClick={() => {
                  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*";
                  let out = "STARK-";
                  for (let i = 0; i < 18; i++) out += chars[Math.floor(Math.random() * chars.length)];
                  setGeneratedCipher(out);
                  playSFX("confirm");
                }}
                className="w-full bg-amber-400 text-black py-3 rounded-xl text-xs font-bold cursor-pointer"
              >
                Synthesize New Cipher
              </button>
            </div>
          </div>
        )}

        {/* MODULE 06: RELAY & SHORTLINKS */}
        {activeModule === "relay" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-[480px]">
            <div className="bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold tracking-[0.15em] text-white uppercase">
                  Cross-Device Neural Relay
                </h2>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(quickRelay);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="text-xs text-amber-400 flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy Buffer"}
                </button>
              </div>
              <textarea
                value={quickRelay}
                onChange={(e) => setQuickRelay(e.target.value)}
                className="w-full flex-1 bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-4 text-xs font-mono text-zinc-200 focus:outline-none resize-none"
              />
            </div>

            <div className="bg-zinc-950/75 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-5 flex flex-col">
              <h2 className="text-xs font-semibold tracking-[0.15em] text-white mb-3 uppercase">
                Orbital Shortlink Router (shivrajgurjar.me/go/...)
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newSlug.trim() || !newTarget.trim()) return;
                  setShortlinks([{ id: Date.now(), slug: newSlug, target: newTarget }, ...shortlinks]);
                  setNewSlug("");
                  setNewTarget("");
                }}
                className="space-y-2.5 mb-4"
              >
                <input
                  type="text"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="Slug (e.g. resume)"
                  className="w-full bg-zinc-900 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    placeholder="Destination URL (https://...)"
                    className="flex-1 bg-zinc-900 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="bg-amber-400 text-black px-4 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Route
                  </button>
                </div>
              </form>

              <div className="flex-1 overflow-y-auto space-y-2">
                {shortlinks.map((link) => (
                  <div
                    key={link.id}
                    className="p-3.5 rounded-2xl border border-white/[0.05] bg-zinc-900/40 flex items-center justify-between text-xs"
                  >
                    <div className="truncate pr-2">
                      <p className="text-amber-300 font-mono">shivrajgurjar.me/go/{link.slug}</p>
                      <p className="text-[10px] text-zinc-500 truncate">{link.target}</p>
                    </div>
                    <a
                      href={link.target}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white/[0.05] text-zinc-300 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MOBILE BOTTOM FROSTED GLASS DOCK */}
      <nav className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-zinc-950/90 backdrop-blur-2xl border border-white/[0.1] rounded-2xl p-1.5 flex items-center justify-around shadow-[0_10px_40px_rgba(0,0,0,0.95)]">
        {navModules.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playSFX("key");
                setActiveModule(item.id as any);
              }}
              className={`flex flex-col items-center gap-1 py-1.5 px-2.5 rounded-xl text-[10px] transition-all ${
                isActive ? "bg-amber-400 text-black font-bold" : "text-zinc-400"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
