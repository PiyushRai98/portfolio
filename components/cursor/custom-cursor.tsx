"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const glow = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Trail canvas
    const canvas = trailRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const trail: { x: number; y: number; alpha: number }[] = [];

    const animate = () => {
      // Smooth cursor follow
      cursor.current.x += (mouse.current.x - cursor.current.x) * 0.15;
      cursor.current.y += (mouse.current.y - cursor.current.y) * 0.15;
      glow.current.x += (mouse.current.x - glow.current.x) * 0.08;
      glow.current.y += (mouse.current.y - glow.current.y) * 0.08;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursor.current.x}px, ${cursor.current.y}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.current.x}px, ${glow.current.y}px)`;
      }

      // Trail
      trail.push({
        x: cursor.current.x,
        y: cursor.current.y,
        alpha: 0.4,
      });
      if (trail.length > 20) trail.shift();

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        trail.forEach((point, i) => {
          point.alpha *= 0.92;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2 + i * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(124, 58, 237, ${point.alpha})`;
          ctx.fill();
        });
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <canvas
        ref={trailRef}
        className="fixed inset-0 z-[10000] pointer-events-none"
        aria-hidden="true"
      />
      {/* Outer glow ring */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-[10001] pointer-events-none"
        style={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          marginLeft: isHovering ? -30 : -20,
          marginTop: isHovering ? -30 : -20,
          borderRadius: "50%",
          border: `1px solid rgba(124, 58, 237, ${isHovering ? 0.6 : 0.3})`,
          boxShadow: isHovering
            ? "0 0 20px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.1)"
            : "0 0 10px rgba(124, 58, 237, 0.2)",
          transition: "width 0.3s, height 0.3s, margin 0.3s, border 0.3s, box-shadow 0.3s",
          willChange: "transform",
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10002] pointer-events-none"
        style={{
          width: isClicking ? 4 : 6,
          height: isClicking ? 4 : 6,
          marginLeft: isClicking ? -2 : -3,
          marginTop: isClicking ? -2 : -3,
          borderRadius: "50%",
          backgroundColor: "#7c3aed",
          boxShadow: "0 0 10px rgba(124, 58, 237, 0.8)",
          transition: "width 0.15s, height 0.15s, margin 0.15s",
          willChange: "transform",
        }}
      />
    </>
  );
}
