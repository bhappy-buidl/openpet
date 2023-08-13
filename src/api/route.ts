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

async function uploadPetData(file: Buffer) {
  const bundlr = mkBundlr();

  const uploadTx = await bundlr.uploadFile(file);
  console.log(`Pet data uploaded URL=https://arweave.net/${uploadTx.id}`);

  return uploadTx.id;
}

export const config = {
  api: {
    bodyParser: false,
  },
}


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const file = formData.get("photo");

    // Ensure that the 'photo' field contains a file
    if (file instanceof File) {
      const buffer = new Buffer(await file.arrayBuffer());
      const transactionId = await uploadPetData(buffer);

      // Respond with the transaction ID
      return NextResponse.json({ transactionId });
    }

    return Error("Photo is missing or invalid");
  } catch (error) {
    console.error(error);
    return Error("Failed to upload pet data");
  }
}
