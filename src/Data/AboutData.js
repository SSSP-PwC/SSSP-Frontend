import React from 'react';

import { BsFillCameraFill } from 'react-icons/bs';
import { IoIosOptions, IoMdWallet } from 'react-icons/io';
import {AiFillSecurityScan} from 'react-icons/ai'
const iconStyle = (Icon) => <Icon size="3rem" color="#0f0f0f" />;

export const aboutData = [
    {
		name: 'Wallet Management',
		description: 'A digital wallet to store and manage your credentials, allowing you to make transactions without the need to enter your information each time.',
		icon: iconStyle(IoMdWallet),
		imgClass: 'one',
	},
	{
		name: 'Secure Communication',
		description: 'The reassurance that your information will be kept confidential at all times.',
		icon: iconStyle(AiFillSecurityScan),
		imgClass: 'two',
	},

	
];
