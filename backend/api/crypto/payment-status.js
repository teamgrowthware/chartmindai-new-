// Check crypto payment status endpoint

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = req.query

    // Example for Coinbase Commerce
    const chargesResponse = await fetch(
      `https://api.commerce.coinbase.com/charges?metadata[userId]=${userId}`,
      {
        headers: {
          'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY,
          'X-CC-Version': '2018-03-22'
        }
      }
    )

    const data = await chargesResponse.json()

    if (chargesResponse.ok && data.data.length > 0) {
      const latestCharge = data.data[0]
      res.status(200).json({
        status: latestCharge.timeline.find(t => t.status === 'COMPLETED') ? 'completed' : 'pending',
        charge: latestCharge
      })
    } else {
      res.status(200).json({ status: 'pending' })
    }
  } catch (error) {
    console.error('Error checking payment status:', error)
    res.status(500).json({ error: error.message })
  }
}

