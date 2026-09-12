import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const formData = await req.formData();
    const files = formData.getAll("files");
    const category = formData.get("category") || "cars";
    const subcategory = formData.get("subcategory") || "";

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: "No files provided" }, { status: 400 });
    }

    const results = [];
    const defaultPrices = { A6: 22, A5: 69, A4: 109, A3: 159 };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      const rawName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").trim();
      const productId = file.name.replace(/\.[^/.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString(36);

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `products/${productId}_0.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, buffer, { contentType: file.type, upsert: true });

      if (uploadError) {
        results.push({ name: file.name, error: uploadError.message });
        continue;
      }

      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
      const imageUrl = urlData.publicUrl;

      const { error: dbError } = await supabase.from("products").upsert({
        id: productId,
        name: rawName,
        category,
        subcategory,
        tags: rawName.toLowerCase().split(" ").filter(Boolean),
        colors: [],
        prices: defaultPrices,
        image_url: imageUrl,
        image_urls: [imageUrl],
        badge: "",
        in_stock: true,
        featured: false,
      }, { onConflict: "id" });

      if (dbError) {
        results.push({ name: file.name, error: dbError.message });
      } else {
        results.push({ name: file.name, id: productId, url: imageUrl });
      }
    }

    return NextResponse.json({ success: true, results, total: files.length, uploaded: results.filter((r) => r.url).length });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
