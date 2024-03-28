import User from "@/models/User";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import Like from "@/models/Like";
import connectToDB from "@/db";

Comment;
Like;

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import bcrypt from "bcryptjs";

// function to generate random usernames
function generateRandomUsername() {
  const adjectives = ["happy", "lucky", "sunny", "clever", "bright", "vivid"];
  const nouns = ["cat", "dog", "rabbit", "bird", "tiger", "lion"];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  // Increase the range for the random number (e.g., 1 - 10000)
  const randomNumber = Math.floor(Math.random() * (10000 - 1 + 1) + 1);

  return `${randomAdjective}_${randomNoun}_${randomNumber}`;
}

// saves visitor data into db and returns user object
export const POST = async (req) => {
    await connectToDB();
  let username = generateRandomUsername();
  const hashedPassword = bcrypt.hashSync(username, 10);
  let usernameAlreadyExists = true;
  while (usernameAlreadyExists) {
      try {
        const regex = new RegExp(username, "i");
        const user = await User.findOne({ username: { $regex: regex } });
        if (user) username = generateRandomUsername();
        else usernameAlreadyExists = false;
      } catch (e) {
        usernameAlreadyExists = false;
      }
  }
  try {
    const user = new User({
      name: username,
      username: username,
      password: hashedPassword,
    });
    await user.save();
    cookies().set("visitor", username, {
        maxAge: 31536000,
        secure: true,
        httpOnly: true,
      });
      const body = JSON.stringify({
        message: "logged in",
        user: user,
      });
      return new NextResponse(body);
  } catch (err) {
    console.log("error: ", err);
    throw new Error("cant hash password or create new user or something");
  }
  
};
