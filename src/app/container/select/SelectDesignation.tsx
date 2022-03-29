import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectDesignation {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectDesignation = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectDesignation) => {
  const companyDesignationList = useStoreState((state) => state.common.companyDesignationList);
  
  
  const onSelect = (designationId) => {
    if (companyDesignationList) {
      const companyDesignation = companyDesignationList.find((item) => item.designationId === designationId);
      onChange(companyDesignation.designationId);
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
      filterOption={(input, option:any) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {companyDesignationList ? (
        companyDesignationList.map((type, idx) => (
          <Option key={type.designationId} value={type.designationId}>
            {type.designationName}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching Designation</Option>
      )}
    </Select>
  );
};
