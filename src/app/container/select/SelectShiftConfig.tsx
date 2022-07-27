import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectShiftConfig {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectShiftConfig = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectShiftConfig) => {
  const shiftList = useStoreState((state) => state.attendance.shiftList);
  const fetchshiftList = useStoreActions((state) => state.attendance.fetchshiftList);

  React.useEffect(()=>{
    fetchshiftList();
  },[])
  
  const onSelect = (shiftId) => {
    if (shiftList) {
      const items = shiftList.find((item) => item.shiftId === shiftId);
      onChange(items.shiftId);
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
      // allowClear
      defaultValue={defaultSelected}
      // value={defaultSelected}
      style={style}
      placeholder="Select Shift"
      filterOption={(input, option:any) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {shiftList ? (
        shiftList.map((type, idx) => (
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
