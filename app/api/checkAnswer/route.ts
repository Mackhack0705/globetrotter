import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    const { city, userAnswer } = await req.json();
    
    const isCorrect = city.toLowerCase() === userAnswer.toLowerCase();
    return NextResponse.json({ isCorrect });
}