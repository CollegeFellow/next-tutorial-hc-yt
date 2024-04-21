import { connect } from '@/app/config/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    console.log('🎯  👉(^ . ^)===👉 ~ POST ~ reqBody:', reqBody)

    // @FIXME: Add validation before using the variables
    const { username, email, password } = reqBody

    // Check if user already exists
    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 },
      )
    }

    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()
    console.log('🎯  👉(^ . ^)===👉 ~ POST ~ savedUser:', savedUser)

    return NextResponse.json({
      message: 'User saved successfully',
      success: true,
      savedUser,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    )
  }
}
