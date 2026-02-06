import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { requireFields } from "@/lib/validators";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const validation = requireFields(body, ["email", "password"]);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user) {
    return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(body.password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  return NextResponse.json({ token: signToken({ userId: user.id, email: user.email }) });
}
