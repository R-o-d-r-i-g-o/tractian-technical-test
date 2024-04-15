import Lottie from 'lottie-react';

import loading from '../../../public/animations/loading.json';
import placeHolder from '../../../public/animations/empty-block.json';

type SpinnerProps = {
  removePadding?: boolean;
};

const Spinner = ({ removePadding = false }: SpinnerProps) => (
  <div className={`mx-auto w-8 ${!removePadding && 'mt-6'}`}>
    <Lottie animationData={loading} />
  </div>
);

const ContentSkeleton = () => (
  <div className="mt-20 mx-auto w-1/4">
    <Lottie animationData={placeHolder} />
  </div>
);

// TODO: implement react-skeleton latter

export { Spinner, ContentSkeleton };
