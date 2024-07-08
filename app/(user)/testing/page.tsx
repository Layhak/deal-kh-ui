import GoogleMapComponent from '@/components/search/GoogleMapComponent'
import React from 'react'

export default function page() {
  return (
    <div>
      <div className="flex h-screen flex-row bg-red-800">
      <GoogleMapComponent
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      />
    </div>
    </div>
  )
}
