import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectGradeAddition {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectGradeAddition = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectGradeAddition) => {
  const itemList = useStoreState((state) => state.payroll.salaryHeadListAddition);
  const itemListFetch = useStoreActions((state) => state.payroll.fetchsalaryHeadListAddition);


  const onSelect = (id) => {
    console.log(id)
    if (itemList) {
      const items = itemList.find((item) => item.salaryHeadAdditionId === id);
      onChange(items?.salaryHeadAdditionId);
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
      allowClear
      placeholder="Select"
      filterOption={(input, option:any) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {itemList ? (
        itemList.map((type, idx) => (
          <Option key={type.salaryHeadAdditionId} value={type.salaryHeadAdditionId}>
            {type.salaryHeadName}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching</Option>
      )}
    </Select>
  );
};
