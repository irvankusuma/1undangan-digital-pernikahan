import { prisma } from "@/lib/prisma";
import { requireFields } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const invitationId = searchParams.get("invitationId");

  const templates = await prisma.captionTemplate.findMany({
    where: invitationId ? { invitationId } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: templates });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, ["invitationId", "channel", "template"]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const template = await prisma.captionTemplate.create({
    data: {
      invitationId: body.invitationId,
      channel: body.channel,
      template: body.template,
    },
  });

  return NextResponse.json({ data: template }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, ["id"]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const template = await prisma.captionTemplate.update({
    where: { id: body.id },
    data: {
      channel: body.channel,
      template: body.template,
    },
  });

  return NextResponse.json({ data: template });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id wajib" }, { status: 400 });
  }

  await prisma.captionTemplate.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
