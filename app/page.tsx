/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

function downloadBlob(data: Blob, filename: string) {
  const url = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function svgToPng(svgElement: SVGSVGElement, scale = 2): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svgElement.viewBox.baseVal.width * scale;
      canvas.height = svgElement.viewBox.baseVal.height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("2D context not available"));
        return;
      }
      ctx.fillStyle = "#0f1220";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to create PNG blob"));
          return;
        }
        resolve(blob);
      }, "image/png");
      URL.revokeObjectURL(url);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function Page() {
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [accent, setAccent] = React.useState("#60a5fa");
  const [brand, setBrand] = React.useState("#6ee7b7");

  const onDownloadSvg = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const str = serializer.serializeToString(svgRef.current);
    const blob = new Blob([str], { type: "image/svg+xml;charset=utf-8" });
    downloadBlob(blob, "pria-menggendong-puma.svg");
  };
  const onDownloadPng = async () => {
    if (!svgRef.current) return;
    const png = await svgToPng(svgRef.current, 2);
    downloadBlob(png, "pria-menggendong-puma.png");
  };

  return (
    <main className="container">
      <div className="header">
        <div>
          <div className="title">Pria Menggendong Puma</div>
          <div className="muted">Ilustrasi vektor dapat diunduh (SVG & PNG)</div>
        </div>
        <div className="toolbar">
          <button className="button primary" onClick={onDownloadSvg}>
            Simpan SVG
          </button>
          <button className="button accent" onClick={onDownloadPng}>
            Simpan PNG
          </button>
        </div>
      </div>

      <div className="card canvas-wrap">
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 900 600"
          width="100%"
          height="auto"
        >
          {/* Background */}
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#182038" />
              <stop offset="1" stopColor="#0f1220" />
            </linearGradient>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            </filter>
          </defs>
          <rect width="900" height="600" fill="url(#bg)" />

          {/* Ambient shapes */}
          <g opacity="0.25" filter="url(#soft)">
            <circle cx="120" cy="140" r="90" fill={brand} />
            <circle cx="820" cy="110" r="70" fill={accent} />
            <circle cx="770" cy="540" r="80" fill={brand} />
          </g>

          {/* Ground ellipse */}
          <ellipse cx="450" cy="510" rx="300" ry="40" fill="rgba(0,0,0,0.35)" />

          {/* Man carrying puma - stylized geometric design */}
          <g transform="translate(300,120)">
            {/* Shadow behind figure */}
            <ellipse cx="160" cy="380" rx="140" ry="22" fill="rgba(0,0,0,0.35)" />

            {/* Torso */}
            <path
              d="M145 170 c0 -48 34 -78 70 -78 36 0 70 30 70 78 0 68 -28 112 -70 112 -42 0 -70 -44 -70 -112z"
              fill="#334155"
            />
            {/* Head */}
            <circle cx="205" cy="120" r="36" fill="#f3d2b5" />
            <path d="M176 115 q29 -22 58 0" stroke="#0f172a" strokeWidth="3" fill="none" />
            <circle cx="194" cy="121" r="3" fill="#0f172a" />
            <circle cx="214" cy="121" r="3" fill="#0f172a" />
            <path d="M193 134 q12 8 24 0" stroke="#0f172a" strokeWidth="3" fill="none" />

            {/* Left arm under puma */}
            <path
              d="M145 210 q40 20 80 20 q40 0 75 -20"
              stroke="#f3d2b5"
              strokeWidth="22"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right arm supporting puma */}
            <path
              d="M150 240 q40 30 80 30 q40 0 75 -30"
              stroke="#f3d2b5"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />

            {/* Puma body */}
            <g transform="translate(80,150)">
              {/* Body */}
              <path
                d="M40 100 q100 -70 220 -30 q28 8 50 32 q24 26 10 50 q-12 20 -46 16 q-32 -3 -60 -14 q-25 -7 -54 -7 q-45 0 -92 10 q-32 7 -47 -7 q-16 -16 -2 -36 q8 -12 21 -14z"
                fill="#c89b6a"
                stroke="#8b6a45"
                strokeWidth="2"
              />
              {/* Back and pattern */}
              <path
                d="M55 95 q90 -60 210 -28"
                stroke={accent}
                strokeWidth="4"
                fill="none"
                opacity="0.35"
              />
              {/* Head */}
              <g transform="translate(250,90)">
                <ellipse cx="38" cy="24" rx="40" ry="26" fill="#c89b6a" stroke="#8b6a45" strokeWidth="2" />
                <circle cx="54" cy="20" r="4" fill="#0f172a" />
                <path d="M18 16 q10 -10 24 -6" stroke="#0f172a" strokeWidth="2" fill="none" />
                {/* Ears */}
                <path d="M12 8 l8 -12 l8 16" fill="#c89b6a" stroke="#8b6a45" strokeWidth="2" />
                <path d="M60 6 l8 -12 l8 16" fill="#c89b6a" stroke="#8b6a45" strokeWidth="2" />
                {/* Muzzle */}
                <ellipse cx="52" cy="26" rx="12" ry="8" fill="#e8caa3" />
              </g>
              {/* Legs hanging */}
              <path
                d="M120 160 q-10 40 -6 70"
                stroke="#8b6a45"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M170 150 q-8 34 -4 62"
                stroke="#8b6a45"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Tail */}
              <path
                d="M60 150 q-40 20 -50 50 q-5 16 10 24 q18 10 32 -8 q10 -12 12 -30"
                stroke="#8b6a45"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* Legs of man */}
            <path d="M180 290 q-10 70 -8 118" stroke="#1e293b" strokeWidth="20" strokeLinecap="round" />
            <path d="M225 290 q-4 78 0 118" stroke="#1e293b" strokeWidth="20" strokeLinecap="round" />
            {/* Shoes */}
            <path d="M170 409 q20 10 44 0" stroke={brand} strokeWidth="10" strokeLinecap="round" />
            <path d="M212 409 q22 10 46 0" stroke={brand} strokeWidth="10" strokeLinecap="round" />
          </g>

          {/* Foreground sparkles */}
          <g opacity="0.7">
            <circle cx="120" cy="280" r="2" fill={brand} />
            <circle cx="780" cy="320" r="2" fill={accent} />
            <circle cx="640" cy="220" r="2" fill={brand} />
            <circle cx="250" cy="380" r="2" fill={accent} />
          </g>
        </svg>
      </div>

      <div className="row" style={{ marginTop: 14 }}>
        <span className="muted">Warna aksen:</span>
        <input
          type="color"
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
          style={{ width: 40, height: 28, background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6 }}
        />
        <span className="muted">Warna sepatu:</span>
        <input
          type="color"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          style={{ width: 40, height: 28, background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6 }}
        />
      </div>

      <div className="footer muted">
        Tip: Anda dapat menyesuaikan warna, lalu unduh hasilnya.
        <div className="legend">
          <span className="legend-pill">SVG vektor</span>
          <span className="legend-pill">Canvas PNG</span>
          <span className="legend-pill">Tanpa dependensi eksternal</span>
        </div>
      </div>
    </main>
  );
}

