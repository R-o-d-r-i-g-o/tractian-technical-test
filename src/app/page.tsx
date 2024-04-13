import { FC } from "react";
import Image from "next/image";

import Dropdown from './dropdown'
import Collaborators from '@/components/collaborators'

import { GoDotFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";

type Props = {
  lable: string;
  icon: string;
}

const mockButtons = [
  {
    lable: "Sensor de Energia",
    icon: "/icons/ray.svg"
  },
  {
    lable: "Crítico",
    icon: "/icons/info.svg"
  }
]

const mockCollaborators = [
  {
    name: "Remy Sharp",
    email: "remy@gmail.com",
    photo: "https://avatars.githubusercontent.com/u/89111957?v=4"
  },
  {
    name: "Travis Howard",
    email: "travis@gmail.com",
    photo: "https://avatars.githubusercontent.com/u/89111970?v=4"
  },
  {
    name: "",
    email: "cindy@gmail.com",
    photo: null
  },
  {
    name: "Trevor Henderson",
    email: "trevor@gmail.com",
    photo: null
  },
  {
    name: "Trevor Henderson",
    email: "remy@gmail.com",
    photo: null
  },
  {
    name: "Trevor Henderson",
    email: "remy@gmail.com",
    photo: null
  }
]

const Button: FC<Props> = ({ lable, icon }) => (
  <button className="flex gap-2 items-center font-semibold text-dark_gray text-sm py-2 px-4 border border-border rounded">
    <Image src={icon} alt="{alt}" height={14} width={14} />
    {lable}
  </button>
)

const Home = () => (
  <>
    <div className='flex justify-between items-center w-full min-h-min mb-3'>
      <span className="text-sm text-dark_gray">
        <span className="font-semibold text-xl text-primary">
          Ativos
        </span>{" "}
        / Apex Unit
      </span>
      <div className="flex gap-2">
        {mockButtons.map((item, i) => <Button key={i} {...item}/>)}
      </div>
    </div>
    <div className="flex h-[504px] gap-2 text-sm text-primary border-collapse">
      <div className="w-4/6 border border-border rounded overflow-y-auto">
        <div className="h-11 border-b border-border flex items-center">
          <input type="text" placeholder="Buscar Ativo ou Local" className="py-2 px-3 flex-1 text-sm outline-none" />
          <IoSearchOutline size={16} className="mr-4" />
        </div>
        <div className="flex flex-col gap-1 w-full min-h-min p-2 pt-3">
          <Dropdown />
        </div>
      </div>
      <div className="w-full bg-gray-300 border border-border rounded">
        <div className="flex items-center p-4 gap-1 uppercase font-semibold border-b border-border text-lg leading-[18px]">
          Motor Rt Coal AF01
          <GoDotFill size={16} className="mr-4 text-success" />
        </div>
        <div className="w-full min-h-min p-5">
          <div className='flex gap-4'>
            <div className='w-1/2'>
              <Image
                src="https://s3-alpha-sig.figma.com/img/324a/327b/49e2fd18b176b9e2ef843bdfef57629f?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RAuFBy0lakmPqiqarb8tZPhF9GNiR77qwmRB7VEWVAdOnCJ1qNb6qxBsoXfQCds4sRx9mQ36XousSz1FOyxQ9lx-mGKAW1HDck6wnk-GDhuX5pLIXrDX-eAEMgaDkU-372PigWQlRe0TACDCN1d1IDVd0KPpyuU~e8j8nu-DiC01qqUuKU85zbFd77jh4ZvN2jv02j38ocYcMkL9eWLP1nGuwXlZOg327BLrImWQaj87vfG8uaRXv99cDEBsVuO-03JAx1bFtfIZ-mHnHuC6L11IXD3COUTFvB3uEnwYEMo0arfERktY1EunLQnRSfINkZHEoGMtbQRgOjm6~eMjFg"
                alt="equipament-frame"
                className="rounded-lg h-[226px]"
                height={226}
                width={336}
              />
            </div>
            <div className='w-1/2 pt-12 font-normal leading-6'>
              <span className="font-semibold text-base">
                Tipo de Equipamento
              </span>
              <div className='text-dark_gray'>
                Motor Elétrico (Trifásico)
              </div>
              <hr className='text-gray h-px mt-4 mb-6' />
              <span className="block font-semibold text-base mb-2">
                Reponsáveis
              </span>
              <Collaborators alignRight users={mockCollaborators} />
            </div>
          </div>
          <hr className='text-gray h-px mt-4 mb-6' />
          <div className='flex gap-4 font-normal leading-6'>
            <div className='w-1/2' >
              <span className="font-semibold text-base">
                Sensor
              </span>
              <div className='flex gap-2 items-center text-dark_gray'>
                <Image src="/icons/signal.svg" alt="receptor-icon" height={15} width={15}/>
                HIO4510
              </div>
            </div>
            <div className='w-1/2'>
              <span className="font-semibold text-base">
                Receptor
              </span>
              <div className='flex gap-2 items-center text-dark_gray'>
                <Image src="/icons/receptor.svg" alt="receptor-icon" height={15} width={15}/>
                EUH4R27
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Home;
