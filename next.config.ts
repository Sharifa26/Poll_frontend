import type { NextConfig } from "next";
import dotenv from 'dotenv';
dotenv.config();

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default nextConfig;
