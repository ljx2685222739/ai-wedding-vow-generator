/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ZHIPU_API_KEY: process.env.ZHIPU_API_KEY || '2f5004c995d254250479805a00b5dbe2.bhRZGKze2I3Gnn86',
  },
}

module.exports = nextConfig