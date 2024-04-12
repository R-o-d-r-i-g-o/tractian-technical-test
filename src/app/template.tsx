import react from 'react'
import Header from '@/components/header'

type Props = {
    children: React.ReactNode
}

const Template = ({ children }: Props) => (
  <>
    <Header />
    <main className='w-full h-screen bg-gray'>
      {children}
    </main>
  </>
)

export default Template;