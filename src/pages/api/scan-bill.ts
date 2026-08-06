import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';

// Initialize the Anthropic client using the environment variable
const anthropic = new Anthropic({
  apiKey: import.meta.env.ANTHROPIC_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
    }

    // Convert the uploaded file to a base64 string
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');
    const mediaType = file.type as "image/jpeg" | "image/png" | "image/gif" | "image/webp";

    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(mediaType)) {
       return new Response(JSON.stringify({ error: 'Unsupported file type. Please upload a valid image (JPEG, PNG, WEBP).' }), { status: 400 });
    }

    // Send the image to Claude 3 Haiku for analysis
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: `You are an expert energy bill analyzer for the UK. Your job is to look at an image of an energy bill and extract two specific numbers:
1. The annual electricity usage in kWh. If the bill only shows a monthly or quarterly usage, multiply it appropriately to estimate the annual usage.
2. The estimated monthly spend in GBP (£) based on the total due or monthly direct debit amount.

Return ONLY a valid JSON object in the following format. Do not include any markdown formatting, backticks, or extra text.
{
  "annual_kwh": number,
  "monthly_spend": number
}
If you absolutely cannot find or estimate the data, return { "error": "Could not extract data" }.`,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Data,
              },
            },
            {
              type: 'text',
              text: 'Extract the annual kWh usage and the monthly spend from this energy bill.',
            },
          ],
        },
      ],
    });

    const textContent = response.content.find(block => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error("No text response from Claude");
    }

    // Parse the JSON returned by Claude
    const extractedData = JSON.parse(textContent.text);

    return new Response(JSON.stringify(extractedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('OCR Processing Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process the bill. Please try again or enter details manually.' }), {
      status: 500,
    });
  }
};
