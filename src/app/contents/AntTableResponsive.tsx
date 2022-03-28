/**
 * This component will render classic ant table with no changes
 * Unless the props 'ViewPortWidth' is less than prop 'MobileBreakPoint'
 * then it will render custom html for responsive design
 */

 import Card, { CardProps } from "antd/lib/card";
 import Divider from "antd/lib/divider";
 import Pagination from "antd/lib/pagination";
 import Spin from "antd/lib/spin";
 import { Input, Table } from "antd";
 import * as React from "react";
 import { style, media, getStyles } from "typestyle";
 import { ColumnProps, TableProps } from "antd/lib/table";
 
 if (typeof window !== "undefined" && typeof document !== "undefined") {
   const head = document.head || document.getElementsByTagName("head")[0];
   const styleTag = document.createElement("style");
 
   head.appendChild(styleTag);
 
   styleTag.type = "text/css";
   styleTag.appendChild(document.createTextNode(getStyles()));
 }
 const ResponsiveTableStyle = {
   showOnBreakPoint: (breakPoint: number, display: string = "block") =>
     style(
       {
         display: "none"
       },
       media(
         { maxWidth: breakPoint },
         {
           display
         }
       )
     ),
 
   hideOnBreakPoint: (breakPoint: number, display: string = "block") =>
     style(
       {
         display
       },
       media(
         { maxWidth: breakPoint },
         {
           display: "none"
         }
       )
     ),
 
   customRow: style({}),
 
   spinContainer: style({
     display: "block",
     position: "absolute",
     height: "100%",
     width: "100%",
     zIndex: 4,
     maxHeight: 360
   }),
 
   spin: style({
     position: "absolute",
     top: "50%",
     left: "50%",
     margin: "-10px"
   }),
 
   spinBlur: style({
     pointerEvents: "none",
     userSelect: "none",
     overflow: "hidden",
     opacity: 0.5,
     "-webkit-filter": "blur(0.5px)",
     filter: "blur(0.5px)",
     transition: "opacity 0.3s",
     zoom: 1
   })
 };
 
 export type additionalCols = ColumnProps<any> & {
   showOnResponse: boolean;
   showOnDesktop: boolean;
 };
 
 export interface props {
   antTableProps: TableProps<any> & {
     columns: additionalCols[];
   };
   cardProps: CardProps;
   mobileBreakPoint: number;
 };
 
 export default function TableView(props: any) {
   const desktopTableProps = props.antTableProps;
   // @ts-ignore
   desktopTableProps.columns = desktopTableProps.columns.filter(
     (col: additionalCols) => col.showOnDesktop
   );
 
   const [filterTable, setfilterTable] = React.useState<any>(null);
 
   const [searchv, setsearchv] = React.useState<any>('');
 
   const search = (value) => {
     const result = props.antTableProps?.filterData?.filter(o =>
       Object.keys(o).some(k =>
         String(o[k])
           .toLowerCase()
           .includes(value.toLowerCase())
       )
     );
     setfilterTable(result)
   }
 
   desktopTableProps.dataSource = searchv === '' ? props.antTableProps.dataSource : filterTable;
   return (
     <div>
       <div
         className={ResponsiveTableStyle.hideOnBreakPoint(
           props.mobileBreakPoint
         )}
       >
         
         <div className="globalSearch" style={{ display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: "center", background: '#b8d7cd' }}>
           <span style={{ marginLeft: 10 }}>Total Found: {(props.antTableProps.dataSource !== null || props.antTableProps.dataSource !== undefined) ? props.antTableProps.dataSource?.length : 0}</span>
           <Input
             style={{ margin: "10px 10px 10px 0", width: 250 }}
             placeholder="Search by..."
             value={searchv}
             // allowClear
             onChange={(e) => { search(e.target.value); setsearchv(e.target.value) }}
           />
         </div>
 
         <Table
           {...desktopTableProps}
 
         />
       </div>
 
       <div
         className={ResponsiveTableStyle.showOnBreakPoint(
           props.mobileBreakPoint
         )}
       >
         <div
           className={
             props.antTableProps.loading
               ? ResponsiveTableStyle.spinBlur
               : ""
           }
         >
           {props.antTableProps.loading ? (
             <div className={ResponsiveTableStyle.spinContainer}>
               <Spin className={ResponsiveTableStyle.spin} />
             </div>
           ) : null}
           {!props.antTableProps.dataSource ? (
             <Table />
           ) : (
             props.antTableProps.dataSource.map((rowData: any, index: any) => {
               const onRow = props.antTableProps.onRow
                 ? { ...props.antTableProps.onRow(rowData, index) }
                 : undefined;
 
               return (
     
                   <Card key={rowData.key} {...props.cardProps} {...onRow} style={{ marginTop: 10 }}>
                     {props.antTableProps.columns
                       ? props.antTableProps.columns.map(
                         (colData: additionalCols, index: any) => {
                           return colData.showOnResponse ? (
                             <div  key={index+3}>
                               <div style={{ display: "flex" }}  key={index+4}>
                                 <div
                                   style={{
                                     width: "35%",
                                     paddingRight: 5,
                                     //  textAlign: "right"
                                   }}
                                   key={index+5}
                                 >
                                   {colData.title ? (
                                     <b>{colData.title}:</b>
                                   ) : null}
                                 </div>
                                 <div style={{ width: "65%", paddingLeft: 5 }}  key={index+6}>
                                   {colData.key
                                     ? colData.render
                                       ? colData.render(
                                         rowData[colData.key],
                                         rowData,
                                         index
                                       )
                                       : rowData[colData.key]
                                     : null}
                                 </div>
                               </div>
                               {props.antTableProps.columns ? (
                                 index + 1 ===
                                   props.antTableProps.columns
                                     .length ? null : (
                                   <Divider />
                                 )
                               ) : null}
                             </div>
                           ) : null;
                         }
                       )
                       : null}
                   </Card>
          
               );
             })
           )}
           {props.antTableProps.pagination ? (
             <Pagination {...props.antTableProps.pagination} />
           ) : null}
         </div>
       </div>
     </div>
   );
 }
 
 
  //  export default ResponsiveTable;