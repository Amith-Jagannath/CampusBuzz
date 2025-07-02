import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dbsixtelc",
  api_key: "134524972224446",
  api_secret: "J5d5He4t-jCpPPl2aWxTu4g93Z0", // ✅ keep secret in env
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
  } catch (error: any) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
