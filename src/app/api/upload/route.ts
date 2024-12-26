import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase"; // Import your supabase client

export async function POST(req: NextRequest) {
  try {
    console.log("request", req.body);
    // Get the FormData from the request
    const formData = await req.formData();
    const files = formData.getAll("files") as File[]; // Type the files as File array

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadedFiles: string[] = []; // Array to store the URLs of uploaded files

    for (const file of files) {
      const fileName = file.name;

      // Upload the file to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from("pictures") // Your Supabase bucket
        .upload(fileName, file.stream());

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Get the public URL of the file
      const { publicURL, error: urlError } = supabase.storage
        .from("pictures")
        .getPublicUrl(fileName);

      if (urlError) {
        throw new Error(urlError.message);
      }

      uploadedFiles.push(publicURL || ""); // Add the URL to the array
    }

    // Return the list of file URLs
    return NextResponse.json({ files: uploadedFiles });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
