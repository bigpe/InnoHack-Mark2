import { DefaultTheme } from 'styled-components';

export const themePalette: DefaultTheme['palette'] = {
    common: {
        black: '#000000',
        white: '#FFFFFF',
        grey: '#4D4D4D',
    },
    accent: '#5563DA',
    red: '#C80008',
    yellow: '#E4D01D',
    glass: {
        green: 'rgba(183, 211, 12, 0.2)',
        white: 'rgba(255, 255, 255, 0.5)',
    },
    gradients: {
        green: 'linear-gradient(90deg, #0C6D36 0%, #B7D30C 100%)',
        grey: 'linear-gradient(90deg, #E1ECE1 0%, #EFFBEF 100%)',
        red: 'linear-gradient(90deg, #930006 0%, #C80008 100%)',
        yellow: 'linear-gradient(90deg, #D39B0C 0%, #E4D01D 100%)',
    },
    green: {
        alpha: '#B7D30C',
        betta: '#0C6D36',
        gamma: '#9EF6B0',
    },
    grey: {
        bg1: '#f0f0f0',
        bg2: '#EFFBEF',
        inactive: '#7D887C',
    },
};
