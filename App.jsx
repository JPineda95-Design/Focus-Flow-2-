import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import {
  Home, LayoutDashboard, Calendar, History, Activity,
  Play, Pause, RotateCcw, RefreshCw, CheckCircle2,
  Zap, Clock, Coffee, Shield, Droplets, Music,
  X, BellOff, Moon,
  Keyboard, LogOut, Volume2,
  Plus, ArrowRight, Check, ChevronRight,
  ChevronLeft, Bell, Camera, Briefcase, Star,
  SlidersHorizontal, CalendarPlus, Waves, Wind,
  SkipForward, SkipBack, Shuffle, Flame, Leaf, ListMusic,
  AlertCircle, Eye, Link, Trophy, TrendingUp, Heart, Sparkles, Sun, Square,
  Battery, Lightbulb, Target, Rocket, BookOpen, CalendarCheck, Repeat, Users, Droplet, Scan, Award
} from "lucide-react";

/* ════════════════════════════════════════════
   M3 + CUSTOM DESIGN TOKENS (Plus Jakarta Sans, 60-30-10)
════════════════════════════════════════════ */
const M3Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

    /* ── CUSTOM 60-30-10 PALETTE ── */
    :root {
      /* 60% — Surface (dominant neutral) */
      --surface:#F8F9FA;
      /* 30% — Secondary (structural navy) */
      --secondary:#1A237E;
      --secondary-light:#283593;
      --secondary-dark:#0D1B5E;
      --on-secondary:#FFFFFF;
      /* 10% — Accent (energetic orange) */
      --accent:#FF6D00;
      --accent-light:#FF8F00;
      --accent-muted:#FF6D0022;
      --on-accent:#FFFFFF;

      /* M3 Primary — maps to secondary for M3 components */
      --md-primary:#1A237E;
      --md-on-primary:#FFFFFF;
      --md-primary-container:#C5CAE9;
      --md-on-primary-container:#0D1B5E;
      /* M3 Secondary — accent */
      --md-secondary:#FF6D00;
      --md-on-secondary:#FFFFFF;
      --md-secondary-container:#FFE0B2;
      --md-on-secondary-container:#4A2000;
      /* M3 Tertiary — calm green for wellness */
      --md-tertiary:#2E7D32;
      --md-on-tertiary:#FFFFFF;
      --md-tertiary-container:#C8E6C9;
      --md-on-tertiary-container:#1B5E20;
      /* Surface system */
      --md-background:#F8F9FA;
      --md-surface:#FFFFFF;
      --md-surface-variant:#ECEFF1;
      --md-surface-1:rgba(26,35,126,.04);
      --md-surface-2:rgba(26,35,126,.07);
      --md-surface-3:rgba(26,35,126,.10);
      --md-on-surface:#1A1C2E;
      --md-on-surface-variant:#37474F; /* oscurecido: cumple 4.5:1 sobre blanco */
      --md-outline:#607D8B;            /* oscurecido para contraste de bordes */
      --md-outline-variant:#CFD8DC;
      /* Error */
      --md-error:#C62828;
      --md-error-container:#FFCDD2;
      /* Elevation */
      --md-elev-1:0 1px 3px rgba(0,0,0,.08),0 2px 8px rgba(0,0,0,.05);
      --md-elev-2:0 2px 6px rgba(0,0,0,.10),0 6px 16px rgba(0,0,0,.07);
      --md-elev-3:0 4px 12px rgba(0,0,0,.12),0 12px 28px rgba(0,0,0,.09);
      /* Typography */
      --font-display:'Plus Jakarta Sans',sans-serif;
      --font-mono:'JetBrains Mono',monospace;
      /* Radii — M3: 28dp for cards */
      --rad-xs:8px;--rad-sm:12px;--rad-md:16px;--rad-lg:28px;--rad-full:999px;
      /* Fluent-style state layers */
      --state-hover:rgba(26,35,126,.06);
      --state-press:rgba(26,35,126,.12);
      --state-focus:rgba(26,35,126,.10);
      /* Fluent transitions */
      --transition-fast:all 150ms cubic-bezier(.4,0,.2,1);
      --transition-med:all 220ms cubic-bezier(.4,0,.2,1);
      --transition-spring:all 300ms cubic-bezier(.34,1.56,.64,1);
    }

    html,body,#root{height:100%;font-family:var(--font-display)}
    body{background:var(--md-background);color:var(--md-on-surface);-webkit-font-smoothing:antialiased;overflow-x:hidden}

    /* ── M3 TYPOGRAPHY SCALE (Plus Jakarta Sans) ── */
    .display-lg{font-size:3.5rem;font-weight:300;line-height:1.12;letter-spacing:-.02em}
    .display-md{font-size:2.8rem;font-weight:300;line-height:1.15;letter-spacing:-.015em}
    .headline-lg{font-size:2rem;font-weight:600;line-height:1.25}
    .headline-md{font-size:1.75rem;font-weight:600;line-height:1.3}
    .headline-sm{font-size:1.5rem;font-weight:600;line-height:1.35}
    .title-lg{font-size:1.125rem;font-weight:600;line-height:1.4;letter-spacing:.005em}
    .title-md{font-size:1rem;font-weight:600;line-height:1.4;letter-spacing:.005em}
    .title-sm{font-size:.875rem;font-weight:600;line-height:1.43;letter-spacing:.005em}
    .label-lg{font-size:.875rem;font-weight:500;line-height:1.43;letter-spacing:.004em}
    .label-md{font-size:.75rem;font-weight:600;line-height:1.33;letter-spacing:.05em;text-transform:uppercase;color:var(--md-on-surface-variant)}
    .label-sm{font-size:.6875rem;font-weight:600;line-height:1.45;letter-spacing:.05em;text-transform:uppercase;color:#37474F}
    .body-lg{font-size:1rem;font-weight:400;line-height:1.5}
    .body-md{font-size:.875rem;font-weight:400;line-height:1.43}
    .body-sm{font-size:.75rem;font-weight:400;line-height:1.33;color:inherit}

    /* ── BENTO GRID CARDS (28dp radius) ── */
    .m3-card{background:var(--md-surface);border-radius:var(--rad-lg);border:1px solid var(--md-outline-variant);
      box-shadow:var(--md-elev-1);position:relative;overflow:hidden;transition:var(--transition-med)}
    .m3-card:hover{box-shadow:var(--md-elev-2);transform:translateY(-1px)}
    .m3-card-filled{background:var(--md-surface-variant);border-radius:var(--rad-lg);border:none}
    .m3-card-outlined{background:var(--md-surface);border-radius:var(--rad-lg);border:1.5px solid var(--md-outline-variant)}
    .m3-primary-container{background:var(--md-primary-container);color:var(--md-on-primary-container);border-radius:var(--rad-lg)}
    .m3-secondary-container{background:var(--md-secondary-container);color:var(--md-on-secondary-container);border-radius:var(--rad-lg)}
    .m3-tertiary-container{background:var(--md-tertiary-container);color:var(--md-on-tertiary-container);border-radius:var(--rad-lg)}

    /* ── FLUENT RIPPLE ── */
    .m3-ripple{position:relative;overflow:hidden;cursor:pointer}
    .m3-ripple::after{content:'';position:absolute;border-radius:50%;background:rgba(26,35,126,.14);
      width:0;height:0;top:50%;left:50%;transform:translate(-50%,-50%);
      transition:width .35s ease,height .35s ease,opacity .35s ease;opacity:0}
    .m3-ripple:active::after{width:200%;height:200%;opacity:1}

    /* ── FOCUS RING GLOBAL (WCAG 2.2 §2.4.11) ── */
    *:focus-visible{
      outline:3px solid var(--accent);
      outline-offset:3px;
      border-radius:6px;
      box-shadow:0 0 0 5px rgba(255,109,0,.18);
    }

    /* ── M3 BUTTONS ── */
    .btn-filled{background:var(--secondary);color:var(--on-secondary);border:none;border-radius:var(--rad-full);
      padding:10px 24px;min-height:44px;font-family:var(--font-display);font-size:.875rem;font-weight:600;cursor:pointer;
      display:inline-flex;align-items:center;gap:8px;transition:var(--transition-fast);letter-spacing:.006em;
      box-shadow:var(--md-elev-1)}
    .btn-filled:hover{box-shadow:var(--md-elev-2);background:var(--secondary-light);transform:translateY(-1px)}
    .btn-filled:active{box-shadow:none;transform:translateY(0);background:var(--secondary-dark)}
    .btn-filled:disabled{opacity:.38;cursor:not-allowed;box-shadow:none;transform:none}
    .btn-filled-accent{background:var(--accent);color:var(--on-accent)}
    .btn-filled-accent:hover{background:var(--accent-light)}
    .btn-filled-error{background:var(--md-error);color:#fff}

    .btn-tonal{background:var(--md-primary-container);color:var(--md-on-primary-container);border:none;
      border-radius:var(--rad-full);padding:10px 24px;font-family:var(--font-display);
      font-size:.875rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;
      transition:var(--transition-fast);letter-spacing:.006em}
    .btn-tonal:hover{filter:brightness(.95);box-shadow:var(--md-elev-1);transform:translateY(-1px)}
    .btn-tonal:disabled{opacity:.38;cursor:not-allowed}

    .btn-outlined{background:transparent;color:var(--secondary);border:1.5px solid var(--md-outline);
      border-radius:var(--rad-full);padding:10px 24px;font-family:var(--font-display);
      font-size:.875rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;
      transition:var(--transition-fast);letter-spacing:.006em}
    .btn-outlined:hover{background:var(--state-hover);border-color:var(--secondary);transform:translateY(-1px)}

    .btn-text{background:transparent;color:var(--secondary);border:none;border-radius:var(--rad-full);
      padding:10px 16px;font-family:var(--font-display);font-size:.875rem;font-weight:600;cursor:pointer;
      display:inline-flex;align-items:center;gap:6px;transition:var(--transition-fast)}
    .btn-text:hover{background:var(--state-hover)}

    .btn-icon{width:44px;height:44px;min-width:44px;min-height:44px;border-radius:var(--rad-full);background:transparent;border:none;
      display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--md-on-surface-variant);
      transition:var(--transition-fast)}
    .btn-icon:hover{background:var(--state-hover);color:var(--secondary)}

    .fab{background:var(--secondary);color:var(--on-secondary);border:none;
      border-radius:var(--rad-md);width:56px;height:56px;display:flex;align-items:center;justify-content:center;
      cursor:pointer;box-shadow:var(--md-elev-3);transition:var(--transition-fast)}
    .fab:hover{background:var(--secondary-light);box-shadow:0 6px 20px rgba(26,35,126,.4);transform:translateY(-2px)}

    /* ── M3 SWITCH (Fluent) ── */
    .m3-switch{position:relative;width:52px;height:32px;cursor:pointer;display:inline-flex;align-items:center}
    .m3-switch input{opacity:0;width:0;height:0;position:absolute}
    .m3-switch-track{width:52px;height:32px;border-radius:var(--rad-full);background:var(--md-surface-variant);
      border:2px solid var(--md-outline);transition:var(--transition-fast);position:relative}
    .m3-switch input:checked + .m3-switch-track{background:var(--secondary);border-color:var(--secondary)}
    .m3-switch-thumb{position:absolute;width:16px;height:16px;border-radius:50%;background:var(--md-outline);
      top:50%;left:6px;transform:translateY(-50%);transition:var(--transition-fast);pointer-events:none}
    .m3-switch input:checked ~ .m3-switch-thumb{background:var(--on-secondary);left:30px}

    /* ── NAV BAR ── */
    .nav-bar{position:fixed;top:0;left:0;right:0;z-index:100;
      background:rgba(248,249,250,.92);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
      border-bottom:1px solid var(--md-outline-variant);height:72px;
      display:flex;align-items:center;justify-content:space-between;padding:0 28px;
      box-shadow:0 1px 0 var(--md-outline-variant)}
    .nav-logo{font-size:1.2rem;font-weight:800;color:var(--md-on-surface);display:flex;align-items:center;gap:10px;cursor:pointer;letter-spacing:-.03em}
    .nav-logo em{font-style:normal;color:var(--accent)}
    .nav-links{display:flex;align-items:center;gap:2px}
    .nav-link{padding:10px 16px;min-height:44px;border-radius:var(--rad-full);font-size:.85rem;font-weight:600;cursor:pointer;
      transition:var(--transition-fast);color:var(--md-on-surface-variant);border:none;background:transparent;
      display:inline-flex;align-items:center;gap:7px;font-family:var(--font-display);letter-spacing:.005em}
    .nav-link:hover{background:var(--state-hover);color:var(--md-on-surface)}
    .nav-link.active{color:var(--secondary);background:var(--md-primary-container)}

    /* ── SNACKBAR / TOAST ── */
    .snackbar{position:fixed;left:50%;transform:translateX(-50%);z-index:400;
      background:#1A1C2E;color:#fff;border-radius:var(--rad-md);padding:14px 20px;
      display:flex;align-items:center;gap:16px;font-size:.875rem;white-space:nowrap;
      box-shadow:var(--md-elev-3);animation:snack-in .3s cubic-bezier(.34,1.56,.64,1) both;
      transition:bottom .25s cubic-bezier(.34,1.2,.64,1)}
    @keyframes snack-in{from{opacity:0;transform:translateX(-50%) translateY(16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

    /* ── EYE REST OVERLAY ── */
    .eye-rest-overlay{position:fixed;inset:0;z-index:500;pointer-events:none;
      background:radial-gradient(circle at center, rgba(26,35,126,.06) 0%, rgba(26,35,126,.18) 100%);
      animation:eye-rest-in .8s ease both}
    @keyframes eye-rest-in{from{opacity:0}to{opacity:1}}
    .eye-rest-banner{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:501;
      background:rgba(26,35,126,.94);color:#fff;border-radius:var(--rad-lg);
      padding:28px 36px;text-align:center;box-shadow:var(--md-elev-3);pointer-events:all;
      animation:dialog-in .35s cubic-bezier(.34,1.2,.64,1) both;backdrop-filter:blur(8px)}

    /* ── DIALOGS ── */
    .scrim{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.36);backdrop-filter:blur(5px);
      display:flex;align-items:center;justify-content:center;animation:fade-in .15s ease}
    .m3-dialog{background:var(--md-surface);border-radius:var(--rad-lg);max-width:520px;width:92%;
      padding:28px;box-shadow:var(--md-elev-3);animation:dialog-in .22s cubic-bezier(.34,1.2,.64,1) both}
    @keyframes dialog-in{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
    .m3-fullscreen-dialog{background:var(--md-surface);border-radius:var(--rad-lg);max-width:640px;width:94%;
      max-height:90vh;overflow-y:auto;padding:32px;box-shadow:var(--md-elev-3);
      animation:dialog-in .22s cubic-bezier(.34,1.2,.64,1) both}

    /* ── CHIPS ── */
    .m3-chip{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:var(--rad-sm);
      border:1.5px solid var(--md-outline-variant);background:var(--md-surface);
      color:var(--md-on-surface-variant);font-size:.8rem;font-weight:600;cursor:pointer;transition:var(--transition-fast)}
    .m3-chip:hover{background:var(--state-hover);border-color:var(--secondary);color:var(--secondary)}
    .m3-chip.active{background:var(--md-primary-container);border-color:var(--md-primary-container);color:var(--md-on-primary-container)}

    /* ── PAGE ── */
    .page{min-height:100vh;padding-top:92px;padding-bottom:64px;position:relative}
    .container{max-width:1300px;margin:0 auto;padding:0 28px}

    /* ── BENTO GRID ── */
    .bento{display:grid;gap:16px}
    .g-4{grid-template-columns:repeat(4,1fr)}
    .g-3{grid-template-columns:repeat(3,1fr)}
    .g-2{grid-template-columns:1fr 1fr}
    .g-2-1{grid-template-columns:2fr 1fr}
    .g-1-2{grid-template-columns:1fr 2fr}
    .g-65-35{grid-template-columns:65fr 35fr}
    .g-35-65{grid-template-columns:35fr 65fr}
    .span-2{grid-column:span 2}
    .span-3{grid-column:span 3}
    .span-4{grid-column:span 4}

    /* ── INPUT ── */
    .m3-input{width:100%;background:var(--md-surface-variant);border:none;border-radius:var(--rad-sm) var(--rad-sm) 0 0;
      padding:16px;color:var(--md-on-surface);font-family:var(--font-display);font-size:1rem;outline:none;
      border-bottom:2px solid var(--md-outline);transition:var(--transition-fast);font-weight:400}
    .m3-input:focus{border-bottom-color:var(--secondary);background:rgba(26,35,126,.04)}
    .m3-input::placeholder{color:var(--md-on-surface-variant)}
    .m3-select{width:100%;background:var(--md-surface-variant);border:none;border-radius:var(--rad-sm) var(--rad-sm) 0 0;
      padding:16px;color:var(--md-on-surface);font-family:var(--font-display);font-size:1rem;
      outline:none;border-bottom:2px solid var(--md-outline);cursor:pointer;font-weight:400}

    /* ── PROGRESS ── */
    .m3-progress{height:5px;border-radius:var(--rad-full);background:var(--md-primary-container);overflow:hidden}
    .m3-progress-fill{height:100%;border-radius:var(--rad-full);background:var(--secondary);transition:width .6s cubic-bezier(.4,0,.2,1)}

    /* ── DIVIDER ── */
    .m3-divider{height:1px;background:var(--md-outline-variant);margin:14px 0}

    /* ── BADGE ── */
    .badge{display:inline-flex;align-items:center;padding:4px 10px;border-radius:var(--rad-sm);
      font-size:.7rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
    .badge-green{background:#E8F5E9;color:#1B5E20}
    .badge-orange{background:#FFF3E0;color:#E65100}
    .badge-blue{background:#E3F2FD;color:#0D47A1}
    .badge-red{background:#FFEBEE;color:#B71C1C}
    .badge-purple{background:#EDE7F6;color:#4527A0}
    .badge-navy{background:var(--md-primary-container);color:var(--md-on-primary-container)}

    /* ── TIMER RING ── */
    .timer-ring{transition:stroke-dashoffset 1s linear;transform-origin:center;transform:rotate(-90deg)}

    /* ── POSTURE AURA ── */
    @keyframes aura-good{0%,100%{box-shadow:0 0 0 0 rgba(46,125,50,.18)}50%{box-shadow:0 0 0 18px rgba(46,125,50,0)}}
    @keyframes aura-warn{0%,100%{box-shadow:0 0 0 0 rgba(255,109,0,.28)}50%{box-shadow:0 0 0 15px rgba(255,109,0,0)}}
    @keyframes aura-bad {0%,100%{box-shadow:0 0 0 0 rgba(198,40,40,.32)}50%{box-shadow:0 0 0 13px rgba(198,40,40,0)}}
    @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.5}}
    @keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(255,109,0,.4)}70%{box-shadow:0 0 0 6px rgba(255,109,0,0)}100%{box-shadow:0 0 0 0 rgba(255,109,0,0)}}
    .aura-good{animation:aura-good 2.8s ease infinite}
    .aura-warn{animation:aura-warn 1.9s ease infinite}
    .aura-bad {animation:aura-bad  1.3s ease infinite}

    /* ── ZEN AURA (onboarding avatar) ── */
    @keyframes zen-pulse{0%,100%{box-shadow:0 0 0 0 rgba(26,35,126,.15),0 0 30px rgba(255,109,0,.08)}
      50%{box-shadow:0 0 0 22px rgba(26,35,126,0),0 0 50px rgba(255,109,0,.18)}}
    .aura-zen{animation:zen-pulse 3s ease infinite}

    /* ── MODE THEMES ── */
    .mode-deep-flow   {--mode-bg:#E8EAF6;--mode-accent:var(--secondary);--mode-ring:#1A237E}
    .mode-steady      {--mode-bg:#FFF8F0;--mode-accent:var(--accent);--mode-ring:#FF6D00}
    .mode-vital-reset {--mode-bg:#E8F5E9;--mode-accent:var(--md-tertiary);--mode-ring:#2E7D32}

    /* ── STEPPER ── */
    .stepper-dot{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;
      font-size:.8rem;font-weight:700;transition:var(--transition-spring)}
    .stepper-dot.done{background:var(--secondary);color:var(--on-secondary)}
    .stepper-dot.active{background:var(--md-primary-container);color:var(--secondary);border:2.5px solid var(--secondary)}
    .stepper-dot.pending{background:var(--md-surface-variant);color:var(--md-on-surface-variant)}
    .stepper-line{height:2px;flex:1;background:var(--md-outline-variant);transition:var(--transition-med);border-radius:99px}
    .stepper-line.done{background:var(--secondary)}

    /* ── TASK ITEM ── */
    .task-row{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:var(--rad-md);
      transition:var(--transition-fast);cursor:pointer}
    .task-row:hover{background:var(--state-hover)}
    .task-row.done .task-label{text-decoration:line-through;color:var(--md-on-surface-variant)}
    .m3-checkbox{width:22px;height:22px;border-radius:6px;border:2px solid var(--md-outline);
      display:flex;align-items:center;justify-content:center;transition:var(--transition-fast);flex-shrink:0;background:transparent}
    .m3-checkbox.on{background:var(--secondary);border-color:var(--secondary)}

    /* ── FOCUS BANNER ── */
    .focus-banner{position:fixed;top:72px;left:0;right:0;z-index:99;
      background:linear-gradient(90deg,var(--secondary),var(--secondary-light));
      padding:10px 28px;display:flex;align-items:center;gap:12px;
      font-size:.82rem;font-weight:600;color:#fff;
      box-shadow:0 2px 8px rgba(26,35,126,.2)}

    /* ── FAQ FLOAT ── */
    .faq-btn{position:fixed;bottom:32px;right:32px;z-index:150}
    .faq-panel{position:fixed;bottom:100px;right:32px;z-index:149;width:356px;
      background:var(--md-surface);border-radius:var(--rad-lg);
      border:1px solid var(--md-outline-variant);
      box-shadow:var(--md-elev-3);overflow:hidden;
      animation:dialog-in .22s cubic-bezier(.34,1.2,.64,1) both}

    /* ── UNDO TOAST ── */
    .undo-toast{position:fixed;left:50%;transform:translateX(-50%);z-index:300;
      background:#1A1C2E;color:#fff;border-radius:var(--rad-md);
      padding:14px 20px;display:flex;align-items:center;gap:16px;font-size:.875rem;
      box-shadow:var(--md-elev-3);animation:snack-in .3s cubic-bezier(.34,1.56,.64,1) both;white-space:nowrap;
      transition:bottom .25s cubic-bezier(.34,1.2,.64,1)}

    /* ── AUDIO HUB ── */
    .audio-url-input{background:var(--md-surface-variant);border:1.5px solid var(--md-outline-variant);border-radius:var(--rad-sm);
      padding:10px 14px;font-family:var(--font-mono);font-size:.78rem;color:var(--md-on-surface);
      outline:none;width:100%;transition:var(--transition-fast)}
    .audio-url-input:focus{border-color:var(--secondary);background:rgba(26,35,126,.04)}

    /* ── DAILY REPORT ── */
    .report-ring{transition:stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1);transform-origin:center;transform:rotate(-90deg)}
    .metric-bar-track{height:8px;border-radius:99px;background:var(--md-primary-container);overflow:hidden}
    .metric-bar-fill{height:100%;border-radius:99px;transition:width 1s cubic-bezier(.4,0,.2,1)}

    /* ── STAT TABLE ── */
    .m3-table{width:100%;border-collapse:collapse;font-size:.875rem}
    .m3-table th{text-align:left;padding:10px 14px;color:var(--md-on-surface-variant);font-weight:700;font-size:.72rem;
      text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid var(--md-outline-variant)}
    .m3-table td{padding:12px 14px;border-bottom:1px solid rgba(207,216,220,.5);color:var(--md-on-surface)}
    .m3-table tr:hover td{background:var(--md-surface-1)}
    .m3-table tr:last-child td{border-bottom:none}

    /* ── AGENDA ── */
    .ag-cell{min-height:54px;border-radius:var(--rad-sm);border:1.5px dashed var(--md-outline-variant);transition:var(--transition-fast)}
    .ag-cell.filled{border-style:solid;border-color:rgba(26,35,126,.18);background:var(--md-surface-1)}
    .ag-cell.drag-over{border-color:var(--secondary);background:var(--md-primary-container)}

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar{width:5px;height:5px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:var(--md-outline-variant);border-radius:99px}

    /* ════════════════════════════════════════
       ONBOARDING — usa el sistema M3 del app
    ════════════════════════════════════════ */
    /* Chip de progreso de paso */
    .ob-step-pill{
      display:inline-flex;align-items:center;gap:6px;
      padding:4px 12px;border-radius:var(--rad-full);
      background:var(--md-primary-container);
      font-size:.7rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
      color:var(--md-on-primary-container);
    }
    /* Dots de navegación */
    .ob-step-dot{
      width:8px;height:8px;border-radius:50%;
      background:var(--md-outline-variant);
      transition:all .3s cubic-bezier(.4,0,.2,1);
    }
    .ob-step-dot.active{
      width:24px;border-radius:var(--rad-full);
      background:var(--secondary);
    }
    .ob-step-dot.done{background:var(--md-tertiary);}

    /* Fade entre pantallas */
    @keyframes ob-fade-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes ob-fade-out{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-8px)}}
    .ob-screen{animation:ob-fade-in .35s cubic-bezier(.4,0,.2,1) both}
    .ob-screen.exiting{animation:ob-fade-out .22s cubic-bezier(.4,0,.2,1) both}

    /* Mini bento ilustrativas — usan la paleta del app */
    .ob-mini-card{
      background:var(--md-surface-variant);
      border:1px solid var(--md-outline-variant);
      border-radius:var(--rad-md);
      transition:var(--transition-fast);
    }
    .ob-mini-card:hover{border-color:var(--md-outline);box-shadow:var(--md-elev-1)}

    /* Timer ring en screen 1 */
    @keyframes ob-ring-fill{from{stroke-dashoffset:208}to{stroke-dashoffset:52}}
    .ob-ring-progress{
      transform-origin:center;transform:rotate(-90deg);
      animation:ob-ring-fill 2.8s cubic-bezier(.4,0,.2,1) infinite alternate;
    }
    /* Pulso vivo */
    @keyframes ob-pulse{0%,100%{opacity:1}50%{opacity:.35}}
    .ob-live-dot{animation:ob-pulse 2s ease-in-out infinite}

    /* Avatar ergonómico — alineándose */
    @keyframes ob-align{
      0%{transform:rotate(-7deg) translateY(3px)}
      65%{transform:rotate(2deg) translateY(-2px)}
      100%{transform:rotate(0deg) translateY(0)}
    }
    .ob-avatar-align{animation:ob-align 2.6s cubic-bezier(.34,1.56,.64,1) infinite alternate}

    /* Iconos flotantes salud */
    @keyframes ob-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    .ob-float  {animation:ob-float 3.1s ease-in-out infinite}
    .ob-float-2{animation:ob-float 3.7s ease-in-out .5s infinite}
    .ob-float-3{animation:ob-float 2.9s ease-in-out 1s   infinite}

    /* Barras del chart preview — screen 3 */
    @keyframes ob-bar-grow{from{height:4px}to{height:var(--h)}}
    .ob-bar{
      flex:1;border-radius:4px 4px 0 0;
      animation:ob-bar-grow .7s cubic-bezier(.4,0,.2,1) both;
    }

    /* Botón ghost "Omitir" */
    .ob-btn-skip{
      background:transparent;color:var(--md-on-surface-variant);border:none;
      font-family:var(--font-display);font-size:.82rem;font-weight:500;
      cursor:pointer;padding:6px 12px;border-radius:var(--rad-full);
      transition:var(--transition-fast);text-decoration:underline;text-underline-offset:3px;
    }
    .ob-btn-skip:hover{color:var(--md-on-surface);background:var(--state-hover)}

    /* ── MODO DESCANSO OCULAR: SEPIA ── */
    body.rest-sepia{filter:sepia(.45) brightness(.96);transition:filter .6s ease}
    /* ── MODO OSCURO PROFUNDO ── */
    body.rest-dark{
      --md-background:#0F1117;--md-surface:#1A1D27;--md-surface-variant:#222638;
      --md-on-surface:#F0F2F8;--md-on-surface-variant:#B8C2D0;
      --md-outline-variant:#2E3450;--md-outline:#4A5270;
      --md-primary-container:#1E2660;--md-on-primary-container:#D8DCF0;
      --md-surface-1:rgba(197,202,233,.06);--md-surface-2:rgba(197,202,233,.10);
      --surface:#0F1117;
      background:var(--md-background);
      transition:background .4s,color .4s;
    }
    body.rest-dark .nav-bar{background:rgba(15,17,23,.95)}
    body.rest-dark .m3-card{background:var(--md-surface);border-color:var(--md-outline-variant)}
    body.rest-dark .label-md{color:#B8C2D0}
    body.rest-dark .label-sm{color:#A8B4C0}
    body.rest-dark .body-sm{color:#B8C2D0}
    body.rest-dark .m3-chip{background:var(--md-surface);color:#B8C2D0;border-color:var(--md-outline)}
    body.rest-dark .timer-mini-btn{background:var(--md-surface-variant);color:#B8C2D0;border-color:var(--md-outline)}
    body.rest-dark .task-row:hover{background:rgba(197,202,233,.08)}
    body.rest-dark .m3-table th{color:#B8C2D0}
    body.rest-dark .m3-table td{color:#F0F2F8;border-bottom-color:var(--md-outline-variant)}

    /* ── PROGRESSIVE DISCLOSURE (Hick's Law) ── */
    /* Widgets secundarios se difuminan durante sesión activa */
    .widget-secondary{transition:opacity .4s cubic-bezier(.4,0,.2,1),filter .4s cubic-bezier(.4,0,.2,1),transform .4s cubic-bezier(.4,0,.2,1)}
    .session-active .widget-secondary{opacity:.18;filter:blur(2px);pointer-events:none;user-select:none;transform:scale(.99)}
    .session-active .widget-secondary:hover{opacity:.35;filter:blur(1px)}

    /* ── DEEP FLOW — Enfoque profundo: todo excepto el timer se desvanece ── */
    .deep-flow-blur{
      transition:opacity .6s cubic-bezier(.4,0,.2,1),
                 filter .6s cubic-bezier(.4,0,.2,1),
                 transform .6s cubic-bezier(.4,0,.2,1);
    }
    .deep-flow-active .deep-flow-blur{
      opacity:.07;
      filter:blur(4px) saturate(.3);
      pointer-events:none;
      user-select:none;
      transform:scale(.985);
    }
    .deep-flow-active .deep-flow-blur:hover{
      opacity:.18;
      filter:blur(2px) saturate(.5);
    }

    /* ── CONTROL ISLAND (Fitts's Law) ── */
    .control-island{
      background:transparent;border-radius:0;
      border:none;
      box-shadow:none;
      padding:4px 0 0;
      display:flex;flex-direction:column;align-items:center;
      position:relative;
      transition:var(--transition-med);
    }
    .control-island.running{
      border:none;
      box-shadow:none;
    }
    /* Botón Iniciar: filled primario sólido */
    .btn-session-start{
      background:var(--session-color,var(--secondary));color:#fff;border:none;
      border-radius:var(--rad-full);min-width:220px;min-height:48px;
      padding:13px 28px;font-family:var(--font-display);font-size:.92rem;font-weight:700;
      cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:9px;
      transition:var(--transition-fast);box-shadow:0 3px 10px rgba(26,35,126,.28);
      letter-spacing:.01em;
    }
    .btn-session-start:hover{filter:brightness(1.08);transform:translateY(-1px);box-shadow:0 6px 18px rgba(26,35,126,.34)}
    .btn-session-start:active{filter:brightness(.95);transform:translateY(0)}
    .btn-session-start:disabled{opacity:.38;cursor:not-allowed;transform:none;box-shadow:none}
    /* Botón Detener: outline neutro para evitar pulsaciones accidentales */
    .btn-session-stop{
      background:transparent;color:var(--md-on-surface-variant);
      border:1.5px solid var(--md-outline);
      border-radius:var(--rad-full);min-width:220px;min-height:48px;
      padding:13px 28px;font-family:var(--font-display);font-size:.88rem;font-weight:600;
      cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:9px;
      transition:var(--transition-fast);letter-spacing:.01em;
    }
    .btn-session-stop:hover{border-color:var(--md-error);color:var(--md-error);background:rgba(198,40,40,.05)}

    /* ── ISLA DE CONTROLES COMPACTOS BAJO TIMER ── */
    .timer-mini-controls{
      display:flex;align-items:center;gap:8px;margin-top:2px;
    }
    .timer-mini-btn{
      width:40px;height:40px;border-radius:var(--rad-full);border:1.5px solid var(--md-outline-variant);
      background:var(--md-surface-variant);color:var(--md-on-surface-variant);
      display:flex;align-items:center;justify-content:center;cursor:pointer;
      transition:var(--transition-fast);
    }
    .timer-mini-btn:hover{border-color:var(--secondary);color:var(--secondary);background:var(--state-hover)}
    .timer-mini-btn.active{border-color:var(--accent);color:var(--accent);background:var(--accent-muted)}

    /* ── DAILY PROGRESS BAR (prominent) ── */
    .daily-progress-bar{height:12px;border-radius:99px;background:var(--md-primary-container);overflow:hidden;position:relative}
    .daily-progress-fill{
      height:100%;border-radius:99px;
      background:linear-gradient(90deg,var(--secondary),#5C6BC0);
      transition:width 1s cubic-bezier(.4,0,.2,1);
      position:relative;
    }
    .daily-progress-fill::after{
      content:'';position:absolute;right:0;top:0;bottom:0;width:20px;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.35));
      border-radius:0 99px 99px 0;
      animation:shimmer 2.2s ease infinite;
    }
    @keyframes shimmer{0%{opacity:0}50%{opacity:1}100%{opacity:0}}

    /* ── CONFETTI CANVAS (Zeigarnik) ── */
    .confetti-canvas{position:fixed;inset:0;z-index:9999;pointer-events:none}

    /* ── EMPTY STATE ── */
    .empty-state{
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      padding:56px 24px;text-align:center;
      animation:fade-in .5s ease both;
    }
    .empty-state-icon{
      width:72px;height:72px;border-radius:24px;
      background:var(--md-surface-variant);
      display:flex;align-items:center;justify-content:center;
      margin-bottom:20px;
    }

    /* ── REST MODE TOGGLE BTN ── */
    .rest-mode-pill{
      display:inline-flex;align-items:center;gap:7px;
      padding:6px 14px 6px 10px;border-radius:var(--rad-full);
      border:1.5px solid var(--md-outline-variant);background:var(--md-surface);
      font-family:var(--font-display);font-size:.78rem;font-weight:600;
      color:var(--md-on-surface-variant);cursor:pointer;
      transition:var(--transition-fast);
    }
    .rest-mode-pill:hover{border-color:var(--secondary);color:var(--secondary);background:var(--state-hover)}
    .rest-mode-pill.active-sepia{border-color:#A0785A;color:#7C5C45;background:#FDF6ED}
    .rest-mode-pill.active-dark{border-color:#5C6BC0;color:#5C6BC0;background:rgba(92,107,192,.08)}

    /* ── ANIMATIONS ── */
    @keyframes fade-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .fi{animation:fade-in .35s ease both}
    .fi1{animation-delay:.06s}.fi2{animation-delay:.12s}.fi3{animation-delay:.18s}.fi4{animation-delay:.24s}.fi5{animation-delay:.30s}
    @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

    /* ── TASK COMPLETION FLASH (Zeigarnik) ── */
    @keyframes task-flash{
      0%{background:transparent;border-radius:var(--rad-md)}
      25%{background:rgba(46,125,50,.13);border-radius:var(--rad-md);box-shadow:inset 0 0 0 1.5px rgba(46,125,50,.22)}
      100%{background:transparent;box-shadow:none}
    }
    .task-row.just-done{animation:task-flash .8s cubic-bezier(.4,0,.2,1) both}

    /* ── HYDRATION DROPS ── */
    .drop-icon{display:inline-flex;transition:var(--transition-spring)}
    .drop-icon.filled{filter:drop-shadow(0 2px 4px rgba(26,35,126,.25))}

    @media(max-width:1024px){
      .g-4{grid-template-columns:1fr 1fr}
      .g-3{grid-template-columns:1fr 1fr}
    }
    @media(max-width:768px){
      .g-4,.g-3,.g-65-35,.g-35-65,.g-2-1,.g-1-2,.g-2{grid-template-columns:1fr}
      .span-2,.span-3,.span-4{grid-column:span 1}
      .container{padding:0 16px}
    }
    /* ── MINI PLAYER ── */
    .mini-player-row{
      display:flex;align-items:center;justify-content:center;gap:6px;
      width:100%;
    }
    .mp-btn{
      width:36px;height:36px;border-radius:var(--rad-full);
      border:1.5px solid var(--md-outline-variant);
      background:var(--md-surface-variant);
      color:var(--md-on-surface-variant);
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;transition:var(--transition-fast);flex-shrink:0;
    }
    .mp-btn:hover{border-color:var(--secondary);color:var(--secondary);background:var(--state-hover)}
    .mp-btn.active{border-color:var(--accent);color:var(--accent);background:var(--accent-muted)}
    .mp-btn-play{
      width:44px;height:44px;border-radius:var(--rad-full);
      background:var(--secondary);color:#fff;border:none;
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;transition:var(--transition-fast);flex-shrink:0;
      box-shadow:0 3px 10px rgba(26,35,126,.28);
    }
    .mp-btn-play:hover{background:var(--secondary-light);transform:scale(1.06);box-shadow:0 5px 14px rgba(26,35,126,.36)}
    .mp-btn-play:active{transform:scale(.97)}
    .mp-divider-v{width:1px;height:22px;background:var(--md-outline-variant);flex-shrink:0;margin:0 2px}

    /* ── QUEUE POPUP ── */
    .queue-popup{
      position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%);
      width:300px;background:var(--md-surface);border-radius:var(--rad-lg);
      border:1px solid var(--md-outline-variant);box-shadow:var(--md-elev-3);
      z-index:300;overflow:hidden;
      animation:dialog-in .2s cubic-bezier(.34,1.2,.64,1) both;
    }
    .queue-track{
      display:flex;align-items:center;gap:12px;padding:10px 16px;
      cursor:pointer;transition:var(--transition-fast);border:none;
      background:transparent;width:100%;font-family:var(--font-display);text-align:left;
    }
    .queue-track:hover{background:var(--state-hover)}
    .queue-track.playing{background:var(--md-primary-container)}
    .queue-track-num{
      width:20px;font-family:var(--font-mono);font-size:.72rem;
      color:var(--md-on-surface-variant);text-align:center;flex-shrink:0;
    }
    .queue-track-thumb{
      width:36px;height:36px;border-radius:var(--rad-xs);flex-shrink:0;
      display:flex;align-items:center;justify-content:center;font-size:1.1rem;
    }

  `}</style>
);

/* ════════════════════════════════════════════
   SESSION STATE HOOK (Deep Flow / Steady Rhythm / Vital Reset)
════════════════════════════════════════════ */
const SESSION_MODES = [
  { id:"deep-flow",     label:"Deep Flow",     icon:<Flame size={18}/>,  desc:"Enfoque máximo, UI minimal",  colorHex:"#1A237E", bg:"#E8EAF6", duration:50 },
  { id:"steady-rhythm", label:"Steady Rhythm", icon:<Waves size={18}/>,  desc:"Ciclos Pomodoro con apoyo",   colorHex:"#FF6D00", bg:"#FFF8F0", duration:25 },
  { id:"vital-reset",   label:"Vital Reset",   icon:<Leaf size={18}/>,   desc:"Recuperación activa",         colorHex:"#2E7D32", bg:"#E8F5E9", duration:15 },
];
// Fix color references
SESSION_MODES[0].color = "#1A237E";
SESSION_MODES[1].color = "#FF6D00";
SESSION_MODES[2].color = "#2E7D32";

/* ════════════════════════════════════════════
   REST MODE HOOK (Salud ocular)
════════════════════════════════════════════ */
function useRestMode() {
  const [mode, setMode] = useState("off"); // "off" | "sepia" | "dark"
  useEffect(() => {
    document.body.classList.remove("rest-sepia","rest-dark");
    if (mode==="sepia") document.body.classList.add("rest-sepia");
    if (mode==="dark")  document.body.classList.add("rest-dark");
    return () => document.body.classList.remove("rest-sepia","rest-dark");
  }, [mode]);
  const cycle = () => setMode(m => m==="off"?"sepia":m==="sepia"?"dark":"off");
  return { mode, cycle, setMode };
}

/* ════════════════════════════════════════════
   CONFETTI CANVAS (Zeigarnik — tarea completada)
════════════════════════════════════════════ */
function ConfettiCanvas({ trigger }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const COLORS = ["#1A237E","#FF6D00","#2E7D32","#5C6BC0","#FFB74D","#C5CAE9"];
    const particles = Array.from({ length: 52 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.4 - canvas.height * 0.15,
      vx: (Math.random() - 0.5) * 3.5,
      vy: Math.random() * 2 + 1.5,
      size: Math.random() * 5 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      rSpeed: (Math.random() - 0.5) * 0.18,
      life: 1,
      decay: Math.random() * 0.012 + 0.008,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.06;
        p.rot += p.rSpeed; p.life -= p.decay;
        if (p.life <= 0) return;
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.min(p.life, 1);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/4, p.size, p.size/2);
        ctx.restore();
      });
      if (alive) animRef.current = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [trigger]);
  if (!trigger) return null;
  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true"/>;
}

/* ════════════════════════════════════════════
   EMPTY STATE COMPONENT
════════════════════════════════════════════ */
function EmptyState({ icon, title, body, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">
        {/* Minimal SVG illustration */}
        <svg width={38} height={38} viewBox="0 0 38 38" fill="none">
          <circle cx={19} cy={19} r={18} stroke="var(--md-outline-variant)" strokeWidth={1.5} strokeDasharray="4 3"/>
          <path d="M12 26 Q19 14 26 26" stroke="var(--md-outline)" strokeWidth={1.5} strokeLinecap="round" fill="none"/>
          <circle cx={19} cy={12} r={2.5} fill="var(--md-outline-variant)"/>
        </svg>
      </div>
      <div className="title-md" style={{ color:"var(--md-on-surface)", marginBottom:8 }}>{title}</div>
      <p className="body-md" style={{ color:"var(--md-on-surface-variant)", maxWidth:280, marginBottom:24, lineHeight:1.6 }}>{body}</p>
      {actionLabel && (
        <button className="btn-tonal" onClick={onAction} style={{ minHeight:44 }}>
          <Plus size={15} aria-hidden="true"/> {actionLabel}
        </button>
      )}
    </div>
  );
}

const FF_STORAGE_KEY = "ff_session_v1";
const FF_HISTORY_KEY = "ff_history_v1";
const FF_PREFS_KEY   = "ff_prefs_v1";

/* Persist / restore session state via localStorage (Pilar 7) */
function saveSessionState(state) {
  try { localStorage.setItem(FF_STORAGE_KEY, JSON.stringify({ ...state, savedAt: Date.now() })); }
  catch(e) { /* storage unavailable */ }
}
function loadSessionState() {
  try {
    const raw = localStorage.getItem(FF_STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    // If saved > 2h ago, discard
    if (Date.now() - s.savedAt > 2 * 60 * 60 * 1000) return null;
    return s;
  } catch(e) { return null; }
}
function clearSessionState() {
  try { localStorage.removeItem(FF_STORAGE_KEY); } catch(e) {}
}
function savePrefs(prefs) {
  try { localStorage.setItem(FF_PREFS_KEY, JSON.stringify(prefs)); } catch(e) {}
}
function loadPrefs() {
  try { const r = localStorage.getItem(FF_PREFS_KEY); return r ? JSON.parse(r) : null; }
  catch(e) { return null; }
}

function useSessionMode() {
  const [mode, setMode]       = useState(SESSION_MODES[0]);
  const [running, setRunning] = useState(false);
  const [secs, setSecs]       = useState(SESSION_MODES[0].duration * 60);
  const [uiProfile, setUiProfile] = useState("default");
  // Pilar 7: pause start time for accurate resume
  const pauseStartRef = useRef(null);

  const switchMode = useCallback((newMode) => {
    setMode(newMode);
    setRunning(false);
    setSecs(newMode.duration * 60);
    setUiProfile(newMode.id === "deep-flow" ? "minimal" : "default");
    savePrefs({ lastModeId: newMode.id, lastDuration: newMode.duration });
  }, []);

  // Pilar 7: persist state on every tick
  useEffect(() => {
    saveSessionState({ modeId: mode.id, secs, running });
  }, [mode.id, secs, running]);

  useEffect(() => {
    if (!running) { pauseStartRef.current = Date.now(); return; }
    if (secs <= 0) { setRunning(false); clearSessionState(); return; }
    const t = setTimeout(() => setSecs(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, secs]);

  const toggle = useCallback(() => setRunning(r => !r), []);
  const reset  = useCallback(() => { setRunning(false); setSecs(mode.duration * 60); clearSessionState(); }, [mode]);

  // Apply custom durations from SessionConfig
  const updateModeDurations = useCallback((durations) => {
    SESSION_MODES.forEach(m => {
      if (durations[m.id] !== undefined) m.duration = durations[m.id];
    });
    setMode(prev => {
      const newDur = durations[prev.id] ?? prev.duration;
      const updated = { ...prev, duration: newDur };
      setSecs(s => running ? s : newDur * 60);
      return updated;
    });
  }, [running]);

  // Quick start with last-used mode (Pilar 1)
  const quickStart = useCallback((targetMode) => {
    const m = targetMode || mode;
    setMode(m); setSecs(m.duration * 60); setRunning(true);
    setUiProfile(m.id === "deep-flow" ? "minimal" : "default");
  }, [mode]);

  // Restore from localStorage (Pilar 7)
  const restoreSession = useCallback((saved) => {
    const m = SESSION_MODES.find(x => x.id === saved.modeId) || SESSION_MODES[0];
    setMode(m);
    setSecs(saved.secs);
    setRunning(false); // User must explicitly resume
    setUiProfile(m.id === "deep-flow" ? "minimal" : "default");
  }, []);

  // Pilar 5: auto-resume after short pause (< 3 min)
  const autoResumeRef = useRef(null);
  const pausedSince   = useRef(null);

  useEffect(() => {
    if (!running && secs > 0 && secs < mode.duration * 60) {
      pausedSince.current = Date.now();
      autoResumeRef.current = setTimeout(() => {
        // Auto-resume only if pause < 3 min
        if (pausedSince.current && Date.now() - pausedSince.current < 3 * 60 * 1000) {
          setRunning(true);
        }
      }, 3 * 60 * 1000);
    } else {
      if (autoResumeRef.current) clearTimeout(autoResumeRef.current);
      pausedSince.current = null;
    }
    return () => { if (autoResumeRef.current) clearTimeout(autoResumeRef.current); };
  }, [running]); // eslint-disable-line

  // Pilar 6: session completed reward
  const [sessionComplete, setSessionComplete] = useState(false);
  const prevSecs = useRef(secs);
  useEffect(() => {
    if (prevSecs.current > 0 && secs === 0) setSessionComplete(true);
    prevSecs.current = secs;
  }, [secs]);
  const dismissComplete = useCallback(() => setSessionComplete(false), []);

  // Pilar 3: mid-session notification trigger
  const [midSessionFired, setMidSessionFired] = useState(false);
  const halfPoint = Math.floor(mode.duration * 30);
  useEffect(() => {
    if (running && secs === halfPoint && !midSessionFired) {
      setMidSessionFired(true);
    }
    if (!running) setMidSessionFired(false);
  }, [secs, running, halfPoint, midSessionFired]);

  return {
    mode, switchMode, running, secs, toggle, reset, uiProfile,
    quickStart, restoreSession, updateModeDurations,
    sessionComplete, dismissComplete,
    midSessionFired, pausedSince,
  };
}

/* ════════════════════════════════════════════
   AUDIO HUB HOOK (per-mode URL persistence)
════════════════════════════════════════════ */
const DEFAULT_PLAYLISTS = {
  "deep-flow":     "https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6",
  "steady-rhythm": "https://www.youtube.com/watch?v=5qap5aO4i9A",
  "vital-reset":   "https://open.spotify.com/playlist/37i9dQZF1DXcF6B6QPhFDv",
};

function useAudioHub() {
  const [enabled, setEnabled] = useState(false);
  const [playlists, setPlaylists] = useState(DEFAULT_PLAYLISTS);
  const [currentMode, setCurrentMode] = useState("deep-flow");

  const setPlaylist = useCallback((modeId, url) => {
    setPlaylists(p => ({ ...p, [modeId]: url }));
  }, []);

  const getPlaylist = useCallback((modeId) => playlists[modeId] || "", [playlists]);

  return { enabled, setEnabled, playlists, setPlaylist, getPlaylist, currentMode, setCurrentMode };
}

/* ════════════════════════════════════════════
   PRESETS & SMART SUGGESTIONS HOOK (Pilar 2)
════════════════════════════════════════════ */
const DEFAULT_PRESETS = [
  { id:"p1", label:"Pomodoro 25/5",    modeId:"steady-rhythm", duration:25, color:"#1A237E", uses:18 },
  { id:"p2", label:"Deep Work 50 min", modeId:"deep-flow",      duration:50, color:"#FF6D00", uses:12 },
  { id:"p3", label:"Revisión rápida",  modeId:"steady-rhythm", duration:15, color:"#2E7D32", uses:7  },
];
function usePresets() {
  const [presets, setPresets] = useState(DEFAULT_PRESETS);
  // Sort by use frequency (auto-suggest)
  const suggested = [...presets].sort((a, b) => b.uses - a.uses).slice(0, 3);
  const usePreset = useCallback((preset, quickStart, switchMode) => {
    const m = SESSION_MODES.find(x => x.id === preset.modeId) || SESSION_MODES[0];
    switchMode({ ...m, duration: preset.duration });
    setTimeout(() => quickStart({ ...m, duration: preset.duration }), 50);
    setPresets(ps => ps.map(p => p.id === preset.id ? { ...p, uses: p.uses + 1 } : p));
  }, []);
  return { presets, suggested, usePreset };
}
function useEyeRest(active) {
  const [showAlert, setShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const [nextIn, setNextIn] = useState(20 * 60);

  useEffect(() => {
    if (!active) return;
    const tick = setInterval(() => {
      setNextIn(n => {
        if (n <= 1) { setShowAlert(true); setCountdown(20); return 20 * 60; }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [active]);

  useEffect(() => {
    if (!showAlert) return;
    if (countdown <= 0) { setShowAlert(false); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [showAlert, countdown]);

  const dismiss = useCallback(() => setShowAlert(false), []);
  const minsToNext = Math.floor(nextIn / 60);
  const secsToNext = nextIn % 60;

  return { showAlert, dismiss, countdown, minsToNext, secsToNext };
}

/* ════════════════════════════════════════════
   OTHER HOOKS
════════════════════════════════════════════ */
const BAR_BUFFER = 300;
function useBars() {
  const [bars, setBars] = useState(() => Array.from({ length: BAR_BUFFER }, () => Math.random() * 80 + 10));
  useEffect(() => {
    const iv = setInterval(() => {
      setBars(p => { const n = [...p.slice(1)]; n.push(Math.random() * 85 + 10); return n; });
    }, 400);
    return () => clearInterval(iv);
  }, []);
  return bars;
}

function usePosture(active) {
  const states = ["good","good","good","warn","good","warn","bad","good","good"];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const iv = setInterval(() => setI(x => (x + 1) % states.length), 5000);
    return () => clearInterval(iv);
  }, [active]);
  return states[i];
}

function useHydration() {
  const [lastDrink, setLastDrink] = useState(Date.now() - 45 * 60 * 1000);
  const [count, setCount]         = useState(3);
  const drink = () => { setLastDrink(Date.now()); setCount(c => c + 1); };
  const minutesSince = Math.floor((Date.now() - lastDrink) / 60000);
  const urgent = minutesSince >= 45;
  return { drink, count, minutesSince, urgent };
}

/* ════════════════════════════════════════════
   M3 PRIMITIVES
════════════════════════════════════════════ */
function M3Switch({ checked, onChange, label }) {
  return (
    <label className="m3-switch" title={label} aria-label={label}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} aria-label={label} />
      <span className="m3-switch-track" aria-hidden="true" />
      <span className="m3-switch-thumb" aria-hidden="true" />
    </label>
  );
}

function Badge({ label, cls = "badge-green" }) {
  return <span className={`badge ${cls}`}>{label}</span>;
}

function KpiCard({ icon, label, value, color, badge, badgeCls }) {
  return (
    <div className="m3-card" style={{ padding:20 }} role="region" aria-label={label}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
        <div style={{ width:42, height:42, borderRadius:14, background:`${color}16`, display:"flex", alignItems:"center", justifyContent:"center", color }}>{icon}</div>
        {badge && <Badge label={badge} cls={badgeCls} />}
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"1.9rem", fontWeight:500, color, lineHeight:1 }}>{value}</div>
      <div className="label-md" style={{ color:"var(--md-on-surface-variant)", marginTop:4, fontSize:".6rem", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{label}</div>
    </div>
  );
}

function Ripple({ children, style, className = "", onClick, tabIndex, onKeyDown, role, "aria-checked": ariaChecked }) {
  return (
    <div className={`m3-ripple ${className}`} style={style} onClick={onClick}
      tabIndex={tabIndex} onKeyDown={onKeyDown} role={role} aria-checked={ariaChecked}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════
   EYE REST OVERLAY (20-20-20)
════════════════════════════════════════════ */
function EyeRestOverlay({ countdown, onDismiss }) {
  return (
    <>
      <div className="eye-rest-overlay" aria-hidden="true" />
      <div className="eye-rest-banner" role="alertdialog" aria-modal="true" aria-label="Descanso ocular 20-20-20">
        <div style={{ fontSize:"2.2rem", marginBottom:10 }}>👁️</div>
        <div className="title-lg" style={{ color:"#fff", marginBottom:6 }}>Un respiro para tus ojos</div>
        <p className="body-md" style={{ color:"rgba(255,255,255,.75)", marginBottom:18, maxWidth:260, textAlign:"center" }}>
          Mira algo a lo lejos, unos 6 metros. Deja que tus ojos descansen.
        </p>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:"2.4rem", fontWeight:500, color:var_accent="#FF6D00", color:"#FF6D00", marginBottom:18 }}>
          {countdown}s
        </div>
        <div style={{ width:180, height:4, background:"rgba(255,255,255,.15)", borderRadius:99, overflow:"hidden", marginBottom:18 }}>
          <div style={{ height:"100%", background:"#FF6D00", borderRadius:99, width:`${(countdown/20)*100}%`, transition:"width 1s linear" }} />
        </div>
        <button className="btn-outlined" onClick={onDismiss} style={{ borderColor:"rgba(255,255,255,.3)", color:"#fff", fontSize:".82rem" }}>
          Listo
        </button>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   AUDIO HUB COMPONENT
════════════════════════════════════════════ */
const TRACKS = [
  { title:"Forest Rain", artist:"Ambient Focus", duration:"∞", emoji:"🌧️" },
  { title:"Deep Alpha",  artist:"Binaural Beats", duration:"60:00", emoji:"🎵" },
  { title:"Steady Pulse",artist:"Lo-fi Beats",   duration:"45:00", emoji:"🎶" },
  { title:"White Noise", artist:"Sound Therapy", duration:"∞", emoji:"🌊" },
];

/* ════════════════════════════════════════════
   PLAYLIST POPUP (modal from Play button)
════════════════════════════════════════════ */
function PlaylistPopup({ audioHub, sessionMode, onClose }) {
  const { setPlaylist, getPlaylist } = audioHub;
  const [drafts, setDrafts] = useState(() => {
    const d = {};
    SESSION_MODES.forEach(m => { d[m.id] = getPlaylist(m.id); });
    return d;
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    SESSION_MODES.forEach(m => setPlaylist(m.id, drafts[m.id]));
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 900);
  };

  const platformIcon = (url) => {
    if (!url) return "🎵";
    if (url.includes("spotify")) return "🟢";
    if (url.includes("youtube") || url.includes("youtu.be")) return "🔴";
    return "🔗";
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(15,15,40,.45)", backdropFilter:"blur(6px)", animation:"fade-in .18s ease both" }}
      onClick={e=>{ if(e.target===e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label="Configurar playlists">
      <div className="m3-card" style={{ width:"100%", maxWidth:440, margin:16, padding:0, overflow:"hidden", boxShadow:"var(--md-elev-3)", animation:"fade-in .22s ease both" }}>
        {/* Header */}
        <div style={{ padding:"18px 22px 14px", background:"var(--secondary)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:"rgba(255,255,255,.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Music size={16} color="#fff"/>
            </div>
            <div>
              <div className="title-sm" style={{ color:"#fff" }}>Playlists de sesión</div>
              <div className="body-sm" style={{ color:"rgba(255,255,255,.65)" }}>Spotify o YouTube por modo</div>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Cerrar configuración de playlists" style={{ color:"#fff", background:"rgba(255,255,255,.12)" }}><X size={14} aria-hidden="true"/></button>
        </div>

        {/* Playlist inputs per mode */}
        <div style={{ padding:"18px 22px 6px" }}>
          {SESSION_MODES.map(m => (
            <div key={m.id} style={{ marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                <span style={{ color:m.color, fontSize:"1rem" }}>{m.icon}</span>
                <span className="label-md" style={{ color:m.color, letterSpacing:".04em" }}>{m.label}</span>
                {sessionMode.id===m.id && <span style={{ fontSize:".65rem", background:m.color+"22", color:m.color, padding:"2px 8px", borderRadius:99, fontWeight:700 }}>Activo</span>}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:"1rem", flexShrink:0 }}>{platformIcon(drafts[m.id])}</span>
                <input
                  className="audio-url-input"
                  style={{ flex:1, padding:"10px 12px", fontSize:".82rem", borderRadius:"var(--rad-sm)", borderColor:sessionMode.id===m.id?"var(--secondary)":"var(--md-outline-variant)" }}
                  value={drafts[m.id]}
                  onChange={e => setDrafts(d => ({ ...d, [m.id]: e.target.value }))}
                  placeholder="https://open.spotify.com/... o YouTube URL"
                  aria-label={`URL playlist ${m.label}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Hint */}
        <div style={{ margin:"0 22px 14px", padding:"10px 14px", background:"var(--md-surface-variant)", borderRadius:"var(--rad-sm)", display:"flex", gap:8, alignItems:"flex-start" }}>
          <span style={{ fontSize:".85rem", flexShrink:0 }}>💡</span>
          <span className="body-sm" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.55 }}>Pega la URL de cualquier playlist de Spotify o YouTube. La reproducción se abrirá en una nueva pestaña al activar el audio.</span>
        </div>

        {/* Footer */}
        <div style={{ padding:"12px 22px 20px", display:"flex", gap:10, borderTop:"1px solid var(--md-outline-variant)" }}>
          <button className="btn-outlined" onClick={onClose} style={{ padding:"10px 20px" }}>Cancelar</button>
          <button className="btn-filled" style={{ flex:1, justifyContent:"center", padding:"10px 0", background:saved?"#2E7D32":undefined }} onClick={handleSave}>
            {saved ? <><Check size={14}/>Guardado</> : <><Check size={14}/>Guardar playlists</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MUSIC PLAYER CARD (below keyboard chart)
════════════════════════════════════════════ */
function MusicPlayerCard({ audioHub, sessionMode }) {
  const { enabled, setEnabled, getPlaylist } = audioHub;
  const [track, setTrack]     = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [playing, setPlaying] = useState(false);

  const currentUrl = getPlaylist(sessionMode.id);

  const handlePlayPause = () => {
    if (!enabled) return;
    if (currentUrl && !playing) {
      window.open(currentUrl, "_blank", "noopener");
    }
    setPlaying(p => !p);
  };

  // Stop playing when disabled
  useEffect(() => { if (!enabled) setPlaying(false); }, [enabled]);

  const platformName = (url) => {
    if (!url) return null;
    if (url.includes("spotify")) return { label:"Spotify", color:"#1DB954", emoji:"🟢" };
    if (url.includes("youtube") || url.includes("youtu.be")) return { label:"YouTube", color:"#FF0000", emoji:"🔴" };
    return { label:"Enlace", color:"var(--secondary)", emoji:"🔗" };
  };
  const platform = platformName(currentUrl);

  return (
    <div className="m3-card" style={{ padding:20 }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Music size={16} style={{ color:enabled?"var(--secondary)":"var(--md-outline)" }}/>
          <span className="title-sm" style={{ color:enabled?"var(--md-on-surface)":"var(--md-outline)" }}>Reproductor</span>
          {enabled && playing && (
            <span style={{ display:"flex", gap:2, alignItems:"flex-end", height:14 }}>
              {[3,6,4,7,5].map((h,i)=>(
                <span key={i} style={{ display:"inline-block", width:3, borderRadius:2,
                  height:`${h}px`, background:"var(--accent)",
                  animation:`equalize .7s ${i*0.12}s ease-in-out infinite alternate` }}/>
              ))}
            </span>
          )}
        </div>
        <M3Switch checked={enabled} onChange={setEnabled} label="Activar audio" />
      </div>

      <style>{`
        @keyframes equalize {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>

      {/* Current mode playlist */}
      <div style={{ background:enabled?"var(--md-primary-container)":"var(--md-surface-variant)", borderRadius:"var(--rad-md)", padding:"12px 14px", marginBottom:14, transition:"background .3s", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:42, height:42, borderRadius:12, background:enabled?"var(--secondary)":"var(--md-outline-variant)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background .3s", position:"relative" }}>
          <span style={{ fontSize:"1.2rem" }}>{sessionMode.icon}</span>
          {enabled && playing && (
            <div style={{ position:"absolute", bottom:-3, right:-3, width:14, height:14, borderRadius:"50%", background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Volume2 size={8} color="#fff"/>
            </div>
          )}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div className="body-md" style={{ fontWeight:700, color:enabled?"var(--md-on-primary-container)":"var(--md-on-surface-variant)" }}>{sessionMode.label}</div>
          {platform ? (
            <a href={currentUrl} target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", gap:4, textDecoration:"none", marginTop:2 }}>
              <span style={{ fontSize:".72rem" }}>{platform.emoji}</span>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:".7rem", color:enabled?platform.color:"var(--md-outline)", fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:180 }}>{platform.label} — playlist conectada</span>
            </a>
          ) : (
            <div className="body-sm" style={{ color:"var(--md-outline)", marginTop:2 }}>Agrega una playlist cuando quieras</div>
          )}
        </div>
      </div>

      {/* Ambient tracks */}
      <div style={{ opacity:enabled?1:.4, transition:"opacity .3s", pointerEvents:enabled?"auto":"none" }}>
        <div className="label-sm" style={{ color:"var(--md-on-surface-variant)", marginBottom:8 }}>Sonidos ambientales</div>
        <div style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:12 }}>
          {TRACKS.map((t,i) => (
            <Ripple key={i} onClick={()=>{ setTrack(i); if(enabled) setPlaying(true); }}
              tabIndex={enabled?0:-1}
              role="button"
              aria-label={`Reproducir ${t.title} — ${t.artist}`}
              aria-pressed={track===i&&enabled&&playing}
              onKeyDown={e=>{ if(e.key===" "||e.key==="Enter"){e.preventDefault(); setTrack(i); if(enabled) setPlaying(true); }}}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:"var(--rad-sm)",
                background:track===i&&enabled?"var(--md-surface-1)":"transparent" }}>
              <div style={{ width:30, height:30, borderRadius:10, background:track===i&&enabled&&playing?"var(--secondary)":"var(--md-surface-variant)",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:".9rem", flexShrink:0, transition:"var(--transition-fast)" }}>
                {track===i&&enabled&&playing ? <Volume2 size={12} color="#fff"/> : t.emoji}
              </div>
              <div style={{ flex:1 }}>
                <div className="body-md" style={{ fontWeight:600 }}>{t.title}</div>
                <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>{t.artist}</div>
              </div>
              <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", fontFamily:"var(--font-mono)" }}>{t.duration}</div>
            </Ripple>
          ))}
        </div>

        {/* Playback controls */}
        <div style={{ display:"flex", gap:8, alignItems:"center", padding:"10px 4px 0", borderTop:"1px solid var(--md-outline-variant)" }}>
          <button className="btn-icon" style={{ width:44,height:44 }} onClick={()=>setShuffle(s=>!s)} aria-label={shuffle?"Desactivar reproducción aleatoria":"Activar reproducción aleatoria"} title={shuffle?"Aleatorio: activado":"Aleatorio: desactivado"}>
            <Shuffle size={14} style={{ color:shuffle?"var(--accent)":"var(--md-on-surface-variant)" }}/>
          </button>
          <button className="btn-icon" style={{ width:44,height:44 }} onClick={()=>setTrack(t=>(t-1+TRACKS.length)%TRACKS.length)} aria-label="Pista anterior">
            <ChevronLeft size={16}/>
          </button>
          <button
            onClick={handlePlayPause}
            aria-label={playing?"Pausar reproducción":"Reproducir música de enfoque"}
            style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              background:playing?"var(--accent)":"var(--secondary)", color:"#fff",
              border:"none", borderRadius:"var(--rad-full)", padding:"9px 0", minHeight:44,
              fontFamily:"var(--font-display)", fontWeight:700, fontSize:".82rem",
              cursor:"pointer", transition:"var(--transition-fast)", boxShadow:playing?"0 2px 8px rgba(255,109,0,.35)":"var(--md-elev-1)" }}>
            {playing ? <><Pause size={14}/> Pausar</> : <><Play size={14}/> Reproducir</>}
          </button>
          <button className="btn-icon" style={{ width:44,height:44 }} onClick={()=>setTrack(t=>(t+1)%TRACKS.length)} aria-label="Siguiente pista">
            <SkipForward size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   HYDRATION WIDGET
════════════════════════════════════════════ */
function HydrationWidget({ hydration }) {
  const { drink, count, minutesSince, urgent } = hydration;
  const glasses = Math.min(count, 8);
  return (
    <div className="m3-card" style={{ padding:20 }} role="region" aria-label="Hidratación">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Droplets size={16} style={{ color:urgent?"#B71C1C":"var(--secondary)" }}/>
          <span className="title-sm">Hidratación</span>
        </div>
        <Badge label={urgent?"Tómate un momento":"Bien hidratado/a"} cls={urgent?"badge-orange":"badge-green"}/>
      </div>
      <div style={{ display:"flex", gap:5, marginBottom:14 }} role="progressbar" aria-valuenow={glasses} aria-valuemax={8} aria-label={`${glasses} de 8 vasos`}>
        {Array.from({length:8},(_,i)=>(
          <div key={i} className={`drop-icon ${i<glasses?"filled":""}`} style={{
            flex:1, height:32, borderRadius:8,
            background:i<glasses?"var(--secondary)":"var(--md-surface-variant)",
            display:"flex", alignItems:"center", justifyContent:"center", transition:"var(--transition-spring)",
            transform:i<glasses?"scale(1)":"scale(.95)",
          }}>
            {i<glasses && <Droplets size={11} color="#fff"/>}
          </div>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>
            Último vaso: <span style={{ color:urgent?"#B71C1C":"var(--md-on-surface)", fontWeight:600 }}>hace {minutesSince} min</span>
          </div>
          <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:2 }}>{count} vasos · objetivo: 8 al día</div>
        </div>
        <button className="btn-tonal" onClick={drink} style={{ padding:"8px 16px", fontSize:".8rem" }} aria-label="Registrar vaso de agua">
          <Droplets size={13}/> Tomé agua
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   ERGONOMIC AVATAR
════════════════════════════════════════════ */
function ErgonomicAvatar({ state }) {
  const cfg = {
    good:{ color:"#2E7D32", bg:"#E8F5E9", ring:"#C8E6C9", emoji:"🧘", label:"Tu postura se ve bien", sub:"Sigue así, vas cómodo/a.", aura:"aura-good" },
    warn:{ color:"#FF6D00", bg:"#FFF8F0", ring:"#FFE0B2", emoji:"😌", label:"Cuando puedas, ajusta un poco", sub:"Un pequeño movimiento de hombros te ayudará.", aura:"aura-warn" },
    bad :{ color:"#C62828", bg:"#FFEBEE", ring:"#FFCDD2", emoji:"🙆", label:"Es buen momento para estirarte", sub:"Enderézate suavemente y respira.", aura:"aura-bad"  },
  }[state];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 0", borderTop:"1px solid var(--md-outline-variant)", marginTop:8 }}>
      <div className={cfg.aura} style={{ width:72, height:72, borderRadius:"50%", background:cfg.bg, border:`3px solid ${cfg.ring}`,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.8rem", flexShrink:0, transition:"all .5s" }}
        role="img" aria-label={cfg.label}>
        {cfg.emoji}
      </div>
      <div style={{ flex:1 }}>
        <div className="title-sm" style={{ color:cfg.color }}>{cfg.label}</div>
        <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:2 }}>{cfg.sub}</div>
      </div>
      <Badge label={state==="good"?"Bien":state==="warn"?"Casi":"Descansa"}
        cls={state==="good"?"badge-green":state==="warn"?"badge-orange":"badge-red"}/>
    </div>
  );
}

/* ════════════════════════════════════════════
   DAILY SUCCESS REPORT
════════════════════════════════════════════ */
function DailySuccessReport({ onClose }) {
  const metrics = [
    { label:"Tiempo en foco",      value:82,  color:"var(--secondary)", icon:<TrendingUp size={14}/>, detail:"4h 10m · foco profundo" },
    { label:"Bienestar físico",    value:74,  color:"#2E7D32",          icon:<Heart size={14}/>,      detail:"6/8 vasos · 3 pausas" },
    { label:"Sesiones",            value:100, color:"var(--accent)",    icon:<CheckCircle2 size={14}/>,detail:"4/4 · 12 días seguidos" },
    { label:"Postura",             value:68,  color:"#7B5EA7",          icon:<Shield size={14}/>,     detail:"32 min recordatorios" },
  ];
  const sessions = [
    { name:"Revisión código",   mode:"Deep Flow",     dur:"52 min", score:94 },
    { name:"Reunión equipo",    mode:"Steady Rhythm", dur:"30 min", score:71 },
    { name:"Diseño wireframes", mode:"Deep Flow",     dur:"1h 10m", score:88 },
    { name:"Vital Reset",       mode:"Vital Reset",   dur:"15 min", score:100 },
  ];
  const overall = Math.round(metrics.reduce((s,m)=>s+m.value,0)/metrics.length);
  const r=44, circ=2*Math.PI*r;
  const offset=circ*(1-overall/100);

  return (
    <div className="scrim" role="dialog" aria-modal="true" aria-label="Reporte diario">
      <div className="m3-fullscreen-dialog" style={{
        maxWidth:520, width:"94%",
        height:"90vh", maxHeight:"90vh",
        padding:0, overflow:"hidden",
        display:"flex", flexDirection:"column",
      }}>

        {/* ── Header ── */}
        <div style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"20px 24px 16px", flexShrink:0 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:"var(--md-primary-container)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <Trophy size={18} style={{ color:"var(--secondary)" }}/>
          </div>
          <div style={{ flex:1 }}>
            <div className="title-lg" style={{ lineHeight:1.2 }}>Reporte de éxito</div>
            <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:2 }}>Martes, 10 de junio · Semana 24</div>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Cerrar reporte" style={{ width:36, height:36, flexShrink:0 }}><X size={16}/></button>
        </div>

        {/* ── Body — flex:1, no scroll ── */}
        <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", padding:"0 24px", gap:14, overflow:"hidden" }}>

          {/* Score card: ring + headline side by side */}
          <div style={{ flexShrink:0, background:"var(--md-surface-variant)", borderRadius:"var(--rad-md)", padding:"14px 18px",
            display:"flex", alignItems:"center", gap:16 }}>
            <svg width={88} height={88} viewBox="0 0 106 106" aria-hidden="true" style={{ flexShrink:0 }}>
              <circle cx={53} cy={53} r={r} fill="none" stroke="var(--md-primary-container)" strokeWidth={9}/>
              <circle cx={53} cy={53} r={r} fill="none" stroke="var(--secondary)" strokeWidth={9}
                strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} className="report-ring"/>
              <text x={53} y={50} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={24} fontWeight={700} fill="var(--secondary)">{overall}</text>
              <text x={53} y={66} textAnchor="middle" fontFamily="var(--font-display)" fontSize={9} fill="var(--md-on-surface-variant)">PUNTUACIÓN</text>
            </svg>
            <div>
              <div className="title-md" style={{ color:"var(--secondary)", marginBottom:5 }}>
                {overall>=80?"¡Día excelente!":overall>=60?"Buen ritmo hoy":"Hay margen para crecer"}
              </div>
              <p className="body-sm" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.6 }}>
                Tu índice combinado de productividad y bienestar es <strong style={{ color:"var(--md-on-surface)" }}>{overall}/100</strong>. Mantén el impulso mañana.
              </p>
            </div>
          </div>

          {/* Metric rows */}
          <div style={{ display:"flex", flexDirection:"column", gap:10, flexShrink:0 }}>
            {metrics.map((m,i)=>(
              <div key={i}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ color:m.color, display:"flex", alignItems:"center" }}>{m.icon}</span>
                  <span className="label-lg" style={{ flex:1, fontWeight:600, color:"var(--md-on-surface)" }}>{m.label}</span>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:".85rem", fontWeight:700, color:m.color }}>{m.value}%</span>
                </div>
                <div style={{ height:6, borderRadius:99, background:"var(--md-outline-variant)", overflow:"hidden", marginBottom:3 }}>
                  <div style={{ height:"100%", width:`${m.value}%`, background:m.color, borderRadius:99, transition:"width .6s ease" }}/>
                </div>
                <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", fontSize:".75rem" }}>{m.detail}</div>
              </div>
            ))}
          </div>

          {/* Sessions table — flex:1 fills remaining space */}
          <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column" }}>
            <div className="title-sm" style={{ marginBottom:8, flexShrink:0 }}>Sesiones de hoy</div>
            <div style={{ border:"1.5px solid var(--md-outline-variant)", borderRadius:"var(--rad-md)", overflow:"hidden",
              flex:1, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto auto", background:"var(--md-surface-variant)",
                padding:"8px 14px", borderBottom:"1px solid var(--md-outline-variant)", flexShrink:0 }}>
                {["SESIÓN","MODO","DURACIÓN","SCORE"].map((h,i)=>(
                  <span key={i} className="label-sm" style={{ textAlign:i>0?"center":"left", paddingRight:i<3?12:0 }}>{h}</span>
                ))}
              </div>
              <div style={{ display:"flex", flexDirection:"column", flex:1 }}>
                {sessions.map((s,i)=>(
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr auto auto auto",
                    padding:"0 14px", alignItems:"center", flex:1,
                    borderBottom:i<sessions.length-1?"1px solid var(--md-outline-variant)":"none",
                    background:i%2===0?"transparent":"var(--md-surface-1)" }}>
                    <span className="body-md" style={{ fontWeight:600, paddingRight:10 }}>{s.name}</span>
                    <span style={{ paddingRight:12, textAlign:"center" }}>
                      <Badge label={s.mode} cls={s.mode==="Deep Flow"?"badge-navy":s.mode==="Steady Rhythm"?"badge-orange":"badge-green"}/>
                    </span>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:".78rem", color:"var(--md-on-surface-variant)",
                      paddingRight:12, textAlign:"center", whiteSpace:"nowrap" }}>{s.dur}</span>
                    <span style={{ fontFamily:"var(--font-mono)", fontWeight:700, fontSize:".85rem", textAlign:"center",
                      color:s.score>=90?"#2E7D32":s.score>=75?"#FF6D00":"#C62828" }}>{s.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div style={{ padding:"14px 24px 20px", flexShrink:0 }}>
          <button className="btn-filled" onClick={onClose} style={{ width:"100%", justifyContent:"center", padding:"12px 0" }}>
            <Sparkles size={14}/> ¡Excelente trabajo hoy!
          </button>
        </div>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   VITAL RESET DIALOG
════════════════════════════════════════════ */
const STRETCHES = [
  { icon:"🙆", title:"Estiramiento cervical",  desc:"Inclina la cabeza hacia cada hombro, 15 seg por lado. Gira suavemente.", time:"1 min" },
  { icon:"🤸", title:"Apertura de pecho",      desc:"Entrelaza manos detrás, saca pecho y mantén 20 seg. Respira profundo.", time:"45 seg" },
  { icon:"🧘", title:"Giro de columna",        desc:"Sentado, gira el torso hacia cada lado. 3 repeticiones.",               time:"1 min" },
  { icon:"🦵", title:"Activación de piernas",  desc:"De pie: 10 sentadillas superficiales + elevación de talones.",          time:"2 min" },
];
function VitalResetDialog({ onClose }) {
  const [step, setStep] = useState(0);
  const done = step >= STRETCHES.length;
  return (
    <div className="scrim" role="dialog" aria-modal="true" aria-label="Vital Reset">
      <div className="m3-fullscreen-dialog" style={{ maxWidth:520 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
              <div style={{ width:44, height:44, borderRadius:14, background:"var(--md-tertiary-container)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Leaf size={20} style={{ color:"var(--md-tertiary)" }}/>
              </div>
              <span className="headline-sm">Vital Reset</span>
            </div>
            <p className="body-md" style={{ color:"var(--md-on-surface-variant)" }}>Guía de estiramiento y recuperación activa</p>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Cerrar guía de estiramiento"><X size={18} aria-hidden="true"/></button>
        </div>
        {!done ? (
          <>
            <div style={{ marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span className="label-sm" style={{ color:"var(--md-on-surface-variant)" }}>Paso {step+1} de {STRETCHES.length}</span>
                <span className="label-sm" style={{ color:"var(--md-tertiary)" }}>{STRETCHES[step].time}</span>
              </div>
              <div className="m3-progress"><div className="m3-progress-fill" style={{ width:`${(step/STRETCHES.length)*100}%`, background:"var(--md-tertiary)" }}/></div>
            </div>
            <div style={{ background:"var(--md-tertiary-container)", borderRadius:"var(--rad-lg)", padding:28, textAlign:"center", marginBottom:20 }}>
              <div style={{ fontSize:"3rem", marginBottom:12 }}>{STRETCHES[step].icon}</div>
              <div className="headline-sm" style={{ color:"var(--md-on-tertiary-container)", marginBottom:10 }}>{STRETCHES[step].title}</div>
              <p className="body-md" style={{ color:"var(--md-tertiary)", lineHeight:1.6 }}>{STRETCHES[step].desc}</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
              {STRETCHES.map((s,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:"var(--rad-sm)",
                  background:i===step?"var(--md-surface-2)":i<step?"var(--md-surface-1)":"transparent", opacity:i>step?.5:1, transition:"all .2s" }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0,
                    background:i<step?"var(--secondary)":i===step?"var(--md-tertiary)":"var(--md-surface-variant)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:i<=step?"#fff":"var(--md-on-surface-variant)", fontSize:".75rem", fontWeight:700 }}>
                    {i<step?<Check size={12} strokeWidth={3}/>:i+1}
                  </div>
                  <span style={{ fontSize:"1rem" }}>{s.icon}</span>
                  <span className="body-md" style={{ color:"var(--md-on-surface)", flex:1 }}>{s.title}</span>
                  <span className="body-sm" style={{ color:"var(--md-on-surface-variant)", fontFamily:"var(--font-mono)" }}>{s.time}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              {step > 0 ? (
                <button className="btn-outlined" onClick={()=>setStep(s=>s-1)} style={{ padding:"0 16px", display:"flex", alignItems:"center", gap:6 }} aria-label="Ejercicio anterior">
                  <ChevronLeft size={16}/>Anterior
                </button>
              ) : (
                <button className="btn-outlined" onClick={onClose} style={{ flex:1, justifyContent:"center" }}>Saltar</button>
              )}
              <button className="btn-filled" onClick={()=>setStep(s=>s+1)} style={{ flex:2, justifyContent:"center" }}>
                {step<STRETCHES.length-1?<><ChevronRight size={16}/>Siguiente</>:<><Check size={16}/>Finalizar</>}
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ fontSize:"3.5rem", marginBottom:16, animation:"float 2s ease infinite" }}>🎉</div>
            <div className="headline-sm" style={{ marginBottom:10 }}>¡Buen movimiento!</div>
            <p className="body-md" style={{ color:"var(--md-on-surface-variant)", marginBottom:28 }}>Tu cuerpo agradeció la pausa. Cuando quieras, seguimos.</p>
            <button className="btn-filled" onClick={onClose} style={{ minWidth:180, justifyContent:"center" }}><Leaf size={15}/> Seguir</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   ONBOARDING STEPPER (3 pasos)
════════════════════════════════════════════ */
/* ════════════════════════════════════════════
   ONBOARDING SCREEN 1 — Enfoque y Claridad
════════════════════════════════════════════ */
function OnboardingScreen1() {
  return (
    <div className="ob-screen" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, minHeight:460 }}>

      {/* LEFT — Copy */}
      <div style={{ padding:"44px 40px 44px 44px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <div className="ob-step-pill" style={{ alignSelf:"flex-start", marginBottom:22 }}>
          Paso 1 de 3
        </div>

        <div className="headline-md" style={{ marginBottom:14, letterSpacing:"-.02em", color:"var(--md-on-surface)" }}>
          Tu tiempo,<br/>
          <span style={{ color:"var(--secondary)" }}>a tu ritmo</span>
        </div>

        <p className="body-lg" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.7, marginBottom:28, maxWidth:310 }}>
          Elige cuándo profundizar y cuándo descansar.{" "}
          <strong style={{ color:"var(--secondary)", fontWeight:700 }}>FocusFlow</strong> cuida el ritmo por ti.
        </p>

        {/* Feature list */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            { icon:<Zap size={15}/>,     text:"Sesiones adaptadas a tu energía",    color:"var(--secondary)" },
            { icon:<BellOff size={15}/>, text:"Sin interrupciones cuando más importa", color:"var(--accent)"    },
            { icon:<Shield size={15}/>,  text:"Tu espacio, sin distracciones",         color:"var(--md-tertiary)"},
          ].map((f,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px",
              background:"var(--md-surface-variant)", borderRadius:"var(--rad-md)",
              border:"1px solid var(--md-outline-variant)" }}>
              <div style={{ width:32, height:32, borderRadius:10, background:`${f.color}16`,
                display:"flex", alignItems:"center", justifyContent:"center", color:f.color, flexShrink:0 }}>
                {f.icon}
              </div>
              <span className="body-md" style={{ fontWeight:600, color:"var(--md-on-surface)" }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Visual: mini Bento Grid + timer animado */}
      <div style={{ padding:"36px 36px 36px 16px", display:"flex", alignItems:"center", justifyContent:"center",
        background:"var(--md-surface-1)", borderLeft:"1px solid var(--md-outline-variant)" }}>
        <div style={{ width:"100%", maxWidth:300 }}>

          {/* Timer card — dominante */}
          <div className="m3-card ob-mini-card" style={{ padding:20, marginBottom:10, textAlign:"center" }}>
            <div className="label-md" style={{ color:"var(--md-on-surface-variant)", marginBottom:14 }}>Sesión activa</div>
            {/* SVG ring timer */}
            <div style={{ position:"relative", width:88, height:88, margin:"0 auto 12px" }}>
              <svg width={88} height={88} viewBox="0 0 88 88" aria-hidden="true">
                <circle cx={44} cy={44} r={33} fill="none" stroke="var(--md-outline-variant)" strokeWidth={7}/>
                <circle cx={44} cy={44} r={33} fill="none"
                  stroke="var(--secondary)" strokeWidth={7}
                  strokeLinecap="round" strokeDasharray="208"
                  className="ob-ring-progress"/>
                <defs>
                  <linearGradient id="ob-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--secondary)"/>
                    <stop offset="100%" stopColor="var(--accent)"/>
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:"1.2rem", fontWeight:500,
                  color:"var(--secondary)", lineHeight:1 }}>25:00</span>
              </div>
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px",
              borderRadius:"var(--rad-full)", background:"var(--md-primary-container)" }}>
              <span className="ob-live-dot" style={{ width:6, height:6, borderRadius:"50%",
                background:"var(--secondary)", display:"inline-block" }}/>
              <span className="label-sm" style={{ color:"var(--md-on-primary-container)" }}>Deep Flow · En curso</span>
            </div>
          </div>

          {/* 2-col mini bento */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
            {/* Tareas mini */}
            <div className="m3-card ob-mini-card" style={{ padding:14 }}>
              <div className="label-sm" style={{ marginBottom:8 }}>Tareas</div>
              {[{d:true,l:"Revisar PRs"},{d:false,l:"Documentar"},{d:false,l:"Refactorizar"}].map((t,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
                  <div style={{ width:12, height:12, borderRadius:4, flexShrink:0,
                    background:t.d?"var(--secondary)":"var(--md-surface-variant)",
                    border:`1.5px solid ${t.d?"var(--secondary)":"var(--md-outline)"}`,
                    display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {t.d && <Check size={8} color="#fff" strokeWidth={3}/>}
                  </div>
                  <span style={{ fontSize:".62rem", color:t.d?"var(--secondary)":"var(--md-on-surface-variant)",
                    textDecoration:t.d?"line-through":"none", fontWeight:t.d?400:500 }}>{t.l}</span>
                </div>
              ))}
            </div>
            {/* Modo concentración mini */}
            <div className="m3-card ob-mini-card" style={{ padding:14, display:"flex", flexDirection:"column", gap:8 }}>
              <div className="label-sm">Concentración</div>
              <div style={{ width:34, height:34, borderRadius:10, background:"var(--md-primary-container)",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <BellOff size={15} style={{ color:"var(--secondary)" }} aria-hidden="true"/>
              </div>
              <span className="body-sm" style={{ color:"var(--secondary)", fontWeight:700 }}>Activo</span>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="m3-progress" style={{ height:7 }}>
            <div className="m3-progress-fill" style={{ width:"62%" }}/>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
            <span className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Progreso del día</span>
            <span className="body-sm" style={{ color:"var(--secondary)", fontWeight:700 }}>62%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   ONBOARDING SCREEN 2 — Bienestar Integral
════════════════════════════════════════════ */
function OnboardingScreen2() {
  return (
    <div className="ob-screen" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, minHeight:460 }}>

      {/* LEFT — Copy */}
      <div style={{ padding:"44px 40px 44px 44px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <div className="ob-step-pill" style={{ alignSelf:"flex-start", marginBottom:22 }}>
          Paso 2 de 3
        </div>

        <div className="headline-md" style={{ marginBottom:14, letterSpacing:"-.02em", color:"var(--md-on-surface)" }}>
          Tu salud es<br/>
          <span style={{ color:"var(--accent)" }}>parte del éxito</span>
        </div>

        <p className="body-lg" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.7, marginBottom:28, maxWidth:310 }}>
          Trabajar bien incluye cuidarte. Recibe{" "}
          <strong style={{ color:"var(--secondary)", fontWeight:700 }}>recordatorios de postura y pausas</strong>{" "}
          para que tu cuerpo también esté a gusto.
        </p>

        {/* Wellness 2×2 grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[
            { icon:<Eye size={15}/>,      label:"Pausa visual",      sub:"Cada 20 minutos",   color:"var(--secondary)"    },
            { icon:<Droplets size={15}/>, label:"Recordatorios",      sub:"Frecuencia de agua", color:"#0288D1"             },
            { icon:<Activity size={15}/>, label:"Postura cómoda",     sub:"Aviso suave",        color:"var(--md-tertiary)"  },
            { icon:<Heart size={15}/>,    label:"Pausas activas",     sub:"Cada 50 min",        color:"var(--accent)"       },
          ].map((p,i) => (
            <div key={i} style={{ padding:"12px 14px", background:"var(--md-surface-variant)",
              borderRadius:"var(--rad-md)", border:"1px solid var(--md-outline-variant)",
              display:"flex", flexDirection:"column", gap:7 }}>
              <div style={{ width:30, height:30, borderRadius:9, background:`${p.color}16`,
                display:"flex", alignItems:"center", justifyContent:"center", color:p.color }}>
                {p.icon}
              </div>
              <div className="body-sm" style={{ color:"var(--md-on-surface)", fontWeight:700 }}>{p.label}</div>
              <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>{p.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Visual: avatar + floating icons */}
      <div style={{ padding:"36px 36px 36px 16px", display:"flex", alignItems:"center", justifyContent:"center",
        background:"var(--md-surface-1)", borderLeft:"1px solid var(--md-outline-variant)" }}>
        <div style={{ width:"100%", maxWidth:260, display:"flex", flexDirection:"column", alignItems:"center", gap:18 }}>

          {/* Posture card */}
          <div className="m3-card ob-mini-card" style={{ width:"100%", padding:22, textAlign:"center" }}>
            <div className="label-md" style={{ marginBottom:16 }}>Sensor de postura</div>

            {/* Animated SVG avatar */}
            <div className="ob-avatar-align" style={{ margin:"0 auto 16px" }}>
              <svg width={60} height={76} viewBox="0 0 60 76" fill="none"
                role="img" aria-label="Avatar ergonómico alineándose">
                {/* Head */}
                <circle cx={30} cy={9} r={8} fill="var(--md-primary-container)"
                  stroke="var(--secondary)" strokeWidth={1.5}/>
                {/* Body */}
                <line x1={30} y1={17} x2={30} y2={46}
                  stroke="var(--secondary)" strokeWidth={2.5} strokeLinecap="round"/>
                {/* Shoulders */}
                <line x1={14} y1={29} x2={46} y2={29}
                  stroke="var(--secondary)" strokeWidth={2.5} strokeLinecap="round"/>
                {/* Arms */}
                <line x1={14} y1={29} x2={10} y2={44}
                  stroke="var(--secondary)" strokeWidth={2} strokeLinecap="round"/>
                <line x1={46} y1={29} x2={50} y2={44}
                  stroke="var(--secondary)" strokeWidth={2} strokeLinecap="round"/>
                {/* Legs */}
                <line x1={30} y1={46} x2={19} y2={68}
                  stroke="var(--secondary)" strokeWidth={2.5} strokeLinecap="round"/>
                <line x1={30} y1={46} x2={41} y2={68}
                  stroke="var(--secondary)" strokeWidth={2.5} strokeLinecap="round"/>
                {/* Spine guide */}
                <line x1={30} y1={17} x2={30} y2={46}
                  stroke="var(--accent)" strokeWidth={1} strokeDasharray="3 2" opacity=".4"/>
                {/* Check badge */}
                <circle cx={50} cy={9} r={7} fill="var(--md-tertiary)" opacity=".9"/>
                <path d="M47 9 L49.5 11.5 L54 6.5"
                  stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px",
              borderRadius:"var(--rad-full)", background:"var(--md-tertiary-container)" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--md-tertiary)", display:"inline-block" }}/>
              <span className="label-sm" style={{ color:"var(--md-on-tertiary-container)" }}>Postura correcta</span>
            </div>
          </div>

          {/* Floating health icons */}
          <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
            {[
              { icon:<Eye size={18}/>,      label:"20-20-20", cls:"ob-float",   color:"var(--secondary)" },
              { icon:<Droplets size={18}/>, label:"Agua",     cls:"ob-float-2", color:"#0288D1"          },
              { icon:<Heart size={18}/>,    label:"Pausas",   cls:"ob-float-3", color:"var(--accent)"    },
            ].map((h,i) => (
              <div key={i} className={`m3-card ob-mini-card ${h.cls}`}
                style={{ width:70, padding:"12px 8px", textAlign:"center" }}>
                <div style={{ color:h.color, display:"flex", justifyContent:"center", marginBottom:6 }}>
                  {h.icon}
                </div>
                <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", fontWeight:600 }}>{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   ONBOARDING SCREEN 3 — Aha! Moment
════════════════════════════════════════════ */
function OnboardingScreen3() {
  const BAR_DATA = [
    { h:45, focus:true  }, { h:30, focus:false },
    { h:78, focus:true  }, { h:55, focus:true  },
    { h:40, focus:false }, { h:92, focus:true  },
    { h:68, focus:true  }, { h:85, focus:true  },
  ];
  return (
    <div className="ob-screen" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, minHeight:460 }}>

      {/* LEFT — Copy */}
      <div style={{ padding:"44px 40px 44px 44px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <div className="ob-step-pill" style={{ alignSelf:"flex-start", marginBottom:22 }}>
          Paso 3 de 3
        </div>

        <div className="headline-md" style={{ marginBottom:14, letterSpacing:"-.02em", color:"var(--md-on-surface)" }}>
          Tu espacio para<br/>
          <span style={{ color:"var(--secondary)" }}>trabajar a tu manera</span>
        </div>

        <p className="body-lg" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.7, marginBottom:24, maxWidth:310 }}>
          Ve lo que avanzas cada día y encuentra tu{" "}
          <strong style={{ color:"var(--secondary)", fontWeight:700 }}>"Balance de Bienestar"</strong>{" "}
          combinando lo que hiciste con cómo te cuidaste.
        </p>

        {/* Stats */}
        <div style={{ display:"flex", gap:10, marginBottom:20 }}>
          {[
            { v:"94%",   l:"Tiempo en foco",  color:"var(--secondary)" },
            { v:"13",    l:"Días seguidos 🔥", color:"var(--accent)"    },
            { v:"8 / 8", l:"Hábitos de hoy",  color:"var(--md-tertiary)"},
          ].map((s,i) => (
            <div key={i} style={{ flex:1, padding:"12px 10px", background:"var(--md-surface-variant)",
              borderRadius:"var(--rad-md)", border:"1px solid var(--md-outline-variant)", textAlign:"center" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:".95rem", fontWeight:700, color:s.color }}>{s.v}</div>
              <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px",
          background:"var(--md-primary-container)", borderRadius:"var(--rad-md)" }}>
          <Flame size={18} style={{ color:"var(--accent)", flexShrink:0 }} aria-hidden="true"/>
          <span className="body-sm" style={{ color:"var(--md-on-primary-container)", lineHeight:1.6 }}>
            Muchas personas sienten la diferencia desde el primer día de uso.
          </span>
        </div>
      </div>

      {/* RIGHT — Dashboard preview */}
      <div style={{ padding:"36px 36px 36px 16px", display:"flex", alignItems:"center", justifyContent:"center",
        background:"var(--md-surface-1)", borderLeft:"1px solid var(--md-outline-variant)" }}>
        <div style={{ width:"100%", maxWidth:280 }}>

          {/* Mini nav header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10,
            padding:"8px 12px", background:"var(--md-surface)", borderRadius:"var(--rad-md)",
            border:"1px solid var(--md-outline-variant)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:20, height:20, borderRadius:6, background:"var(--secondary)",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Zap size={11} color="#fff" aria-hidden="true"/>
              </div>
              <span style={{ fontSize:".72rem", fontWeight:800, color:"var(--md-on-surface)", letterSpacing:"-.02em" }}>
                Focus<span style={{ color:"var(--accent)" }}>Flow</span>
              </span>
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"2px 8px",
              borderRadius:"var(--rad-full)", background:"var(--md-tertiary-container)" }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:"var(--md-tertiary)", display:"inline-block" }}/>
              <span className="label-sm" style={{ color:"var(--md-on-tertiary-container)", textTransform:"none" }}>En vivo</span>
            </div>
          </div>

          {/* KPIs mini */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
            {[
              { l:"Tiempo hoy",  v:"5h 23m", color:"var(--secondary)"     },
              { l:"Sesiones",    v:"4 ✓",    color:"var(--md-tertiary)"   },
            ].map((k,i) => (
              <div key={i} className="m3-card ob-mini-card" style={{ padding:"10px 12px" }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:".88rem", fontWeight:700, color:k.color }}>{k.v}</div>
                <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:2 }}>{k.l}</div>
              </div>
            ))}
          </div>

          {/* Balance de Éxito chart */}
          <div className="m3-card ob-mini-card" style={{ padding:"14px 14px 10px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <span className="title-sm">Balance de Éxito</span>
              <span style={{ fontSize:".65rem", fontFamily:"var(--font-mono)", fontWeight:700, color:"var(--md-tertiary)" }}>+12%</span>
            </div>
            {/* Animated bars */}
            <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:60 }}>
              {BAR_DATA.map((b,i) => (
                <div key={i} className="ob-bar"
                  style={{
                    "--h":`${b.h}%`,
                    height:`${b.h}%`,
                    background:b.focus ? "var(--secondary)" : "var(--md-surface-variant)",
                    animationDelay:`${i * .07}s`,
                  }}
                />
              ))}
            </div>
            <div style={{ display:"flex", gap:10, marginTop:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:"var(--secondary)" }}/>
                <span className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Enfoque</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:"var(--md-surface-variant)",
                  border:"1px solid var(--md-outline-variant)" }}/>
                <span className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Descanso</span>
              </div>
            </div>
          </div>

          {/* Daily progress */}
          <div style={{ marginTop:8 }}>
            <div className="m3-progress" style={{ height:6 }}>
              <div className="m3-progress-fill" style={{ width:"67%", background:"linear-gradient(90deg,var(--secondary),var(--accent))" }}/>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
              <span className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Meta: 8h</span>
              <span className="body-sm" style={{ color:"var(--secondary)", fontWeight:700 }}>67% completado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   ONBOARDING FLOW — Orchestrator (3 screens)
════════════════════════════════════════════ */
const OB_COMPLETED_KEY = "ff_onboarding_done_v1";

function OnboardingFlow({ onComplete, userPlan, onOpenPlans }) {
  const [step, setStep]         = useState(0);
  const [exiting, setExiting]   = useState(false);
  const [showOffer, setShowOffer] = useState(false); // paso 4: oferta Pro

  const STEPS = [
    { id:"focus",    component:<OnboardingScreen1/> },
    { id:"wellness", component:<OnboardingScreen2/> },
    { id:"aha",      component:<OnboardingScreen3/> },
  ];

  const goNext = () => {
    if (step < STEPS.length - 1) {
      setExiting(true);
      setTimeout(() => { setStep(s => s + 1); setExiting(false); }, 240);
    } else {
      setShowOffer(true); // antes de entrar, mostrar oferta Pro
    }
  };

  const handleComplete = () => {
    try { localStorage.setItem(OB_COMPLETED_KEY, "1"); } catch(e) {}
    onComplete({ frogTask:"", avatarCalib:{}, audioUrl:"" });
  };

  const LABELS = ["Continuar", "Continuar", "Ver mi espacio"];

  /* ── Oferta Pro post-onboarding ── */
  if (showOffer) {
    return (
      <div style={{ minHeight:"100vh", background:"var(--md-background)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:24, fontFamily:"var(--font-display)" }}>
        <div className="m3-card" style={{ width:"100%", maxWidth:680, padding:0, overflow:"hidden", boxShadow:"var(--md-elev-3)" }}>

          {/* Header oferta */}
          <div style={{ padding:"24px 32px 0", textAlign:"center" }}>
            <div style={{ width:64, height:64, borderRadius:20, background:"var(--md-primary-container)",
              display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
              <Sparkles size={26} style={{ color:"var(--secondary)" }}/>
            </div>
            <div className="headline-sm" style={{ marginBottom:8 }}>
              Antes de empezar — <span style={{ color:"var(--secondary)" }}>7 días gratis</span>
            </div>
            <p className="body-lg" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.7, marginBottom:24, maxWidth:460, margin:"0 auto 24px" }}>
              Desbloquea todo Flow Pro sin ningún compromiso. Cancela en cualquier momento, sin preguntas.
            </p>
          </div>

          {/* Bento features 2x2 */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, padding:"0 32px 24px" }}>
            {[
              { icon:<Zap size={16}/>,           color:"var(--secondary)", title:"Presets Inteligentes",    desc:"Automatiza tu rutina y reduce decisiones diarias." },
              { icon:<TrendingUp size={16}/>,    color:"#2E7D32",          title:"Historial completo",       desc:"Ve tus tendencias y alcanza tu Balance Zen." },
              { icon:<Rocket size={16}/>,        color:"var(--accent)",    title:"Inicio ultra-rápido",      desc:"Retoma donde lo dejaste con un solo clic." },
              { icon:<Heart size={16}/>,         color:"#7B5EA7",          title:"Sin anuncios ni fricciones",desc:"Tu espacio de bienestar, limpio y silencioso." },
            ].map((f,i) => (
              <div key={i} style={{ padding:"14px 16px", borderRadius:"var(--rad-md)",
                background:"var(--md-surface-variant)", border:"1px solid var(--md-outline-variant)",
                display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:34, height:34, borderRadius:10, background:`${f.color}14`,
                  display:"flex", alignItems:"center", justifyContent:"center", color:f.color, flexShrink:0 }}>
                  {f.icon}
                </div>
                <div>
                  <div className="title-sm" style={{ marginBottom:3 }}>{f.title}</div>
                  <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ padding:"0 32px 32px", display:"flex", flexDirection:"column", gap:12 }}>
            <button className="btn-filled" onClick={()=>{ onOpenPlans && onOpenPlans(); }}
              style={{ justifyContent:"center", width:"100%", padding:"14px 0", fontSize:".95rem" }}>
              <Sparkles size={15}/> Empezar 7 días gratis — sin compromiso
            </button>
            <button onClick={handleComplete}
              style={{ background:"none", border:"none", cursor:"pointer", padding:"10px 0",
                fontFamily:"var(--font-display)", fontSize:".875rem", color:"var(--md-on-surface-variant)",
                textAlign:"center", width:"100%" }}>
              Continuar en mi flujo actual
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight:"100vh",
      background:"var(--md-background)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:24, fontFamily:"var(--font-display)",
    }} role="main" aria-label="Bienvenida a FocusFlow">

      {/* Onboarding card — usa m3-card del sistema */}
      <div className="m3-card" style={{
        width:"100%", maxWidth:880,
        padding:0, overflow:"hidden",
        boxShadow:"var(--md-elev-3)",
      }}>

        {/* Top bar */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"18px 24px", borderBottom:"1px solid var(--md-outline-variant)",
          background:"var(--md-surface)",
        }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:"var(--secondary)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 4px 12px rgba(26,35,126,.25)" }}>
              <Zap size={16} color="#fff" aria-hidden="true"/>
            </div>
            <span style={{ fontWeight:800, fontSize:"1rem", letterSpacing:"-.025em", color:"var(--md-on-surface)" }}>
              Focus<span style={{ color:"var(--accent)" }}>Flow</span>
            </span>
          </div>

          {/* Step dots */}
          <div style={{ display:"flex", gap:8, alignItems:"center" }}
            role="tablist" aria-label="Progreso">
            {STEPS.map((_,i) => (
              <div key={i}
                className={`ob-step-dot ${i < step ? "done" : i === step ? "active" : ""}`}
                role="tab" aria-selected={i === step}
                aria-label={`Paso ${i+1} de ${STEPS.length}`}/>
            ))}
          </div>

          {/* Skip */}
          <button className="ob-btn-skip" onClick={handleComplete}
            aria-label="Explorar la app por mi cuenta">
            Ya lo exploraré solo
          </button>
        </div>

        {/* Screen content */}
        <div className={exiting ? "ob-screen exiting" : ""}>
          {STEPS[step].component}
        </div>

        {/* Bottom bar */}
        <div style={{
          display:"flex", alignItems:"center", gap:14,
          padding:"16px 24px", borderTop:"1px solid var(--md-outline-variant)",
          background:"var(--md-surface)",
        }}>
          {/* Linear progress */}
          <div className="m3-progress" style={{ flex:1, height:5 }}>
            <div className="m3-progress-fill" style={{
              width:`${((step + 1) / STEPS.length) * 100}%`,
              transition:"width .4s cubic-bezier(.4,0,.2,1)",
            }} role="progressbar"
              aria-valuenow={step+1} aria-valuemin={1} aria-valuemax={STEPS.length}/>
          </div>

          {/* Counter */}
          <span className="label-sm" style={{ flexShrink:0, fontFamily:"var(--font-mono)" }}>
            {step + 1} / {STEPS.length}
          </span>

          {/* CTA */}
          <button className="btn-filled m3-ripple"
            onClick={goNext}
            style={{ padding:"11px 28px", fontSize:".9rem" }}
            aria-label={step < STEPS.length - 1 ? `Ir al paso ${step + 2}` : "Ver oferta especial"}>
            {LABELS[step]}
            {step < STEPS.length - 1
              ? <ArrowRight size={15} aria-hidden="true"/>
              : <Sparkles size={15} aria-hidden="true"/>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SESSION CONFIG OVERLAY
════════════════════════════════════════════ */
const SOUND_OPTIONS = [
  { value:"bell",    label:"Campana",    emoji:"🔔" },
  { value:"chime",   label:"Campanilla", emoji:"🎵" },
  { value:"gong",    label:"Gong zen",   emoji:"🪘" },
  { value:"birds",   label:"Pájaros",    emoji:"🐦" },
  { value:"none",    label:"Sin sonido", emoji:"🔇" },
];

/* Compact duration row: label + −/+ stepper + value badge */
function DurationRow({ icon, label, sublabel, value, onChange, color, min=5, max=120, step=5 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
      borderRadius:"var(--rad-md)", background:"var(--md-surface)", border:"1px solid var(--md-outline-variant)" }}>
      <div style={{ width:32, height:32, borderRadius:10, background:`${color}18`,
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color }}>
        {icon}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div className="body-md" style={{ fontWeight:700, color, lineHeight:1.2 }}>{label}</div>
        <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.2 }}>{sublabel}</div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
        <button onClick={()=>onChange(Math.max(min, value-step))}
          style={{ width:28, height:28, borderRadius:"50%", border:"1.5px solid var(--md-outline-variant)",
            background:"var(--md-surface-variant)", display:"flex", alignItems:"center", justifyContent:"center",
            cursor:value<=min?"not-allowed":"pointer", fontWeight:700, fontSize:"1rem",
            color:value<=min?"var(--md-outline)":"var(--md-on-surface-variant)",
            transition:"var(--transition-fast)", flexShrink:0 }}
          disabled={value<=min} aria-label={`Reducir ${label}`}>−</button>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:".9rem", fontWeight:700, color,
          minWidth:42, textAlign:"center", background:`${color}12`, padding:"3px 8px",
          borderRadius:"var(--rad-sm)" }}>{value}<span style={{ fontSize:".65rem", fontWeight:500, opacity:.7 }}>m</span></span>
        <button onClick={()=>onChange(Math.min(max, value+step))}
          style={{ width:28, height:28, borderRadius:"50%", border:"1.5px solid var(--md-outline-variant)",
            background:"var(--md-surface-variant)", display:"flex", alignItems:"center", justifyContent:"center",
            cursor:value>=max?"not-allowed":"pointer", fontWeight:700, fontSize:"1rem",
            color:value>=max?"var(--md-outline)":"var(--md-on-surface-variant)",
            transition:"var(--transition-fast)", flexShrink:0 }}
          disabled={value>=max} aria-label={`Aumentar ${label}`}>+</button>
      </div>
    </div>
  );
}

function SessionConfigOverlay({ onClose, onSave, initialDurations, scheduleMode }) {
  const init = initialDurations || { "deep-flow":50, "steady-rhythm":25, "vital-reset":15 };
  const [deepFlow,     setDeepFlow]     = useState(init["deep-flow"]);
  const [steadyRhythm, setSteadyRhythm] = useState(init["steady-rhythm"]);
  const [vitalReset_,  setVitalReset_]  = useState(init["vital-reset"]);
  const [sound,        setSound]        = useState("bell");
  const [saved,        setSaved]        = useState(false);

  const DEFAULTS = { deepFlow:50, steadyRhythm:25, vitalReset:15 };
  const isAuto = scheduleMode === "auto";
  const isDefault = deepFlow===DEFAULTS.deepFlow && steadyRhythm===DEFAULTS.steadyRhythm && vitalReset_===DEFAULTS.vitalReset;

  const handleDefaults = () => { setDeepFlow(50); setSteadyRhythm(25); setVitalReset_(15); };

  const handleSave = () => {
    if (onSave) onSave({ deepFlow, steadyRhythm, vitalReset: vitalReset_, sound });
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 700);
  };

  return (
    <div className="scrim" role="dialog" aria-modal="true" aria-label="Configurar sesión"
      onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="m3-fullscreen-dialog" style={{
        maxWidth:520, width:"94%",
        maxHeight:"92vh",
        padding:0, overflow:"hidden",
        display:"flex", flexDirection:"column",
      }}>

        {/* ── Header ── */}
        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"20px 24px 16px", flexShrink:0 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:"var(--md-primary-container)",
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <SlidersHorizontal size={18} style={{ color:"var(--secondary)" }}/>
          </div>
          <div style={{ flex:1 }}>
            <div className="title-lg">Configurar sesión</div>
            <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Duración y preferencias</div>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Cerrar" style={{ width:36, height:36 }}><X size={15}/></button>
        </div>

        {/* ── Body ── */}
        <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", padding:"0 24px", gap:18, overflow:"hidden" }}>

          {/* Duraciones */}
          <div style={{ flexShrink:0, opacity:isAuto?0.5:1, pointerEvents:isAuto?"none":"auto", transition:"opacity .2s" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <Clock size={13} style={{ color:"var(--secondary)" }}/>
                <span className="title-sm" style={{ fontSize:".82rem" }}>Duración por modo</span>
              </div>
              {isAuto ? (
                <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:".7rem", fontWeight:600,
                  color:"var(--secondary)", background:"var(--md-primary-container)",
                  padding:"3px 10px", borderRadius:"var(--rad-full)" }}>
                  <Repeat size={10}/> Desde la agenda
                </span>
              ) : (
                <button onClick={handleDefaults} disabled={isDefault}
                  style={{ display:"flex", alignItems:"center", gap:4, background:isDefault?"transparent":"var(--md-surface-variant)",
                    border:"none", cursor:isDefault?"default":"pointer", color:isDefault?"var(--md-outline)":"var(--secondary)",
                    fontFamily:"var(--font-display)", fontSize:".72rem", fontWeight:600,
                    padding:"3px 10px", borderRadius:"var(--rad-full)", transition:"var(--transition-fast)" }}
                  aria-label="Restaurar por defecto">
                  <RotateCcw size={10}/> Por defecto (50/25/15)
                </button>
              )}
            </div>
            {isAuto && (
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px",
                background:"var(--md-primary-container)", borderRadius:"var(--rad-md)", marginBottom:8 }}>
                <Repeat size={14} style={{ color:"var(--secondary)", flexShrink:0 }}/>
                <span className="body-sm" style={{ color:"var(--md-on-primary-container)", fontWeight:500 }}>
                  Los tiempos están definidos por los eventos de tu agenda. Cambia a modo Manual para editarlos aquí.
                </span>
              </div>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <DurationRow icon={<Flame size={14}/>}  label="Deep Flow"     sublabel="Máx 120 min · Mín 10 min" value={deepFlow}     onChange={setDeepFlow}     color="#1A237E" min={10} max={120}/>
              <DurationRow icon={<Waves size={14}/>}  label="Steady Rhythm" sublabel="Máx 60 min · Mín 5 min"   value={steadyRhythm} onChange={setSteadyRhythm} color="#FF6D00" min={5}  max={60}/>
              <DurationRow icon={<Leaf  size={14}/>}  label="Vital Reset"   sublabel="Máx 30 min · Mín 5 min"   value={vitalReset_}  onChange={setVitalReset_}  color="#2E7D32" min={5}  max={30}/>
            </div>
          </div>

          {/* Sonido al finalizar */}
          <div style={{ flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
              <Volume2 size={13} style={{ color:"var(--secondary)" }}/>
              <span className="title-sm" style={{ fontSize:".82rem" }}>Sonido al finalizar</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {SOUND_OPTIONS.map(opt=>(
                <button key={opt.value} onClick={()=>setSound(opt.value)}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px",
                    borderRadius:"var(--rad-sm)", border:`1.5px solid ${sound===opt.value?"var(--secondary)":"var(--md-outline-variant)"}`,
                    background:sound===opt.value?"var(--md-primary-container)":"var(--md-surface)",
                    cursor:"pointer", transition:"all .15s", fontFamily:"var(--font-display)", width:"100%", textAlign:"left" }}
                  aria-pressed={sound===opt.value}>
                  <span style={{ fontSize:"1rem", flexShrink:0 }}>{opt.emoji}</span>
                  <span style={{ fontSize:".8rem", fontWeight:600,
                    color:sound===opt.value?"var(--secondary)":"var(--md-on-surface-variant)" }}>{opt.label}</span>
                  {sound===opt.value && <Check size={12} style={{ color:"var(--secondary)", marginLeft:"auto", flexShrink:0 }}/>}
                </button>
              ))}
            </div>
          </div>

          {/* Sensor de postura */}
          <div style={{ flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
              <Camera size={13} style={{ color:"var(--secondary)" }}/>
              <span className="title-sm" style={{ fontSize:".82rem" }}>Sensor de postura</span>
            </div>
            <div style={{ padding:"14px 16px", background:"var(--md-surface-variant)",
              borderRadius:"var(--rad-md)", border:"1px solid var(--md-outline-variant)",
              display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 10px",
                borderRadius:99, background:"#E8F5E9", alignSelf:"flex-start" }}>
                <Shield size={11} style={{ color:"#2E7D32", flexShrink:0 }}/>
                <span style={{ fontSize:".72rem", fontWeight:600, color:"#2E7D32" }}>Procesamiento local</span>
              </div>
              <p className="body-sm" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.6 }}>
                El análisis de postura se realiza íntegramente en tu dispositivo. Ninguna imagen o dato biométrico se envía a servidores externos.
              </p>
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div style={{ padding:"14px 24px 20px", flexShrink:0, display:"flex", gap:10 }}>
          <button className="btn-outlined" onClick={onClose} style={{ padding:"0 18px", minHeight:44 }}>Cancelar</button>
          <button className="btn-filled" onClick={handleSave}
            style={{ flex:1, justifyContent:"center", minHeight:44,
              background:saved?"#2E7D32":undefined, transition:"background .3s" }}>
            {saved ? <><Check size={14}/>¡Guardado!</> : <><Check size={14}/>Guardar cambios</>}
          </button>
        </div>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   CONTROL ISLAND — Timer + controles agrupados (Fitts's Law)
════════════════════════════════════════════ */
function ControlIsland({ seconds, total, running, onToggle, onReset, mode, lockedByConc,
  onConfirmStop, audioHub, onPlaylistOpen, onCfgOpen, sessionMode, presets, quickStart, switchMode }) {
  const r=88, cx=108, cy=108;
  const circ=2*Math.PI*r;
  const offset=circ*(1-seconds/total);
  const mins=String(Math.floor(seconds/60)).padStart(2,"0");
  const secs_=String(seconds%60).padStart(2,"0");
  const stroke=lockedByConc?"#90A4AE":mode.color;

  const handleToggle = () => {
    if (running) onConfirmStop();
    else onToggle();
  };

  return (
    <div className={`control-island${running?" running":""}`}
      style={{ "--session-color":mode.color }}>

      {/* Corner config buttons */}
      <div style={{ position:"absolute", top:14, right:14, display:"flex", gap:4 }}>
        <button className="btn-icon" onClick={onPlaylistOpen}
          style={{ width:36,height:36,
            background:audioHub.enabled?"var(--accent-muted)":"transparent",
            color:audioHub.enabled?"var(--accent)":"var(--md-on-surface-variant)" }}
          aria-label="Configurar playlists de audio" title="Playlists">
          <Music size={14} aria-hidden="true"/>
        </button>
        <button className="btn-icon" onClick={onCfgOpen} style={{ width:36, height:36 }}
          aria-label="Configurar parámetros de sesión" title="Configurar sesión">
          <SlidersHorizontal size={14} aria-hidden="true"/>
        </button>
      </div>

      {/* SVG Ring Timer */}
      <div style={{ position:"relative", width:216, height:216,
        opacity:lockedByConc?.45:1, transition:"opacity .4s",
        filter:lockedByConc?"grayscale(.7)":"none" }}>
        <svg width={216} height={216} viewBox="0 0 216 216"
          role="timer" aria-label={`Temporizador: ${mins} minutos ${secs_} segundos restantes`}>
          <circle cx={cx} cy={cy} r={r+6} fill={mode.bg} opacity=".6"/>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--md-outline-variant)" strokeWidth={9}/>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth={9}
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
            className="timer-ring" aria-hidden="true"/>
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", gap:4 }}>
          {lockedByConc ? (
            <><span style={{ fontSize:"1.8rem" }} aria-hidden="true">⏸</span>
              <span className="label-sm" style={{ color:"#888" }}>Suspendido</span></>
          ) : (
            <>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"2.5rem", fontWeight:500,
                color:mode.color, lineHeight:1, letterSpacing:"-.02em" }}
                aria-live="off">{mins}:{secs_}</span>
              <span className="label-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:2 }}>
                {running?"En curso":seconds===total?mode.label:"Pausado"}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ISLA DE CONTROLES AGRUPADOS — cerca del timer (Fitts's Law) */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, width:"100%", marginTop:14 }}>

        {/* Botón principal: Iniciar (filled) / Detener (outlined) — semántica diferenciada */}
        {running ? (
          <button className="btn-session-stop" onClick={handleToggle} disabled={lockedByConc}
            aria-label={`Detener sesión ${mode.label} en curso`}>
            <Pause size={16} aria-hidden="true"/> Detener sesión
          </button>
        ) : (
          <button className="btn-session-start" onClick={handleToggle} disabled={lockedByConc}
            style={{ "--session-color":mode.color }}
            aria-label={`Iniciar sesión ${mode.label}`}>
            <Play size={16} aria-hidden="true"/> Iniciar sesión
          </button>
        )}

        {/* Mini controles secundarios: reset + audio + playlist */}
        <div className="timer-mini-controls">
          <button className="timer-mini-btn" onClick={onReset}
            aria-label="Reiniciar temporizador" title="Reiniciar">
            <RotateCcw size={13} aria-hidden="true"/>
          </button>
          <button className={`timer-mini-btn ${audioHub.enabled?"active":""}`}
            onClick={()=>audioHub.setEnabled(e=>!e)}
            aria-label={audioHub.enabled?"Silenciar audio":"Activar audio"}
            aria-pressed={audioHub.enabled}
            title={audioHub.enabled?"Audio activo":"Audio inactivo"}>
            <Volume2 size={13} aria-hidden="true"/>
          </button>
          <button className="timer-mini-btn" onClick={onPlaylistOpen}
            aria-label="Abrir lista de reproducción" title="Lista de reproducción">
            <Music size={13} aria-hidden="true"/>
          </button>
        </div>

        {/* Presets de sesión rápida */}
        {!running && presets && (
          <div style={{ width:"100%", marginTop:8, borderTop:"1px solid var(--md-outline-variant)", paddingTop:12 }}>
            <div className="label-md" style={{ color:"var(--md-on-surface-variant)", marginBottom:8, textAlign:"center" }}>Presets rápidos</div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {presets.suggested.map(p => {
                const m = SESSION_MODES.find(x=>x.id===p.modeId) || SESSION_MODES[0];
                return (
                  <button key={p.id}
                    onClick={()=>presets.usePreset(p, quickStart, switchMode)}
                    style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px",
                      borderRadius:"var(--rad-full)", border:`1.5px solid ${p.color}30`,
                      background:`${p.color}0A`, cursor:"pointer", transition:"var(--transition-fast)",
                      fontFamily:"var(--font-display)", fontSize:".78rem", fontWeight:600, color:p.color,
                      minHeight:34, width:"100%", justifyContent:"space-between" }}
                    onMouseEnter={e=>{e.currentTarget.style.background=`${p.color}18`; e.currentTarget.style.borderColor=p.color;}}
                    onMouseLeave={e=>{e.currentTarget.style.background=`${p.color}0A`; e.currentTarget.style.borderColor=`${p.color}30`;}}
                    aria-label={`Iniciar preset: ${p.label}`}>
                    <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:".85rem" }}>{m.icon}</span>
                      {p.label}
                    </span>
                    <span style={{ fontSize:".68rem", background:`${p.color}20`, padding:"1px 7px", borderRadius:99 }}>{p.duration}m</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MODE SELECTOR
════════════════════════════════════════════ */
function ModeSelector({ selected, onChange }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      <div className="label-md" style={{ color:"var(--md-on-surface-variant)", marginBottom:4 }}>Modo de sesión</div>
      {SESSION_MODES.map(m=>(
        <Ripple key={m.id} onClick={()=>onChange(m)}
          style={{ padding:"12px 14px", borderRadius:"var(--rad-md)",
            border:`1.5px solid ${selected.id===m.id?m.color:"var(--md-outline-variant)"}`,
            background:selected.id===m.id?m.bg:"transparent", cursor:"pointer", transition:"all .2s",
            display:"flex", alignItems:"center", gap:12 }}
          role="radio" aria-checked={selected.id===m.id} tabIndex={0}
          onKeyDown={e=>e.key===" "&&onChange(m)}>
          <div style={{ width:36, height:36, borderRadius:10,
            background:selected.id===m.id?`${m.color}20`:"var(--md-surface-variant)",
            display:"flex", alignItems:"center", justifyContent:"center", color:selected.id===m.id?m.color:"var(--md-on-surface-variant)", transition:"all .2s" }}>
            {m.icon}
          </div>
          <div style={{ flex:1 }}>
            <div className="title-sm" style={{ color:selected.id===m.id?m.color:"var(--md-on-surface)" }}>{m.label}</div>
            <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>{m.desc}</div>
          </div>
          {selected.id===m.id && (
            <div style={{ width:20, height:20, borderRadius:"50%", background:m.color, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Check size={11} color="#fff" strokeWidth={3}/>
            </div>
          )}
        </Ripple>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   PRODUCTIVITY CHART
════════════════════════════════════════════ */
const BAR_W=9;
function ProdChart({ bars, active, lockedByConc }) {
  const wrapRef=useRef(null);
  const [count, setCount]=useState(80);
  const frozenRef=useRef(null);
  useEffect(()=>{
    const el=wrapRef.current; if(!el)return;
    const measure=()=>{ const w=el.getBoundingClientRect().width; if(w>0) setCount(Math.max(10,Math.floor(w/BAR_W))); };
    measure();
    const ro=new ResizeObserver(measure); ro.observe(el);
    return()=>ro.disconnect();
  },[]);
  const liveSlice=bars.slice(-count);
  if(active) frozenRef.current=liveSlice;
  const visible=active?liveSlice:(frozenRef.current||liveSlice);
  const maxBar=Math.max(...visible,1);
  const last=visible[visible.length-1]||0;
  return (
    <div style={{ position:"relative" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <Keyboard size={13} style={{ color:active?"var(--secondary)":"var(--md-outline)" }}/>
          <span className="body-sm" style={{ color:active?"var(--md-on-surface-variant)":"var(--md-outline)", fontWeight:600 }}>Actividad teclado / ratón</span>
        </div>
        <span style={{ fontFamily:"var(--font-mono)", fontSize:".68rem", fontWeight:700, color:lockedByConc?"#ca8a04":active?"var(--secondary)":"var(--md-outline)" }}>
          {lockedByConc?"— En pausa":active?"● Activo":"○ Listo cuando quieras"}
        </span>
      </div>
      <div style={{ position:"relative" }}>
        <div ref={wrapRef} style={{ width:"100%", height:88, display:"flex", gap:"2px", alignItems:"flex-end", overflow:"hidden",
          filter:!active?"grayscale(1) opacity(.22)":"none", transition:"filter .4s" }}>
          {visible.map((h,i)=>(
            <div key={i} style={{ flex:"1 1 0", minWidth:0, height:`${(h/maxBar)*84}px`, borderRadius:"3px 3px 0 0",
              background:!active?"#90A4AE":`linear-gradient(to top,${lockedByConc?"#90A4AE":"var(--secondary)"},${lockedByConc?"#CFD8DC":"#5C6BC0"})`,
              opacity:!active?.6:.3+(i/visible.length)*.7, transition:"height .3s ease" }}/>
          ))}
        </div>
        {!active && (
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6, pointerEvents:"none" }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,.95)", border:"1.5px solid var(--md-outline-variant)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Keyboard size={16} style={{ color:"var(--md-outline)" }}/>
            </div>
            <span style={{ fontSize:".72rem", fontWeight:700, color:lockedByConc?"#ca8a04":"var(--md-on-surface-variant)", background:"rgba(255,255,255,.92)", padding:"3px 10px", borderRadius:99, border:`1px solid ${lockedByConc?"rgba(202,138,4,.2)":"var(--md-outline-variant)"}` }}>
              {lockedByConc?"⏸ Funciones secundarias pausadas":"Comienza una sesión para ver tu actividad aquí"}
            </span>
          </div>
        )}
      </div>
      <div style={{ display:"flex", gap:20, marginTop:10, fontSize:".73rem", color:!active?"var(--md-outline)":"var(--md-on-surface-variant)", transition:"color .4s" }}>
        <span>Pulsaciones: <strong style={{ color:!active?"var(--md-outline)":"var(--secondary)", fontFamily:"var(--font-mono)" }}>{!active?"—":`${Math.round(last*4)}/min`}</strong></span>
        <span>Clics: <strong style={{ color:!active?"var(--md-outline)":"var(--accent)", fontFamily:"var(--font-mono)" }}>{!active?"—":`${Math.round(last*1.2)}/min`}</strong></span>
        <span>Eficiencia: <strong style={{ color:!active?"var(--md-outline)":"#2E7D32", fontFamily:"var(--font-mono)" }}>{!active?"—":`${Math.min(99,Math.round(last))}%`}</strong></span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   UNDO TOAST
════════════════════════════════════════════ */
function UndoToast({ task, onUndo, onDismiss, bottomPx=24 }) {
  const [p, setP]=useState(100);
  useEffect(()=>{
    const s=Date.now(), total=5000;
    const iv=setInterval(()=>{ const pct=Math.max(0,100-((Date.now()-s)/total)*100); setP(pct); if(pct<=0){clearInterval(iv);onDismiss();} },50);
    return()=>clearInterval(iv);
  },[]);
  return (
    <div className="undo-toast" style={{ bottom:bottomPx }} role="status" aria-live="polite">
      <CheckCircle2 size={16} style={{ color:"#66BB6A", flexShrink:0 }}/>
      <span style={{ flex:1 }}>Completada: <strong>{task}</strong></span>
      <button onClick={onUndo} style={{ background:"rgba(255,255,255,.12)", border:"none", borderRadius:8, color:"#66BB6A", padding:"5px 12px", cursor:"pointer", fontSize:".8rem", fontFamily:"var(--font-display)", fontWeight:600 }} aria-label="Deshacer">
        <RotateCcw size={12} style={{ display:"inline", marginRight:5 }}/>Deshacer ({Math.ceil(p/20)}s)
      </button>
      <div style={{ position:"absolute", bottom:0, left:0, height:3, background:"#66BB6A", borderRadius:"0 0 12px 12px", width:`${p}%`, transition:"width .05s linear" }}/>
    </div>
  );
}

/* ════════════════════════════════════════════
   HYDRATION SNACKBAR TOAST
════════════════════════════════════════════ */
/* ── Auto-next task snackbar ── */
function AutoNextSnackbar({ taskLabel, modeId, onConfirm, onSkip, bottomPx=24 }) {
  const m = SESSION_MODES.find(x => x.id === modeId) || SESSION_MODES[0];
  return (
    <div className="snackbar" style={{ bottom: bottomPx, maxWidth:480, whiteSpace:"normal", gap:12 }}
      role="alert" aria-live="assertive">
      <div style={{ display:"flex", alignItems:"center", gap:8, flex:1 }}>
        <span style={{ fontSize:"1rem", flexShrink:0 }}>{m.icon}</span>
        <div>
          <div style={{ fontWeight:700, fontSize:".82rem", marginBottom:2 }}>Sesión completada 🎉</div>
          <div style={{ fontSize:".75rem", color:"rgba(255,255,255,.75)" }}>
            Siguiente: <strong style={{ color:"#fff" }}>{taskLabel}</strong> · {m.label}
          </div>
        </div>
      </div>
      <button onClick={onConfirm}
        style={{ background:`${m.color}`, border:"none", borderRadius:99, color:"#fff",
          padding:"5px 14px", cursor:"pointer", fontSize:".75rem", fontWeight:700,
          fontFamily:"var(--font-display)", whiteSpace:"nowrap" }}>
        Empezar
      </button>
      <button onClick={onSkip}
        style={{ background:"rgba(255,255,255,.15)", border:"none", borderRadius:99, color:"#fff",
          padding:"5px 12px", cursor:"pointer", fontSize:".75rem", fontFamily:"var(--font-display)" }}>
        Ahora no
      </button>
    </div>
  );
}

function HydrationSnackbar({ onDrink, onDismiss, bottomPx=24 }) {
  return (
    <div className="snackbar" style={{ bottom:bottomPx }} role="alert" aria-live="assertive">
      <Droplets size={16} style={{ color:"#66BB6A", flexShrink:0 }}/>
      <span>Llevas un rato sin agua 💧 ¿Un vaso?</span>
      <button onClick={onDrink} style={{ background:"none", border:"none", color:"#66BB6A", fontWeight:700, cursor:"pointer", fontFamily:"var(--font-display)", fontSize:".875rem" }} aria-label="Registrar vaso de agua">Lo hice</button>
      <button onClick={onDismiss} style={{ background:"none", border:"none", color:"#888", cursor:"pointer" }} aria-label="Cerrar notificación"><X size={14}/></button>
    </div>
  );
}

/* ════════════════════════════════════════════
   STOP SESSION CONFIRM DIALOG
════════════════════════════════════════════ */
function StopSessionDialog({ onConfirm, onCancel }) {
  return (
    <div className="scrim" role="alertdialog" aria-modal="true" aria-label="Confirmar detención de sesión" aria-describedby="stop-dialog-desc">
      <div className="m3-dialog">
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
          <div style={{ width:44, height:44, borderRadius:14, background:"var(--md-tertiary-container)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <Shield size={20} style={{ color:"var(--md-tertiary)" }} aria-hidden="true"/>
          </div>
          <div>
            <div className="title-lg">Tu progreso ya está a salvo</div>
            <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Todo lo logrado hasta ahora queda guardado</div>
          </div>
        </div>
        <div id="stop-dialog-desc" style={{ background:"var(--md-tertiary-container)", borderRadius:"var(--rad-md)", padding:"14px 16px", marginBottom:20 }}>
          <p className="body-sm" style={{ color:"var(--md-on-tertiary-container)", lineHeight:1.7, fontWeight:500 }}>
            Puedes parar ahora y <strong>recuperar energía sin perder lo logrado</strong>. Descansar no es retroceder — es parte del ritmo que te mantiene constante.
          </p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-filled" onClick={onCancel} style={{ flex:1, justifyContent:"center" }} autoFocus aria-label="Continuar con la sesión activa">
            <Play size={14} aria-hidden="true"/> Continuar sesión
          </button>
          <button className="btn-outlined" onClick={onConfirm} style={{ flex:1, justifyContent:"center" }} aria-label="Parar y descansar">
            <Leaf size={14} aria-hidden="true"/> Parar y recuperar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   RESTORE SESSION MODAL (Pilar 1 + 7)
   "¿Continuar con tu última sesión?"
════════════════════════════════════════════ */
function RestoreSessionModal({ saved, onRestore, onDismiss }) {
  const m = SESSION_MODES.find(x => x.id === saved.modeId) || SESSION_MODES[0];
  const mins = Math.floor(saved.secs / 60);
  const secsLeft = saved.secs % 60;
  return (
    <div className="scrim" role="dialog" aria-modal="true" aria-label="Continuar sesión anterior"
      style={{ zIndex:3000 }}>
      <div className="m3-card fi" style={{ width:"100%", maxWidth:400, margin:16, padding:28 }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:18 }}>
          <div style={{ width:50, height:50, borderRadius:16, background:m.color+"18", border:`1.5px solid ${m.color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem" }}>
            {m.icon}
          </div>
          <div>
            <div className="title-lg">¿Seguimos donde lo dejaste?</div>
            <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Tienes una sesión guardada esperándote</div>
          </div>
        </div>
        <div style={{ background:"var(--md-surface-variant)", borderRadius:"var(--rad-md)", padding:"14px 16px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Modo · {m.label}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"1.6rem", fontWeight:500, color:m.color, marginTop:2 }}>
              {String(mins).padStart(2,"0")}:{String(secsLeft).padStart(2,"0")}
            </div>
            <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>tiempo restante</div>
          </div>
          <div style={{ width:56, height:56, borderRadius:"50%", background:`conic-gradient(${m.color} ${(1 - saved.secs/(m.duration*60))*360}deg, var(--md-outline-variant) 0)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:42, height:42, borderRadius:"50%", background:"var(--md-surface-variant)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:".75rem", fontWeight:700, color:m.color }}>
                {Math.round((1 - saved.secs/(m.duration*60))*100)}%
              </span>
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-session-start" onClick={onRestore} style={{ flex:1, "--session-color":m.color }} autoFocus
            aria-label="Retomar sesión guardada">
            <Play size={15} aria-hidden="true"/> Continuar
          </button>
          <button className="btn-outlined" onClick={onDismiss} style={{ padding:"0 18px" }} aria-label="Empezar una sesión nueva">
            Comenzar de cero
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SESSION COMPLETE MODAL (Pilar 6 + Behavioral Design)
   Confirmation Bias + Pre-commitment (Thaler & Sunstein)
════════════════════════════════════════════ */
// Identity profiles based on session usage patterns
const IDENTITY_PROFILES = [
  { id:"builder",   label:"Constructor Constante",  desc:"Mantienes el ritmo incluso cuando no apetece. Eso es lo que separa el progreso real del ocasional.", emoji:"🏗️", color:"#1A237E" },
  { id:"explorer",  label:"Explorador Profundo",     desc:"Tu mente busca la profundidad. Las sesiones largas son tu territorio natural.", emoji:"🔭", color:"#7B5EA7" },
  { id:"strategist",label:"Estratega Calmado",       desc:"Planificas antes de actuar. Tu ritmo de pausas optimiza tu rendimiento sin que lo notes.", emoji:"♟️", color:"#2E7D32" },
  { id:"sprinter",  label:"Velocista Enfocado",      desc:"Intensidad breve, impacto grande. Dominas el arte de entrar y salir en el momento exacto.", emoji:"⚡", color:"#FF6D00" },
];

function SessionCompleteModal({ mode, onClose, onStartNext, yesterdayMins = 142 }) {
  const [confettiT, setConfettiT] = useState(1);
  const [committed, setCommitted] = useState(false);
  useEffect(() => { setConfettiT(2); }, []);
  const todayMins = Math.floor(mode.duration * 1.08);
  const delta = todayMins - yesterdayMins;

  // Pick identity based on mode
  const profile = mode.id === "deep-flow"
    ? IDENTITY_PROFILES[1]
    : mode.id === "vital-reset"
    ? IDENTITY_PROFILES[2]
    : IDENTITY_PROFILES[0];

  return (
    <div className="scrim" role="alertdialog" aria-modal="true" aria-label="Sesión completada" style={{ zIndex:2500 }}>
      <ConfettiCanvas trigger={confettiT}/>
      <div className="m3-card fi" style={{ width:"100%", maxWidth:440, margin:16, padding:32, textAlign:"center", overflow:"visible" }}>

        {/* Trophy ring */}
        <div style={{ width:80, height:80, borderRadius:"50%", background:`${mode.color}18`, border:`3px solid ${mode.color}`,
          display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px",
          boxShadow:`0 0 0 8px ${mode.color}18, 0 0 0 16px ${mode.color}08` }}>
          <Trophy size={32} style={{ color:mode.color }} aria-hidden="true"/>
        </div>

        <div className="headline-sm" style={{ marginBottom:6 }}>¡Sesión completada! 🎉</div>

        {/* Confirmation Bias: identity reinforcement */}
        <div style={{ background:`${profile.color}0E`, border:`1.5px solid ${profile.color}30`,
          borderRadius:"var(--rad-md)", padding:"14px 18px", marginBottom:20, textAlign:"left" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
            <span style={{ fontSize:"1.4rem" }}>{profile.emoji}</span>
            <div>
              <div className="label-sm" style={{ color:profile.color }}>Tu estilo de trabajo</div>
              <div className="title-sm" style={{ color:profile.color }}>{profile.label}</div>
            </div>
          </div>
          <p className="body-sm" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.65 }}>
            {profile.desc}
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display:"flex", gap:12, marginBottom:20, justifyContent:"center" }}>
          {[
            { label:"Duración",          v:`${mode.duration} min`, color:mode.color },
            { label:"vs ayer",           v:`+${Math.abs(delta)} min`, color:"#2E7D32" },
            { label:"Días seguidos",     v:"13 🔥", color:"var(--accent)" },
          ].map((s,i) => (
            <div key={i} style={{ flex:1, background:"var(--md-surface-variant)", borderRadius:"var(--rad-md)", padding:"10px 8px" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontWeight:600, color:s.color, fontSize:".85rem" }}>{s.v}</div>
              <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom:20 }}>
          <div className="daily-progress-bar" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
            <div className="daily-progress-fill" style={{ width:"100%", background:`linear-gradient(90deg,${mode.color},var(--accent))` }}/>
          </div>
          <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:6 }}>Sesión al 100% — bien hecho</div>
        </div>

        {/* Pre-commitment: reserve tomorrow's Deep Flow */}
        {!committed ? (
          <div style={{ background:"var(--md-primary-container)", borderRadius:"var(--rad-md)", padding:"14px 16px", marginBottom:16, textAlign:"left" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <CalendarCheck size={15} style={{ color:"var(--secondary)", flexShrink:0 }}/>
              <span className="title-sm" style={{ color:"var(--secondary)" }}>¿Reservas tu próximo Deep Flow?</span>
            </div>
            <p className="body-sm" style={{ color:"var(--md-on-surface-variant)", marginBottom:10, lineHeight:1.6 }}>
              No pienses mañana — te avisamos a las 9:00 AM con tu sesión ya configurada.
            </p>
            <button onClick={()=>setCommitted(true)}
              style={{ width:"100%", padding:"9px 0", borderRadius:"var(--rad-full)",
                background:"var(--secondary)", color:"#fff", border:"none", cursor:"pointer",
                fontFamily:"var(--font-display)", fontWeight:700, fontSize:".82rem",
                display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
              <Bell size={13}/> Sí, avísame a las 9:00 AM
            </button>
          </div>
        ) : (
          <div style={{ background:"var(--md-tertiary-container)", borderRadius:"var(--rad-md)", padding:"12px 16px", marginBottom:16,
            display:"flex", alignItems:"center", gap:10 }}>
            <CheckCircle2 size={16} style={{ color:"var(--md-tertiary)", flexShrink:0 }}/>
            <span className="body-sm" style={{ color:"var(--md-on-tertiary-container)", fontWeight:600 }}>
              ¡Perfecto! Mañana a las 9:00 AM tienes tu Deep Flow reservado.
            </span>
          </div>
        )}

        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-session-start" onClick={onStartNext}
            style={{ flex:1, "--session-color":mode.color }} aria-label="Iniciar otra sesión">
            <Play size={14} aria-hidden="true"/> Seguir
          </button>
          <button className="btn-outlined" onClick={onClose} style={{ padding:"0 18px" }} aria-label="Ver mi progreso">
            Ver avance
          </button>
        </div>
      </div>
    </div>
  );
}
function LoginScreen({ onLogin }) {
  const [email, setEmail]=useState(""); const [pass, setPass]=useState("");
  const [loading, setLoading]=useState(false);

  // Decide whether to show onboarding or go straight to dashboard
  const handleAuth = (method) => {
    setLoading(true);
    setTimeout(() => {
      try {
        const done = localStorage.getItem(OB_COMPLETED_KEY);
        // First-time user → onboarding; returning user → panel
        onLogin(done ? "panel" : "onboarding");
      } catch(e) {
        onLogin("onboarding");
      }
    }, 480); // brief loading feel
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24, background:"var(--md-background)" }}>
      <div className="m3-card fi" style={{ width:"100%", maxWidth:400, padding:40 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:60, height:60, borderRadius:20, background:"var(--secondary)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", boxShadow:"0 8px 24px rgba(26,35,126,.25)" }}>
            <Zap size={28} color="#fff"/>
          </div>
          <div className="headline-sm" style={{ letterSpacing:"-.02em" }}>Focus<span style={{ color:"var(--accent)" }}>Flow</span></div>
          <p className="body-md" style={{ color:"var(--md-on-surface-variant)", marginTop:4 }}>Tu espacio para trabajar mejor, sin agotarte</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <label className="label-md" style={{ color:"var(--md-on-surface-variant)", display:"block", marginBottom:8 }} htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" placeholder="tu@correo.com" className="m3-input" value={email} onChange={e=>setEmail(e.target.value)} aria-label="Correo electrónico" disabled={loading}/>
          </div>
          <div>
            <label className="label-md" style={{ color:"var(--md-on-surface-variant)", display:"block", marginBottom:8 }} htmlFor="pass">Contraseña</label>
            <input id="pass" type="password" placeholder="••••••••" className="m3-input" value={pass} onChange={e=>setPass(e.target.value)} aria-label="Contraseña" disabled={loading}
              onKeyDown={e=>e.key==="Enter"&&handleAuth("email")}/>
          </div>
          <button className="btn-filled m3-ripple"
            onClick={()=>handleAuth("email")}
            disabled={loading}
            style={{ width:"100%", justifyContent:"center", padding:"13px", marginTop:4, opacity:loading?.7:1 }}
            aria-label="Iniciar sesión con correo y contraseña"
            aria-busy={loading}>
            {loading ? "Entrando…" : <><span>Entrar</span><ArrowRight size={15}/></>}
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ flex:1, height:1, background:"var(--md-outline-variant)" }}/>
            <span className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>o</span>
            <div style={{ flex:1, height:1, background:"var(--md-outline-variant)" }}/>
          </div>
          <button
            onClick={()=>handleAuth("google")}
            disabled={loading}
            style={{ width:"100%", background:"var(--md-surface)", border:"1px solid var(--md-outline-variant)", borderRadius:"var(--rad-full)", padding:"12px", fontFamily:"var(--font-display)", fontSize:".875rem", fontWeight:600, color:"var(--md-on-surface)", cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, transition:"var(--transition-fast)", opacity:loading?.7:1 }}
            aria-label="Continuar con Google">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/></svg>
            Continuar con Google
          </button>
        </div>
        <div className="m3-divider"/>
        <p style={{ textAlign:"center", fontSize:".75rem", color:"var(--md-on-surface-variant)" }}>
          Al continuar aceptas los <a href="#" style={{ color:"var(--secondary)", textDecoration:"none", fontWeight:600 }}>Términos</a> y <a href="#" style={{ color:"var(--secondary)", textDecoration:"none", fontWeight:600 }}>Privacidad</a>
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MINI PLAYER — reproductor compacto bajo el timer
════════════════════════════════════════════ */
const DEMO_TRACKS = [
  { id:1,  emoji:"🌊", title:"Ocean Rain",          artist:"Ambient Dreams",      dur:"4:32" },
  { id:2,  emoji:"🌲", title:"Forest Frequencies",  artist:"Nature Sounds Co.",   dur:"5:18" },
  { id:3,  emoji:"🎹", title:"Piano Focus",          artist:"Study Waves",         dur:"3:55" },
  { id:4,  emoji:"🌌", title:"Cosmic Flow",          artist:"Deep Work Radio",     dur:"6:02" },
  { id:5,  emoji:"☁️", title:"Cloud Nine",           artist:"Lofi Collective",     dur:"4:47" },
  { id:6,  emoji:"🔮", title:"Crystal Clear",        artist:"Mind Space",          dur:"5:30" },
  { id:7,  emoji:"🌙", title:"Midnight Session",     artist:"Night Owl Beats",     dur:"4:15" },
  { id:8,  emoji:"🎸", title:"Acoustic Mornings",    artist:"Indie Focus",         dur:"3:40" },
  { id:9,  emoji:"🧘", title:"Zen Garden",           artist:"Calm Frequency",      dur:"7:11" },
  { id:10, emoji:"⚡", title:"Electric Dreams",      artist:"Synthwave Study",     dur:"5:55" },
];

function MiniPlayer({ audioHub }) {
  const [playing, setPlaying]     = useState(false);
  const [trackIdx, setTrackIdx]   = useState(0);
  const [queueOpen, setQueueOpen] = useState(false);

  const track = DEMO_TRACKS[trackIdx];
  const prev  = () => setTrackIdx(i => (i - 1 + DEMO_TRACKS.length) % DEMO_TRACKS.length);
  const next  = () => setTrackIdx(i => (i + 1) % DEMO_TRACKS.length);

  return (
    <>
      {/* Modal de cola — centrado en pantalla como SessionCompleteModal */}
      {queueOpen && (
        <div className="scrim" role="dialog" aria-modal="true" aria-label="Cola de reproducción"
          onClick={()=>setQueueOpen(false)}>
          <div className="m3-card fi" onClick={e=>e.stopPropagation()}
            style={{ width:"100%", maxWidth:400, margin:16, padding:0, overflow:"hidden",
              boxShadow:"var(--md-elev-3)" }}>

            {/* Header */}
            <div style={{ padding:"20px 20px 14px", borderBottom:"1px solid var(--md-outline-variant)",
              display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:12, background:"var(--md-primary-container)",
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <ListMusic size={18} style={{ color:"var(--secondary)" }}/>
              </div>
              <div style={{ flex:1 }}>
                <div className="title-md">Cola de reproducción</div>
                <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>
                  {DEMO_TRACKS.length} canciones · reproducción automática
                </div>
              </div>
              <button className="btn-icon" onClick={()=>setQueueOpen(false)} aria-label="Cerrar">
                <X size={15}/>
              </button>
            </div>

            {/* Pista activa destacada */}
            <div style={{ padding:"12px 20px", background:"var(--md-surface-1)",
              borderBottom:"1px solid var(--md-outline-variant)",
              display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ fontSize:"1.4rem" }}>{track.emoji}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div className="label-sm" style={{ color:"var(--secondary)", marginBottom:2 }}>
                  {playing ? "▶ Reproduciendo ahora" : "En pausa"}
                </div>
                <div className="title-sm" style={{ color:"var(--md-on-surface)",
                  whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                  {track.title}
                </div>
                <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>{track.artist}</div>
              </div>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:".72rem",
                color:"var(--md-on-surface-variant)", flexShrink:0 }}>{track.dur}</span>
            </div>

            {/* Lista de canciones */}
            <div style={{ maxHeight:320, overflowY:"auto" }}>
              {DEMO_TRACKS.map((t, i) => (
                <button key={t.id}
                  className={`queue-track ${i===trackIdx?"playing":""}`}
                  onClick={()=>{ setTrackIdx(i); setPlaying(true); setQueueOpen(false); }}>
                  <div className="queue-track-num">
                    {i===trackIdx && playing
                      ? <span style={{ color:"var(--secondary)", fontSize:".7rem" }}>▶</span>
                      : <span style={{ color:"var(--md-on-surface-variant)" }}>{i+1}</span>}
                  </div>
                  <div className="queue-track-thumb"
                    style={{ background: i===trackIdx ? "var(--md-primary-container)" : "var(--md-surface-variant)" }}>
                    {t.emoji}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div className="body-md" style={{ fontWeight:600, fontSize:".82rem",
                      color: i===trackIdx ? "var(--secondary)" : "var(--md-on-surface)",
                      whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {t.title}
                    </div>
                    <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", fontSize:".72rem" }}>
                      {t.artist}
                    </div>
                  </div>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:".68rem",
                    color:"var(--md-on-surface-variant)", flexShrink:0 }}>{t.dur}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Controles del reproductor */}
      <div style={{ width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>

        {/* Fila de botones — simétrica: [Audio] [◀] [▶Play] [▶] [Lista] */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>

          {/* Audio toggle */}
          <button className={`mp-btn ${audioHub.enabled?"active":""}`}
            onClick={()=>audioHub.setEnabled(e=>!e)}
            aria-label={audioHub.enabled?"Silenciar audio":"Activar audio"}
            aria-pressed={audioHub.enabled}
            title={audioHub.enabled?"Audio activo":"Audio inactivo"}>
            <Volume2 size={14}/>
          </button>

          {/* Pista anterior */}
          <button className="mp-btn" onClick={prev} aria-label="Pista anterior" title="Anterior">
            <SkipBack size={14}/>
          </button>

          {/* Play / Pause — botón central protagonista */}
          <button className="mp-btn-play"
            onClick={()=>setPlaying(p=>!p)}
            aria-label={playing?"Pausar música":"Reproducir música"}
            title={playing?"Pausar":"Reproducir"}>
            {playing ? <Pause size={18}/> : <Play size={18} style={{ marginLeft:2 }}/>}
          </button>

          {/* Siguiente pista */}
          <button className="mp-btn" onClick={next} aria-label="Siguiente pista" title="Siguiente">
            <SkipForward size={14}/>
          </button>

          {/* Cola de reproducción */}
          <button className={`mp-btn ${queueOpen?"active":""}`}
            onClick={()=>setQueueOpen(o=>!o)}
            aria-label="Ver cola de reproducción"
            aria-expanded={queueOpen}
            title="Cola de reproducción">
            <ListMusic size={14}/>
          </button>

        </div>

        {/* Nombre y duración de la pista — bajo los botones */}
        <div style={{ display:"flex", alignItems:"center", gap:6, maxWidth:"100%" }}>
          <span style={{ fontSize:".72rem", fontWeight:600,
            color: playing ? "var(--secondary)" : "var(--md-on-surface-variant)",
            whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:160,
            transition:"color .3s" }}>
            {track.emoji} {track.title}
          </span>
          <span style={{ fontSize:".68rem", color:"var(--md-outline)", flexShrink:0 }}>·</span>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:".68rem",
            color:"var(--md-on-surface-variant)", flexShrink:0 }}>
            {track.dur}
          </span>
        </div>

      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   PANEL SCREEN — Sistema de Hábitos (v5)
   8 pilares integrados en Single Flow
════════════════════════════════════════════ */
const INIT_TASKS = [
  { id:1, label:"Revisar PRs del sprint actual",   duration:"~30 min", done:false, priority:"high", modeId:"steady-rhythm" },
  { id:2, label:"Actualizar documentación de API",  duration:"~45 min", done:false, priority:"high", modeId:"deep-flow"     },
  { id:3, label:"Reunión de sincronización",        duration:"30 min",  done:true,  priority:"med",  modeId:"steady-rhythm" },
  { id:4, label:"Refactorizar módulo de pagos",     duration:"~1h",     done:false, priority:"low",  modeId:"deep-flow"     },
];
const dot = { high:"var(--accent)", med:"var(--secondary)", low:"var(--md-outline)" };
const modeColor = { "deep-flow":"#1A237E", "steady-rhythm":"#FF6D00", "vital-reset":"#2E7D32" };

// Tooltip micro-modal (Pilar 3 — Quick Preview)
/* SwitchTooltip — sin react-dom, el tooltip escapa overflow con position fixed
   simulado: el wrapper es position:static para que el tooltip pueda usar
   coordenadas de viewport via left calculado en onMouseEnter              */
function SwitchTooltip({ label, children }) {
  const [show, setShow] = useState(false);

  return (
    <div
      style={{ display:"inline-flex", position:"relative" }}
      onMouseEnter={()=>setShow(true)}
      onMouseLeave={()=>setShow(false)}>
      {children}
      {show && (
        <div style={{
          position:"absolute",
          bottom:"calc(100% + 10px)",
          left:"50%",
          transform:"translateX(-50%)",
          background:"#1A1C2E",
          color:"#fff",
          padding:"9px 14px",
          borderRadius:8,
          fontSize:".72rem",
          fontWeight:500,
          lineHeight:1.6,
          width:220,
          whiteSpace:"normal",
          textAlign:"center",
          boxShadow:"0 4px 20px rgba(0,0,0,.35)",
          zIndex:99999,
          pointerEvents:"none",
          animation:"fade-in .12s ease both",
        }}>
          {label}
          <div style={{
            position:"absolute",
            top:"100%", left:"50%",
            transform:"translateX(-50%)",
            width:0, height:0,
            borderLeft:"6px solid transparent",
            borderRight:"6px solid transparent",
            borderTop:"6px solid #1A1C2E",
          }}/>
        </div>
      )}
    </div>
  );
}

function Tooltip({ label, children }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position:"relative", display:"inline-flex" }}
      onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}
      onFocus={()=>setShow(true)}      onBlur={()=>setShow(false)}>
      {children}
      {show && (
        <div role="tooltip" style={{
          position:"absolute", bottom:"calc(100% + 8px)", left:"50%", transform:"translateX(-50%)",
          background:"var(--md-on-surface)", color:"var(--md-surface)", padding:"6px 12px",
          borderRadius:"var(--rad-sm)", fontSize:".72rem", fontWeight:600, whiteSpace:"nowrap",
          boxShadow:"var(--md-elev-2)", zIndex:400, pointerEvents:"none",
          animation:"fade-in .12s ease both",
        }}>{label}</div>
      )}
    </div>
  );
}

// Mid-session notification banner (Pilar 3 + 7) — Fundamental Attribution Error fix
function MidSessionBanner({ mode, onDismiss }) {
  return (
    <div role="alert" aria-live="polite" style={{
      position:"fixed", top:72, left:"50%", transform:"translateX(-50%)",
      background:"var(--secondary)", color:"#fff", borderRadius:"var(--rad-full)",
      padding:"10px 20px", display:"flex", alignItems:"center", gap:12,
      boxShadow:"var(--md-elev-3)", zIndex:1500, animation:"fade-in .3s ease both",
      fontSize:".85rem", fontFamily:"var(--font-display)", fontWeight:600,
    }}>
      <Leaf size={14} aria-hidden="true"/>
      El trabajo ha estado intenso. El sistema sugiere un respiro pronto.
      <button onClick={onDismiss} style={{ background:"rgba(255,255,255,.2)", border:"none", borderRadius:99, color:"#fff", padding:"2px 10px", cursor:"pointer", fontSize:".75rem" }}>Entendido</button>
    </div>
  );
}

// Auto-Resume countdown badge (Pilar 5)
function AutoResumeBadge({ secondsLeft, onCancel }) {
  if (secondsLeft === null || secondsLeft <= 0) return null;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 14px",
      background:"var(--md-primary-container)", borderRadius:"var(--rad-full)",
      fontSize:".78rem", fontWeight:600, color:"var(--secondary)" }}
      role="status" aria-live="polite">
      <Clock size={12} aria-hidden="true"/>
      Retomando en {mins > 0 ? `${mins}m ` : ""}{String(secs).padStart(2,"0")}s
      <button onClick={onCancel} style={{ background:"none", border:"none", color:"var(--md-on-surface-variant)", cursor:"pointer", padding:"0 4px", fontFamily:"var(--font-display)" }} aria-label="Cancelar reanudación automática">✕</button>
    </div>
  );
}

/* ════════════════════════════════════════════
   SESSION STATUS CONTEXT
   PanelScreen writes running + mode here;
   the nav bar reads it to show a live indicator.
════════════════════════════════════════════ */
const SessionStatusContext = createContext({ running: false, mode: null, secs: 0 });

function PanelScreen({ onNavigate, frogTask, agendaEvents }) {
  const { userPlan, openPlans } = usePlan();
  const [gateFeature, setGateFeature] = useState(null);

  const handleGatedAction = (feature, action) => {
    if (userPlan === "free") { setGateFeature(feature); return; }
    action();
  };
  // Session state
  const sessionState = useSessionMode();
  const { mode, switchMode, running, secs, toggle, reset, uiProfile, updateModeDurations } = sessionState;

  // Publish live status so nav bar can show the indicator from any tab
  const setSessionStatus = useContext(SessionStatusContext).set;
  useEffect(() => {
    if (setSessionStatus) setSessionStatus({ running, mode, secs });
  }, [running, mode, secs]); // eslint-disable-line

  // Persisted custom durations for each mode
  const [customDurations, setCustomDurations] = useState(() => {
    try {
      const saved = localStorage.getItem("ff_custom_durations_v1");
      if (saved) {
        const d = JSON.parse(saved);
        // Apply immediately to SESSION_MODES so timer initializes correctly
        SESSION_MODES.forEach(m => { if (d[m.id]) m.duration = d[m.id]; });
        return d;
      }
    } catch(e) {}
    return { "deep-flow": 50, "steady-rhythm": 25, "vital-reset": 15 };
  });

  const handleConfigSave = useCallback((cfg) => {
    const durations = {
      "deep-flow":     cfg.deepFlow,
      "steady-rhythm": cfg.steadyRhythm,
      "vital-reset":   cfg.vitalReset,
    };
    setCustomDurations(durations);
    try { localStorage.setItem("ff_custom_durations_v1", JSON.stringify(durations)); } catch(e) {}
    updateModeDurations(durations);
  }, [updateModeDurations]);

  // Audio hub
  const audioHub = useAudioHub();

  // Rest mode (salud ocular)
  const restMode = useRestMode();

  // Other state
  const [focusOn, setFocusOn]           = useState(false);
  const [focusModal, setFocusModal]     = useState(false);
  const [cfgOpen, setCfgOpen]           = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [vitalReset, setVitalReset]     = useState(false);
  const [reportOpen, setReportOpen]     = useState(false);
  const [stopDialog, setStopDialog]     = useState(false);
  const [hydroSnack, setHydroSnack]     = useState(false);
  const [undoData, setUndoData]         = useState(null);
  // Today is Monday (day index 0 in our week system). Derive tasks from agenda events.
  const todayDayIndex = 0; // Lunes = 0
  const [tasks, setTasks] = useState(() => {
    const fromAgenda = eventsToTasks(agendaEvents || INIT_EVENTS, todayDayIndex);
    return fromAgenda.length > 0 ? fromAgenda : INIT_TASKS;
  });
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [flashId, setFlashId]           = useState(null);

  // Sync tasks when agenda changes (keep done state for already-started tasks)
  useEffect(() => {
    setTasks(prev => {
      const fromAgenda = eventsToTasks(agendaEvents || INIT_EVENTS, todayDayIndex);
      if (fromAgenda.length === 0) return prev;
      // Preserve done state for tasks that already existed
      return fromAgenda.map(t => {
        const existing = prev.find(p => p.id === t.id);
        return existing ? { ...t, done: existing.done } : t;
      });
    });
  }, [agendaEvents]); // eslint-disable-line

  // ── AUTO / MANUAL MODE ──
  const [scheduleMode, setScheduleMode]   = useState("manual"); // "manual" | "auto"
  const [autoTaskIdx, setAutoTaskIdx]     = useState(0);        // índice de tarea activa en auto
  const [autoSnack, setAutoSnack]         = useState(null);     // { label, modeId } pending snack
  const [agendaStale, setAgendaStale]     = useState(false);    // agenda changed while in auto mode
  const prevSecsRef = useRef(null);
  const prevAgendaRef = useRef(agendaEvents);

  // Detect agenda changes while in auto mode → mark stale so user can refresh
  useEffect(() => {
    if (scheduleMode === "auto" && agendaEvents !== prevAgendaRef.current) {
      setAgendaStale(true);
    }
    prevAgendaRef.current = agendaEvents;
  }, [agendaEvents, scheduleMode]); // eslint-disable-line

  // Pending tasks (not done) for auto mode
  const pendingTasks = tasks.filter(t => !t.done);

  // When auto mode is ON and timer reaches 0 → mark task done → show snackbar → advance
  useEffect(() => {
    if (scheduleMode !== "auto") return;
    if (!running) return;
    if (secs === 0 && prevSecsRef.current !== 0 && prevSecsRef.current !== null) {
      // session just hit 0
      const currentPending = tasks.filter(t => !t.done);
      if (currentPending.length === 0) return;
      const currentTask = currentPending[autoTaskIdx] || currentPending[0];
      if (!currentTask) return;

      // Mark task done
      setTasks(ts => ts.map(t => t.id === currentTask.id ? { ...t, done:true } : t));
      setConfettiTrigger(n => n + 1);

      // Find next pending task
      const nextPending = tasks.filter(t => !t.done && t.id !== currentTask.id);
      if (nextPending.length > 0) {
        const nextTask = nextPending[0];
        setAutoSnack({ label: nextTask.label, modeId: nextTask.modeId || "deep-flow" });
      }
      setAutoTaskIdx(0);
    }
    prevSecsRef.current = secs;
  }, [secs, running, scheduleMode]); // eslint-disable-line

  // When auto mode activates, load the first pending task's mode AND its real agenda duration
  useEffect(() => {
    if (scheduleMode !== "auto") return;
    const pending = tasks.filter(t => !t.done);
    if (pending.length === 0) return;
    const task = pending[autoTaskIdx] || pending[0];
    if (!task) return;
    const m = SESSION_MODES.find(x => x.id === (task.modeId || "deep-flow")) || SESSION_MODES[0];
    const mWithDur = task.durationMin ? { ...m, duration: task.durationMin } : m;
    handleModeChange(mWithDur);
  }, [scheduleMode, autoTaskIdx]); // eslint-disable-line

  // Auto snack dismissed → load next task mode with its agenda duration
  const handleAutoSnackConfirm = () => {
    if (!autoSnack) return;
    const pending = tasks.filter(t => !t.done);
    const nextTask = pending[0];
    const m = SESSION_MODES.find(x => x.id === autoSnack.modeId) || SESSION_MODES[0];
    const mWithDur = nextTask?.durationMin ? { ...m, duration: nextTask.durationMin } : m;
    handleModeChange(mWithDur);
    setAutoSnack(null);
    setTimeout(() => toggle(), 300);
  };

  const bars        = useBars();
  const postureState= usePosture(running && !focusOn);
  const hydration   = useHydration();
  const eyeRest     = useEyeRest(running);

  // Hydration snackbar trigger
  useEffect(()=>{
    if(hydration.urgent) { const t=setTimeout(()=>setHydroSnack(true), 1000); return()=>clearTimeout(t); }
  }, [hydration.urgent]);

  // Vital Reset auto-open: only when session starts fresh (timer at full duration), not on resume
  const prevRunningRef = useRef(false);
  useEffect(()=>{
    if(running && !prevRunningRef.current && mode.id==="vital-reset" && secs === mode.duration * 60) {
      setVitalReset(true);
    }
    prevRunningRef.current = running;
  }, [running, mode.id]);

  const lockedByConc=focusOn&&running;
  const sensorActive=running&&!focusOn;

  const handleModeChange=(m)=>{ switchMode(m); audioHub.setCurrentMode(m.id); };

  // Refresh auto mode: reload tasks from agenda and apply first task's duration
  const handleRefreshAuto = () => {
    const fromAgenda = eventsToTasks(agendaEvents || INIT_EVENTS, todayDayIndex);
    if (fromAgenda.length === 0) { setAgendaStale(false); return; }
    setTasks(prev => fromAgenda.map(t => {
      const existing = prev.find(p => p.id === t.id);
      return existing ? { ...t, done: existing.done } : t;
    }));
    setAutoTaskIdx(0);
    const firstPending = fromAgenda.filter(t => !t.done)[0];
    if (firstPending) {
      const m = SESSION_MODES.find(x => x.id === (firstPending.modeId || "deep-flow")) || SESSION_MODES[0];
      const mWithDur = firstPending.durationMin ? { ...m, duration: firstPending.durationMin } : m;
      handleModeChange(mWithDur);
    }
    setAgendaStale(false);
  };

  const activateConcentration  =()=>setFocusOn(true);
  const deactivateConcentration=()=>setFocusOn(false);

  const toggleTask=(id)=>{
    const task=tasks.find(t=>t.id===id);
    if(!task.done){
      // Marcar como hecha
      const updatedTasks = tasks.map(t=>t.id===id?{...t,done:true}:t);
      setTasks(updatedTasks);
      setUndoData({ id, task:task.label });
      setConfettiTrigger(n=>n+1);
      setFlashId(id);
      setTimeout(()=>setFlashId(null), 900);
      // Advance timer to next pending task's duration
      const nextPending = updatedTasks.filter(t=>!t.done)[0];
      if (nextPending) {
        const nextMode = SESSION_MODES.find(x=>x.id===(nextPending.modeId||"deep-flow")) || SESSION_MODES[0];
        const mWithDur = nextPending.durationMin ? { ...nextMode, duration: nextPending.durationMin } : nextMode;
        handleModeChange(mWithDur);
        if (scheduleMode==="auto") setAutoTaskIdx(0);
      }
    } else {
      // Desmarcar — revertir a esta tarea
      setTasks(ts=>ts.map(t=>t.id===id?{...t,done:false}:t));
      const m = SESSION_MODES.find(x=>x.id===(task.modeId||"deep-flow")) || SESSION_MODES[0];
      const mWithDur = task.durationMin ? { ...m, duration: task.durationMin } : m;
      handleModeChange(mWithDur);
      if (scheduleMode==="auto") setAutoTaskIdx(0);
    }
  };
  const undo=()=>{
    if(undoData) setTasks(ts=>ts.map(t=>t.id===undoData.id?{...t,done:false}:t));
    setUndoData(null);
  };

  const kpis=[
    { icon:<Zap size={17}/>,      label:"Nivel de energía",       value:"87%",   color:"#2E7D32",     badge:"Alta",            badgeCls:"badge-green"  },
    { icon:<Clock size={17}/>,    label:"Tiempo en foco",          value:"5h 23m",color:"var(--secondary)", badge:"Hoy",        badgeCls:"badge-navy"   },
    { icon:<Activity size={17}/>, label:"Sesiones completadas",    value:"4",     color:"#7B5EA7",     badge:"Listas",          badgeCls:"badge-purple" },
    { icon:<Battery size={17}/>,  label:"Inversión en Energía",    value:"+42m",  color:"var(--accent)",badge:"Vitalidad +18%", badgeCls:"badge-orange"},
  ];

  return (
    <div className={`page${running?" session-active":""}${running&&mode.id==="deep-flow"?" deep-flow-active":""}`}>
      {/* Confetti canvas (Zeigarnik) */}
      <ConfettiCanvas trigger={confettiTrigger}/>

      {/* Eye Rest Overlay */}
      {eyeRest.showAlert && <EyeRestOverlay countdown={eyeRest.countdown} onDismiss={eyeRest.dismiss}/>}

      {/* Focus concentration banner */}
      {focusOn && (
        <div className="focus-banner" role="status" aria-live="polite">
          <BellOff size={15} aria-hidden="true"/> Concentración profunda activada
          {lockedByConc && <span style={{ fontSize:".72rem", background:"rgba(255,255,255,.15)", borderRadius:6, padding:"2px 9px", marginLeft:8 }}>El resto puede esperar</span>}
          <button onClick={deactivateConcentration} style={{ marginLeft:"auto", background:"rgba(255,255,255,.18)", border:"none", borderRadius:20, color:"#fff", padding:"5px 14px", cursor:"pointer", fontSize:".78rem", fontFamily:"var(--font-display)", fontWeight:600 }} aria-label="Desactivar modo concentración">Salir</button>
        </div>
      )}

      {/* Modals */}
      {cfgOpen       && <SessionConfigOverlay onClose={()=>setCfgOpen(false)} onSave={handleConfigSave} initialDurations={customDurations} scheduleMode={scheduleMode}/>}
      {playlistOpen  && <PlaylistPopup audioHub={audioHub} sessionMode={mode} onClose={()=>setPlaylistOpen(false)}/>}
      {vitalReset    && <VitalResetDialog onClose={()=>setVitalReset(false)}/>}
      {reportOpen    && <DailySuccessReport onClose={()=>setReportOpen(false)}/>}
      {/* Toasts apilados: cada uno se desplaza 72px arriba si hay otro debajo */}
      {undoData   && <UndoToast    task={undoData.task} onUndo={undo} onDismiss={()=>setUndoData(null)}
                       bottomPx={24 + (hydroSnack ? 72 : 0) + (autoSnack ? 72 : 0)}/>}
      {hydroSnack && <HydrationSnackbar onDrink={()=>{hydration.drink();setHydroSnack(false);}} onDismiss={()=>setHydroSnack(false)}
                       bottomPx={24 + (autoSnack ? 72 : 0)}/>}
      {autoSnack  && <AutoNextSnackbar taskLabel={autoSnack.label} modeId={autoSnack.modeId}
                       onConfirm={handleAutoSnackConfirm} onSkip={()=>setAutoSnack(null)}
                       bottomPx={24}/>}

      {/* Gate modal para features Pro */}
      {gateFeature && (
        <GateModal
          feature={gateFeature}
          onClose={()=>setGateFeature(null)}
          onUpgrade={()=>{ setGateFeature(null); openPlans(); }}
        />
      )}
      {stopDialog    && <StopSessionDialog onConfirm={()=>{reset();setStopDialog(false);}} onCancel={()=>setStopDialog(false)}/>}

      {/* Focus mode confirm */}
      {focusModal && (
        <div className="scrim" role="dialog" aria-modal="true" aria-label="Confirmar modo concentración">
          <div className="m3-dialog">
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <div style={{ width:44, height:44, borderRadius:14, background:"var(--md-primary-container)", display:"flex", alignItems:"center", justifyContent:"center" }}><Moon size={20} style={{ color:"var(--secondary)" }} aria-hidden="true"/></div>
              <div><div className="title-lg">Concentración profunda</div><div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Solo tú y tu trabajo</div></div>
            </div>
            <div style={{ background:"var(--md-primary-container)", borderRadius:"var(--rad-md)", padding:16, marginBottom:20 }}>
              {["Nada te interrumpirá mientras trabajas","El tiempo sigue fluyendo sin pausas","Tu sesión queda registrada igual"].map((t,i)=>(
                <div key={i} className="body-sm" style={{ color:"var(--md-on-primary-container)", padding:"5px 0", display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"var(--secondary)", flexShrink:0 }} aria-hidden="true"/>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn-filled m3-ripple" onClick={()=>{setFocusModal(false);activateConcentration();}} style={{ flex:1, justifyContent:"center" }}><Shield size={14} aria-hidden="true"/> Entrar</button>
              <button className="btn-outlined" onClick={()=>setFocusModal(false)}>Ahora no</button>
            </div>
          </div>
        </div>
      )}

      <div className="container">

        {/* ════ LAYOUT DE 2 COLUMNAS: izquierda flex · derecha fija 380px ════ */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:20, alignItems:"stretch" }}>

          {/* ══════════════════════════════════════
              COLUMNA IZQUIERDA
          ══════════════════════════════════════ */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* ── HEADER ── */}            <div className="fi deep-flow-blur" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
              <div>
                <div className="headline-sm">Tu espacio de trabajo</div>
                <p className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>
                  Modo: <strong style={{ color:mode.color }}>{mode.label}</strong>
                  {eyeRest.minsToNext > 0 && <span style={{ marginLeft:10 }}>· Pausa visual en {eyeRest.minsToNext}:{String(eyeRest.secsToNext).padStart(2,"0")}</span>}
                </p>
              </div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <button
                  className={`rest-mode-pill${restMode.mode==="sepia"?" active-sepia":restMode.mode==="dark"?" active-dark":""}`}
                  onClick={restMode.cycle}
                  aria-label={`Modo descanso ocular: ${restMode.mode}`}
                  aria-pressed={restMode.mode!=="off"}>
                  {restMode.mode==="dark" ? <Moon size={13}/> : restMode.mode==="sepia" ? <Sun size={13}/> : <Eye size={13}/>}
                  {restMode.mode==="off"?"Descanso visual":restMode.mode==="sepia"?"Filtro cálido":"Vista nocturna"}
                </button>
                <button className="btn-outlined" onClick={()=>setReportOpen(true)} style={{ fontSize:".85rem" }} aria-label="Ver reporte diario">
                  <Trophy size={14}/> Tu día
                </button>
              </div>
            </div>

            {/* ── KPIs: 4 tarjetas en fila ── */}
            <div className="fi fi1 deep-flow-blur" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
              {kpis.map((k,i)=><KpiCard key={i} {...k}/>)}
            </div>

            {/* ── TAREAS DE SESIÓN ── */}
            <div className="m3-card fi fi2 deep-flow-blur" style={{ padding:24, flex:1, display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <div className="title-md">Lo que tienes pendiente</div>
                <button className="btn-tonal" style={{ padding:"6px 14px", fontSize:".78rem", minHeight:36 }}
                  onClick={()=>onNavigate("agenda")} aria-label="Añadir nueva tarea">
                  <Plus size={13}/> Añadir
                </button>
              </div>
              {frogTask && (
                <div style={{ background:"var(--md-primary-container)", borderRadius:"var(--rad-md)", padding:"10px 14px", marginBottom:10, display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:"1.1rem" }}>🐸</span>
                  <div style={{ flex:1 }}>
                    <div className="body-sm" style={{ color:"var(--secondary)", fontWeight:700 }}>Prioridad máxima</div>
                    <div className="body-md" style={{ color:"var(--md-on-primary-container)" }}>{frogTask}</div>
                  </div>
                </div>
              )}
              {tasks.length === 0 ? (
                <EmptyState
                  title="Todo despejado por ahora"
                  body="Cuando añadas tareas a tu sesión, aparecerán aquí. Empieza con una sola."
                  actionLabel="Añadir tarea"
                  onAction={()=>onNavigate("agenda")}
                />
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:2, maxHeight:300, overflowY:"auto", overflowX:"hidden", paddingRight:tasks.length>5?4:0 }} role="list" aria-label="Lista de tareas">
                  {tasks.map(t=>(
                    <div key={t.id}
                      className={`task-row ${t.done?"done":""} ${flashId===t.id?"just-done":""}`}
                      onClick={()=>toggleTask(t.id)}
                      role="checkbox" aria-checked={t.done} tabIndex={0}
                      onKeyDown={e=>e.key===" "&&toggleTask(t.id)}>
                      <div className={`m3-checkbox ${t.done?"on":""}`} aria-hidden="true">
                        {t.done&&<Check size={11} color="#fff" strokeWidth={3}/>}
                      </div>
                      <div style={{ flex:1 }}>
                        <div className="task-label body-md" style={{ color:t.done?"var(--md-on-surface-variant)":"var(--md-on-surface)" }}>{t.label}</div>
                        <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>{t.duration}</div>
                      </div>
                      <div style={{ width:8, height:8, borderRadius:"50%", background:modeColor[t.modeId] || dot[t.priority], flexShrink:0 }}/>
                    </div>
                  ))}
                </div>
              )}
              {/* ── PROGRESO DIARIO ── */}
              <div style={{ marginTop:"auto", paddingTop:16 }}>
                <div className="m3-divider" style={{ marginBottom:14 }}/>

                {/* Fila superior: título + tareas completadas + porcentaje */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <TrendingUp size={14} style={{ color:"var(--secondary)" }}/>
                    <span className="title-sm">Tu avance hoy</span>
                    <span style={{ fontSize:".68rem", background:"var(--md-primary-container)",
                      color:"var(--md-on-primary-container)", padding:"2px 8px",
                      borderRadius:99, fontWeight:700 }}>Meta: 8h</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:"1.1rem", fontWeight:700, color:"var(--secondary)" }}>
                      {tasks.filter(t=>t.done).length} de {tasks.length}
                    </span>
                    <span className="body-sm" style={{ color:"var(--md-on-surface-variant)", fontWeight:600 }}>
                      {tasks.length>0 ? Math.round(tasks.filter(t=>t.done).length/tasks.length*100) : 0}%
                    </span>
                  </div>
                </div>

                {/* Barra de progreso dinámica */}
                <div className="daily-progress-bar" style={{ height:10, marginBottom:8 }}
                  role="progressbar"
                  aria-valuenow={tasks.length>0 ? Math.round(tasks.filter(t=>t.done).length/tasks.length*100) : 0}
                  aria-valuemin={0} aria-valuemax={100}
                  aria-label={`${tasks.length>0 ? Math.round(tasks.filter(t=>t.done).length/tasks.length*100) : 0}% de tareas completadas`}>
                  <div className="daily-progress-fill" style={{ width:`${tasks.length>0 ? tasks.filter(t=>t.done).length/tasks.length*100 : 0}%` }}/>
                </div>

                {/* Fila inferior: sesiones completadas + restantes */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>
                    {tasks.filter(t=>t.done).length} de {tasks.length} listas · <span style={{ color:"var(--accent)" }}>🔥</span> 12 días seguidos
                  </span>
                  <span className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>
                    {tasks.length - tasks.filter(t=>t.done).length} por hacer
                  </span>
                </div>
              </div>
            </div>

          </div>{/* fin columna izquierda */}

          {/* ══════════════════════════════════════
              COLUMNA DERECHA — Timer + Modo
              Tarjeta blanca flotante, posición sticky
          ══════════════════════════════════════ */}
          <div className="fi" style={{ display:"flex", flexDirection:"column" }}>
            <div className="m3-card" style={{
              padding:"20px 20px 24px",
              flex:1,
              overflow:"visible",
              borderColor: running ? mode.color : "var(--md-outline-variant)",
              boxShadow: running
                ? `0 0 0 2px ${mode.color}22, var(--md-elev-2)`
                : "var(--md-elev-2)",
              transition:"border-color .3s, box-shadow .3s"
            }}>

              {/* Iconos configuración — esquina superior derecha */}
              <div style={{ display:"flex", justifyContent:"flex-end", gap:4, marginBottom:8 }}>
                <button className="btn-icon" onClick={()=>setPlaylistOpen(true)}
                  style={{ width:32, height:32,
                    background:audioHub.enabled?"var(--accent-muted)":"transparent",
                    color:audioHub.enabled?"var(--accent)":"var(--md-on-surface-variant)" }}
                  aria-label="Playlists de audio">
                  <Music size={14}/>
                </button>
                <button className="btn-icon" onClick={()=>handleGatedAction("presets", ()=>setCfgOpen(true))}
                  style={{ width:32, height:32, position:"relative" }}
                  aria-label="Configurar sesión (Plan Pro)">
                  <SlidersHorizontal size={14}/>
                  {userPlan==="free" && <span style={{ position:"absolute", top:-2, right:-2, fontSize:".55rem", color:"var(--accent)" }}>✦</span>}
                </button>
              </div>

              {/* Ring timer grande */}
              {(() => {
                const r=96, cx=110, cy=110;
                const circ=2*Math.PI*r;
                const offset=circ*(1-secs/(mode.duration*60));
                const mins=String(Math.floor(secs/60)).padStart(2,"0");
                const ss=String(secs%60).padStart(2,"0");
                const stroke=lockedByConc?"#90A4AE":mode.color;
                return (
                  <div style={{ position:"relative", width:220, height:220, margin:"0 auto 20px" }}>
                    <svg width={220} height={220} viewBox="0 0 220 220"
                      role="timer" aria-label={`${mins}:${ss} restantes`}>
                      <circle cx={cx} cy={cy} r={r+7} fill={mode.bg} opacity=".55"/>
                      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--md-outline-variant)" strokeWidth={10}/>
                      <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth={10}
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                        className="timer-ring" aria-hidden="true"/>
                    </svg>
                    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
                      alignItems:"center", justifyContent:"center", gap:2 }}>
                      {lockedByConc ? (
                        <><span style={{ fontSize:"2rem" }}>⏸</span>
                          <span className="label-sm" style={{ color:"#888" }}>Suspendido</span></>
                      ) : (
                        <>
                          <span style={{ fontFamily:"var(--font-mono)", fontSize:"2.8rem", fontWeight:500,
                            color:mode.color, lineHeight:1, letterSpacing:"-.02em" }}
                            aria-live="off">{mins}:{ss}</span>
                          <span className="label-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:2, textTransform:"uppercase", letterSpacing:".08em" }}>
                            {mode.label}
                          </span>
                          {secs < mode.duration * 60 && (
                            <button
                              onClick={toggle}
                              disabled={lockedByConc}
                              aria-label={running ? "Pausar sesión" : "Reanudar sesión"}
                              style={{
                                position:"absolute", bottom:38,
                                background:"none", border:"none",
                                color:mode.color,
                                display:"flex", alignItems:"center", justifyContent:"center",
                                cursor:"pointer",
                                opacity:.75,
                                transition:"opacity .18s",
                                padding:4,
                              }}
                              onMouseEnter={e=>{ e.currentTarget.style.opacity="1"; }}
                              onMouseLeave={e=>{ e.currentTarget.style.opacity=".75"; }}
                            >
                              {running ? <Pause size={16} strokeWidth={2}/> : <Play size={16} strokeWidth={2} style={{ marginLeft:1 }}/>}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Botón Iniciar / Detener */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
                {(running || secs < mode.duration * 60) ? (
                  <button className="btn-session-stop"
                    onClick={()=>setStopDialog(true)}
                    disabled={lockedByConc}
                    style={{ minWidth:"100%", justifyContent:"center" }}
                    aria-label={`Detener sesión ${mode.label}`}>
                    <Square size={14} fill="currentColor"/> Detener sesión
                  </button>
                ) : (
                  <button className="btn-session-start"
                    onClick={toggle}
                    disabled={lockedByConc}
                    style={{ "--session-color":mode.color, minWidth:"100%", justifyContent:"center" }}
                    aria-label={`Iniciar sesión ${mode.label}`}>
                    <Play size={16}/> Iniciar sesión
                  </button>
                )}

                {/* Mini Player: Reiniciar · Audio · ◀ Play ▶ · Cola */}
                <MiniPlayer audioHub={{ ...audioHub, reset }} />
              </div>

              {/* Divisor */}
              <div className="m3-divider" style={{ margin:"20px 0 16px" }}/>

              {/* ── SWITCH MANUAL / AUTOMÁTICO ── */}
              <div style={{ marginBottom:14 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                  <div className="label-md" style={{ color:"var(--md-on-surface-variant)" }}>MODO DE SESIÓN</div>
                  {/* Tooltip wrapeado directamente, anclado a la derecha */}
                  <div style={{ position:"relative", display:"inline-flex" }}
                    onMouseEnter={e=>e.currentTarget.querySelector(".sw-tip").style.display="block"}
                    onMouseLeave={e=>e.currentTarget.querySelector(".sw-tip").style.display="none"}>
                    <button
                      onClick={agendaStale ? handleRefreshAuto : ()=>setScheduleMode(s => s==="auto" ? "manual" : "auto")}
                      style={{
                        display:"flex", alignItems:"center", gap:6,
                        padding:"5px 12px", borderRadius:"var(--rad-full)", border:"none",
                        cursor:"pointer", fontFamily:"var(--font-display)", fontSize:".75rem", fontWeight:700,
                        transition:"background .2s, color .2s, box-shadow .2s",
                        background: agendaStale ? "#FF6D00" : scheduleMode==="auto" ? "#1A237E" : "var(--md-surface-variant)",
                        color: agendaStale ? "#fff" : scheduleMode==="auto" ? "#fff" : "var(--md-on-surface-variant)",
                        boxShadow: agendaStale ? "0 0 0 3px rgba(255,109,0,.25)" : "none",
                        animation: agendaStale ? "pulse-ring 1.4s ease infinite" : "none",
                      }}>
                      {agendaStale
                        ? <><RefreshCw size={13}/> Actualizar</>
                        : scheduleMode==="auto"
                          ? <><Repeat size={13}/> Automático</>
                          : <><SlidersHorizontal size={13}/> Manual</>
                      }
                    </button>
                    {/* Tooltip anclado a la derecha del botón, apunta abajo */}
                    <div className="sw-tip" style={{
                      display:"none",
                      position:"absolute",
                      bottom:"calc(100% + 10px)",
                      right:0,
                      width:200,
                      background:"#1A1C2E", color:"#fff",
                      padding:"9px 13px", borderRadius:8,
                      fontSize:".72rem", fontWeight:500, lineHeight:1.6,
                      whiteSpace:"normal", textAlign:"left",
                      boxShadow:"0 4px 20px rgba(0,0,0,.35)",
                      zIndex:99999, pointerEvents:"none",
                    }}>
                      {agendaStale
                        ? "La agenda cambió. Pulsa para recargar los temporizadores con los nuevos horarios."
                        : scheduleMode==="auto"
                          ? "Las sesiones avanzan solas según tus pendientes. Al terminar cada tarea recibirás una notificación para continuar."
                          : "Tú eliges cuándo cambiar de modo y qué sesión iniciar."}
                      {/* Flecha apuntando a la derecha del tooltip, hacia el botón */}
                      <div style={{
                        position:"absolute", top:"100%", right:18,
                        width:0, height:0,
                        borderLeft:"6px solid transparent",
                        borderRight:"6px solid transparent",
                        borderTop:"6px solid #1A1C2E",
                      }}/>
                    </div>
                  </div>
                </div>

                {/* Selector de modos — bloqueado en auto */}
                <div style={{ display:"flex", flexDirection:"column", gap:8, opacity: scheduleMode==="auto" ? 1 : 1 }}>
                  {scheduleMode==="manual" ? (
                    /* Modo MANUAL: selector libre */
                    SESSION_MODES.map(m=>(
                      <Ripple key={m.id} onClick={()=>handleModeChange(m)}
                        style={{
                          padding:"12px 14px", borderRadius:"var(--rad-md)", cursor:"pointer",
                          border:`1.5px solid ${mode.id===m.id ? m.color : "var(--md-outline-variant)"}`,
                          background: mode.id===m.id ? m.bg : "transparent",
                          display:"flex", alignItems:"center", gap:12, transition:"all .18s"
                        }}
                        role="radio" aria-checked={mode.id===m.id} tabIndex={0}
                        onKeyDown={e=>e.key===" "&&handleModeChange(m)}>
                        <div style={{
                          width:36, height:36, borderRadius:10, flexShrink:0,
                          background: mode.id===m.id ? `${m.color}20` : "var(--md-surface-variant)",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          color: mode.id===m.id ? m.color : "var(--md-on-surface-variant)",
                          transition:"all .18s"
                        }}>{m.icon}</div>
                        <div style={{ flex:1 }}>
                          <div className="title-sm" style={{ color: mode.id===m.id ? m.color : "var(--md-on-surface)" }}>{m.label}</div>
                          <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>{m.desc}</div>
                        </div>
                        {mode.id===m.id && (
                          <div style={{ width:20, height:20, borderRadius:"50%", background:m.color,
                            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <Check size={11} color="#fff" strokeWidth={3}/>
                          </div>
                        )}
                      </Ripple>
                    ))
                  ) : (
                    /* Modo AUTOMÁTICO: mismos 3 modos, pero el activo se selecciona
                       automáticamente según la tarea pendiente; los otros no son clicables */
                    (() => {
                      const pending = tasks.filter(t => !t.done);
                      const activeTask = pending[0];
                      const activeModeId = activeTask?.modeId || "deep-flow";
                      return SESSION_MODES.map(m => {
                        const isActive = m.id === activeModeId;
                        return (
                          <div key={m.id}
                            style={{
                              padding:"12px 14px", borderRadius:"var(--rad-md)",
                              border:`1.5px solid ${isActive ? m.color : "var(--md-outline-variant)"}`,
                              background: isActive ? m.bg : "transparent",
                              display:"flex", alignItems:"center", gap:12, transition:"all .18s",
                              opacity: isActive ? 1 : 0.45,
                              cursor:"default",
                            }}>
                            <div style={{
                              width:36, height:36, borderRadius:10, flexShrink:0,
                              background: isActive ? `${m.color}20` : "var(--md-surface-variant)",
                              display:"flex", alignItems:"center", justifyContent:"center",
                              color: isActive ? m.color : "var(--md-on-surface-variant)",
                              transition:"all .18s"
                            }}>{m.icon}</div>
                            <div style={{ flex:1 }}>
                              <div className="title-sm" style={{ color: isActive ? m.color : "var(--md-on-surface)" }}>{m.label}</div>
                              <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>{m.desc}</div>
                            </div>
                            {isActive && (
                              <div style={{ width:20, height:20, borderRadius:"50%", background:m.color,
                                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                                <Check size={11} color="#fff" strokeWidth={3}/>
                              </div>
                            )}
                          </div>
                        );
                      });
                    })()
                  )}
                </div>
              </div>

            </div>
          </div>{/* fin columna derecha */}

          {/* ── FILA INFERIOR: alineada al grid superior (1fr · 380px) ── */}
          {/* Zona izquierda: Actividad + Hidratación (sub-grid 1fr 1fr dentro del 1fr) */}
          <div className="fi fi3 deep-flow-blur" style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:20
          }}>
            {/* Actividad teclado / ratón */}
            <div className="m3-card" style={{ padding:20 }}>
              <ProdChart bars={bars} active={running} lockedByConc={lockedByConc}/>
            </div>

            {/* Hidratación */}
            <HydrationWidget hydration={hydration}/>
          </div>

          {/* Zona derecha: Sensor de postura — alineado con columna derecha (380px) */}
          <div className="fi fi3 deep-flow-blur" style={{ display:"flex", flexDirection:"column" }}>
            <div className="m3-card" style={{ padding:20, flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <span className="title-sm">Sensor de postura</span>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:".68rem", fontWeight:700,
                  color:sensorActive?"var(--secondary)":lockedByConc?"#ca8a04":"var(--md-outline)" }}>
                  {sensorActive?"● Activo":lockedByConc?"— En pausa":"○ En espera"}
                </span>
              </div>
              {sensorActive
                ? <ErgonomicAvatar state={postureState}/>
                : <div style={{ padding:"12px 0", borderTop:"1px solid var(--md-outline-variant)", marginTop:8, display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:56, height:56, borderRadius:"50%", background:"var(--md-surface-variant)",
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", flexShrink:0 }}>🧘</div>
                    <div>
                      <div className="title-sm" style={{ color:"var(--md-on-surface-variant)" }}>Descansando</div>
                      <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:2 }}>Se activa cuando empieces tu sesión</div>
                    </div>
                  </div>
              }
            </div>
          </div>{/* fin zona derecha fila inferior */}

        </div>{/* fin grid 2 columnas */}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   INICIO SCREEN — Layout v18
   Estructura: bosquejo propuesto
════════════════════════════════════════════ */

/* Donut SVG helper */
function DonutChart({ pct=67, size=160, stroke=14, colorA="var(--secondary)", colorB="var(--accent)" }) {
  const r   = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const id   = "donut-grad";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform:"rotate(-90deg)" }}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={colorA}/>
          <stop offset="100%" stopColor={colorB}/>
        </linearGradient>
      </defs>
      {/* track */}
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="var(--md-outline-variant)" strokeWidth={stroke}/>
      {/* progress */}
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={`url(#${id})`} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"/>
    </svg>
  );
}

/* ════════════════════════════════════════════
   COLLECTIVE CARD — Mensajes Colectivos Rotativos
════════════════════════════════════════════ */
const COLLECTIVE_MESSAGES = [
  {
    id: "focus",
    dimension: "Enfoque y Flujo",
    icon: "Users",
    color: "#1A237E",
    bg: "#E8EAF6",
    emoji: "🧠",
    microcopy: "En este momento, 3,410 profesionales están compartiendo su espacio de enfoque profundo contigo.",
    metric: 3410,
    metricLabel: "en foco ahora",
    metricMax: 5000,
    chartData: [2100, 2580, 2950, 3100, 3280, 3410],
    chartLabel: "Últimas 6h",
    trend: "+8%",
    trendUp: true,
  },
  {
    id: "hydration",
    dimension: "Hidratación y Energía",
    icon: "Droplet",
    color: "#0277BD",
    bg: "#E1F5FE",
    emoji: "💧",
    microcopy: "Hoy la comunidad ha completado 12,500 recordatorios de hidratación. ¡Toma un sorbo de agua ahora!",
    metric: 12500,
    metricLabel: "recordatorios hoy",
    metricMax: 20000,
    chartData: [1800, 4200, 6900, 8800, 10600, 12500],
    chartLabel: "Acumulado hoy",
    trend: "+340 última hora",
    trendUp: true,
  },
  {
    id: "eye",
    dimension: "Descanso Ocular · 20-20-20",
    icon: "Eye",
    color: "#6A1B9A",
    bg: "#F3E5F5",
    emoji: "👁️",
    microcopy: "1,840 diseñadores y desarrolladores acaban de liberar la tensión de sus ojos junto a ti.",
    metric: 1840,
    metricLabel: "pausas oculares",
    metricMax: 3000,
    chartData: [320, 640, 980, 1280, 1560, 1840],
    chartLabel: "Pausas completadas hoy",
    trend: "+12% vs ayer",
    trendUp: true,
  },
  {
    id: "posture",
    dimension: "Ergonomía y Postura",
    icon: "Scan",
    color: "#2E7D32",
    bg: "#E8F5E9",
    emoji: "🧘",
    microcopy: "En este instante, 1,420 profesionales están protegiendo su postura en sintonía contigo.",
    metric: 1420,
    metricLabel: "posturas activas",
    metricMax: 2500,
    chartData: [980, 1050, 1120, 1280, 1380, 1420],
    chartLabel: "Últimas 6h",
    trend: "Pico del día",
    trendUp: true,
  },
  {
    id: "success",
    dimension: "Éxito Sostenible",
    icon: "Award",
    color: "#E65100",
    bg: "#FFF3E0",
    emoji: "🏆",
    microcopy: "Hoy, el 89% de la comunidad logró su Balance Zen (productividad + salud).",
    metric: 89,
    metricLabel: "% Balance Zen",
    metricMax: 100,
    chartData: [71, 75, 79, 83, 86, 89],
    chartLabel: "Evolución semanal",
    trend: "+18pp este mes",
    trendUp: true,
  },
];

function MiniSparkline({ data, color }) {
  const w = 120, h = 40, pad = 4;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const pathD = `M ${pts.join(" L ")}`;
  const areaD = `M ${pts[0]} L ${pts.join(" L ")} L ${pad + (w - pad*2)},${h-pad} L ${pad},${h-pad} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow:"visible" }}>
      <defs>
        <linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sg-${color.replace("#","")})`}/>
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Last dot */}
      <circle cx={pts[pts.length-1].split(",")[0]} cy={pts[pts.length-1].split(",")[1]} r="3" fill={color}/>
    </svg>
  );
}

function RadialProgress({ pct, color, size=56, sw=6 }) {
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform:"rotate(-90deg)", flexShrink:0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color+"22"} strokeWidth={sw}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"/>
    </svg>
  );
}

function CollectiveCard() {
  const [idx, setIdx]   = useState(0);
  const [fade, setFade] = useState(true);
  const INTERVAL = 12000;

  const goTo = (next) => {
    setFade(false);
    setTimeout(() => { setIdx(next); setFade(true); }, 280);
  };

  useEffect(() => {
    const t = setInterval(() => {
      goTo((idx + 1) % COLLECTIVE_MESSAGES.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [idx]);

  const msg = COLLECTIVE_MESSAGES[idx];
  const fillPct = Math.round((msg.metric / msg.metricMax) * 100);
  const fmt = (n) => n >= 1000 ? n.toLocaleString("es-ES") : n;

  return (
    <div className="m3-card" style={{ padding:20, display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <Users size={13} style={{ color:"var(--secondary)", flexShrink:0 }}/>
          <span className="title-sm" style={{ fontSize:".78rem", color:"var(--md-on-surface-variant)" }}>Comunidad FocusFlow</span>
        </div>
        <div style={{ display:"flex", gap:5, alignItems:"center" }}>
          {COLLECTIVE_MESSAGES.map((_,i) => (
            <button key={i} onClick={()=>goTo(i)}
              style={{ width: i===idx ? 16 : 6, height:6, borderRadius:99, border:"none", cursor:"pointer",
                background: i===idx ? msg.color : "var(--md-outline-variant)",
                transition:"all .3s", padding:0 }}
              aria-label={`Mensaje ${i+1}`}/>
          ))}
        </div>
      </div>

      {/* Animated content */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center",
        justifyContent:"space-between",
        opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(8px)",
        transition:"opacity .28s ease, transform .28s ease" }}>

        {/* Dimension pill + emoji */}
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <span style={{ fontSize:"1.1rem", lineHeight:1 }}>{msg.emoji}</span>
          <span style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".05em", textTransform:"uppercase",
            color:msg.color, background:msg.bg, padding:"3px 10px", borderRadius:99 }}>
            {msg.dimension}
          </span>
        </div>

        {/* Radial centered — large */}
        <div style={{ position:"relative" }}>
          <RadialProgress pct={fillPct} color={msg.color} size={150} sw={5}/>
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:4 }}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"1.85rem", fontWeight:800,
              color:msg.color, lineHeight:1 }}>
              {fmt(msg.metric)}
            </span>
            <span style={{ fontSize:".65rem", fontWeight:700, color:"var(--md-on-surface-variant)",
              textTransform:"uppercase", letterSpacing:".05em", maxWidth:90, lineHeight:1.3 }}>
              {msg.metricLabel}
            </span>
          </div>
        </div>

        {/* Microcopy */}
        <p className="body-sm" style={{ color:"var(--md-on-surface)", lineHeight:1.6,
          fontWeight:500, margin:0 }}>
          {msg.microcopy}
        </p>

        {/* Trend pill */}
        <div style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 14px",
          background: msg.trendUp ? "#E8F5E9" : "#FFEBEE",
          borderRadius:99 }}>
          <TrendingUp size={11} style={{ color: msg.trendUp ? "#2E7D32" : "#C62828", flexShrink:0 }}/>
          <span style={{ fontSize:".68rem", fontWeight:700, color: msg.trendUp ? "#2E7D32" : "#C62828" }}>
            {msg.trend}
          </span>
        </div>
      </div>
    </div>
  );
}

function InicioScreen({ frogTask, onNavigate }) {
  const { userPlan, openPlans } = usePlan();
  const [streakMissed]                    = useState(false);
  const [gateOpen, setGateOpen]           = useState(false);

  const pct  = 67;
  const kpis = [
    { icon:<Zap size={17}/>,      label:"Energía",             value:"87%",    color:"#2E7D32",         badge:"Alta",           badgeCls:"badge-green"  },
    { icon:<Clock size={17}/>,    label:"Tiempo trabajado",     value:"5h 23m", color:"var(--secondary)", badge:"Hoy",            badgeCls:"badge-navy"   },
    { icon:<Activity size={17}/>, label:"Sesiones",             value:"4",      color:"#7B5EA7",          badge:"Completadas",    badgeCls:"badge-purple" },
    { icon:<Battery size={17}/>,  label:"Inversión en Energía", value:"+42m",   color:"var(--accent)",    badge:"Vitalidad +18%", badgeCls:"badge-orange" },
  ];
  const recent = [
    { name:"Revisión de código", duration:"52 min", score:94, type:"Desarrollo" },
    { name:"Reunión de equipo",  duration:"30 min", score:71, type:"Reunión"    },
    { name:"Diseño wireframes",  duration:"1h 10m", score:88, type:"Diseño"     },
  ];
  const forecastStats = [
    { label:"Pausas ayer",     v:"3",    color:"#2E7D32"          },
    { label:"Energía ganada",  v:"+26%", color:"var(--secondary)" },
    { label:"Burnout evitado", v:"Sí",   color:"var(--accent)"    },
  ];

  return (
  <>
    <div className="page">
      <div className="container">

        {/* ── 1. HEADER ── */}
        <div className="fi" style={{ marginBottom:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
            <div>
              <div className="headline-md">Buenos días, <span style={{ color:"var(--secondary)" }}>Alex</span> 👋</div>
              <p className="body-md" style={{ color:"var(--md-on-surface-variant)", marginTop:4 }}>Martes, 10 de junio · Semana 24</p>
            </div>
            {/* Identity badge */}
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 14px",
              borderRadius:"var(--rad-full)", background:"rgba(26,35,126,.06)",
              border:"1px solid var(--secondary)", flexShrink:0 }}>
              <span style={{ fontSize:"1rem" }}>🏗️</span>
              <div>
                <div style={{ fontSize:".6rem", fontWeight:700, color:"var(--secondary)", textTransform:"uppercase", letterSpacing:".06em" }}>Tu perfil</div>
                <div className="label-sm" style={{ color:"var(--md-on-primary-container)", lineHeight:1.2 }}>Constructor Constante</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. HERO: 1-clic Deep Flow ── */}
        <div className="fi fi1" style={{ marginBottom:16 }}>
          <button
            style={{ width:"100%", padding:"18px 24px", borderRadius:"var(--rad-lg)",
              background:"linear-gradient(135deg, var(--secondary) 0%, #283593 100%)",
              color:"#fff", border:"none", cursor:"pointer", fontFamily:"var(--font-display)",
              display:"flex", alignItems:"center", gap:16, textAlign:"left",
              boxShadow:"0 8px 24px rgba(26,35,126,.28)", transition:"transform .15s, box-shadow .15s" }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(26,35,126,.36)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 8px 24px rgba(26,35,126,.28)"; }}
            aria-label="Continuar Deep Flow con configuración anterior"
            onClick={()=>{ if(userPlan==="free"){ setGateOpen(true); } else { onNavigate("panel"); } }}>
            <div style={{ width:52, height:52, borderRadius:16, background:"rgba(255,255,255,.15)",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Flame size={24} color="#FF6D00"/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:".68rem", fontWeight:700, color:"rgba(255,255,255,.65)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:2 }}>Un solo clic</div>
              <div className="title-lg" style={{ color:"#fff", marginBottom:2 }}>Continuar Deep Flow</div>
              <div className="body-sm" style={{ color:"rgba(255,255,255,.7)" }}>50 min · configuración anterior · listo para empezar</div>
            </div>
            <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,.18)",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Play size={18} color="#fff" style={{ marginLeft:2 }}/>
            </div>
          </button>
        </div>

        {/* ── 5. FILA DE 3 COLUMNAS ── */}
        <div className="fi fi3" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:16, alignItems:"stretch" }}>

          {/* COL A: Mensajes Colectivos Rotativos */}
          <CollectiveCard />

          {/* COL B (centro): Pronóstico de bienestar */}
          <div className="m3-card" style={{ padding:20, display:"flex", flexDirection:"column" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
              <Lightbulb size={14} style={{ color:"var(--accent)", flexShrink:0 }}/>
              <span className="title-sm">Pronóstico de bienestar</span>
            </div>
            <div style={{ marginBottom:14 }}>
              <div className="body-sm" style={{ fontWeight:700, color:"var(--md-on-surface)", marginBottom:4 }}>
                Las pausas de ayer evitaron el burnout de hoy
              </div>
              <p className="body-sm" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.65 }}>
                Ayer tomaste 3 descansos activos. Tu energía cognitiva hoy empieza al 87% — sin esas pausas, estarías al 61%.
              </p>
            </div>
            {/* 3 mini-tarjetas apiladas — altura fija igual a los slots de Bloques */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, flex:1, justifyContent:"flex-end" }}>
              {forecastStats.map((s,i) => (
                <div key={i} style={{ padding:"12px 16px", background:"var(--md-surface-variant)",
                  borderRadius:"var(--rad-md)", border:"1px solid var(--md-outline-variant)",
                  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3 }}>
                  <span style={{ fontFamily:"var(--font-mono)", fontWeight:700, color:s.color, fontSize:"1rem" }}>{s.v}</span>
                  <span className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* COL C (derecha): Tu avance hoy — DONUT */}
          <div className="m3-card" style={{ padding:20, display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ width:"100%", marginBottom:16 }}>
              <div className="title-sm">Tu avance hoy</div>
              <div className="body-sm" style={{ color:"#2E7D32", fontWeight:600, marginTop:3 }}>
                Esta semana protegiste 6h de tu bienestar
              </div>
            </div>
            {/* Donut chart */}
            <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center", flex:1, margin:"8px 0" }}>
              <DonutChart pct={pct} size={210} stroke={8}/>
              <div style={{ position:"absolute", textAlign:"center" }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"1.55rem", fontWeight:700, color:"var(--secondary)", lineHeight:1 }}>5h 23m</div>
                <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:3 }}>de 8h ({pct}%)</div>
              </div>
            </div>
            <div className="body-sm" style={{ color:"var(--md-on-surface-variant)", textAlign:"center", marginTop:12 }}>
              A este ritmo, superarás tu meta semanal el jueves.
            </div>
          </div>

        </div>

        {/* ── FLEXIBLE STREAK ── */}
        <div className="fi" style={{ marginBottom:16 }}>
          <div className="m3-card fi" style={{ padding:"22px 24px", display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:"1.3rem" }}>{streakMissed ? "🌱" : "🔥"}</span>
            <span className="body-sm" style={{ color:"var(--md-on-surface-variant)", fontWeight:500, flex:1 }}>
              {streakMissed
                ? "Tu ritmo sigue estable — 4 de 5 días esta semana. Mañana es un gran día para retomar."
                : <><strong style={{ color:"var(--accent)" }}>Ritmo semanal: 4/5 días activos.</strong> Esta semana protegiste <strong>6h 20m de tu bienestar</strong>.</>
              }
            </span>
          </div>
        </div>

        {/* ── 6. TABLA sesiones recientes ── */}
        <div className="m3-card fi fi4" style={{ padding:22 }}>
          <div className="title-md" style={{ marginBottom:14 }}>Sesiones recientes</div>
          <table className="m3-table">
            <thead><tr><th>Sesión</th><th>Duración</th><th>Bienestar</th><th>Tipo</th></tr></thead>
            <tbody>
              {recent.map((r,i) => (
                <tr key={i}>
                  <td><span className="body-md" style={{ fontWeight:600 }}>{r.name}</span></td>
                  <td><span style={{ fontFamily:"var(--font-mono)", fontSize:".82rem" }}>{r.duration}</span></td>
                  <td><span style={{ fontFamily:"var(--font-mono)", fontWeight:700, color:r.score>=90?"#2E7D32":r.score>=75?"var(--accent)":"#C62828" }}>{r.score}</span></td>
                  <td><Badge label={r.type} cls={r.type==="Desarrollo"?"badge-blue":r.type==="Reunión"?"badge-purple":"badge-orange"}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>

    {/* Gate para Quick Start */}
    {gateOpen && (
      <GateModal
        feature="quickstart"
        onClose={()=>setGateOpen(false)}
        onUpgrade={()=>{ setGateOpen(false); openPlans(); }}
      />
    )}
  </>
  );
}

/* ════════════════════════════════════════════
   AGENDA SCREEN
════════════════════════════════════════════ */
/* ── mini helpers ── */
const MONTH_NAMES=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DAY_ABBR=["Lu","Ma","Mi","Ju","Vi","Sá","Do"];

function MiniCalendar({ today, selected, onSelect }) {
  const [view, setView] = useState({ y:today.getFullYear(), m:today.getMonth() });
  const firstDay = new Date(view.y, view.m, 1).getDay(); // 0=Sun
  const offset = (firstDay+6)%7; // make Mon=0
  const daysInMonth = new Date(view.y, view.m+1, 0).getDate();
  const cells = Array.from({ length: offset + daysInMonth }, (_,i) => i<offset ? null : i-offset+1);
  const isSel  = d => d && selected && selected.getFullYear()===view.y && selected.getMonth()===view.m && selected.getDate()===d;
  const isToday= d => d && today.getFullYear()===view.y && today.getMonth()===view.m && today.getDate()===d;
  return (
    <div style={{ fontFamily:"var(--font-display)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
        <span className="title-sm">{MONTH_NAMES[view.m]} {view.y}</span>
        <div style={{ display:"flex", gap:2 }}>
          <button className="btn-icon" style={{ width:28,height:28,minWidth:28,minHeight:28 }}
            onClick={()=>setView(v=>{ const d=new Date(v.y,v.m-1,1); return{y:d.getFullYear(),m:d.getMonth()}; })}>
            <ChevronLeft size={13}/>
          </button>
          <button className="btn-icon" style={{ width:28,height:28,minWidth:28,minHeight:28 }}
            onClick={()=>setView(v=>{ const d=new Date(v.y,v.m+1,1); return{y:d.getFullYear(),m:d.getMonth()}; })}>
            <ChevronRight size={13}/>
          </button>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1, marginBottom:4 }}>
        {DAY_ABBR.map(d=>(
          <div key={d} style={{ textAlign:"center", fontSize:".6rem", fontWeight:700, color:"var(--md-on-surface-variant)", padding:"2px 0" }}>{d}</div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2 }}>
        {cells.map((d,i)=>(
          <button key={i} onClick={()=>d && onSelect(new Date(view.y,view.m,d))}
            style={{ border:"none", borderRadius:6, width:"100%", aspectRatio:"1", fontSize:".72rem",
              fontWeight:isToday(d)?700:400,
              background:isSel(d)?"var(--secondary)":isToday(d)?"var(--md-primary-container)":"transparent",
              color:isSel(d)?"#fff":isToday(d)?"var(--secondary)":d?"var(--md-on-surface)":"transparent",
              cursor:d?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center",
              transition:"var(--transition-fast)" }}>
            {d||""}
          </button>
        ))}
      </div>
    </div>
  );
}

const CATEGORIES=[
  { label:"Deep Flow",     color:"#1A237E", icon:<Flame size={11}/> },
  { label:"Steady Rhythm", color:"#FF6D00", icon:<Waves size={11}/> },
  { label:"Vital Reset",   color:"#2E7D32", icon:<Leaf  size={11}/> },
];

const PRIORITY_METHODS=[
  { label:"Matriz Eisenhower", icon:"🧩" },
  { label:"Comerse la Rana",   icon:"🐸" },
];

/* ── initial events ── */
const INIT_EVENTS=[
  // Lunes (day:0): 2 Deep Flow + Steady Rhythm + Vital Reset (al centro) + Steady Rhythm
  { id:1,  day:0, startH:8,  startM:0,  endH:9,  endM:30, title:"Revisión de arquitectura", cat:0 },
  { id:2,  day:0, startH:9,  startM:30, endH:10, endM:30, title:"Planificación de sprint",   cat:1 },
  { id:3,  day:0, startH:10, startM:30, endH:11, endM:0,  title:"Pausa activa",              cat:2 },
  { id:4,  day:0, startH:11, startM:0,  endH:12, endM:0,  title:"Revisión de PRs",           cat:1 },
  { id:5,  day:0, startH:12, startM:0,  endH:13, endM:30, title:"Desarrollo de componentes", cat:0 },
  // Otros días
  { id:6,  day:1, startH:9,  startM:0,  endH:10, endM:30, title:"Diseño wireframes",       cat:1 },
  { id:7,  day:1, startH:11, startM:0,  endH:13, endM:0,  title:"Diseño UX",               cat:1 },
  { id:8,  day:2, startH:9,  startM:0,  endH:11, endM:0,  title:"Pruebas de usabilidad",   cat:0 },
  { id:9,  day:3, startH:10, startM:0,  endH:13, endM:0,  title:"Desarrollo frontend",     cat:1 },
  { id:10, day:2, startH:13, startM:0,  endH:15, endM:30, title:"Diseño de app",           cat:0 },
  { id:11, day:4, startH:9,  startM:0,  endH:11, endM:0,  title:"Vital Reset",             cat:2 },
];

/* ── helper: convert agenda events for a given weekday (0=Mon) to panel tasks ── */
function eventsToTasks(events, dayIndex) {
  const modeMap = { 0: "deep-flow", 1: "steady-rhythm", 2: "vital-reset" };
  return events
    .filter(e => e.day === dayIndex)
    .sort((a, b) => (a.startH * 60 + a.startM) - (b.startH * 60 + b.startM))
    .map((e, i) => {
      const durMin = (e.endH * 60 + e.endM) - (e.startH * 60 + e.startM);
      const durLabel = durMin >= 60 ? `${Math.floor(durMin/60)}h${durMin%60 ? String(durMin%60).padStart(2,"0")+"m" : ""}` : `${durMin} min`;
      return {
        id: e.id,
        label: e.title,
        duration: `~${durLabel}`,
        durationMin: durMin,
        done: false,
        priority: e.cat === 0 ? "high" : e.cat === 2 ? "low" : "med",
        modeId: modeMap[e.cat] || "steady-rhythm",
      };
    });
}

/* ── conflict detection helper ── */
function hasConflict(events, day, startH, startM, endH, endM, excludeId=null) {
  const newStart = startH * 60 + startM;
  const newEnd   = endH   * 60 + endM;
  if (newEnd <= newStart) return false; // invalid range, handled separately
  return events
    .filter(e => e.day === day && e.id !== excludeId)
    .some(e => {
      const eStart = e.startH * 60 + e.startM;
      const eEnd   = e.endH   * 60 + e.endM;
      return newStart < eEnd && newEnd > eStart;
    });
}

/* ── new event dialog ── */
function NewEventDialog({ onSave, onClose, defaultDay, defaultHour, events }) {
  const [title, setTitle]   = useState("");
  const [day,   setDay]     = useState(defaultDay ?? 0);
  const [startH,setStartH]  = useState(defaultHour ?? 9);
  const [startM,setStartM]  = useState(0);
  const [endH,  setEndH]    = useState((defaultHour ?? 9)+1);
  const [endM,  setEndM]    = useState(0);
  const [cat,   setCat]     = useState(0);
  const DAY_LABELS=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

  const newStart = startH * 60 + startM;
  const newEnd   = endH   * 60 + endM;
  const invalidRange   = newEnd <= newStart;
  const conflict       = !invalidRange && hasConflict(events, day, startH, startM, endH, endM);
  const canCreate      = title.trim() && !invalidRange && !conflict;

  const conflictingEv  = conflict
    ? events.filter(e => e.day === day).find(e => {
        const eStart = e.startH*60+e.startM, eEnd = e.endH*60+e.endM;
        return newStart < eEnd && newEnd > eStart;
      })
    : null;

  return (
    <div className="scrim" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="m3-dialog" style={{ maxWidth:400, width:"94%", padding:24 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
          <div className="title-lg">Nueva sesión</div>
          <button className="btn-icon" onClick={onClose} style={{ width:32,height:32 }}><X size={14}/></button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Nombre de la sesión"
            style={{ padding:"10px 14px", borderRadius:"var(--rad-sm)", border:"1.5px solid var(--md-outline-variant)",
              fontFamily:"var(--font-display)", fontSize:".875rem", outline:"none", color:"var(--md-on-surface)" }}/>
          <div style={{ display:"flex", gap:8 }}>
            <div style={{ flex:1 }}>
              <div className="label-sm" style={{ marginBottom:4 }}>Día</div>
              <select value={day} onChange={e=>setDay(+e.target.value)}
                style={{ width:"100%", padding:"8px 10px", borderRadius:"var(--rad-sm)", border:"1.5px solid var(--md-outline-variant)",
                  fontFamily:"var(--font-display)", fontSize:".82rem", background:"var(--md-surface)" }}>
                {DAY_LABELS.map((d,i)=><option key={i} value={i}>{d}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[["Inicio",startH,startM,setStartH,setStartM],["Fin",endH,endM,setEndH,setEndM]].map(([lbl,h,m,setH,setM],idx)=>(
              <div key={idx}>
                <div className="label-sm" style={{ marginBottom:4 }}>{lbl}</div>
                <div style={{ display:"flex", gap:4 }}>
                  <select value={h} onChange={e=>setH(+e.target.value)}
                    style={{ flex:1, padding:"8px 6px", borderRadius:"var(--rad-sm)",
                      border:`1.5px solid ${(conflict||invalidRange)?"var(--md-error)":"var(--md-outline-variant)"}`,
                      fontFamily:"var(--font-mono)", fontSize:".8rem", background:"var(--md-surface)" }}>
                    {Array.from({length:14},(_,i)=>i+7).map(v=><option key={v} value={v}>{String(v).padStart(2,"0")}</option>)}
                  </select>
                  <select value={m} onChange={e=>setM(+e.target.value)}
                    style={{ flex:1, padding:"8px 6px", borderRadius:"var(--rad-sm)",
                      border:`1.5px solid ${(conflict||invalidRange)?"var(--md-error)":"var(--md-outline-variant)"}`,
                      fontFamily:"var(--font-mono)", fontSize:".8rem", background:"var(--md-surface)" }}>
                    {[0,15,30,45].map(v=><option key={v} value={v}>{String(v).padStart(2,"0")}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* ── Error messages ── */}
          {invalidRange && (
            <div style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 12px",
              borderRadius:"var(--rad-sm)", background:"var(--md-error-container)",
              border:"1px solid var(--md-error)", color:"var(--md-error)" }}>
              <AlertCircle size={14} style={{ flexShrink:0 }}/>
              <span className="body-sm" style={{ fontWeight:600, color:"var(--md-error)" }}>
                La hora de fin debe ser mayor que la de inicio.
              </span>
            </div>
          )}
          {conflict && conflictingEv && (
            <div style={{ display:"flex", alignItems:"flex-start", gap:7, padding:"9px 12px",
              borderRadius:"var(--rad-sm)", background:"var(--md-error-container)",
              border:"1px solid var(--md-error)" }}>
              <AlertCircle size={14} style={{ flexShrink:0, color:"var(--md-error)", marginTop:1 }}/>
              <span className="body-sm" style={{ fontWeight:600, color:"var(--md-error)" }}>
                Conflicto con <em style={{ fontStyle:"normal" }}>"{conflictingEv.title}"</em> ({String(conflictingEv.startH).padStart(2,"0")}:{String(conflictingEv.startM).padStart(2,"0")} – {String(conflictingEv.endH).padStart(2,"0")}:{String(conflictingEv.endM).padStart(2,"0")}). Elige otro horario.
              </span>
            </div>
          )}

          <div>
            <div className="label-sm" style={{ marginBottom:6 }}>Categoría</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {CATEGORIES.map((c,i)=>(
                <button key={i} onClick={()=>setCat(i)}
                  style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 10px", borderRadius:"var(--rad-full)",
                    border:`1.5px solid ${cat===i?c.color:"var(--md-outline-variant)"}`,
                    background:cat===i?c.color+"18":"transparent",
                    cursor:"pointer", fontFamily:"var(--font-display)", fontSize:".75rem", fontWeight:600,
                    color:cat===i?c.color:"var(--md-on-surface-variant)", transition:"var(--transition-fast)" }}>
                  <span style={{ color:c.color }}>{c.icon}</span>{c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:10, marginTop:20 }}>
          <button className="btn-outlined" onClick={onClose} style={{ flex:1, justifyContent:"center" }}>Cancelar</button>
          <button className="btn-filled" disabled={!canCreate} onClick={()=>{ onSave({ title,day,startH,startM,endH,endM,cat }); onClose(); }}
            style={{ flex:1, justifyContent:"center" }}>
            <Plus size={14}/> Crear
          </button>
        </div>
      </div>
    </div>
  );
}

function EditEventDialog({ event, onSave, onClose, events }) {
  const [title, setTitle]   = useState(event.title);
  const [day,   setDay]     = useState(event.day);
  const [startH,setStartH]  = useState(event.startH);
  const [startM,setStartM]  = useState(event.startM);
  const [endH,  setEndH]    = useState(event.endH);
  const [endM,  setEndM]    = useState(event.endM);
  const [cat,   setCat]     = useState(event.cat);
  const DAY_LABELS=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

  const newStart = startH * 60 + startM;
  const newEnd   = endH   * 60 + endM;
  const invalidRange = newEnd <= newStart;
  // exclude the event itself from conflict check
  const otherEvents = events.filter(e => e.id !== event.id);
  const conflict = !invalidRange && hasConflict(otherEvents, day, startH, startM, endH, endM);
  const conflictingEv = conflict
    ? otherEvents.filter(e => e.day === day).find(e => {
        const eStart = e.startH*60+e.startM, eEnd = e.endH*60+e.endM;
        return newStart < eEnd && newEnd > eStart;
      })
    : null;
  const canSave = title.trim() && !invalidRange && !conflict;

  return (
    <div className="scrim" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="m3-dialog" style={{ maxWidth:400, width:"94%", padding:24 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
          <div className="title-lg">Editar sesión</div>
          <button className="btn-icon" onClick={onClose} style={{ width:32,height:32 }}><X size={14}/></button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Nombre de la sesión"
            style={{ padding:"10px 14px", borderRadius:"var(--rad-sm)", border:"1.5px solid var(--md-outline-variant)",
              fontFamily:"var(--font-display)", fontSize:".875rem", outline:"none", color:"var(--md-on-surface)" }}/>
          <div style={{ flex:1 }}>
            <div className="label-sm" style={{ marginBottom:4 }}>Día</div>
            <select value={day} onChange={e=>setDay(+e.target.value)}
              style={{ width:"100%", padding:"8px 10px", borderRadius:"var(--rad-sm)", border:"1.5px solid var(--md-outline-variant)",
                fontFamily:"var(--font-display)", fontSize:".82rem", background:"var(--md-surface)" }}>
              {DAY_LABELS.map((d,i)=><option key={i} value={i}>{d}</option>)}
            </select>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[["Inicio",startH,startM,setStartH,setStartM],["Fin",endH,endM,setEndH,setEndM]].map(([lbl,h,m,setH,setM],idx)=>(
              <div key={idx}>
                <div className="label-sm" style={{ marginBottom:4 }}>{lbl}</div>
                <div style={{ display:"flex", gap:4 }}>
                  <select value={h} onChange={e=>setH(+e.target.value)}
                    style={{ flex:1, padding:"8px 6px", borderRadius:"var(--rad-sm)",
                      border:`1.5px solid ${(conflict||invalidRange)?"var(--md-error)":"var(--md-outline-variant)"}`,
                      fontFamily:"var(--font-mono)", fontSize:".8rem", background:"var(--md-surface)" }}>
                    {Array.from({length:14},(_,i)=>i+7).map(v=><option key={v} value={v}>{String(v).padStart(2,"0")}</option>)}
                  </select>
                  <select value={m} onChange={e=>setM(+e.target.value)}
                    style={{ flex:1, padding:"8px 6px", borderRadius:"var(--rad-sm)",
                      border:`1.5px solid ${(conflict||invalidRange)?"var(--md-error)":"var(--md-outline-variant)"}`,
                      fontFamily:"var(--font-mono)", fontSize:".8rem", background:"var(--md-surface)" }}>
                    {[0,15,30,45].map(v=><option key={v} value={v}>{String(v).padStart(2,"0")}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>
          {invalidRange && (
            <div style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 12px",
              borderRadius:"var(--rad-sm)", background:"var(--md-error-container)",
              border:"1px solid var(--md-error)" }}>
              <AlertCircle size={14} style={{ flexShrink:0, color:"var(--md-error)" }}/>
              <span className="body-sm" style={{ fontWeight:600, color:"var(--md-error)" }}>
                La hora de fin debe ser mayor que la de inicio.
              </span>
            </div>
          )}
          {conflict && conflictingEv && (
            <div style={{ display:"flex", alignItems:"flex-start", gap:7, padding:"9px 12px",
              borderRadius:"var(--rad-sm)", background:"var(--md-error-container)",
              border:"1px solid var(--md-error)" }}>
              <AlertCircle size={14} style={{ flexShrink:0, color:"var(--md-error)", marginTop:1 }}/>
              <span className="body-sm" style={{ fontWeight:600, color:"var(--md-error)" }}>
                Conflicto con <em style={{ fontStyle:"normal" }}>"{conflictingEv.title}"</em> ({String(conflictingEv.startH).padStart(2,"0")}:{String(conflictingEv.startM).padStart(2,"0")} – {String(conflictingEv.endH).padStart(2,"0")}:{String(conflictingEv.endM).padStart(2,"0")}). Elige otro horario.
              </span>
            </div>
          )}
          <div>
            <div className="label-sm" style={{ marginBottom:6 }}>Categoría</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {CATEGORIES.map((c,i)=>(
                <button key={i} onClick={()=>setCat(i)}
                  style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 10px", borderRadius:"var(--rad-full)",
                    border:`1.5px solid ${cat===i?c.color:"var(--md-outline-variant)"}`,
                    background:cat===i?c.color+"18":"transparent",
                    cursor:"pointer", fontFamily:"var(--font-display)", fontSize:".75rem", fontWeight:600,
                    color:cat===i?c.color:"var(--md-on-surface-variant)", transition:"var(--transition-fast)" }}>
                  <span style={{ color:c.color }}>{c.icon}</span>{c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:10, marginTop:20 }}>
          <button className="btn-outlined" onClick={onClose} style={{ flex:1, justifyContent:"center" }}>Cancelar</button>
          <button className="btn-filled" disabled={!canSave}
            onClick={()=>{ onSave({ ...event, title, day, startH, startM, endH, endM, cat }); onClose(); }}
            style={{ flex:1, justifyContent:"center" }}>
            <Check size={14}/> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

function AgendaScreen({ events, setEvents }) {
  const today = new Date(2026, 4, 12);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - ((today.getDay()+6)%7));
  const [showNew,    setShowNew]    = useState(false);
  const [newDefDay,  setNewDefDay]  = useState(0);
  const [newDefHour, setNewDefHour] = useState(9);
  const [weekOffset, setWeekOffset] = useState(0);
  const [detailEv,   setDetailEv]   = useState(null);
  const [editEv,     setEditEv]     = useState(null);
  const [selected,   setSelected]   = useState(today);

  const HOURS = Array.from({length:11},(_,i)=>i+7);
  const CELL_H = 56;

  const dispStart = new Date(startOfWeek);
  dispStart.setDate(dispStart.getDate() + weekOffset*7);
  const dispDays = Array.from({length:7},(_,i)=>{ const d=new Date(dispStart); d.setDate(d.getDate()+i); return d; });

  function getWeekNum(d){ const j=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())); j.setUTCDate(j.getUTCDate()+4-(j.getUTCDay()||7)); const y=new Date(Date.UTC(j.getUTCFullYear(),0,1)); return Math.ceil((((j-y)/86400000)+1)/7); }

  const weekLabel = ()=>{
    const a=dispDays[0], b=dispDays[6];
    if(a.getMonth()===b.getMonth()) return `${a.getDate()} – ${b.getDate()} de ${MONTH_NAMES[a.getMonth()]}`;
    return `${a.getDate()} ${MONTH_NAMES[a.getMonth()].slice(0,3)} – ${b.getDate()} ${MONTH_NAMES[b.getMonth()].slice(0,3)}`;
  };

  const isToday = d => d.getFullYear()===today.getFullYear() && d.getMonth()===today.getMonth() && d.getDate()===today.getDate();

  const catTimes = CATEGORIES.map((_,ci)=>{
    const mins = events.filter(e=>e.cat===ci).reduce((acc,e)=>{ const s=e.startH*60+e.startM, en=e.endH*60+e.endM; return acc+(en>s?en-s:0); },0);
    return `${Math.floor(mins/60)}h${String(mins%60).padStart(2,"0")}`;
  });

  const DAY_SHORT=["LUN","MAR","MIÉ","JUE","VIE","SÁB","DOM"];

  const handleSave = ({ title,day,startH,startM,endH,endM,cat }) => {
    setEvents(ev=>{
      if (hasConflict(ev, day, startH, startM, endH, endM)) return ev; // double-guard
      return [...ev, { id:Date.now(), day, startH, startM, endH, endM, title, cat }];
    });
  };

  const handleUpdate = (updatedEv) => {
    setEvents(ev => ev.map(e => e.id === updatedEv.id ? updatedEv : e));
    setDetailEv(null);
  };

  return (
    <div className="page">
      <div className="container">

        {/* ── HEADER ── */}
        <div className="fi" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:10 }}>
          <div>
            <div className="headline-sm">Agenda semanal</div>
            <p className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Semana del {weekLabel()} · Semana {getWeekNum(dispDays[0])}</p>
          </div>
          <button className="btn-filled fi" onClick={()=>{ setNewDefDay(0); setNewDefHour(9); setShowNew(true); }}
            aria-label="Nueva sesión">
            <CalendarPlus size={14}/> Nueva sesión
          </button>
        </div>

        {/* ── LAYOUT 2 COLUMNAS: izquierda fija 260px · derecha flex ── */}
        <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:16, alignItems:"start" }}>

          {/* ══ COLUMNA IZQUIERDA: mini-cal + categorías ══ */}
          <div style={{ display:"grid", gridTemplateRows:"1fr 1fr", gap:16, alignSelf:"start" }}>

            {/* Mini calendario */}
            <div className="m3-card fi fi1" style={{ padding:18 }}>
              <MiniCalendar today={today} selected={selected} onSelect={setSelected}/>
            </div>

            {/* Categorías */}
            <div className="m3-card fi fi2" style={{ padding:18, display:"flex", flexDirection:"column" }}>
              <div className="title-sm" style={{ marginBottom:0, flexShrink:0 }}>Categorías</div>
              <div style={{ display:"flex", flexDirection:"column", flex:1 }}>
                {CATEGORIES.map((c,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:8, flex:1,
                    borderBottom:i<CATEGORIES.length-1?"1px solid var(--md-outline-variant)":"none" }}>
                    <div style={{ width:11, height:11, borderRadius:3, background:c.color, flexShrink:0 }}/>
                    <span className="body-md" style={{ flex:1, fontWeight:500 }}>{c.label}</span>
                    <div style={{ display:"flex", alignItems:"center", gap:4, color:"var(--md-on-surface-variant)" }}>
                      <Clock size={10}/>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:".68rem" }}>{catTimes[i]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ COLUMNA DERECHA: grid semanal ══ */}
          <div style={{ display:"flex", flexDirection:"column", gap:16, alignSelf:"stretch" }}>

            {/* Week nav + grid */}
            <div className="m3-card fi fi1" style={{ padding:0, overflow:"hidden", flex:1, display:"flex", flexDirection:"column" }}>

              {/* Week nav bar */}
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 16px",
                borderBottom:"1px solid var(--md-outline-variant)" }}>
                <button className="btn-icon" style={{ width:34,height:34 }} onClick={()=>setWeekOffset(o=>o-1)} aria-label="Semana anterior">
                  <ChevronLeft size={15}/>
                </button>
                <button className="btn-icon" style={{ width:34,height:34 }} onClick={()=>setWeekOffset(o=>o+1)} aria-label="Semana siguiente">
                  <ChevronRight size={15}/>
                </button>
                <span className="title-sm" style={{ flex:1, color:"var(--md-on-surface-variant)" }}>{weekLabel()}</span>
              </div>

              {/* Grid */}
              <div style={{ overflowY:"auto", overflowX:"auto", flex:1 }}>
                <div style={{ minWidth:480, position:"relative" }}>

                  {/* Day headers */}
                  <div style={{ display:"grid", gridTemplateColumns:"52px repeat(7,1fr)",
                    position:"sticky", top:0, zIndex:10, background:"var(--md-surface)",
                    borderBottom:"1px solid var(--md-outline-variant)" }}>
                    <div/>
                    {dispDays.map((d,i)=>(
                      <div key={i} style={{ padding:"10px 4px", textAlign:"center",
                        borderLeft:"1px solid var(--md-outline-variant)" }}>
                        <div className="label-sm" style={{ color:"var(--md-on-surface-variant)" }}>{DAY_SHORT[i]}</div>
                        <div style={{ fontFamily:"var(--font-mono)", fontSize:"1rem", fontWeight:700, lineHeight:1.4,
                          color:isToday(d)?"var(--secondary)":"var(--md-on-surface)",
                          background:isToday(d)?"var(--md-primary-container)":"transparent",
                          borderRadius:6, margin:"2px auto 0", width:28, height:28,
                          display:"flex", alignItems:"center", justifyContent:"center" }}>
                          {d.getDate()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Time rows */}
                  <div style={{ position:"relative" }}>
                    {HOURS.map(h=>(
                      <div key={h} style={{ display:"grid", gridTemplateColumns:"52px repeat(7,1fr)",
                        borderBottom:"1px solid var(--md-outline-variant)" }}>
                        <div style={{ padding:"6px 8px 0 0", textAlign:"right" }}>
                          <span style={{ fontFamily:"var(--font-mono)", fontSize:".63rem",
                            color:"var(--md-on-surface-variant)", display:"block", marginTop:-7 }}>
                            {String(h).padStart(2,"0")}:00
                          </span>
                        </div>
                        {dispDays.map((_,di)=>{
                          const cellOccupied = hasConflict(events, di, h, 0, h+1, 0);
                          return (
                            <div key={di}
                              onClick={()=>{ if(cellOccupied) return; setNewDefDay(di); setNewDefHour(h); setShowNew(true); }}
                              style={{ borderLeft:"1px solid var(--md-outline-variant)", height:CELL_H,
                                cursor:cellOccupied?"not-allowed":"pointer", transition:"background .1s" }}
                              onMouseEnter={e=>{ if(!cellOccupied) e.currentTarget.style.background="var(--state-hover)"; }}
                              onMouseLeave={e=>e.currentTarget.style.background="transparent"}/>
                          );
                        })}
                      </div>
                    ))}

                    {/* Events overlay */}
                    <div style={{ position:"absolute", inset:0, pointerEvents:"none",
                      display:"grid", gridTemplateColumns:"52px repeat(7,1fr)" }}>
                      <div/>
                      {dispDays.map((_,di)=>{
                        const dayEvs = events.filter(e=>e.day===di);
                        return (
                          <div key={di} style={{ position:"relative", borderLeft:"1px solid transparent" }}>
                            {dayEvs.map(ev=>{
                              const topMin   = (ev.startH - HOURS[0])*60 + ev.startM;
                              const durMin   = (ev.endH*60+ev.endM) - (ev.startH*60+ev.startM);
                              const topPx    = (topMin/60)*CELL_H;
                              const heightPx = (durMin/60)*CELL_H - 2;
                              const c = CATEGORIES[ev.cat];
                              return (
                                <div key={ev.id}
                                  onClick={()=>setDetailEv(ev)}
                                  style={{ position:"absolute", left:3, right:3,
                                    top:topPx, height:Math.max(heightPx,18),
                                    background:c.color+"22",
                                    border:`1.5px solid ${c.color}55`,
                                    borderLeft:`3px solid ${c.color}`,
                                    borderRadius:6, padding:"3px 6px",
                                    pointerEvents:"all", cursor:"pointer",
                                    overflow:"hidden", zIndex:2, transition:"filter .15s" }}
                                  onMouseEnter={e=>e.currentTarget.style.filter="brightness(.92)"}
                                  onMouseLeave={e=>e.currentTarget.style.filter="none"}>
                                  <div style={{ fontFamily:"var(--font-display)", fontSize:".68rem", fontWeight:700,
                                    color:c.color, lineHeight:1.3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                                    {ev.title}
                                  </div>
                                  {heightPx>28 && (
                                    <div style={{ fontFamily:"var(--font-mono)", fontSize:".6rem", color:c.color+"99" }}>
                                      {String(ev.startH).padStart(2,"0")}:{String(ev.startM).padStart(2,"0")} – {String(ev.endH).padStart(2,"0")}:{String(ev.endM).padStart(2,"0")}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dialogs ── */}
      {showNew && <NewEventDialog onSave={handleSave} onClose={()=>setShowNew(false)} defaultDay={newDefDay} defaultHour={newDefHour} events={events}/>}
      {editEv && <EditEventDialog event={editEv} onSave={handleUpdate} onClose={()=>setEditEv(null)} events={events}/>}

      {detailEv && (
        <div className="scrim" onClick={()=>setDetailEv(null)}>
          <div className="m3-dialog" style={{ maxWidth:320, width:"90%", padding:20 }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:11,height:11,borderRadius:3, background:CATEGORIES[detailEv.cat].color, flexShrink:0 }}/>
                <span className="title-md">{detailEv.title}</span>
              </div>
              <button className="btn-icon" style={{ width:30,height:30 }} onClick={()=>setDetailEv(null)}><X size={13}/></button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, color:"var(--md-on-surface-variant)" }}>
                <Clock size={13}/>
                <span className="body-sm">{String(detailEv.startH).padStart(2,"0")}:{String(detailEv.startM).padStart(2,"0")} – {String(detailEv.endH).padStart(2,"0")}:{String(detailEv.endM).padStart(2,"0")}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8, color:"var(--md-on-surface-variant)" }}>
                <Calendar size={13}/>
                <span className="body-sm">{["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"][detailEv.day]}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ color:CATEGORIES[detailEv.cat].color }}>{CATEGORIES[detailEv.cat].icon}</span>
                <span className="body-sm" style={{ color:CATEGORIES[detailEv.cat].color, fontWeight:600 }}>{CATEGORIES[detailEv.cat].label}</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, marginTop:16 }}>
              <button className="btn-outlined" style={{ flex:1, justifyContent:"center" }}
                onClick={()=>{ setEditEv(detailEv); setDetailEv(null); }}>
                Editar
              </button>
              <button className="btn-filled" style={{ flex:1, justifyContent:"center", background:"var(--md-error)" }}
                onClick={()=>{ setEvents(ev=>ev.filter(e=>e.id!==detailEv.id)); setDetailEv(null); }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   HISTORIAL SCREEN
════════════════════════════════════════════ */
function HistorialScreen() {
  const [showEmpty, setShowEmpty] = useState(false);
  const log=[
    { time:"09:42", event:"Sesión Deep Flow iniciada",   detail:"Tarea: Revisión de código · 50 min", type:"focus" },
    { time:"10:32", event:"Sesión completada",            detail:"Bienestar: 94 · Tiempo en foco: 91%", type:"done"  },
    { time:"10:33", event:"Pausa visual",                 detail:"20 segundos de descanso ocular",      type:"eye"   },
    { time:"10:45", event:"Hidratación registrada",       detail:"Vaso 5 del día",                      type:"water" },
    { time:"11:00", event:"Steady Rhythm iniciado",       detail:"Ciclo de 25 min",                     type:"focus" },
    { time:"11:25", event:"Recordatorio de postura",      detail:"Un momento para estirarte",            type:"warn"  },
    { time:"11:50", event:"Vital Reset completado",       detail:"4 movimientos · 15 min",               type:"done"  },
  ];
  const tc={ focus:"var(--secondary)", done:"#2E7D32", water:"#0288D1", warn:"var(--accent)", eye:"#7B5EA7" };
  const tiIcon={ focus:<Zap size={13}/>, done:<CheckCircle2 size={13}/>, water:<Droplets size={13}/>, warn:<AlertCircle size={13}/>, eye:<Eye size={13}/> };
  const tiLabel={ focus:"Sesión", done:"Completado", water:"Hidratación", warn:"Alerta", eye:"Descanso ocular" };
  return (
    <div className="page">
      <div className="container">
        <div className="fi" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <div className="headline-sm">Historial de actividad</div>
            <p className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Últimas 24 horas</p>
          </div>
          {/* Toggle para demostrar estado vacío */}
          <button className="btn-text" style={{ fontSize:".78rem" }} onClick={()=>setShowEmpty(e=>!e)}>
            {showEmpty?"Ver historial":"Ver estado vacío"}
          </button>
        </div>

        {showEmpty ? (
          <div className="m3-card fi" style={{ padding:0 }}>
            <EmptyState
              title="Sin actividad registrada"
              body="Aquí aparecerán tus sesiones de enfoque, pausas y registros de bienestar en tiempo real."
              actionLabel="Iniciar primera sesión"
              onAction={()=>{}}
            />
          </div>
        ) : (
          <>
            <div className="bento g-3 fi fi1" style={{ marginBottom:16 }}>
              {[{ label:"Sesiones hoy", v:"4", c:"var(--secondary)" },{ label:"Tiempo enfocado", v:"3h 12m", c:"var(--accent)" },{ label:"Equilibrio del día", v:"86", c:"#2E7D32" }].map((s,i)=>(
                <div key={i} className="m3-card" style={{ padding:20, textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"2rem", fontWeight:500, color:s.c }}>{s.v}</div>
                  <div className="label-md" style={{ color:"var(--md-on-surface-variant)", marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="m3-card fi fi2" style={{ padding:22 }}>
              <div className="title-md" style={{ marginBottom:14 }}>Registro de auditoría</div>
              {log.map((l,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"10px 0", borderBottom:i<log.length-1?"1px solid var(--md-outline-variant)":"none" }}>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:".72rem", color:"var(--md-on-surface-variant)", width:42, flexShrink:0, paddingTop:2 }} aria-label={`Hora: ${l.time}`}>{l.time}</span>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, flexShrink:0 }}
                    title={tiLabel[l.type]} aria-label={tiLabel[l.type]}>
                    <div style={{ width:30, height:30, borderRadius:8, background:tc[l.type]+"18", display:"flex", alignItems:"center", justifyContent:"center", color:tc[l.type], border:`1px solid ${tc[l.type]}28` }}>
                      {tiIcon[l.type]}
                    </div>
                    <span style={{ fontSize:".58rem", fontWeight:700, color:tc[l.type], letterSpacing:".03em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{tiLabel[l.type]}</span>
                  </div>
                  <div><div className="body-md" style={{ fontWeight:600 }}>{l.event}</div><div className="body-sm" style={{ color:"var(--md-on-surface-variant)", marginTop:1 }}>{l.detail}</div></div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   ACTIVIDAD SCREEN
════════════════════════════════════════════ */
function ActividadScreen() {
  const weekData=[82,67,91,74,88,55,79];
  const days=["L","M","X","J","V","S","D"];
  const max=Math.max(...weekData);
  return (
    <div className="page">
      <div className="container">
        <div className="fi" style={{ marginBottom:20 }}>
          <div className="headline-sm">Tu actividad</div>
          <p className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Cómo fue tu semana</p>
        </div>
        <div className="m3-card fi fi1" style={{ padding:24, marginBottom:16 }}>
          <div className="title-md" style={{ marginBottom:20 }}>Tu foco esta semana</div>
          <div style={{ display:"flex", gap:12, alignItems:"flex-end", height:140 }}>
            {weekData.map((v,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:".72rem", fontWeight:600, color:"var(--secondary)" }}>{v}</div>
                <div style={{ width:"100%", height:`${(v/max)*110}px`, background:i===1?`linear-gradient(to top, var(--secondary), #5C6BC0)`:`linear-gradient(to top, var(--accent), #FF9E40)`,
                  borderRadius:"6px 6px 0 0", opacity:i===6?.5:1, transition:"height .5s ease" }}/>
                <div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>{days[i]}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bento g-2 fi fi2">
          {[
            { label:"Ergonomía y movimiento", items:[{ l:"Postura cómoda", v:68 },{ l:"Pausas activas", v:85 },{ l:"Descanso visual", v:72 }], color:"var(--secondary)" },
            { label:"Hidratación y hábitos",  items:[{ l:"Vasos al día", v:75 },{ l:"Consistencia", v:80 },{ l:"Recordatorios atendidos", v:90 }], color:"#2E7D32" },
          ].map((cat,ci)=>(
            <div key={ci} className="m3-card" style={{ padding:22 }}>
              <div className="title-sm" style={{ marginBottom:16, color:cat.color }}>{cat.label}</div>
              {cat.items.map((item,i)=>(
                <div key={i} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span className="body-md" style={{ fontWeight:500 }}>{item.l}</span>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:".82rem", fontWeight:600, color:cat.color }}>{item.v}%</span>
                  </div>
                  <div className="metric-bar-track">
                    <div className="metric-bar-fill" style={{ width:`${item.v}%`, background:cat.color }}/>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   FAQ FLOAT
════════════════════════════════════════════ */
const FAQ_ITEMS=[
  { icon:"⏱️", q:"¿Qué modos de sesión hay?", a:"Deep Flow (50 min, sin distracciones), Steady Rhythm (25 min con ciclos Pomodoro) y Vital Reset (15 min con guía de movimiento al terminar)." },
  { icon:"🧘", q:"¿Para qué sirve el sensor de postura?", a:"Te da recordatorios amables cuando llevas tiempo en una postura incómoda. El avatar cambia de estado para avisarte sin interrumpirte." },
  { icon:"👁️", q:"¿Qué es la pausa visual?", a:"Cada 20 minutos de pantalla, FocusFlow te recuerda mirar algo a lo lejos por 20 segundos. Cuida tus ojos sin que tengas que pensarlo." },
  { icon:"🎵", q:"¿Para qué sirve el audio?", a:"Conecta tu playlist favorita de Spotify o YouTube a cada modo. El botón de audio la activa o silencia sin perder tu configuración." },
  { icon:"💧", q:"¿Cómo funcionan los recordatorios de agua?", a:"Si llevas más de 45 minutos sin hidratarte, aparece un aviso suave. El objetivo es 8 vasos al día. Sin presión, solo un recordatorio amable." },
];

const SESSION_MODE_INFO = [
  {
    id:"deep-flow",
    emoji:"🔵",
    label:"Deep Flow",
    color:"#1A237E",
    bg:"#E8EAF6",
    duration:"50 min",
    desc:"El modo de máxima concentración. Diseñado para trabajo cognitivo exigente: código, escritura, diseño o análisis profundo. Sin interrupciones, con ambiente sonoro inmersivo. Tu energía cognitiva es más valiosa en este estado.",
    tips:["Cierra notificaciones antes de iniciar","Ideal para la primera mitad del día","No lo uses más de 3 veces seguidas sin un Vital Reset"],
  },
  {
    id:"steady-rhythm",
    emoji:"🟠",
    label:"Steady Rhythm",
    color:"#FF6D00",
    bg:"#FFF3E0",
    duration:"25 min",
    desc:"Basado en la técnica Pomodoro. Ideal para tareas operativas, reuniones cortas, revisión de correos o trabajo colaborativo. El ritmo constante mantiene tu energía estable a lo largo del día.",
    tips:["Perfecto para listas de tareas medianas","Alterna con Deep Flow para mayor productividad","Después de 4 ciclos, tómate un Vital Reset largo"],
  },
  {
    id:"vital-reset",
    emoji:"🟢",
    label:"Vital Reset",
    color:"#2E7D32",
    bg:"#E8F5E9",
    duration:"15 min",
    desc:"Tu pausa activa guiada. Al terminar el temporizador, FocusFlow te propone movimientos de estiramiento y respiración. No es tiempo perdido — es una inversión que eleva tu rendimiento en la siguiente sesión.",
    tips:["Úsalo entre sesiones de Deep Flow","Aprovecha para hidratarte y descansar la vista","El cuerpo en movimiento recarga la mente"],
  },
];

const SCHEDULE_MODE_INFO = [
  {
    emoji:"🎛️",
    label:"Modo Manual",
    color:"var(--md-on-surface)",
    bg:"var(--md-surface-variant)",
    desc:"Tú decides qué modo activar y cuándo cambiar. Tienes control total sobre los tiempos y el orden de tus sesiones. Ideal si tu jornada varía cada día o prefieres improvisar según tu energía.",
    tips:["Configura la duración de cada modo en el ícono ⚙️","Puedes cambiar de modo en cualquier momento","No hay avances automáticos; tú marcas el ritmo"],
  },
  {
    emoji:"🔁",
    label:"Modo Automático",
    color:"#1A237E",
    bg:"#E8EAF6",
    desc:"FocusFlow lee tu agenda y programa las sesiones automáticamente. El temporizador adopta la duración real de cada evento. Al terminar una tarea, recibirás una notificación para continuar con la siguiente.",
    tips:["Agrega eventos en la sección Agenda primero","Si cambias la agenda, pulsa 'Actualizar' en el panel","Marca tareas como hechas para avanzar al siguiente tiempo"],
  },
];

function SessionModeCard({ info }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderRadius:"var(--rad-md)", marginBottom:6, overflow:"hidden",
      border:`1.5px solid ${open ? info.color : "var(--md-outline-variant)"}`,
      background: open ? info.bg : "transparent", transition:"all .18s" }}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{ width:"100%", background:"none", border:"none", cursor:"pointer",
          padding:"11px 13px", display:"flex", alignItems:"center", gap:10,
          fontFamily:"var(--font-display)", textAlign:"left" }}>
        <span style={{ fontSize:".95rem", flexShrink:0 }}>{info.emoji}</span>
        <div style={{ flex:1 }}>
          <span className="body-md" style={{ fontWeight:700, color: open ? info.color : "var(--md-on-surface)" }}>
            {info.label}
          </span>
          {info.duration && (
            <span style={{ marginLeft:8, fontSize:".65rem", fontWeight:700, color:info.color,
              background:info.color+"20", padding:"2px 7px", borderRadius:99 }}>
              {info.duration}
            </span>
          )}
        </div>
        <span style={{ fontSize:".65rem", color: open ? info.color : "var(--md-on-surface-variant)",
          transition:"transform .18s", display:"inline-block", transform: open?"rotate(180deg)":"rotate(0)" }}>▼</span>
      </button>
      {open && (
        <div style={{ padding:"0 13px 12px 36px", animation:"fade-in .18s ease both" }}>
          <p className="body-sm" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.65, margin:"0 0 10px" }}>
            {info.desc}
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {info.tips.map((tip,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:7 }}>
                <span style={{ color:info.color, fontSize:".75rem", marginTop:1, flexShrink:0 }}>✓</span>
                <span className="body-sm" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.5 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FaqFloat() {
  const [open, setOpen]=useState(false);
  const [exp, setExp]=useState(null);
  const [tab, setTab]=useState("modos"); // "modos" | "faq"
  return (
    <>
      {open && (
        <div className="faq-panel" role="complementary" aria-label="Preguntas frecuentes">
          <div style={{ padding:"18px 20px 14px", borderBottom:"1px solid var(--md-outline-variant)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:"var(--md-primary-container)", display:"flex", alignItems:"center", justifyContent:"center" }}><Shield size={16} style={{ color:"var(--secondary)" }}/></div>
              <div><div className="title-sm">¿En qué te puedo ayudar?</div><div className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>Guía rápida de FocusFlow</div></div>
            </div>
            <button className="btn-icon" onClick={()=>setOpen(false)} aria-label="Cerrar panel de preguntas frecuentes"><X size={14} aria-hidden="true"/></button>
          </div>

          {/* Tab bar */}
          <div style={{ display:"flex", gap:0, borderBottom:"1px solid var(--md-outline-variant)" }}>
            {[["modos","Modos y Sesiones"],["faq","Preguntas frecuentes"]].map(([id,lbl])=>(
              <button key={id} onClick={()=>setTab(id)}
                style={{ flex:1, padding:"9px 8px", border:"none", background:"none", cursor:"pointer",
                  fontFamily:"var(--font-display)", fontSize:".73rem", fontWeight:700,
                  color: tab===id ? "var(--secondary)" : "var(--md-on-surface-variant)",
                  borderBottom: tab===id ? "2px solid var(--secondary)" : "2px solid transparent",
                  transition:"all .15s" }}>
                {lbl}
              </button>
            ))}
          </div>

          <div style={{ maxHeight:460, overflowY:"auto", padding:"10px 12px 14px" }}>
            {tab==="modos" ? (
              <>
                <p className="body-sm" style={{ color:"var(--md-on-surface-variant)", margin:"4px 2px 12px", lineHeight:1.5 }}>
                  Cada modo está diseñado para un tipo distinto de energía y tarea. Elige el que mejor se adapte a tu momento.
                </p>
                <div className="label-sm" style={{ marginBottom:6, marginLeft:2, color:"var(--md-on-surface-variant)" }}>TIPOS DE SESIÓN</div>
                {SESSION_MODE_INFO.map((m,i)=><SessionModeCard key={i} info={m}/>)}
                <div className="label-sm" style={{ margin:"14px 0 6px 2px", color:"var(--md-on-surface-variant)" }}>MODOS DE PROGRAMACIÓN</div>
                {SCHEDULE_MODE_INFO.map((m,i)=><SessionModeCard key={i} info={m}/>)}
              </>
            ) : (
              FAQ_ITEMS.map((item,i)=>(
                <div key={i} style={{ borderRadius:"var(--rad-md)", marginBottom:6, overflow:"hidden", border:`1.5px solid ${exp===i?"var(--md-outline)":"var(--md-outline-variant)"}`, background:exp===i?"var(--md-surface-1)":"transparent", transition:"all .18s" }}>
                  <button onClick={()=>setExp(exp===i?null:i)} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding:"11px 13px", display:"flex", alignItems:"center", gap:10, fontFamily:"var(--font-display)", textAlign:"left" }} aria-expanded={exp===i}>
                    <span style={{ fontSize:".95rem", flexShrink:0 }}>{item.icon}</span>
                    <span className="body-md" style={{ flex:1, fontWeight:600, color:exp===i?"var(--secondary)":"var(--md-on-surface)" }}>{item.q}</span>
                    <span style={{ fontSize:".65rem", color:exp===i?"var(--secondary)":"var(--md-on-surface-variant)", transition:"transform .18s", display:"inline-block", transform:exp===i?"rotate(180deg)":"rotate(0)" }}>▼</span>
                  </button>
                  {exp===i && <div className="body-sm" style={{ padding:"0 13px 12px 36px", color:"var(--md-on-surface-variant)", lineHeight:1.6, animation:"fade-in .18s ease both" }}>{item.a}</div>}
                </div>
              ))
            )}
          </div>
          <div style={{ padding:"10px 20px 16px", borderTop:"1px solid var(--md-outline-variant)", textAlign:"center" }}>
            <span className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>¿Más ayuda? <a href="#" style={{ color:"var(--secondary)", textDecoration:"none", fontWeight:700 }}>Centro de soporte →</a></span>
          </div>
        </div>
      )}
      <button className="fab faq-btn" onClick={()=>setOpen(o=>!o)} aria-label="Preguntas frecuentes" title="FAQ">
        {open?<X size={20}/>:<span style={{ fontSize:".82rem", fontWeight:800, fontFamily:"var(--font-display)" }}>Ayuda</span>}
      </button>
    </>
  );
}

/* ════════════════════════════════════════════
   PLAN CONTEXT — Estado Global de Suscripción
════════════════════════════════════════════ */
const PlanContext = createContext({ userPlan:"free", setUserPlan:()=>{}, openPlans:()=>{} });
const usePlan = () => useContext(PlanContext);

/* ════════════════════════════════════════════
   MICROCOPY — copies empáticos por arquetipo
════════════════════════════════════════════ */
const MICROCOPY = {
  presets: {
    title: "Presets Inteligentes",
    body:  "Automatiza tus rutinas y reduce decisiones con los Presets Inteligentes. Pruébalo gratis por 7 días y simplifica tu jornada.",
  },
  historial: {
    title: "Tu historial completo",
    body:  "Visualiza tus tendencias a largo plazo y alcanza tu Balance Zen. Accede a tu historial completo con el Plan Pro.",
  },
  actividad: {
    title: "Analíticas predictivas",
    body:  "Visualiza tus tendencias a largo plazo y alcanza tu Balance Zen. Accede a tu historial completo con el Plan Pro.",
  },
  quickstart: {
    title: "Inicio ultra-rápido",
    body:  "Automatiza tus rutinas y reduce decisiones con los Presets Inteligentes. Pruébalo gratis por 7 días y simplifica tu jornada.",
  },
};

/* ════════════════════════════════════════════
   GATE MODAL — aparece cuando free intenta
   acceder a feature de plan Pro
════════════════════════════════════════════ */
function GateModal({ feature, onClose, onUpgrade }) {
  const mc = MICROCOPY[feature] || MICROCOPY.presets;
  return (
    <div className="scrim" onClick={e=>e.target===e.currentTarget&&onClose()} style={{ zIndex:3000 }}>
      <div className="m3-dialog" style={{ maxWidth:420, width:"94%", padding:28 }}>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div style={{ width:56, height:56, borderRadius:18, background:"var(--md-primary-container)",
            display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
            <Sparkles size={22} style={{ color:"var(--secondary)" }}/>
          </div>
          <div className="title-lg" style={{ marginBottom:8 }}>{mc.title}</div>
          <p className="body-md" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.7 }}>{mc.body}</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <button className="btn-filled" onClick={onUpgrade}
            style={{ justifyContent:"center", width:"100%" }}>
            <Sparkles size={14}/> Ver planes — 7 días gratis
          </button>
          <button onClick={onClose}
            style={{ background:"none", border:"none", cursor:"pointer", padding:"10px 0",
              fontFamily:"var(--font-display)", fontSize:".875rem", color:"var(--md-on-surface-variant)",
              textAlign:"center" }}>
            Continuar en mi flujo actual
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SUSCRIPCION SCREEN — Bento Grid de Planes
════════════════════════════════════════════ */
const PLANS = [
  {
    id:       "free",
    name:     "Flow Básico",
    badge:    "Gratis",
    badgeColor:"var(--md-outline)",
    price:    "$0",
    period:   "para siempre",
    color:    "var(--md-outline)",
    bg:       "var(--md-surface-variant)",
    icon:     <Leaf size={20}/>,
    features: [
      "Sesiones Pomodoro 25/5",
      "Modo Deep Flow local",
      "Dashboard del día de hoy",
      "Sensor de postura e hidratación",
    ],
    locked: [
      "Presets Inteligentes",
      "Historial y Actividad",
      "Inicio ultra-rápido",
    ],
    cta: "Tu plan actual",
    ctaDisabled: true,
  },
  {
    id:       "pro",
    name:     "Flow Pro",
    badge:    "Más popular",
    badgeColor:"var(--secondary)",
    price:    "$7",
    period:   "/ mes · 7 días gratis",
    color:    "var(--secondary)",
    bg:       "#E8EAF6",
    icon:     <Zap size={20}/>,
    features: [
      "Todo lo del plan Básico",
      "Presets Inteligentes ilimitados",
      "Historial completo + Analíticas",
      "Inicio ultra-rápido (1 clic)",
      "Sincronización entre dispositivos",
      "Soporte prioritario",
    ],
    locked: [],
    cta: "Empezar 7 días gratis",
    ctaDisabled: false,
    highlight: true,
  },
  {
    id:       "lifetime",
    name:     "Zen Pass",
    badge:    "Pago único",
    badgeColor:"var(--accent)",
    price:    "$149",
    period:   "una sola vez · para siempre",
    color:    "var(--accent)",
    bg:       "#FFF8F0",
    icon:     <Heart size={20}/>,
    features: [
      "Todo lo del plan Pro",
      "Acceso de por vida sin mensualidades",
      "Actualizaciones futuras incluidas",
      "Acceso anticipado a nuevas funciones",
    ],
    locked: [],
    zenDesc: "Un único espacio, tuyo para siempre. Olvídate de los pagos mensuales y comprométete con tu bienestar a largo plazo.",
    cta: "Obtener Zen Pass",
    ctaDisabled: false,
  },
];

function SuscripcionScreen({ onClose, onSelectPlan, currentPlan }) {
  const [billing, setBilling] = useState("monthly");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:2800, overflowY:"auto",
      background:"var(--md-background)",
      fontFamily:"var(--font-display)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(18px)",
      transition:"opacity .35s cubic-bezier(.4,0,.2,1), transform .35s cubic-bezier(.4,0,.2,1)",
    }}>
      <div style={{ width:"100%", maxWidth:1020, margin:"0 auto", padding:"32px 24px 64px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:36, position:"relative" }}>
          <button onClick={handleClose} style={{
            position:"absolute", top:0, right:0, background:"none", border:"none",
            cursor:"pointer", color:"var(--md-on-surface-variant)",
            display:"flex", alignItems:"center", gap:6,
            fontFamily:"var(--font-display)", fontSize:".85rem", fontWeight:600
          }}>
            <X size={16}/> Continuar en mi flujo actual
          </button>

          <div style={{
            display:"inline-flex", alignItems:"center", gap:8, padding:"5px 16px",
            borderRadius:"var(--rad-full)", background:"var(--md-primary-container)",
            border:"1px solid var(--md-outline-variant)", marginBottom:18
          }}>
            <Sparkles size={13} style={{ color:"var(--secondary)" }}/>
            <span className="label-sm" style={{ color:"var(--secondary)" }}>Tu Plan de Bienestar</span>
          </div>

          <div className="headline-md" style={{ marginBottom:12, color:"var(--md-on-surface)" }}>
            Elige cómo quieres <span style={{ color:"var(--secondary)" }}>cuidar tu energía</span>
          </div>
          <p className="body-lg" style={{ color:"var(--md-on-surface-variant)", maxWidth:520, margin:"0 auto 24px", lineHeight:1.7 }}>
            Sin urgencias artificiales. Sin contadores regresivos. Solo transparencia total sobre lo que recibes.
          </p>

          {/* Billing toggle */}
          <div style={{
            display:"inline-flex", borderRadius:"var(--rad-full)",
            border:"1.5px solid var(--md-outline-variant)",
            overflow:"hidden", background:"var(--md-surface-variant)"
          }}>
            {[["monthly","Mensual"],["annual","Anual · −20%"]].map(([val,lbl])=>(
              <button key={val} onClick={()=>setBilling(val)}
                style={{
                  padding:"9px 22px", border:"none", cursor:"pointer",
                  fontFamily:"var(--font-display)", fontSize:".85rem", fontWeight:700,
                  transition:"all .18s",
                  background:billing===val ? "var(--secondary)" : "transparent",
                  color:billing===val ? "#fff" : "var(--md-on-surface-variant)",
                  borderRadius:"var(--rad-full)"
                }}>
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Bento grid de planes — 3 columnas */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.08fr 1fr", gap:18, alignItems:"stretch" }}>
          {PLANS.map(plan => {
            const isCurrentPlan = plan.id === currentPlan;
            const proPrice = billing==="annual" ? "$5.6" : "$7";
            const displayPrice = plan.id==="pro" ? proPrice : plan.price;
            return (
              <div key={plan.id} style={{
                borderRadius:"var(--rad-lg)", padding:28,
                background: plan.highlight ? "#fff" : "var(--md-surface)",
                border:`2px solid ${isCurrentPlan ? plan.color : plan.highlight ? plan.color : "var(--md-outline-variant)"}`,
                boxShadow: plan.highlight
                  ? "0 12px 40px rgba(26,35,126,.14)"
                  : "var(--md-elev-1)",
                display:"flex", flexDirection:"column",
                transform: plan.highlight ? "translateY(-6px)" : "none",
              }}>

                {/* Icon + Badge row */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
                  <div style={{
                    width:46, height:46, borderRadius:14,
                    background:`${plan.color}14`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:plan.color
                  }}>
                    {plan.icon}
                  </div>
                  <span style={{
                    fontSize:".68rem", fontWeight:800,
                    color: plan.highlight || plan.id==="lifetime" ? "#fff" : plan.badgeColor,
                    background: plan.highlight ? plan.color : plan.id==="lifetime" ? plan.color : "var(--md-surface-variant)",
                    border: plan.highlight || plan.id==="lifetime" ? "none" : `1px solid ${plan.badgeColor}`,
                    padding:"4px 12px", borderRadius:99,
                    letterSpacing:".05em", textTransform:"uppercase"
                  }}>
                    {isCurrentPlan ? "Plan activo" : plan.badge}
                  </span>
                </div>

                {/* Name */}
                <div className="headline-sm" style={{ color:plan.color, marginBottom:6 }}>{plan.name}</div>

                {/* Precio */}
                <div style={{ display:"flex", alignItems:"baseline", gap:5, marginBottom: plan.zenDesc ? 10 : 16 }}>
                  <span style={{
                    fontFamily:"var(--font-mono)", fontSize:"2.2rem", fontWeight:700,
                    color:"var(--md-on-surface)"
                  }}>{displayPrice}</span>
                  <span className="body-sm" style={{ color:"var(--md-on-surface-variant)" }}>{plan.period}</span>
                </div>

                {/* Zen Pass description */}
                {plan.zenDesc && (
                  <p className="body-sm" style={{
                    color:"var(--md-on-surface-variant)", lineHeight:1.7,
                    marginBottom:16, fontStyle:"italic",
                    padding:"10px 12px", background:"var(--md-surface-variant)",
                    borderRadius:"var(--rad-md)"
                  }}>
                    "{plan.zenDesc}"
                  </p>
                )}

                <div className="m3-divider" style={{ margin:"0 0 16px" }}/>

                {/* Features */}
                <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
                  {plan.features.map((f,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:9 }}>
                      <CheckCircle2 size={15} style={{ color:plan.color, flexShrink:0, marginTop:1 }}/>
                      <span className="body-sm" style={{ color:"var(--md-on-surface)", lineHeight:1.5 }}>{f}</span>
                    </div>
                  ))}
                  {plan.locked?.map((f,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:9, opacity:.4 }}>
                      <div style={{
                        width:15, height:15, borderRadius:"50%",
                        border:"1.5px solid var(--md-outline)",
                        flexShrink:0, marginTop:1
                      }}/>
                      <span className="body-sm" style={{ color:"var(--md-on-surface-variant)", lineHeight:1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={()=>{ if(!plan.ctaDisabled && !isCurrentPlan){ setVisible(false); setTimeout(()=>onSelectPlan(plan.id), 350); } }}
                  disabled={plan.ctaDisabled || isCurrentPlan}
                  style={{
                    width:"100%", padding:"13px 0", borderRadius:"var(--rad-full)",
                    border: plan.highlight && !isCurrentPlan ? "none" : `2px solid ${isCurrentPlan ? "var(--md-outline-variant)" : plan.color}`,
                    cursor: plan.ctaDisabled || isCurrentPlan ? "default" : "pointer",
                    background: isCurrentPlan
                      ? "var(--md-surface-variant)"
                      : plan.highlight ? plan.color : "transparent",
                    color: isCurrentPlan
                      ? "var(--md-outline)"
                      : plan.highlight ? "#fff" : plan.color,
                    fontFamily:"var(--font-display)", fontWeight:700, fontSize:".88rem",
                    transition:"all .18s",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:8
                  }}>
                  {isCurrentPlan ? <><Check size={14}/> Plan activo</> : plan.cta}
                </button>

              </div>
            );
          })}
        </div>

        {/* Footer disclaimer */}
        <p className="body-sm" style={{
          textAlign:"center", color:"var(--md-on-surface-variant)",
          marginTop:28, lineHeight:1.7
        }}>
          Sin compromisos. Cancela cuando quieras. Tus datos siempre te pertenecen.
        </p>

      </div>
    </div>
  );
}
const NAV=[
  { id:"inicio",   label:"Inicio",    icon:<Home size={15}/> },
  { id:"panel",    label:"Panel",     icon:<LayoutDashboard size={15}/> },
  { id:"agenda",   label:"Agenda",    icon:<Calendar size={15}/> },
  { id:"historial",label:"Historial", icon:<History size={15}/> },
  { id:"actividad",label:"Actividad", icon:<Activity size={15}/> },
];

/* ════════════════════════════════════════════
   SCREEN WRAPPER — keeps children mounted but
   visually hidden when inactive so all state
   (timers, tasks, hydration, posture) survives
   navigation between tabs.
════════════════════════════════════════════ */
function ScreenSlot({ active, children }) {
  return (
    <div
      aria-hidden={!active}
      style={{
        display: active ? "block" : "none",
        visibility: active ? "visible" : "hidden",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

function FocusFlow() {
  const [screen, setScreen]             = useState("login");
  const [frogTask, setFrogTask]         = useState("");
  const [shellMounted, setShellMounted] = useState(false);
  const [userPlan, setUserPlan]         = useState("free");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [gateFeature, setGateFeature]   = useState(null); // feature name for GateModal

  // ── Shared agenda events: lifted so PanelScreen & AgendaScreen stay in sync ──
  const [agendaEvents, setAgendaEvents] = useState(INIT_EVENTS);

  // Live session status
  const [sessionStatus, setSessionStatus] = useState({ running: false, mode: null, secs: 0 });
  const sessionCtxValue = { ...sessionStatus, set: setSessionStatus };

  const openPlans = () => setIsSubscribing(true);

  const handleLogin = (dest) => {
    setShellMounted(true);
    setScreen(dest || "onboarding");
  };
  const handleOnboardingComplete = ({ frogTask: ft }) => {
    setFrogTask(ft);
    setScreen("inicio");   // go to inicio after onboarding
  };

  // Nav click guard for free-locked screens
  const handleNavClick = (id) => {
    if (userPlan === "free" && (id === "historial" || id === "actividad")) {
      setGateFeature(id);
      return;
    }
    setScreen(id);
  };

  if (screen === "login") {
    return (
      <>
        <M3Styles/>
        <main role="main"><LoginScreen onLogin={handleLogin}/></main>
      </>
    );
  }
  if (screen === "onboarding") {
    return (
      <PlanContext.Provider value={{ userPlan, setUserPlan, openPlans }}>
        <M3Styles/>
        <main role="main">
          <OnboardingFlow onComplete={handleOnboardingComplete} userPlan={userPlan} onOpenPlans={openPlans}/>
        </main>
        {isSubscribing && (
          <SuscripcionScreen
            currentPlan={userPlan}
            onClose={()=>setIsSubscribing(false)}
            onSelectPlan={(plan)=>{ setUserPlan(plan); setIsSubscribing(false); }}
          />
        )}
      </PlanContext.Provider>
    );
  }

  const { running: sessionRunning, mode: sessionMode, secs: sessionSecs } = sessionStatus;
  const timerMins = String(Math.floor(sessionSecs / 60)).padStart(2,"0");
  const timerSecs2 = String(sessionSecs % 60).padStart(2,"0");

  return (
    <PlanContext.Provider value={{ userPlan, setUserPlan, openPlans }}>
      <SessionStatusContext.Provider value={sessionCtxValue}>
        <M3Styles/>
        <nav className="nav-bar" role="navigation" aria-label="Navegación principal">
          <div className="nav-logo" onClick={()=>setScreen("inicio")} role="link" aria-label="Inicio FocusFlow" tabIndex={0} onKeyDown={e=>e.key==="Enter"&&setScreen("inicio")}>
            <div style={{ width:34, height:34, borderRadius:10, background:"var(--secondary)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Zap size={17} color="#fff"/>
            </div>
            Focus<em>Flow</em>
          </div>
          <div className="nav-links" role="menubar">
            {NAV.map(item=>(
              <button key={item.id}
                className={`nav-link m3-ripple ${screen===item.id?"active":""} ${userPlan==="free"&&(item.id==="historial"||item.id==="actividad")?"nav-link-locked":""}`}
                onClick={()=>handleNavClick(item.id)}
                role="menuitem" aria-current={screen===item.id?"page":undefined}
                aria-label={item.label}>
                {item.icon} {item.label}
                {/* Pro lock icon on restricted nav items */}
                {userPlan==="free" && (item.id==="historial"||item.id==="actividad") && (
                  <span style={{ fontSize:".6rem", color:"var(--accent)", marginLeft:2 }}>✦</span>
                )}
                {item.id==="panel" && sessionRunning && screen!=="panel" && (
                  <span style={{
                    display:"inline-flex", alignItems:"center", gap:3,
                    background: sessionMode?.color || "var(--secondary)",
                    color:"#fff", borderRadius:"var(--rad-full)",
                    fontSize:".62rem", fontWeight:700, padding:"1px 7px",
                    fontFamily:"var(--font-mono)", letterSpacing:".02em",
                    animation:"pulse-dot 1.4s ease infinite",
                  }} aria-label={`Sesión en curso: ${timerMins}:${timerSecs2}`}>
                    ● {timerMins}:{timerSecs2}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {/* Mi Espacio Zen — acceso sutil a planes */}
            <button onClick={openPlans}
              style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px",
                borderRadius:"var(--rad-full)", border:"1px solid var(--md-outline-variant)",
                background: userPlan==="free" ? "var(--md-surface-variant)" : "var(--md-primary-container)",
                cursor:"pointer", fontFamily:"var(--font-display)", fontSize:".75rem",
                fontWeight:700, color: userPlan==="free" ? "var(--md-on-surface-variant)" : "var(--secondary)",
                transition:"all .18s" }}
              aria-label="Mi Plan de Bienestar">
              <Sparkles size={12} style={{ color: userPlan==="free" ? "var(--md-outline)" : "var(--secondary)" }}/>
              {userPlan==="free" ? "Mi Espacio Zen" : userPlan==="pro" ? "Flow Pro ✦" : "Zen Pass ✦"}
            </button>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"var(--secondary)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:".82rem", fontWeight:700, color:"#fff" }} aria-label="Avatar de usuario" role="img">A</div>
            <button className="btn-icon" onClick={()=>{ try{localStorage.removeItem(OB_COMPLETED_KEY);}catch(e){} setScreen("login"); setShellMounted(false); }} aria-label="Cerrar sesión" title="Cerrar sesión"><LogOut size={15} aria-hidden="true"/></button>
          </div>
        </nav>

        <main role="main">
          <ScreenSlot active={screen==="inicio"}>
            <InicioScreen frogTask={frogTask} onNavigate={handleNavClick}/>
          </ScreenSlot>
          <ScreenSlot active={screen==="panel"}>
            <PanelScreen onNavigate={handleNavClick} frogTask={frogTask} agendaEvents={agendaEvents}/>
          </ScreenSlot>
          <ScreenSlot active={screen==="agenda"}>
            <AgendaScreen events={agendaEvents} setEvents={setAgendaEvents}/>
          </ScreenSlot>
          <ScreenSlot active={screen==="historial"}>
            <HistorialScreen/>
          </ScreenSlot>
          <ScreenSlot active={screen==="actividad"}>
            <ActividadScreen/>
          </ScreenSlot>
        </main>

        <FaqFloat/>

        {/* Gate modal para features bloqueadas */}
        {gateFeature && (
          <GateModal
            feature={gateFeature}
            onClose={()=>setGateFeature(null)}
            onUpgrade={()=>{ setGateFeature(null); setIsSubscribing(true); }}
          />
        )}

        {/* Modal de planes */}
        {isSubscribing && (
          <SuscripcionScreen
            currentPlan={userPlan}
            onClose={()=>setIsSubscribing(false)}
            onSelectPlan={(plan)=>{ setUserPlan(plan); setIsSubscribing(false); }}
          />
        )}

      </SessionStatusContext.Provider>
    </PlanContext.Provider>
  );
}


export default FocusFlow;
