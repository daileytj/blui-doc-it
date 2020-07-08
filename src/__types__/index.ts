import { SvgIconProps } from '@material-ui/core';

export type TODOFIXME = any;
export type FrameworkFilter = 'all' | 'angular' | 'react' | 'ionic' | 'react-native';
export type DetailedIcon = {
    name: string;
    filename: string;
    family: string[];
    style: string;
    tags: string[];
    description: string;
    author: string;
    size: number;
};
export type Icon = {
    name: string;
    isMaterial: boolean;
};
export type MatIconList = {
    [key: string]: (props: SvgIconProps) => JSX.Element;
};

export type ItemTypeFilter = 'all' | 'design' | 'development';
export type Status = 'backlog' | 'in-progress' | 'pre-release' | 'deferred' | 'finished';
export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export type RoadmapItem = {
    name: string;
    description: string;
    year: string | number;
    quarter: Quarter;
    status: Status;
    author?: string;
    type?: ItemTypeFilter;
    framework?: FrameworkFilter[];
};
export type RoadmapBucket = {
    name: string;
    description: string;
    type?: ItemTypeFilter;
    framework?: FrameworkFilter[];
    items: RoadmapItem[];
};

export type Result = {
    url: string;
    title: string;
    weight?: number;
    text?: string;
};
