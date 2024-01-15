'use client'

import { ModeToggle } from '../../../components/theme-swith-btn'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import ChatForm from '@/components/chat-form'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')

  return (
    <div className="container">
      <div className="m-2 flex mx-auto justify-center items-center gap-4">
        <h1 className="text-3xl font-bold text-center">LLama UI</h1>
        <ModeToggle />
      </div>

      <div className="container my-5 mx-auto">
        <ChatForm setContent={setContent} setIsLoading={setIsLoading} />
        {isLoading && <p className="m-4 text-center">Loading...</p>}
        {!isLoading && content.length > 0 && (
          <Card className="p-2 my-2">{content}</Card>
        )}
      </div>
    </div>
  )
}
