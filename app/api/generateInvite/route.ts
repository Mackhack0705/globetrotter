import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { username } = await req.json();

    // Generate a unique invite link
    const inviteLink = `http://localhost:3000/play?invitedBy=${username}`;

    NextResponse.json({ inviteLink });
}