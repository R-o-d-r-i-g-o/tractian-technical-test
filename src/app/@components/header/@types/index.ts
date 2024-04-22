export type NavOption = {
  text: string;
  icon: string;
  id: string;
  alt: string;
};

export type ButtonOption = NavOption & {
  onSelect: () => void;
  selected: boolean;
};

export type Navigation = {
  menuOptions?: Array<NavOption>;
};

export type ActionProps = (props: Navigation) => JSX.Element;