import { PropsWithChildren, ReactElement, WeakValidationMap, ValidationMap } from "react";

export interface BaseFunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
}