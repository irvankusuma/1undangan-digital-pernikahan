import { prisma } from "@/lib/prisma";
import { requireFields } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const invitations = await prisma.invitation.findMany({
    where: userId ? { userId } : undefined,
    include: { musicTracks: true, payments: true },
  });

  return NextResponse.json({ data: invitations });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, [
    "userId",
    "eventName",
    "hostName",
    "eventDate",
    "location",
    "mapsEmbed",
  ]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const invitation = await prisma.invitation.create({
    data: {
      userId: body.userId,
      eventName: body.eventName,
      hostName: body.hostName,
      eventDate: new Date(body.eventDate),
      location: body.location,
      mapsEmbed: body.mapsEmbed,
      slug: body.slug ?? `${body.eventName}`.toLowerCase().replace(/\s+/g, "-"),
      gallery: body.gallery ?? [],
    },
  });

  return NextResponse.json({ data: invitation }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, ["id"]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const invitation = await prisma.invitation.update({
    where: { id: body.id },
    data: {
      eventName: body.eventName,
      hostName: body.hostName,
      eventDate: body.eventDate ? new Date(body.eventDate) : undefined,
      location: body.location,
      mapsEmbed: body.mapsEmbed,
      gallery: body.gallery,
    },
  });

  return NextResponse.json({ data: invitation });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id wajib" }, { status: 400 });
  }

  await prisma.invitation.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
