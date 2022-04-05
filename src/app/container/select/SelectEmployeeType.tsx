import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectEmployeeType {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectEmployeeType = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectEmployeeType) => {
  const companyEmployeeList = useStoreState((state) => state.common.companyEmployeeList);
  
  
  const onSelect = (typeId) => {
    if (companyEmployeeList) {
      const companycompanyEmployee = companyEmployeeList.find((item) => item.typeId === typeId);
      onChange(companycompanyEmployee.typeId);
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
      placeholder="Select Employee Type"
      filterOption={(input, option:any) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {companyEmployeeList ? (
        companyEmployeeList.map((type, idx) => (
          <Option key={type.typeId} value={type.typeId}>
            {type.typeName}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching Employee Type</Option>
      )}
    </Select>
  );
};
