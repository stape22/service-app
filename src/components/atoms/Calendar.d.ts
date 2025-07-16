import { type DayPickerProps } from "react-day-picker";
export type CalendarProps = DayPickerProps & {
    className?: string;
    classNames?: Partial<DayPickerProps["classNames"]>;
};
export declare function Calendar(props: CalendarProps): import("react/jsx-runtime").JSX.Element;
