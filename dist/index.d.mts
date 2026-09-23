import React from 'react';

interface UniversalSaaSWidgetProps {
    productName: string;
    productVersion?: string;
    logoInitial?: string;
    accentColor?: string;
    theme?: 'dark' | 'light';
    storageKey?: string;
    onValidateToken?: (token: string) => Promise<boolean> | boolean;
    onProTask?: () => void;
}
declare const UniversalSaaSWidget: React.FC<UniversalSaaSWidgetProps>;

export { UniversalSaaSWidget, type UniversalSaaSWidgetProps };
