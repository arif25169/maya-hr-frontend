import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectBloodGroup {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}


export const SelectBloodGroup = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectBloodGroup) => {

  const itemList = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },

  ]

  const onSelect = (id) => {
    if (itemList) {
      const val: any = itemList.find((item) => item.value === id);
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
      placeholder="Select Blood Group"
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
        <Option value="fetching">Fetching Blood Group</Option>
      )}
    </Select>
  );
};
