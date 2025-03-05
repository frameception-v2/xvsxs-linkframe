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
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
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
            priority
            style={{
              objectFit: "cover",
            }}
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
                  <path 
                    fill="currentColor" 
                    d="M18.44 3.12H5.56c-.95 0-1.72.77-1.72 1.72v14.32c0 .95.77 1.72 1.72 1.72h12.88c.95 0 1.72-.77 1.72-1.72V4.84c0-.95-.77-1.72-1.72-1.72ZM12 17.76c-2.36 0-4.28-1.92-4.28-4.28S9.64 9.2 12 9.2s4.28 1.92 4.28 4.28-1.92 4.28-4.28 4.28Z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
