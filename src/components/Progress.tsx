/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { Progress, type ProgressProps } from '@nextui-org/react';

const ProgressBar = ({ ...props } : ProgressProps) => <Progress {...props} />;

export default ProgressBar;
