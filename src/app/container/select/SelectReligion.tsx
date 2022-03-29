import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectReligion {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}


export const SelectReligion = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectReligion) => {

  const itemList = [
    { value: "Islam", label: "Islam" },
    { value: "Hindu", label: "Hindu" },
    { value: "Christian", label: "Christian" },
    { value: "Buddist", label: "Buddist" },
    { value: "Other", label: "Other" },

]

  const onSelect = (id) => {
    if (itemList) {
      const val:any = itemList.find((item) => item.value === id);
      onChange(val.value);
    }
  };

  return (
    <Select
      onChange={onSelect}
      // loading={loading}
      showSearch
      allowClear
      defaultValue={defaultSelected}
      value={selected}
      style={style}
      placeholder="Select Religion"
      filterOption={(input, option:any) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {itemList ? (
        itemList.map((type, idx) => (
          <Option key={type.value} value={type.value}>
            {type.label}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching Religion</Option>
      )}
    </Select>
  );
};
