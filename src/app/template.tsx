import * as Header from '@/app/@components/header';

import { TemplateProps } from '@/app/@types';

const Template = ({ children }: TemplateProps) => (
  <div
    data-testid="template-element"
    className="flex flex-col h-screen bg-gray"
  >
    <Header.Component>{Header.Actions}</Header.Component>
    <main className="w-[98.8%] min-h-min md:h-[90vh] mx-auto my-2 p-4 bg-white border-2 border-border rounded-[5px]">
      {children}
    </main>
  </div>
);

export default Template;
