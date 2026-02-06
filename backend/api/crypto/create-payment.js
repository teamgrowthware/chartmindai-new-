// Create crypto payment endpoint (Coinbase Commerce / NOWPayments)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, currency, planId, userId, trial } = req.body

    // Example for Coinbase Commerce
    const coinbaseResponse = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY,
        'X-CC-Version': '2018-03-22'
      },
      body: JSON.stringify({
        name: `Tradorr ${planId} Subscription`,
        description: `Monthly subscription for ${planId} plan`,
        local_price: {
          amount: amount.toString(),
          currency: currency || 'USD'
        },
        pricing_type: 'fixed_price',
        metadata: {
          planId: planId,
          userId: userId,
          trial: trial ? 'true' : 'false'
        },
        redirect_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/dashboard`,
        cancel_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/pricing`
      })
    })

    const data = await coinbaseResponse.json()

    if (coinbaseResponse.ok) {
      res.status(200).json({
        paymentUrl: data.data.hosted_url,
        chargeId: data.data.id
      })
    } else {
      throw new Error(data.error?.message || 'Failed to create payment')
    }
  } catch (error) {
    console.error('Error creating crypto payment:', error)
    res.status(500).json({ error: error.message })
  }
}

