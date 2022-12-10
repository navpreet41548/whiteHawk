import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import axios from "axios";

export async function middleware(NextRequest) {
  //!Get the token from cookies and Check if Exists
  const url = NextRequest.url;
  const previousPage = url.split("admin")[1];
  console.log(previousPage);

  const token = NextRequest.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(`${process.env.BASE_URL}/home`);
  }
  try {
    //!Verify the token
    const resp = await fetch(`${process.env.BASE_URL}/api/auth/verify`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json", // This is set on request
        "Content-Type": "application/json", // This is set on request
        token: token.value,
      },
    });
    const data = await resp.json();
    console.log(data);
    if (data.err) {
      console.log(data.err);
      return NextResponse.redirect(`${process.env.BASE_URL}/home`);
    }
    if (data.data.admin) {
      const res = NextResponse.next();
      return res;
    } else {
      return NextResponse.redirect(`${process.env.BASE_URL}/home`);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(`${process.env.BASE_URL}/home`);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/shop/admin/:path*", "/shop/editProduct/:path*"],
};
