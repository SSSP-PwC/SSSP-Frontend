import styled from 'styled-components';
import { Button } from '../../globalStyles';

export const HomeSection = styled.section`
	height: 100vh;
	background-position: center;
	background-size: cover;
	padding-top: clamp(70px, 25vh, 220px);
	box-shadow: inset 0 0 0 1000px rgba (0, 0, 0, 0.2);
`;

export const HomeScreen = styled.div`
	object-fit: cover;
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-size: cover;
	top: 0;
	position: absolute;
	z-index: -1;
`;

export const HomeText = styled.p`
	margin-bottom: 35px;
	font-size: clamp(0.9rem, 1.5vw, 1.3rem);
	line-height: 24px;
	text-align: center;
	letter-spacing: 2px;
	color: black;
`;

export const ButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-flow: wrap;
	gap: 0.5rem;
	padding: 15px;
`;

export const HomeButton = styled(Button)`
	color: black;
	
	&:before {
		background: #101522;
		height: 500%;
	}

	&:hover:before {
		height: 0%;
	}

	&:hover {
		color: white,
		;
	}
`;
