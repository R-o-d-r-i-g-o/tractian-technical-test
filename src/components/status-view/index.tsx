import { FC } from 'react';
import * as t from './@types';

import { GoDotFill } from 'react-icons/go';
import { GiElectric } from 'react-icons/gi';

const StatusView: FC<t.StatusViewProps> = ({ status, size = 16 }) =>
  status === 'operating' ? (
    <GiElectric size={size} className="mr-4 text-success" />
  ) : (
    <GoDotFill size={size} className="mr-4 text-danger" />
  );

export default StatusView;
