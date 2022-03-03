import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectPayrollGrade {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectPayrollGrade = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectPayrollGrade) => {
  const itemList = useStoreState((state) => state.payroll.salaryGradeList);
  const itemListFetch = useStoreActions((state) => state.payroll.fetchsalaryGradeList);


  const onSelect = (id) => {
    if (itemList) {
      const items = itemList.find((item) => item.salaryGradeId === id);
      onChange(items?.salaryGradeId);
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
      placeholder="Select Grade"
      filterOption={(input, option) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {itemList ? (
        itemList.map((type, idx) => (
          <Option key={type.salaryGradeId} value={type.salaryGradeId}>
            {type.gradeName}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching Grades</Option>
      )}
    </Select>
  );
};
