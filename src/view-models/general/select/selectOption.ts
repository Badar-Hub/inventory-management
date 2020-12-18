type SelectOption =
  | string
  | {
      label: string;
      value: string;
      [key: string]: string;
    };

export default SelectOption;
