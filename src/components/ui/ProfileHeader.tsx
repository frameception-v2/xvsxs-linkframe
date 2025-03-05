"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";

interface SocialBadge {
  platform: 'farcaster' | 'github';
  url: string;
}

interface ProfileHeaderProps {
  userName: string;
  userBio: string;
  badges: SocialBadge[];
  src: string;
  className?: string;
}

const getBadgeIcon = (platform: SocialBadge['platform']) => {
  const iconClass = "h-6 w-6 text-white hover:opacity-80 transition-opacity";
  
  switch(platform) {
    case 'github':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );
    case 'farcaster':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.5H5c-1.4 0-2.5 1.1-2.5 2.5v8c0 1.4 1.1 2.5 2.5 2.5h14c1.4 0 2.5-1.1 2.5-2.5V9c0-1.4-1.1-2.5-2.5-2.5zm-8.5 5.7v3.3h-2v-3.3H6V9.8h2.5V7.2h2v2.5H13V12h-2.5zm8.5 3.3h-2v-2h-1.5v2h-2V9.8h2v2h1.5v-2h2v7.5z"/>
        </svg>
      );
  }
};

export function ProfileHeader({ userName, userBio, badges, src, className }: ProfileHeaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match parent
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateCanvasSize();
    
    // Create radial gradient with primary color
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, 'rgba(129, 79, 239, 0.4)');
    gradient.addColorStop(1, 'rgba(129, 79, 239, 0)');

    // Pulsing animation
    let animationFrameId: number;
    let opacity = 0;
    let increasing = true;

    const animate = () => {
      if (increasing) {
        opacity += 0.02;
        if (opacity >= 0.8) increasing = false;
      } else {
        opacity -= 0.02;
        if (opacity <= 0.2) increasing = true;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = opacity;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className={cn("relative h-48 w-full overflow-hidden", className)}>
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      <div className="relative z-10 p-6 flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 rounded-full border-2 border-white/20 bg-background/80 backdrop-blur-sm">
          <Image
            src={src}
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
        
        <div className="flex gap-3">
          {badges.map((badge, index) => (
            <a
              key={index}
              href={badge.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted hover:bg-accent transition-colors"
              aria-label={`${badge.platform} profile`}
            >
              {getBadgeIcon(badge.platform)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
