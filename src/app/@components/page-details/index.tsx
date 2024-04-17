import Image from 'next/image';

import * as t from '@/store/@types/assets';
import Collaborators from '@/components/collaborators';

import StatusView from '@/components/status-view';

// TODO: remove mocks when database is correctly feeded.
import mockCollaborators from '../../../../public/mock/collaborators.json';

const DetailsScreen = ({ name, status }: t.Assets) => (
  <>
    <div className="flex items-center p-4 gap-1 uppercase font-semibold border-b border-border text-lg leading-[18px]">
      {name}
      <StatusView status={status} />
    </div>
    <div className="w-full min-h-min p-5">
      <div className="flex gap-4">
        <div className="w-1/2">
          <Image
            src="https://s3-alpha-sig.figma.com/img/324a/327b/49e2fd18b176b9e2ef843bdfef57629f?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RAuFBy0lakmPqiqarb8tZPhF9GNiR77qwmRB7VEWVAdOnCJ1qNb6qxBsoXfQCds4sRx9mQ36XousSz1FOyxQ9lx-mGKAW1HDck6wnk-GDhuX5pLIXrDX-eAEMgaDkU-372PigWQlRe0TACDCN1d1IDVd0KPpyuU~e8j8nu-DiC01qqUuKU85zbFd77jh4ZvN2jv02j38ocYcMkL9eWLP1nGuwXlZOg327BLrImWQaj87vfG8uaRXv99cDEBsVuO-03JAx1bFtfIZ-mHnHuC6L11IXD3COUTFvB3uEnwYEMo0arfERktY1EunLQnRSfINkZHEoGMtbQRgOjm6~eMjFg"
            alt="equipament-frame"
            className="rounded-lg h-[226px]"
            height={226}
            width={336}
          />
        </div>
        <div className="w-1/2 pt-12 font-normal leading-6">
          <span className="font-semibold text-base">Tipo de Equipamento</span>
          <div className="text-dark_gray">Motor Elétrico (Trifásico)</div>
          <hr className="text-gray h-px mt-4 mb-6" />
          <span className="block font-semibold text-base mb-2">
            Reponsáveis
          </span>
          <Collaborators alignRight users={mockCollaborators} />
        </div>
      </div>
      <hr className="text-gray h-px mt-4 mb-6" />
      <div className="flex gap-4 font-normal leading-6">
        <div className="w-1/2">
          <span className="font-semibold text-base">Sensor</span>
          <div className="flex gap-2 items-center text-dark_gray">
            <Image
              src="/icons/signal.svg"
              alt="receptor-icon"
              height={15}
              width={15}
            />
            HIO4510
          </div>
        </div>
        <div className="w-1/2">
          <span className="font-semibold text-base">Receptor</span>
          <div className="flex gap-2 items-center text-dark_gray">
            <Image
              src="/icons/receptor.svg"
              alt="receptor-icon"
              height={15}
              width={15}
            />
            EUH4R27
          </div>
        </div>
      </div>
    </div>
  </>
);

export default DetailsScreen;
