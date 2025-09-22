import { Loader2 } from 'lucide-react'

export default function Loader() {
  return (
    <div className="grid h-dvh place-items-center pt-8">
      <Loader2 className="animate-spin" />
    </div>
  )
}
