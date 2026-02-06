import { prisma } from "@/lib/prisma";
import { requireFields } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const invitationId = searchParams.get("invitationId");

  const tracks = await prisma.musicTrack.findMany({
    where: invitationId ? { invitationId } : undefined,
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ data: tracks });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, ["invitationId", "title", "youtubeUrl"]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  if (body.isDefault) {
    await prisma.musicTrack.updateMany({
      where: { invitationId: body.invitationId },
      data: { isDefault: false },
    });
  }

  const track = await prisma.musicTrack.create({
    data: {
      invitationId: body.invitationId,
      title: body.title,
      youtubeUrl: body.youtubeUrl,
      isDefault: body.isDefault ?? false,
    },
  });

  return NextResponse.json({ data: track }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, ["id"]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  if (body.isDefault && body.invitationId) {
    await prisma.musicTrack.updateMany({
      where: { invitationId: body.invitationId },
      data: { isDefault: false },
    });
  }

  const track = await prisma.musicTrack.update({
    where: { id: body.id },
    data: {
      title: body.title,
      youtubeUrl: body.youtubeUrl,
      isDefault: body.isDefault,
    },
  });

  return NextResponse.json({ data: track });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id wajib" }, { status: 400 });
  }

  await prisma.musicTrack.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
