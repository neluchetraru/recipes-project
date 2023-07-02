import {
    createContext,
    useMemo
} from 'react';

import {
    createTheme
} from '@mui/material';
import useUserQueryStore from './store';

// color design tokens -> all the colors we use

// #666666 gray
// #141b2d primary dark blue
// #4cceac green accent
// #db4f4a red accent
// #6870fa

// mui theme settings

export const themeSettings = (mode: 'dark' | 'light') => {
    return {
        palette: {
            mode: mode,
            primary: {
                main: '#2a156b',
            },
            secondary: {
                main: '#48e489',
            },
        }
    }
}

export const ColorModeContext = createContext({ toggleColorMode: () => { } });


export const useMode = () => {
    const mode = useUserQueryStore(s => s.userQuery.colorMode)
    const setColorMode = useUserQueryStore(s => s.setColorMode)
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setColorMode(mode === "light" ? "dark" : "light");
            },
        }),
        [mode]
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


    return [colorMode, theme] as const;
}