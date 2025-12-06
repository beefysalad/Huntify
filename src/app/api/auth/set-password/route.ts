import { NextResponse } from "next/server";

import { setPasswordForCurrentUser } from "@/src/lib/actions/auth";
import { passwordSchema } from "@/src/app/constants/zod/auth/signup";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = passwordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await setPasswordForCurrentUser(parsed.data.password);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Set password error", error);
    return NextResponse.json(
      { error: "Unable to set password. Please try again." },
      { status: 500 }
    );
  }
}




