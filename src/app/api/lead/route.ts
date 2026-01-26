import { NextRequest, NextResponse } from 'next/server'
import { leadFormSchema } from '@/lib/validation'
import { sendLeadEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request data
    const validatedData = leadFormSchema.parse(body)

    // Send email
    await sendLeadEmail(validatedData)

    return NextResponse.json(
      {
        success: true,
        message: 'Lead enviado com sucesso!',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error processing lead:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Dados inválidos. Verifique os campos e tente novamente.',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao processar solicitação. Tente novamente mais tarde.',
      },
      { status: 500 }
    )
  }
}
