import Bundlr from "@bundlr-network/client";
import { NextResponse } from "next/server";

function mkBundlr() {
  const bundlr = new Bundlr(
    "https://devnet.bundlr.network",
    "matic",
    process.env.PRIVATE_KEY,
    {
      providerUrl: "https://matic-mumbai.chainstacklabs.com",
    }
  );

  return bundlr;
}

export const config = {
  api: {
    bodyParser: false, // Disable the Next.js body parser
  },
};

type Vaccination = {
  date: string;
  vaxName: string;
  route: string;
  duration: string;
};

type Test = {
  name: string;
  result?: string;
};

type Pet = {
  name: string;
  description: string;
  species: string;
  breed: string;
  color: string;
  gender: string;
  spayedOrNeutered: string;
  microchipNumber: string;
  photo?: any; // You can replace 'any' with the appropriate type for photos
  vax: Vaccination[];
  tests: Test[];
  doctorLicenseNumber: string;
  signature: string;
};

export async function POST(request: Request) {
  const bundlr = mkBundlr();
  const formData = await request.formData();
  const imageFile = formData.get("photo") as any;

  if (!imageFile?.type?.startsWith("image/")) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // Convert the file to a Buffer using FileReader
  const fileBuffer = Buffer.from(await imageFile.arrayBuffer());

  // Upload the Buffer using the bundlr.upload function

  // todo, detect the image type and store the correct type
  try {
    // @ts-ignore tag types are correct, idk why it's being that way
    const response = await bundlr.upload(fileBuffer, [
      { name: "Content-Type", value: "image/jpeg" },
    ]);
    const arweaveUrl = `https://arweave.net/${response.id}`;
    console.log(arweaveUrl);
    return NextResponse.json({ transactionId: response.id });
  } catch (e) {
    console.log("Error uploading file ", e);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
