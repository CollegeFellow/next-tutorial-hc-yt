import { connect } from '@/app/config/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    console.log('🎯  👉(^ . ^)===👉 ~ POST ~ reqBody:', reqBody)

    // @FIXME: Add validation
    const { email, password } = reqBody

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        {
          error: 'User does not exist',
        },
        { status: 400 },
      )
    }

    // check if password is correct
    const isPasswordValid = await bcryptjs.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: 'Invalid password',
        },
        { status: 400 },
      )
    }

    // create token data
    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    }
    // create token
    const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    })

    const response = NextResponse.json({
      message: 'Login succesfull',
      success: true,
    })
    response.cookies.set('token', token, {
      httpOnly: true,
    })
    return response
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    )
  }
}
