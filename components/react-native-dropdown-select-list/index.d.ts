import type * as React from "react";
import { ViewStyle, TextStyle } from 'react-native';

export interface SelectListProps  {
    /**
     * Function to set the selected option's value.
     */
    setSelected: Function;

    /**
     * Placeholder text when no option is selected.
     * @default "Select an option"
     */
    placeholder?: string;

    /**
     * Label text above the select box.
     */
    label?: string;

    /**
     * Data array for the dropdown options.
     */
    data: Array<{ key?: any; value?: any } | string | number>;

    /**
     * Styles for the select box container.
     */
    boxStyles?: ViewStyle;

    /**
     * Styles for the input/placeholder text.
     */
    inputStyles?: TextStyle;

    /**
     * Styles for the dropdown container.
     */
    dropdownStyles?: ViewStyle;

    /**
     * Styles for each item in the dropdown.
     */
    dropdownItemStyles?: ViewStyle;

    /**
     * Styles for the text in each dropdown item.
     */
    dropdownTextStyles?: TextStyle;

    /**
     * Maximum height of the dropdown.
     * @default 200
     */
    maxHeight?: number;

    /**
     * Enable or disable the search functionality.
     * @default true
     */
    search?: boolean;

    /**
     * Placeholder text for the search input.
     * @default "Search..."
     */
    searchPlaceholder?: string;

    /**
     * Text displayed when no options match the search.
     * @default "No options found"
     */
    notFoundText?: string;

    /**
     * Callback function when an option is selected.
     */
    onSelect?: () => void;

    /**
     * Key to save the selected value as ('key' or 'value').
     * @default 'key'
     */
    save?: 'key' | 'value';

    /**
     * Font family for all text elements.
     */
    fontFamily?: string;

    /**
     * Custom icon to replace the close icon.
     */
    closeicon?: JSX.Element;

    /**
     * Custom icon to replace the dropdown arrow.
     */
    arrowicon?: JSX.Element;
    
}

declare class SelectList extends React.Component<SelectListProps> {}

export {
    SelectList
};