import { FC } from "react";
import Image from "next/image";

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
      <div className="w-4/6 bg-gray-200 border border-border rounded">
        <div className="bg-gray-200 h-11 border-b border-border flex items-center">
          <input type="text" placeholder="Buscar Ativo ou Local" className="py-2 px-3 flex-1 text-sm outline-none" />
          <IoSearchOutline size={16} className="mr-4" />
        </div>
        Hello World 1
      </div>
      <div className="w-full bg-gray-300 border border-border rounded">
        <div className="flex items-center p-4 gap-1 uppercase font-semibold bg-gray-200 border-b border-border text-lg leading-[18px]">
          Motor Rt Coal AF01
          <GoDotFill size={16} className="mr-4 text-success" />
        </div>
        Hello World 2
      </div>

    </div>
  </>
);

export default Home;
