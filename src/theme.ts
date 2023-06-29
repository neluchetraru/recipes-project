import {
    createContext,
    useState,
    useMemo
} from 'react';

import {
    createTheme
} from '@mui/material';

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
    const [mode, setMode] = useState<"light" | "dark">("light");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


    return [colorMode, theme] as const;
}