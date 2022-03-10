import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectDepartment {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any;
  allowClear?: any;
}

export const SelectDepartment = ({
  onChange,
  selected,
  defaultSelected,
  style,
  allowClear

}: SelectDepartment) => {
  const companyDepartmentList = useStoreState((state) => state.common.companyDepartmentList);
  
  
  const onSelect = (departmentId) => {
    if (companyDepartmentList) {
      const companyDepartment = companyDepartmentList.find((item) => item.departmentId === departmentId);
      onChange(companyDepartment.departmentId);
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
      {companyDepartmentList ? (
        companyDepartmentList.map((type, idx) => (
          <Option key={type.departmentId} value={type.departmentId}>
            {type.departmentName}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching Department</Option>
      )}
    </Select>
  );
};
