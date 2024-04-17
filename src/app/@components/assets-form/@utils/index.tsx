import * as t from '../@types';

const _IMAGE_PATHS = Object.freeze({
  LOCATIONS: '/icons/location.svg',
  COMPONENT: '/icons/component.png',
  ASSETS: '/icons/asset.svg',
});

const handleIconDisplay = (type: t.AssetType, sensorType: t.SensorType) => {
  // Note: location has no diference between each other.
  if (type == 'location') return _IMAGE_PATHS.LOCATIONS;

  // Note: components depends on "sensorType" flag to exists.
  if (!sensorType) return _IMAGE_PATHS.COMPONENT;

  return _IMAGE_PATHS.ASSETS;
};

const FormatIcon = ({ children, size }: t.FormatIconProps) => {
  const IconComponent = children;

  return <IconComponent size={size} />;
};

export { handleIconDisplay, FormatIcon };
