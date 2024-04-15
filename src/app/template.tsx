import react from 'react';
import Header from '@/components/header';

type Props = {
  children: React.ReactNode;
};

const Template = ({ children }: Props) => (
  <div className="flex flex-col h-screen bg-gray">
    <Header />
    <main className="w-[98.8%] h-[90vh] mx-auto my-2 p-4 bg-white border-2 border-border rounded-[5px]">
      {children}
    </main>
  </div>
);

export default Template;
