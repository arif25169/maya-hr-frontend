import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectGradeDeduction {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectGradeDeduction = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectGradeDeduction) => {
  const itemList = useStoreState((state) => state.payroll.salaryHeadListDeduction);
  const itemListFetch = useStoreActions((state) => state.payroll.fetchsalaryHeadListDeduction);


  const onSelect = (id) => {
    if (itemList) {
      const items = itemList.find((item) => item.salaryHeadDeductionId === id);
      onChange(items?.salaryHeadDeductionId);
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
          <Option key={type.salaryHeadDeductionId} value={type.salaryHeadDeductionId}>
            {type.salaryHeadName}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching</Option>
      )}
    </Select>
  );
};
