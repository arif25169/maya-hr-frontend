import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectGender {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}


export const SelectGender = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectGender) => {

  const itemList = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },

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
      placeholder="Select Gender"
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
        <Option value="fetching">Fetching Gender</Option>
      )}
    </Select>
  );
};
