"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface SocialBadge {
  platform: 'farcaster' | 'github';
  url: string;
}

interface ProfileHeaderProps {
  userName: string;
  userBio: string;
  badges: SocialBadge[];
}

export function ProfileHeader({ userName, userBio, badges }: ProfileHeaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Animated gradient setup
    let animationFrameId: number;
    let gradientOffset = 0;
    
    const drawGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsl(${gradientOffset}, 70%, 50%)`);
      gradient.addColorStop(1, `hsl(${gradientOffset + 60}, 70%, 50%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      gradientOffset = (gradientOffset + 0.5) % 360;
      animationFrameId = requestAnimationFrame(drawGradient);
    };

    drawGradient();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative h-48 w-full overflow-hidden">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full animate-pulse-slow"
        width={1200}
        height={400}
      />
      
      <div className="relative z-10 p-6 flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 rounded-full border-2 border-white/20 bg-background/80 backdrop-blur-sm">
          <Image
            src="/default-avatar.png"
            alt="Profile picture"
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>
        
        <div className="text-center">
          <h1 className="text-xl font-semibold text-white">{userName}</h1>
          <p className="text-sm text-white/80">{userBio}</p>
        </div>
        
        <div className="flex gap-2">
          {badges.map((badge, index) => (
            <a
              key={index}
              href={badge.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {badge.platform === 'farcaster' ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  {/* Farcaster icon SVG path */}
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  {/* GitHub icon SVG path */}
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
