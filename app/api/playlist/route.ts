import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const playlistId = url.searchParams.get("id");

  if (!playlistId) {
    return NextResponse.json({ error: "Missing playlist id" }, { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Missing Spotify credentials" }, { status: 500 });
  }

  try {
    // Get Spotify token using client credentials flow
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + Buffer.from(`${clientId}:${clientSecret}`, "utf-8").toString("base64"),
      },
      body: "grant_type=client_credentials",
    });

    if (!tokenResponse.ok) {
      const errorDetails = await tokenResponse.json();
      return NextResponse.json(
        { error: "Failed to get Spotify token", details: errorDetails },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch playlist data from Spotify
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!playlistResponse.ok) {
      const errorData = await playlistResponse.json();
      return NextResponse.json(
        { error: "Failed to fetch playlist", details: errorData },
        { status: playlistResponse.status }
      );
    }

    const playlistData = await playlistResponse.json();

    return NextResponse.json(playlistData);
  } catch (error) {
    console.error("Unexpected error in playlist API:", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
