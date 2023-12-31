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

async function mkPetFromRequest(formData: FormData) {
  const pet: Pet = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    species: formData.get("species") as string,
    breed: formData.get("breed") as string,
    color: formData.get("color") as string,
    gender: formData.get("gender") as string,
    spayedOrNeutered: formData.get("spayedOrNeutered") as string,
    microchipNumber: formData.get("microchipNumber") as string,
    vax: JSON.parse(formData.get("vax") as string),
    tests: JSON.parse(formData.get("tests") as string),
    doctorLicenseNumber: formData.get("doctorLicenseNumber") as string,
    signature: formData.get("signature") as string,
  };

  return pet;
}

async function mkUploadPetPhoto(formData: FormData) {
  const bundlr = mkBundlr();
  const imageFile = formData.get("photo") as any;

  if (imageFile?.type?.startsWith("image/")) {
    const imageType = imageFile.type.split("/")[1]; // jpeg or png
    if (imageType !== "jpeg" && imageType !== "png") {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }
    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());

    // don't really care about versioning the photo
    try {
      //@ts-ignore
      const response = await bundlr.upload(fileBuffer, [
        { name: "Content-Type", value: `image/${imageType}` },
      ]);
      return `https://arweave.net/${response.id}`;
    } catch (e) {
      console.log("Error uploading file ", e);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }
  }
}

export async function PUT(request: Request) {
  const bundlr = mkBundlr();
  const formData = await request.formData();
  const previousTransactionId = formData.get("previousTransactionId");

  const pet: Pet = await mkPetFromRequest(formData);
  pet.photo = await mkUploadPetPhoto(formData);

  // Convert the pet object to a JSON string and then to a buffer
  const jsonBuffer = Buffer.from(JSON.stringify(pet));

  try {
    //@ts-ignore
    const response = await bundlr.upload(jsonBuffer, [
      { name: "Content-Type", value: "application/json" },
      { name: "root-tx", value: previousTransactionId }, // Add metadata linking to previous transaction
    ]);
    const arweaveUrl = `https://arweave.net/${response.id}`;
    return NextResponse.json({ transactionId: response.id, arweaveUrl });
  } catch (e) {
    console.log("Error uploading JSON ", e);
    return NextResponse.json(
      { error: "Failed to upload JSON" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const bundlr = mkBundlr();
  const formData = await request.formData();

  const pet: Pet = await mkPetFromRequest(formData);
  pet.photo = await mkUploadPetPhoto(formData);

  try {
    const jsonBuffer = Buffer.from(JSON.stringify(pet));
    //@ts-ignore
    const response = await bundlr.upload(jsonBuffer, [
      { name: "Content-Type", value: "application/json" },
    ]);
    const arweaveUrl = `https://arweave.net/${response.id}`;
    return NextResponse.json({ transactionId: response.id, arweaveUrl });
  } catch (e) {
    console.log("Error uploading JSON ", e);
    return NextResponse.json(
      { error: "Failed to upload JSON" },
      { status: 500 }
    );
  }
}
