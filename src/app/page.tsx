'use client';

import AssetsForm from '@/app/@components/assets-form';
import NavigationBar from '@/app/@components/navigation-bar';
import DetailsScreen from '@/app/@components/page-details';

import { ContentSkeleton } from '@/components/loading';

import { useMainPage } from '@/app/@hooks';

const Home = () => {
  const home = useMainPage();

  if (!home.unitId) return <ContentSkeleton />;

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col md:flex-row min-h-min md:h-[504px] gap-2 text-sm text-primary border-collapse">
        <div className="w-full md:w-4/6 border border-border rounded overflow-y-auto">
          <AssetsForm />
        </div>
        <div className="w-full bg-gray-300 border border-border rounded">
          {!home.id ? <ContentSkeleton /> : <DetailsScreen />}
        </div>
      </div>
    </>
  );
};

export default Home;
