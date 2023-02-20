import React from 'react';
import { Container, Section } from '../../globalStyles';
import {
	AboutText,
	AboutTitle,
	AboutWrapper,
	AboutColumn,
	AboutImageWrapper,
	AboutName,
	AboutTextWrapper,
} from './AboutStyles';
import { aboutData } from '../../data/AboutData';

const About = () => {
	const initial = {
		y: 40,
		opacity: 0,
	};
	const animate = {
		y: 0,
		opacity: 1,
	};

	return (
		<Section smPadding="50px 10px" position="relative" inverse id="about">
			<Container>
				<AboutTextWrapper>
					<AboutTitle>What do we offer?</AboutTitle>
				</AboutTextWrapper>
				<AboutWrapper>
					{aboutData.map((el, index) => (
						<AboutColumn
							initial={initial}
							animate={animate}
							transition={{ duration: 0.5 + index * 0.1 }}
							key={index}
						>
							<AboutImageWrapper className={el.imgClass}>
								{el.icon}
							</AboutImageWrapper>
							<AboutName>{el.name}</AboutName>
							<AboutText>{el.description}</AboutText>
						</AboutColumn>
					))}
				</AboutWrapper>
			</Container>
		</Section>
	);
};

export default About;
