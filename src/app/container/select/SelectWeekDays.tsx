import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectWeekDays {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}


export const SelectWeekDays = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectWeekDays) => {

  const itemList = [
    { value: "Friday  ", label: "Friday  " },
    { value: "Saturday ", label: "Saturday " },
    { value: "Sunday ", label: "Sunday " },
    { value: "Monday ", label: "Monday " },
    { value: "Tuesday ", label: "Tuesday " },
    { value: "Wednesday ", label: "Wednesday " },
    { value: "Thursday ", label: "Thursday " },

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
      placeholder="Select Day"
      filterOption={(input, option: any) =>
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
        <Option value="fetching">Fetching Days</Option>
      )}
    </Select>
  );
};
