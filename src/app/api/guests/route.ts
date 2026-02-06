import { prisma } from "@/lib/prisma";
import { requireFields } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const invitationId = searchParams.get("invitationId");

  const guests = await prisma.guest.findMany({
    where: invitationId ? { invitationId } : undefined,
  });

  return NextResponse.json({ data: guests });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, ["invitationId", "name", "attendance"]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const guest = await prisma.guest.create({
    data: {
      invitationId: body.invitationId,
      name: body.name,
      attendance: body.attendance,
    },
  });

  return NextResponse.json({ data: guest }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, ["id"]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const guest = await prisma.guest.update({
    where: { id: body.id },
    data: {
      name: body.name,
      attendance: body.attendance,
    },
  });

  return NextResponse.json({ data: guest });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id wajib" }, { status: 400 });
  }

  await prisma.guest.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
