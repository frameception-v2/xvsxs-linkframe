interface FrameResponse {
  frames: Frame[];
  message: string;
}

interface Frame {
  id: string;
  title: string;
  timestamp: number;
  actions: FrameAction[];
}

interface FrameAction {
  type: 'post' | 'redirect';
  target: string;
  label: string;
}

export async function fetchFrameData(frameId: string): Promise<FrameResponse> {
  const apiKey = process.env.NEYNAR_API_KEY;
  if (!apiKey) {
    throw new Error('NEYNAR_API_KEY environment variable not set');
  }

  const response = await fetch(`https://api.neynar.com/v2/farcaster/frame?frame_id=${frameId}`, {
    headers: {
      'Content-Type': 'application/json',
      'api_key': apiKey,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Neynar API error: ${response.statusText}`);
  }

  const { frame } = await response.json();
  return frame as FrameResponse;
}
