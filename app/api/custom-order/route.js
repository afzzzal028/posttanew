import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import nodemailer from "nodemailer";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const name = formData.get("name");
    const phone = formData.get("phone");
    const size = formData.get("size");
    const quantity = formData.get("quantity");
    const total = formData.get("total");
    const method = formData.get("method") || "email";

    if (!image || !name || !phone) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const orderId = "CUST" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tempDir = path.join(os.tmpdir(), "postta-orders");
    await writeFile(tempDir, "", { recursive: true }).catch(() => {});
    const fileName = `custom-${Date.now()}-${image.name || "photo.jpg"}`;
    const filePath = path.join(tempDir, fileName);
    await writeFile(filePath, buffer);

    // Save to Supabase
    try {
      const supabase = getSupabase();
      if (supabase) {
        await supabase.from("custom_orders").insert({
          order_id: orderId,
          name,
          phone,
          size,
          quantity: parseInt(quantity) || 1,
          total: parseInt(total) || 0,
          payment_method: method,
          status: "pending",
        });
      }
    } catch (dbErr) {
      console.error("Database error:", dbErr);
    }

    // Send email
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "afzalsiddiqui1616@gmail.com",
          pass: process.env.GMAIL_APP_PASSWORD || "",
        },
      });

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #e11d48;">New Custom Poster Order</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Order ID</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${orderId}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Size</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${size}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Quantity</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${quantity}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Total</td><td style="padding: 8px; border-bottom: 1px solid #eee;">₹${total}</td></tr>
          </table>
          <p style="margin-top: 16px; color: #666; font-size: 12px;">Customer photo attached below.</p>
        </div>
      `;

      await transporter.sendMail({
        from: "POSTTA Orders <afzalsiddiqui1616@gmail.com>",
        to: "afzalsiddiqui1616@gmail.com",
        replyTo: "afzalsiddiqui1616@gmail.com",
        subject: `New Custom Poster Order - ${name} (${size} × ${quantity})`,
        html,
        attachments: [{ filename: fileName, content: buffer }],
      });
    } catch (emailErr) {
      console.error("Email error:", emailErr);
    }

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 });
  }
}
