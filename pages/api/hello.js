export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  return new Response(JSON.stringify({ message: 'Hello from the Edge!' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}