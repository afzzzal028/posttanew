import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const id = searchParams.get("id");
    const featured = searchParams.get("featured");

    let query = supabase.from("products").select("*");

    if (id) {
      query = query.eq("id", id);
      const { data, error } = await query.single();
      if (error) return NextResponse.json({ success: false, error: error.message }, { status: 404 });
      return NextResponse.json({ success: true, data });
    }

    if (category) query = query.eq("category", category);
    if (featured === "true") query = query.eq("featured", true);

    query = query.order("created_at", { ascending: false });
    const { data, error } = await query;
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const body = await req.json();
    const { id, name, category, subcategory, tags, colors, prices, image_url, image_urls, badge, in_stock, featured } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing product id" }, { status: 400 });
    }

    const hasAllFields = name && category;
    const updateData = { updated_at: new Date().toISOString() };

    if (name) updateData.name = name;
    if (category) updateData.category = category;
    if (subcategory !== undefined) updateData.subcategory = subcategory || null;
    if (tags) updateData.tags = tags;
    if (colors) updateData.colors = colors;
    if (prices) updateData.prices = prices;
    if (image_url !== undefined) updateData.image_url = image_url || null;
    if (image_urls) updateData.image_urls = image_urls;
    if (badge !== undefined) updateData.badge = badge || null;
    if (in_stock !== undefined) updateData.in_stock = in_stock;
    if (featured !== undefined) updateData.featured = featured;

    let result;
    if (hasAllFields) {
      result = await supabase.from("products").upsert(updateData).select();
    } else {
      result = await supabase.from("products").update(updateData).eq("id", id).select();
    }

    const { data, error } = result;

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, data: data[0] });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "Missing product id" }, { status: 400 });

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
