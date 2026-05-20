export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  try {
    return res.status(200).json({
      success: true,
      message: 'Backend Vercel opérationnel ✅',
    })
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    })
  }
}
