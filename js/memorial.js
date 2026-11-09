/**
 * FloodTechLab — November 10 Commemoration Component (memorial.js)
 * ------------------------------------------------------------------
 * Zero-side-effect, self-contained Web Component / Shadow DOM module.
 * To remove after November 11: simply delete the <script src="...memorial.js">
 * tag from index.html and floodtuber/index.html.
 */
(function () {
  'use strict';

  if (document.getElementById('ftl-memorial-root')) return;

  function initMemorial() {
    if (document.getElementById('ftl-memorial-root')) return;

    const host = document.createElement('div');
    host.id = 'ftl-memorial-root';
    const shadow = host.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          all: initial;
          display: block;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #f0f2f8;
          z-index: 2147483640;
          position: relative;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* ====== TOP GLASS BAR ====== */
        .memorial-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 40px;
          background: linear-gradient(
            90deg,
            rgba(7, 9, 14, 0.92) 0%,
            rgba(14, 18, 28, 0.88) 50%,
            rgba(7, 9, 14, 0.92) 100%
          );
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 10002;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px 16px;
          cursor: pointer;
          user-select: none;
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          overflow: hidden;
        }

        /* Subtle ambient top-bar glow line */
        .memorial-bar::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 15%;
          right: 15%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(226, 192, 116, 0.45) 35%,
            rgba(0, 168, 255, 0.55) 65%,
            transparent 100%
          );
          opacity: 0.55;
          transition: opacity 0.35s ease, left 0.5s ease, right 0.5s ease;
          pointer-events: none;
        }

        .memorial-bar:hover,
        .memorial-bar.is-open {
          background: linear-gradient(
            90deg,
            rgba(10, 13, 22, 0.96) 0%,
            rgba(18, 24, 38, 0.94) 50%,
            rgba(10, 13, 22, 0.96) 100%
          );
          border-bottom-color: rgba(226, 192, 116, 0.28);
          box-shadow:
            0 4px 28px rgba(0, 0, 0, 0.55),
            0 0 24px rgba(226, 192, 116, 0.08),
            0 0 32px rgba(0, 168, 255, 0.08);
        }

        .memorial-bar:hover::before,
        .memorial-bar.is-open::before {
          opacity: 1;
          left: 5%;
          right: 5%;
        }

        .bar-inner {
          width: 100%;
          max-width: 1240px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        /* Left / Corner Minimalist Infinity Badge */
        .eternal-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 3px 11px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(226, 192, 116, 0.32);
          font-family: 'Orbitron', 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.9px;
          color: #f3dca2;
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: inset 0 0 12px rgba(226, 192, 116, 0.08);
          transition: all 0.3s ease;
        }

        .memorial-bar:hover .eternal-badge {
          border-color: rgba(226, 192, 116, 0.6);
          box-shadow: 0 0 14px rgba(226, 192, 116, 0.2), inset 0 0 12px rgba(226, 192, 116, 0.12);
          transform: translateY(-0.5px);
        }

        .eternal-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f3dca2;
          box-shadow: 0 0 8px #f3dca2;
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .infinity-sym {
          font-size: 0.95rem;
          line-height: 1;
          color: #ffffff;
          text-shadow: 0 0 8px rgba(0, 168, 255, 0.6);
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.55; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        /* Center Tribute Statement */
        .bar-message {
          font-size: 0.82rem;
          line-height: 1.4;
          color: #d6dae6;
          text-align: center;
          flex: 1;
          letter-spacing: 0.15px;
          transition: color 0.3s ease;
        }

        .memorial-bar:hover .bar-message {
          color: #ffffff;
        }

        .bar-message strong {
          color: #ffffff;
          font-weight: 600;
        }

        .bar-message .inline-dates {
          color: #f3dca2;
          font-weight: 500;
        }

        /* Right Action Pill */
        .bar-actions {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .quote-trigger {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(0, 168, 255, 0.08);
          border: 1px solid rgba(0, 168, 255, 0.24);
          color: #7dd3fc;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.3px;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .memorial-bar:hover .quote-trigger,
        .memorial-bar.is-open .quote-trigger {
          background: rgba(0, 168, 255, 0.16);
          border-color: rgba(0, 168, 255, 0.48);
          color: #ffffff;
          box-shadow: 0 0 12px rgba(0, 168, 255, 0.25);
        }

        .chevron-icon {
          width: 12px;
          height: 12px;
          transition: transform 0.3s ease;
        }

        .memorial-bar.is-open .chevron-icon {
          transform: rotate(180deg);
        }

        /* ====== GLASSMORPHIC DETAIL CARD (MODAL / POPOVER) ====== */
        .detail-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 5, 10, 0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 10001;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .detail-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }

        .detail-card {
          position: fixed;
          top: 52px;
          left: 50%;
          transform: translate(-50%, -12px) scale(0.97);
          width: calc(100% - 32px);
          max-width: 560px;
          background: linear-gradient(
            145deg,
            rgba(14, 18, 28, 0.92) 0%,
            rgba(9, 11, 18, 0.96) 100%
          );
          backdrop-filter: blur(22px) saturate(180%);
          -webkit-backdrop-filter: blur(22px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-top: 1px solid rgba(226, 192, 116, 0.4);
          border-radius: 18px;
          padding: 24px 26px 22px;
          box-shadow:
            0 24px 60px rgba(0, 0, 0, 0.75),
            0 0 40px rgba(0, 168, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          z-index: 10003;
          opacity: 0;
          pointer-events: none;
          transition:
            opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .detail-card.open {
          opacity: 1;
          pointer-events: auto;
          transform: translate(-50%, 0) scale(1);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .card-commemoration-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Orbitron', 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #f3dca2;
        }

        .card-close {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #9ca3af;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          line-height: 1;
          transition: all 0.2s ease;
        }

        .card-close:hover {
          background: rgba(255, 255, 255, 0.14);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.25);
        }

        /* Featured Quote Block */
        .quote-box {
          position: relative;
          padding: 16px 20px;
          margin-bottom: 16px;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            rgba(226, 192, 116, 0.08) 0%,
            rgba(0, 168, 255, 0.06) 100%
          );
          border: 1px solid rgba(226, 192, 116, 0.22);
        }

        .quote-text {
          font-family: 'Orbitron', 'Inter', sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          line-height: 1.45;
          color: #ffffff;
          letter-spacing: 0.3px;
          margin-bottom: 8px;
          text-shadow: 0 0 20px rgba(226, 192, 116, 0.25);
        }

        .quote-author {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.78rem;
          color: #f3dca2;
          font-weight: 500;
        }

        .quote-original {
          font-size: 0.73rem;
          color: #8b95a8;
          font-style: italic;
        }

        /* Tribute Body */
        .card-body-text {
          font-size: 0.88rem;
          line-height: 1.65;
          color: #cbd5e1;
          margin-bottom: 16px;
        }

        .card-body-text strong {
          color: #ffffff;
          font-weight: 600;
        }

        /* Pillar Tags */
        .card-pillars {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .pillar-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.73rem;
          font-weight: 500;
          color: #94a3b8;
        }

        .pillar-tag span {
          color: #00A8FF;
        }

        /* Responsive adjustments */
        @media (max-width: 860px) {
          .bar-inner {
            gap: 10px;
          }
          .bar-message {
            font-size: 0.76rem;
            text-align: left;
          }
          .quote-trigger .trigger-label {
            display: none;
          }
        }

        @media (max-width: 560px) {
          .memorial-bar {
            padding: 6px 10px;
          }
          .eternal-badge {
            padding: 2px 8px;
            font-size: 0.66rem;
          }
          .bar-message {
            font-size: 0.72rem;
          }
          .bar-message .inline-dates {
            display: none;
          }
          .detail-card {
            padding: 20px 18px 18px;
          }
          .quote-text {
            font-size: 0.92rem;
          }
        }
      </style>

      <div class="memorial-bar" id="memorial-bar" role="button" tabindex="0" aria-expanded="false" aria-label="In memory of Mustafa Kemal Atatürk (1881 – 1938). Click for tribute details.">
        <div class="bar-inner">
          <div class="eternal-badge" title="November 10 — Eternal Respect">
            <span class="eternal-dot"></span>
            <span>1881 – 1938</span>
            <span class="infinity-sym">∞</span>
          </div>

          <p class="bar-message">
            In memory of <strong>Mustafa Kemal Atatürk</strong> <span class="inline-dates">(1881 – 1938 ∞)</span> — whose visionary trust in science, youth, and progress continues to inspire our creations.
          </p>

          <div class="bar-actions">
            <span class="quote-trigger">
              <span class="trigger-label">Vision &amp; Quote</span>
              <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div class="detail-backdrop" id="detail-backdrop"></div>

      <div class="detail-card" id="detail-card" role="dialog" aria-modal="false" aria-label="Mustafa Kemal Atatürk Commemoration">
        <div class="card-top">
          <div class="card-commemoration-tag">
            <span class="eternal-dot"></span>
            <span>November 10 · 1881 – 1938 ∞</span>
          </div>
          <button class="card-close" id="card-close" type="button" aria-label="Close tribute card">&times;</button>
        </div>

        <div class="quote-box">
          <div class="quote-text">“Science is the most reliable guide in life.”</div>
          <div class="quote-author">
            <span>— Mustafa Kemal Atatürk</span>
            <span class="quote-original">“Hayatta en hakiki mürşit ilimdir, fendir.”</span>
          </div>
        </div>

        <p class="card-body-text">
          In memory of <strong>Mustafa Kemal Atatürk (1881 – 1938 ∞)</strong> — whose visionary trust in science, youth, and progress continues to inspire our creations. We honor his enduring legacy by building open, forward-looking technology for the global community.
        </p>

        <div class="card-pillars">
          <span class="pillar-tag"><span>✦</span> Science &amp; Rationality</span>
          <span class="pillar-tag"><span>✦</span> Youth &amp; Future</span>
          <span class="pillar-tag"><span>✦</span> Innovation &amp; Progress</span>
        </div>
      </div>
    `;

    document.body.prepend(host);

    const bar = shadow.getElementById('memorial-bar');
    const card = shadow.getElementById('detail-card');
    const backdrop = shadow.getElementById('detail-backdrop');
    const closeBtn = shadow.getElementById('card-close');

    // Dynamically offset fixed navbar so the top bar never covers navigation links
    function syncNavbarOffset() {
      const navbar = document.querySelector('.navbar');
      if (!navbar || !bar) return;
      const h = bar.offsetHeight || 40;
      navbar.style.top = h + 'px';
      card.style.top = (h + 12) + 'px';
    }

    syncNavbarOffset();
    window.addEventListener('resize', syncNavbarOffset);

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(syncNavbarOffset);
      ro.observe(bar);
    }

    let isOpen = false;

    function setOpen(nextState) {
      isOpen = Boolean(nextState);
      bar.classList.toggle('is-open', isOpen);
      bar.setAttribute('aria-expanded', String(isOpen));
      card.classList.toggle('open', isOpen);
      backdrop.classList.toggle('open', isOpen);
    }

    bar.addEventListener('click', function () {
      setOpen(!isOpen);
    });

    bar.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(!isOpen);
      }
    });

    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(false);
    });

    backdrop.addEventListener('click', function () {
      setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMemorial);
  } else {
    initMemorial();
  }
})();
