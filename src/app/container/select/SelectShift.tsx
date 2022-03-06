import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectShift {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectShift = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectShift) => {
  const companyShiftList = useStoreState((state) => state.common.companyShiftList);
  
  
  const onSelect = (shiftId) => {
    if (companyShiftList) {
      const companyDepartment = companyShiftList.find((item) => item.shiftId === shiftId);
      onChange(companyDepartment.shiftId);
    }
  };

  // React.useEffect(() => {
  //   if (selected) {
  //     thanaListFetch(selected?.districtId);
  //   }
  // }, [selected])


  return (
    <Select
      onChange={onSelect}
      // loading={loading}
      showSearch
      allowClear
      defaultValue={defaultSelected}
      value={selected}
      style={style}
      placeholder="Select Department"
      filterOption={(input, option) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {companyShiftList ? (
        companyShiftList.map((type, idx) => (
          <Option key={type.shiftId} value={type.shiftId}>
            {type.shiftName}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching Shift</Option>
      )}
    </Select>
  );
};
