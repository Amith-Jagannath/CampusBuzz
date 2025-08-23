import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json(); // expects image to be a URL or base64
    const uniqueId = `post_${Date.now()}`;
    const uploadResult = await cloudinary.uploader.upload(image, {
      public_id: uniqueId,
    });

    const optimizeUrl = cloudinary.url(uniqueId, {
      fetch_format: "auto",
      quality: "auto",
    });

    const autoCropUrl = cloudinary.url(uniqueId, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    return NextResponse.json({
      uploadResult,
      optimizeUrl,
      autoCropUrl,
    });
  } catch (error) {
    console.error("Upload failed:", error);

    let message = "Unknown error occurred";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
