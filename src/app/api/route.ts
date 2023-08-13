import Bundlr from "@bundlr-network/client";
import { NextResponse } from "next/server";

// function mkBundlr() {
//   const bundlr = new Bundlr(
//     "https://devnet.bundlr.network",
//     "matic",
//     process.env.PRIVATE_KEY,
//     {
//       providerUrl: "https://matic-mumbai.chainstacklabs.com",
//     }
//   );

//   return bundlr;
// }

// async function uploadPetData(file: Buffer) {
//   const bundlr = mkBundlr();

//   const uploadTx = await bundlr.uploadFile(file);
//   console.log(`Pet data uploaded URL=https://arweave.net/${uploadTx.id}`);

//   return uploadTx.id;
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();

//     console.log(formData);

//     // Ensure that the 'photo' field contains a file
//     // if (file instanceof File) {
//     //   const buffer = new Buffer(await file.arrayBuffer());
//     //   const transactionId = await uploadPetData(buffer);

//     //   // Respond with the transaction ID
//     //   return NextResponse.json({ transactionId });
//     // }

//     return NextResponse.json({ formData });

//     // return Error("Photo is missing or invalid");
//   } catch (error) {
//     console.error(error);
//     return Error("Failed to upload pet data");
//   }
// }

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
  try {
    const response = await bundlr.upload(fileBuffer);
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
