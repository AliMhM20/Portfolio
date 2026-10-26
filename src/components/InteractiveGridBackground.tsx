import React, { useEffect, useRef } from 'react';

interface Vertex {
  x0: number;
  y0: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const SPACING = 48; // Architectural 48px grid cell
const RADIUS = 280; // Doubled effective radius of gravitational attraction (px)
const MAX_DISP = 24; // Increased gravitational pull displacement (px)
const SPRING_K = 0.16; // Elastic spring stiffness
const DAMPING = 0.80; // Velocity friction damping

export const InteractiveGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = false;

    // Viewport dimensions
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;

    // Mouse coordinates
    let mouseX = -1000;
    let mouseY = -1000;

    // Grid Vertices
    let cols = 0;
    let rows = 0;
    let grid: Vertex[][] = [];

    const initGrid = () => {
      winWidth = window.innerWidth;
      winHeight = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(winWidth * dpr);
      canvas.height = Math.floor(winHeight * dpr);
      canvas.style.width = `${winWidth}px`;
      canvas.style.height = `${winHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cols = Math.ceil(winWidth / SPACING) + 2;
      rows = Math.ceil(winHeight / SPACING) + 2;

      grid = [];
      for (let c = 0; c < cols; c++) {
        const col: Vertex[] = [];
        const x0 = c * SPACING;
        for (let r = 0; r < rows; r++) {
          const y0 = r * SPACING;
          col.push({
            x0,
            y0,
            x: x0,
            y: y0,
            vx: 0,
            vy: 0,
          });
        }
        grid.push(col);
      }
    };

    initGrid();

    const handleResize = () => {
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;
    };

    const handleMouseEnter = () => {
      isVisible = true;
    };

    const handleMouseLeave = () => {
      isVisible = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    // Animation & Gravitational Physics Loop
    const loop = () => {
      // Bounding box around mouse for fast selective vertex calculation
      const minCol = Math.max(0, Math.floor((mouseX - RADIUS - 20) / SPACING));
      const maxCol = Math.min(cols - 1, Math.ceil((mouseX + RADIUS + 20) / SPACING));
      const minRow = Math.max(0, Math.floor((mouseY - RADIUS - 20) / SPACING));
      const maxRow = Math.min(rows - 1, Math.ceil((mouseY + RADIUS + 20) / SPACING));

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const v = grid[c][r];

          let targetX = v.x0;
          let targetY = v.y0;

          // Check if vertex is within local influence radius of mouse
          if (isVisible && c >= minCol && c <= maxCol && r >= minRow && r <= maxRow) {
            const dx = mouseX - v.x0; // Vector pointing towards mouse
            const dy = mouseY - v.y0;
            const distSq = dx * dx + dy * dy;

            if (distSq < RADIUS * RADIUS && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              // Smooth quadratic falloff: 1 at cursor center, decaying smoothly to 0 at edge
              const norm = 1 - dist / RADIUS;
              const force = norm * norm;

              // Gravitational Attraction: pulls intersection nodes gently toward cursor
              const disp = MAX_DISP * force;
              targetX = v.x0 + (dx / dist) * disp;
              targetY = v.y0 + (dy / dist) * disp;
            }
          }

          // Elastic Spring-Damper System
          const ax = (targetX - v.x) * SPRING_K;
          const ay = (targetY - v.y) * SPRING_K;

          v.vx = (v.vx + ax) * DAMPING;
          v.vy = (v.vy + ay) * DAMPING;

          v.x += v.vx;
          v.y += v.vy;

          // Settle threshold to lock stationary vertices at rest
          if (Math.abs(v.x - targetX) < 0.01 && Math.abs(v.vx) < 0.01) {
            v.x = targetX;
            v.vx = 0;
          }
          if (Math.abs(v.y - targetY) < 0.01 && Math.abs(v.vy) < 0.01) {
            v.y = targetY;
            v.vy = 0;
          }
        }
      }

      // Render Canvas Grid Lines (strictly uniform colors - NO highlighted lines)
      ctx.clearRect(0, 0, winWidth, winHeight);

      const isDark = document.documentElement.classList.contains('dark');

      const vertColor = isDark ? 'rgba(249, 115, 22, 0.08)' : 'rgba(0, 0, 0, 0.045)';
      const horizColor = isDark ? 'rgba(254, 215, 170, 0.06)' : 'rgba(0, 0, 0, 0.045)';

      // 1. Draw Vertical Lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = vertColor;
      for (let c = 0; c < cols; c++) {
        const col = grid[c];
        let hasDeform = false;
        for (let r = 0; r < rows; r++) {
          if (Math.abs(col[r].x - col[r].x0) > 0.08 || Math.abs(col[r].y - col[r].y0) > 0.08) {
            hasDeform = true;
            break;
          }
        }

        ctx.beginPath();
        if (!hasDeform) {
          ctx.moveTo(col[0].x0, col[0].y0);
          ctx.lineTo(col[rows - 1].x0, col[rows - 1].y0);
        } else {
          ctx.moveTo(col[0].x, col[0].y);
          for (let r = 0; r < rows - 1; r++) {
            const midX = (col[r].x + col[r + 1].x) / 2;
            const midY = (col[r].y + col[r + 1].y) / 2;
            ctx.quadraticCurveTo(col[r].x, col[r].y, midX, midY);
          }
          ctx.lineTo(col[rows - 1].x, col[rows - 1].y);
        }
        ctx.stroke();
      }

      // 2. Draw Horizontal Lines
      ctx.strokeStyle = horizColor;
      for (let r = 0; r < rows; r++) {
        let hasDeform = false;
        for (let c = 0; c < cols; c++) {
          if (Math.abs(grid[c][r].x - grid[c][r].x0) > 0.08 || Math.abs(grid[c][r].y - grid[c][r].y0) > 0.08) {
            hasDeform = true;
            break;
          }
        }

        ctx.beginPath();
        if (!hasDeform) {
          ctx.moveTo(grid[0][r].x0, grid[0][r].y0);
          ctx.lineTo(grid[cols - 1][r].x0, grid[cols - 1][r].y0);
        } else {
          ctx.moveTo(grid[0][r].x, grid[0][r].y);
          for (let c = 0; c < cols - 1; c++) {
            const midX = (grid[c][r].x + grid[c + 1][r].x) / 2;
            const midY = (grid[c][r].y + grid[c + 1][r].y) / 2;
            ctx.quadraticCurveTo(grid[c][r].x, grid[c][r].y, midX, midY);
          }
          ctx.lineTo(grid[cols - 1][r].x, grid[cols - 1][r].y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
};
