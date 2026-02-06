import { prisma } from "@/lib/prisma";
import { requireFields } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const invitationId = searchParams.get("invitationId");

  const payments = await prisma.paymentMethod.findMany({
    where: invitationId ? { invitationId } : undefined,
  });

  return NextResponse.json({ data: payments });
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, [
    "invitationId",
    "type",
    "provider",
    "accountName",
    "accountNumber",
  ]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const payment = await prisma.paymentMethod.create({
    data: {
      invitationId: body.invitationId,
      type: body.type,
      provider: body.provider,
      accountName: body.accountName,
      accountNumber: body.accountNumber,
      qrCodeUrl: body.qrCodeUrl,
      isActive: body.isActive ?? true,
    },
  });

  return NextResponse.json({ data: payment }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, ["id"]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const payment = await prisma.paymentMethod.update({
    where: { id: body.id },
    data: {
      provider: body.provider,
      accountName: body.accountName,
      accountNumber: body.accountNumber,
      qrCodeUrl: body.qrCodeUrl,
      isActive: body.isActive,
    },
  });

  return NextResponse.json({ data: payment });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id wajib" }, { status: 400 });
  }

  await prisma.paymentMethod.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
