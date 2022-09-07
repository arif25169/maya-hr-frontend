import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectEmployee {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectEmployee = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectEmployee) => {
  const itemList = useStoreState((state) => state.hr.employeeEnableList);
  const itemListFetch = useStoreActions((state) => state.hr.fetchemployeeEnableList);


  const onSelect = (id) => {
    if (itemList) {
      const items = itemList.find((item) => item.employeeId === id);
      onChange(items?.employeeId);
    }
  };

  React.useEffect(() => {
    itemListFetch();
  }, [])


  return (
    <Select
      onChange={onSelect}
      // loading={loading}
      showSearch
      // allowClear
      defaultValue={defaultSelected}
      value={selected}
      style={style}
      placeholder="Select Employee"
      filterOption={(input, option:any) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {itemList ? (
        itemList.map((type, idx) => (
          <Option key={type.employeeId} value={type.employeeId}>
            {type.employeeName}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching Employee</Option>
      )}
    </Select>
  );
};
