import { NextResponse } from 'next/server';
import { handleCreateEnquiry } from 'skwc-backend';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const result = await handleCreateEnquiry(body);
  return NextResponse.json(result.body, { status: result.status });
}
