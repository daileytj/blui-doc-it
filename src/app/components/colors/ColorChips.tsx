import React, { useCallback, useEffect, useState } from 'react';
import { Check, FileCopy } from '@material-ui/icons';
import { Typography, Chip, Theme, makeStyles, useTheme } from '@material-ui/core';
import color from 'color';
import { copyTextToClipboard } from '../../shared';
import clsx from 'clsx';

type ColorType = 'HEX' | 'RGB' | 'CMYK' | 'HSL';
type ColorChipsProps = {
    hex: string;
    type: ColorType;
};

const COLOR_NOT_AVAILABLE = '--';

const useStyles = makeStyles((theme: Theme) => ({
    root: { marginRight: theme.spacing(), marginBottom: theme.spacing(), position: 'relative' },
    content: { display: 'flex', alignItems: 'center' },
    divider: { color: theme.palette.divider, margin: `0 ${theme.spacing(0.5)}px` },
    copyIcon: { fontSize: 16, marginLeft: theme.spacing() },
    copiedOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        borderRadius: 200,
        visibility: 'visible',
        opacity: 1,
        '&$hidden': {
            visibility: 'hidden',
            transition: theme.transitions.create(['visibility', 'opacity'], {
                duration: theme.transitions.duration.shorter,
            }),
            opacity: 0,
        },
    },
    hidden: {},
}));

const getColorCode = (type: ColorType, hex: string): string => {
    const hslColor = color(hex).hsl().object();
    const cmykColor = color(hex).cmyk().object();

    switch (type) {
        case 'HEX':
            return hex;
        case 'RGB':
            return color(hex).rgb().string();
        case 'HSL':
            return `hsl(${Math.round(hslColor.h)}, ${Math.round(hslColor.s)}%, ${Math.round(hslColor.l)})`;
        case 'CMYK':
            return `C: ${Math.round(cmykColor.c)}, M: ${Math.round(cmykColor.m)}, Y: ${Math.round(
                cmykColor.y
            )}, K: ${Math.round(cmykColor.k)}`;
        default:
            return COLOR_NOT_AVAILABLE;
    }
};

export const ColorChips: React.FC<ColorChipsProps> = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [textCopied, setTextCopied] = useState(false);
    const colorCode = getColorCode(props.type, props.hex);

    const getChipContent = useCallback(
        (type: ColorType, code: string): React.ReactNode => {
            const starredType = ['HSL', 'CMYK'].includes(type);
            return (
                <div className={classes.content}>
                    <div className={clsx(!textCopied && classes.hidden, classes.copiedOverlay)}>
                        Copied
                        <Check fontSize="inherit" />
                    </div>
                    <Typography variant={'overline'} color={'textSecondary'}>
                        {type}
                        {starredType && '*'}
                    </Typography>
                    <span className={classes.divider}>|</span>
                    <Typography variant={'caption'} color={'textPrimary'} style={{ fontFamily: 'Roboto Mono' }}>
                        {code}
                    </Typography>
                    {code !== COLOR_NOT_AVAILABLE && (
                        <FileCopy className={classes.copyIcon} htmlColor={theme.palette.text.secondary} />
                    )}
                </div>
            );
        },
        [theme, textCopied]
    );

    useEffect(() => {
        let copyTextTimer: NodeJS.Timeout;
        if (textCopied) {
            copyTextTimer = setTimeout((): void => {
                setTextCopied(false);
            }, 3000);
        }
        return (): void => {
            clearTimeout(copyTextTimer);
        };
    }, [textCopied]);

    return (
        <Chip
            clickable
            disabled={colorCode === COLOR_NOT_AVAILABLE}
            variant={colorCode === COLOR_NOT_AVAILABLE ? 'outlined' : 'default'}
            onClick={(): void => {
                copyTextToClipboard(colorCode, () => {
                    setTextCopied(true);
                });
            }}
            className={classes.root}
            label={getChipContent(props.type, colorCode)}
        />
    );
};
