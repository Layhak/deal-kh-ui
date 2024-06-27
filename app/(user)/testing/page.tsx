import GoogleMapsComponent from '@/components/search/page'
import React from 'react'

export default function page() {
  return (
    <div>
      <GoogleMapsComponent apiKey='NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'/>
    </div>
  )
}
