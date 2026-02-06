import { prisma } from "@/lib/prisma";
import { requireFields } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const invitationId = searchParams.get("invitationId");

  const viewers = await prisma.viewer.findMany({
    where: invitationId ? { invitationId } : undefined,
    orderBy: { visitedAt: "desc" },
  });

  return NextResponse.json({ data: viewers });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, ["invitationId", "device"]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const viewer = await prisma.viewer.create({
    data: {
      invitationId: body.invitationId,
      device: body.device,
    },
  });

  return NextResponse.json({ data: viewer }, { status: 201 });
}
