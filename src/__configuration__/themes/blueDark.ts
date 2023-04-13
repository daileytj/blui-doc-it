import * as BLUIThemes from '@brightlayer-ui/react-themes';
import circles from '../../app/assets/themes/circles.svg';
import { SiteConfig } from './_types';
import * as Colors from '@brightlayer-ui/colors';

export const blueDarkTheme: SiteConfig = {
    theme: {
        ...BLUIThemes.blueDark,
        components: {
            ...BLUIThemes.blueDark.components,
            MuiButton: {
                styleOverrides: {
                    ...BLUIThemes.blueDark.components?.MuiButton?.styleOverrides,
                    outlined: {
                        borderColor: Colors.black[500],
                    },
                },
            },
        },
    },
    className: 'blui-dark',
    landingPageBanner: { backgroundImage: `url(${circles})`, backgroundSize: 1200 },
};
