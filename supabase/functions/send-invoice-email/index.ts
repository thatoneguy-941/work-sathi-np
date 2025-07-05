import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvoiceEmailRequest {
  clientEmail: string;
  clientName: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  projectName: string;
  paymentLink?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      clientEmail, 
      clientName, 
      invoiceNumber, 
      amount, 
      dueDate, 
      projectName,
      paymentLink 
    }: InvoiceEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "WorkSathi <noreply@worksathi.com>",
      to: [clientEmail],
      subject: `Invoice ${invoiceNumber} - ${projectName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Invoice</h1>
            <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">#${invoiceNumber}</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e1e5e9; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${clientName},</h2>
            
            <p style="color: #666; line-height: 1.6;">
              We hope this email finds you well. Please find your invoice details below for the project: <strong>${projectName}</strong>
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 500;">Invoice Number:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600;">${invoiceNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 500;">Project:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600;">${projectName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 500;">Amount:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 600; font-size: 18px;">Rs. ${amount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 500;">Due Date:</td>
                  <td style="padding: 8px 0; color: #e74c3c; font-weight: 600;">${new Date(dueDate).toLocaleDateString()}</td>
                </tr>
              </table>
            </div>
            
            ${paymentLink ? `
              <div style="text-align: center; margin: 30px 0;">
                <a href="${paymentLink}" 
                   style="background: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: 600; display: inline-block;">
                  Pay with eSewa
                </a>
              </div>
            ` : ''}
            
            <p style="color: #666; line-height: 1.6;">
              Please process the payment by the due date mentioned above. If you have any questions or concerns regarding this invoice, feel free to contact us.
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Thank you for your business!
            </p>
            
            <div style="border-top: 1px solid #e1e5e9; margin-top: 30px; padding-top: 20px; text-align: center;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                This is an automated email from WorkSathi Nepal
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Invoice email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-invoice-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);