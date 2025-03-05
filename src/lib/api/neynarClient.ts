interface FrameResponse {
  id: string;
  title: string;
  buttons: Array<{
    label: string;
    action: 'post'|'link'|'mint';
    target?: string;
  }>;
  image: string;
  postUrl: string;
  createdAt: number;
}

export async function fetchFrameData(frameId: string): Promise<FrameResponse> {
  const apiKey = process.env.NEYNAR_API_KEY;
  if (!apiKey) {
    throw new Error('NEYNAR_API_KEY environment variable not set');
  }

  const response = await fetch(`https://api.neynar.com/v1/frames/${frameId}`, {
    headers: {
      'api_key': apiKey,
      'content-type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error(`Neynar API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.frame as FrameResponse;
}
